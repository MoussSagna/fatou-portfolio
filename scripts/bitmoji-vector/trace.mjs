// Traces each segmented part into layered vector paths and writes a structured SVG.
import fs from 'node:fs'
import sharp from 'sharp'
import potrace from 'potrace'
import { fileURLToPath } from 'node:url'

process.chdir(fileURLToPath(new URL('.', import.meta.url)))
fs.mkdirSync('.cache', { recursive: true })

const { W, H } = JSON.parse(fs.readFileSync('.cache/meta.json'))
const N = W * H
const lab = new Uint8Array(fs.readFileSync('.cache/labels.bin'))
const idx = new Uint8Array(fs.readFileSync('.cache/idx.bin'))
const P = JSON.parse(fs.readFileSync('./palette.json'))
const L = JSON.parse(fs.readFileSync('./labels.json'))
const OPT = JSON.parse(fs.readFileSync('./trace-options.json'))
const SRC = await sharp('../../assets-src/bitmoji.png').raw().toBuffer()
const lum = (c) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11
const meanHex = (m) => {
  let r = 0,
    g = 0,
    b = 0,
    n = 0
  for (let p = 0; p < N; p++)
    if (m[p]) {
      r += SRC[p * 4]
      g += SRC[p * 4 + 1]
      b += SRC[p * 4 + 2]
      n++
    }
  return n
    ? '#' +
        [r, g, b]
          .map((v) =>
            Math.round(v / n)
              .toString(16)
              .padStart(2, '0'),
          )
          .join('')
    : '#000000'
}
const hex = (i) => '#' + P[i].map((v) => v.toString(16).padStart(2, '0')).join('')
const WHITE = new Set([14, 0, 11])
const BLACK = new Set([1, 22, 9])

// ---------- mask helpers
const maskOf = (fn) => {
  const m = new Uint8Array(N)
  for (let p = 0; p < N; p++) if (fn(p)) m[p] = 1
  return m
}
function dist(m) {
  const D = new Float32Array(N).fill(1e9)
  for (let p = 0; p < N; p++) if (m[p]) D[p] = 0
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const p = y * W + x
      let v = D[p]
      if (x > 0) v = Math.min(v, D[p - 1] + 1)
      if (y > 0) {
        v = Math.min(v, D[p - W] + 1)
        if (x > 0) v = Math.min(v, D[p - W - 1] + 1.414)
        if (x < W - 1) v = Math.min(v, D[p - W + 1] + 1.414)
      }
      D[p] = v
    }
  for (let y = H - 1; y >= 0; y--)
    for (let x = W - 1; x >= 0; x--) {
      const p = y * W + x
      let v = D[p]
      if (x < W - 1) v = Math.min(v, D[p + 1] + 1)
      if (y < H - 1) {
        v = Math.min(v, D[p + W] + 1)
        if (x < W - 1) v = Math.min(v, D[p + W + 1] + 1.414)
        if (x > 0) v = Math.min(v, D[p + W - 1] + 1.414)
      }
      D[p] = v
    }
  return D
}
const dilate = (m, r) => {
  if (!r) return m
  const D = dist(m)
  return maskOf((p) => D[p] <= r)
}
const erode = (m, r) => {
  const D = dist(maskOf((p) => !m[p]))
  return maskOf((p) => D[p] > r)
}
const close = (m, r) => erode(dilate(m, r), r)
function fillHoles(m) {
  const out = new Uint8Array(N).fill(1)
  const st = []
  for (let x = 0; x < W; x++) st.push(x, (H - 1) * W + x)
  for (let y = 0; y < H; y++) st.push(y * W, y * W + W - 1)
  while (st.length) {
    const p = st.pop()
    if (!out[p] || m[p]) continue
    out[p] = 0
    const x = p % W
    if (x > 0) st.push(p - 1)
    if (x < W - 1) st.push(p + 1)
    if (p >= W) st.push(p - W)
    if (p < N - W) st.push(p + W)
  }
  return out
}
const bbox = (m) => {
  let x0 = W,
    y0 = H,
    x1 = -1,
    y1 = -1
  for (let p = 0; p < N; p++)
    if (m[p]) {
      const x = p % W,
        y = (p / W) | 0
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  return { x0, y0, x1, y1 }
}
/** 4-connected components of a mask, as pixel index lists. */
function componentsOf(m) {
  const seen = new Uint8Array(N)
  const comps = []
  for (let s0 = 0; s0 < N; s0++) {
    if (!m[s0] || seen[s0]) continue
    const stack = [s0],
      px = []
    seen[s0] = 1
    while (stack.length) {
      const p = stack.pop()
      px.push(p)
      const x = p % W
      for (const n of [p - 1, p + 1, p - W, p + W]) {
        if (n < 0 || n >= N || (x === 0 && n === p - 1) || (x === W - 1 && n === p + 1)) continue
        if (m[n] && !seen[n]) {
          seen[n] = 1
          stack.push(n)
        }
      }
    }
    comps.push(px)
  }
  return comps
}
const fromPixels = (lists) => {
  const out = new Uint8Array(N)
  for (const px of lists) for (const p of px) out[p] = 1
  return out
}
const largestComponent = (m) =>
  fromPixels([componentsOf(m).reduce((a, b) => (b.length > a.length ? b : a), [])])
const part = (...names) => maskOf((p) => names.some((n) => lab[p] === L[n]))

// ---------- potrace a binary mask -> path d (absolute coords, rounded)
async function tracePath(m, o = {}) {
  const t = { ...OPT, ...o }
  let x0 = W,
    y0 = H,
    x1 = -1,
    y1 = -1
  for (let p = 0; p < N; p++)
    if (m[p]) {
      const x = p % W,
        y = (p / W) | 0
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  if (x1 < 0) return ''
  const pad = 2
  x0 = Math.max(0, x0 - pad)
  y0 = Math.max(0, y0 - pad)
  x1 = Math.min(W - 1, x1 + pad)
  y1 = Math.min(H - 1, y1 + pad)
  const w = x1 - x0 + 1,
    h = y1 - y0 + 1
  const buf = Buffer.alloc(w * h, 255)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) if (m[(y + y0) * W + x + x0]) buf[y * w + x] = 0
  const png = await sharp(buf, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer()
  const tag = await new Promise((res, rej) =>
    potrace.trace(
      png,
      { turdSize: t.turdSize, optTolerance: t.optTolerance, alphaMax: t.alphaMax, threshold: 128 },
      (e, svg) => (e ? rej(e) : res(svg)),
    ),
  )
  const d = (tag.match(/ d="([^"]+)"/) || [])[1] || ''
  // shift to absolute image coords & round
  let i = 0
  return d
    .replace(/-?\d+(\.\d+)?/g, (n) => {
      const v = +n + (i++ % 2 === 0 ? x0 : y0)
      const f = 10 ** t.prec
      return (Math.round(v * f) / f).toString()
    })
    .replace(/\s+/g, ' ')
    .replace(/ ([A-Z])/g, '$1')
    .trim()
}

// ---------- colour layers of a part: base silhouette + colours by area (rare ones merged)
async function layers(
  m,
  {
    baseDilate = 1,
    minShare = OPT.minShare,
    exclude = new Set(),
    baseFill,
    baseMask = m,
    trace = {},
    dark = trace,
    light = trace,
  } = {},
) {
  const counts = new Map()
  let total = 0
  for (let p = 0; p < N; p++)
    if (m[p]) {
      counts.set(idx[p], (counts.get(idx[p]) || 0) + 1)
      total++
    }
  if (!total) return []
  const sorted = [...counts].sort((a, b) => b[1] - a[1])
  const keep = sorted
    .filter(([k, c]) => c / total >= minShare || (lum(P[k]) < 110 && c / total >= 0.002))
    .map(([k]) => k)
  const near = (k) =>
    keep.reduce(
      (best, c) => {
        const d = (P[c][0] - P[k][0]) ** 2 + (P[c][1] - P[k][1]) ** 2 + (P[c][2] - P[k][2]) ** 2
        return d < best[1] ? [c, d] : best
      },
      [keep[0], 1e12],
    )[0]
  const colourOf = new Map(sorted.map(([k]) => [k, keep.includes(k) ? k : near(k)]))
  const out = []
  const base = keep[0]
  out.push({
    fill: baseFill || meanHex(maskOf((p) => m[p] && colourOf.get(idx[p]) === base)),
    d: await tracePath(dilate(baseMask, baseDilate), trace),
  })
  for (const k of keep.slice(1)) {
    if (exclude.has(k) && counts.get(k) / total > 0.03) continue
    const cm = maskOf((p) => m[p] && colourOf.get(idx[p]) === k)
    const d = await tracePath(cm, { ...trace, ...(lum(P[k]) < 110 ? dark : light) })
    if (d) out.push({ fill: meanHex(cm), d })
  }
  return out
}
const paths = (ls, cls = '') =>
  ls.map((l) => `<path${cls ? ` class="${cls}"` : ''} fill="${l.fill}" d="${l.d}"/>`).join('')

// ---------- eyes: outline/lashes, eye-white, iris, pupil, highlight
async function eye(name, id) {
  const m = part(name)
  const SKIN = new Set([2, 13, 20, 25, 8, 29])
  const seed = maskOf((p) => m[p] && !BLACK.has(idx[p]) && !SKIN.has(idx[p]))
  const enclosed = fillHoles(close(seed, 3))
  const interior = maskOf((p) => m[p] && enclosed[p])
  const outline = maskOf((p) => m[p] && !interior[p])
  const irisAll = maskOf((p) => interior[p] && !WHITE.has(idx[p]))
  const irisFilled = fillHoles(close(irisAll, 2))
  const pupil = maskOf((p) => irisFilled[p] && (idx[p] === 1 || idx[p] === 22))
  const fine = { turdSize: 2, optTolerance: 0.2, prec: 1 }
  const white = '#fdf9f6'

  // Closed-lid line: a gentle downward arc between the eye corners. The open eye
  // scales vertically onto that line (pivot stored inline as a % of its box).
  const box = bbox(m)
  const sclera = largestComponent(maskOf((p) => interior[p] && WHITE.has(idx[p])))
  // Catchlight: white islands inside the eye, detached from the sclera (the iris can
  // touch the lid, so they are not always enclosed by it). Specks are ignored.
  const highlight = fromPixels(
    componentsOf(maskOf((p) => m[p] && WHITE.has(idx[p]) && !sclera[p])).filter(
      (px) => px.length >= OPT.highlightMinPx && px.length <= 600,
    ),
  )
  const inner = bbox(sclera)
  const cornerY = (x) => {
    let sum = 0,
      n = 0
    for (let y = inner.y0; y <= inner.y1; y++)
      if (sclera[y * W + x]) {
        sum += y
        n++
      }
    return sum / n
  }
  const [xa, xb] = [inner.x0, inner.x1]
  const [ya, yb] = [cornerY(xa), cornerY(xb)]
  const dip = (inner.y1 - inner.y0) * 0.2
  const lidY = (ya + yb) / 2 + dip
  const pivotY = (((lidY - box.y0) / (box.y1 - box.y0)) * 100).toFixed(1)
  const r = (v) => Math.round(v * 10) / 10
  const lid = `M${r(xa)} ${r(ya)}Q${r((xa + xb) / 2)} ${r(lidY + dip)} ${r(xb)} ${r(yb)}`

  return (
    `<g id="${id}" class="bitmoji-eye">` +
    `<g class="eye-open" style="transform-origin:50% ${pivotY}%">` +
    `<path class="eye-white" fill="${white}" d="${await tracePath(interior, fine)}"/>` +
    `<g class="iris">${paths(await layers(irisFilled, { baseDilate: 0, minShare: 0.05, trace: fine }))}</g>` +
    `<path class="pupil" fill="${meanHex(pupil)}" d="${await tracePath(pupil, fine)}"/>` +
    `<g class="eye-outline">${paths(await layers(outline, { baseDilate: 0, minShare: 0.03, trace: fine }))}</g>` +
    `<path class="eye-highlight" fill="${white}" d="${await tracePath(highlight, { ...fine, turdSize: 1 })}"/>` +
    `</g>` +
    `<path class="eye-lid" fill="none" stroke="${meanHex(maskOf((p) => outline[p] && BLACK.has(idx[p])))}" stroke-width="5" stroke-linecap="round" opacity="0" d="${lid}"/>` +
    `</g>`
  )
}

// ---------- build
const g = (id, inner, cls = '') => `<g id="${id}"${cls ? ` class="${cls}"` : ''}>${inner}</g>`
const T0 = Date.now()
const log = (s) => console.log(`${((Date.now() - T0) / 1000).toFixed(1)}s ${s}`)

// Back parts bleed under their neighbours to hide seams; front parts keep exact edges.
const FRONT = { baseDilate: 0 }
const hairAll = part('hairBack', 'hairFront')
const handBleed = dilate(part('hand'), 1)
const faceAll = part('face', 'browL', 'browR', 'eyeL', 'eyeR', 'nose', 'mouth')
const BACK = { baseDilate: 2 }
const FINE = { turdSize: 2, optTolerance: 0.2, prec: 1 }
const GREYS = new Set([3, 5, 11, 16, 19, 23])
const out = []
out.push(
  g(
    'scene-back',
    g(
      'blob',
      paths(
        await layers(part('blob'), {
          ...BACK,
          minShare: 0.12,
          trace: { turdSize: 80, optTolerance: 1.2, alphaMax: 1.2 },
        }),
      ),
    ) +
      g(
        'desk',
        paths(
          await layers(part('desk'), {
            ...BACK,
            minShare: 0.08,
            light: { turdSize: 60, optTolerance: 1 },
          }),
        ),
      ) +
      g(
        'plant',
        paths(
          await layers(part('plant'), {
            ...BACK,
            minShare: 0.04,
            light: { turdSize: 30, optTolerance: 0.6 },
          }),
        ),
      ),
  ),
)
log('scene-back')
out.push(
  g(
    'body',
    g('shirt', paths(await layers(part('shirt'), BACK))) +
      g('neck', paths(await layers(part('neck'), { ...BACK, minShare: 0.04 }))),
  ),
)
log('body')
out.push(
  g(
    'hair-base',
    `<path fill="${hex(1)}" d="${await tracePath(erode(hairAll, OPT.hairBaseErode))}"/>`,
  ),
)
log('hair-base')
out.push(g('hair-back', paths(await layers(part('hairBack'), { baseDilate: 1 })), 'bitmoji-hair'))
log('hair-back')
// hair-front overlaps hair-back by a few rows (same colours) so the split never shows.
const { hairSplitY } = JSON.parse(fs.readFileSync('./regions.json'))
const hairBackRows = part('hairBack')
const hairFrontOverlap = maskOf(
  (p) =>
    lab[p] === L.hairFront || (hairBackRows[p] && ((p / W) | 0) >= hairSplitY - OPT.hairOverlap),
)
out.push(
  g(
    'hair-front',
    paths(await layers(hairFrontOverlap, { baseDilate: 1, baseMask: part('hairFront') })),
    'bitmoji-hair',
  ),
)
log('hair-front')
const faceBase = `<path class="face-base" fill="${hex(2)}" d="${await tracePath(faceAll)}"/>`
const faceLayers = (
  await layers(part('face'), {
    baseDilate: 0,
    minShare: 0.05,
    light: { turdSize: 30, optTolerance: 0.6 },
  })
).slice(1) // base drawn by face-base
out.push(
  g(
    'face',
    faceBase +
      paths(faceLayers) +
      g('nose', paths(await layers(part('nose'), { baseDilate: 0, trace: FINE }))) +
      g('left-eyebrow', paths(await layers(part('browL'), { baseDilate: 0, trace: FINE }))) +
      g('right-eyebrow', paths(await layers(part('browR'), { baseDilate: 0, trace: FINE }))) +
      (await eye('eyeL', 'left-eye')) +
      (await eye('eyeR', 'right-eye')) +
      g(
        'mouth',
        paths(await layers(part('mouth'), { baseDilate: 0, minShare: 0.02, trace: FINE })),
      ),
  ),
)
log('face')
out.push(
  g(
    'hand',
    paths(
      await layers(part('hand'), {
        ...FRONT,
        minShare: 0.03,
        // bleed 1px into the face/neck (closes seams) but never over the hair
        baseMask: maskOf((p) => handBleed[p] && !hairAll[p]),
      }),
    ),
  ),
)
log('hand')
out.push(
  g(
    'hat',
    paths(
      await layers(part('hat'), {
        ...FRONT,
        minShare: 0.03,
        light: { turdSize: 30, optTolerance: 0.6 },
      }),
    ),
  ),
)
log('hat')
out.push(
  g(
    'scene-front',
    g(
      'laptop',
      paths(
        await layers(part('laptop'), {
          ...FRONT,
          baseFill: 'url(#laptop-lid)',
          exclude: GREYS,
          light: { turdSize: 20, optTolerance: 0.6 },
        }),
      ),
    ) +
      g(
        'mug',
        paths(
          await layers(part('mug'), {
            ...FRONT,
            minShare: 0.04,
            dark: FINE,
            light: { turdSize: 30, optTolerance: 0.6 },
          }),
        ),
      ) +
      g(
        'books',
        paths(
          await layers(part('books'), {
            ...FRONT,
            minShare: 0.06,
            dark: { turdSize: 3 },
            light: { turdSize: 40, optTolerance: 0.8 },
          }),
        ),
      ),
  ),
)
log('scene-front')
const defs =
  '<defs><linearGradient id="laptop-lid" gradientUnits="userSpaceOnUse" x1="720" y1="650" x2="1070" y2="950"><stop offset="0" stop-color="#c8bdb9"/><stop offset=".45" stop-color="#aa9e9a"/><stop offset="1" stop-color="#847b78"/></linearGradient></defs>'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" id="bitmoji">${defs}${out.join('')}</svg>`
fs.writeFileSync('.cache/bitmoji.svg', svg)
log(`bitmoji.svg ${(svg.length / 1024).toFixed(0)} KB, ${(svg.match(/<path/g) || []).length} paths`)
