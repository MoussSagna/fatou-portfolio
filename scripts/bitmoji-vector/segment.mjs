// Segments the bitmoji into semantic parts. Output: .cache/labels.bin (label per px), .cache/idx.bin, .cache/overlay-full.png (review).
import sharp from 'sharp'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

process.chdir(fileURLToPath(new URL('.', import.meta.url)))
fs.mkdirSync('.cache', { recursive: true })

const SRC = '../../assets-src/bitmoji.png'
const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true })
const W = info.width,
  H = info.height,
  N = W * H
const P = JSON.parse(fs.readFileSync('./palette.json'))
const d2 = (a, r, g, b) => (a[0] - r) ** 2 * 0.3 + (a[1] - g) ** 2 * 0.59 + (a[2] - b) ** 2 * 0.11

// ---- quantize
const idx = new Uint8Array(N).fill(255)
for (let p = 0; p < N; p++) {
  const i = p * 4
  if (data[i + 3] < 128) continue
  let bi = 0,
    bd = 1e9
  for (let k = 0; k < P.length; k++) {
    const d = d2(P[k], data[i], data[i + 1], data[i + 2])
    if (d < bd) {
      bd = d
      bi = k
    }
  }
  idx[p] = bi
}
const set = (a) => new Set(a)
const DARK = set([1, 9, 22, 17])
const SKIN = set([2, 13, 20, 25, 8, 29])
const OLIVE = set([4, 12, 24, 30, 27])
const PINK = set([7, 21, 31, 15, 28, 10, 0])
const opaque = (p) => idx[p] !== 255

// ---- geometry helpers
const inPoly = (poly, x, y) => {
  let c = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i],
      [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}
const inBox = ([x0, y0, x1, y1], x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1
const mask = (fn) => {
  const m = new Uint8Array(N)
  for (let p = 0; p < N; p++) if (fn(p, p % W, (p / W) | 0)) m[p] = 1
  return m
}
// chamfer distance transform to nearest set pixel
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
  const D = dist(m)
  return mask((p) => D[p] <= r)
}
const erode = (m, r) => {
  const inv = mask((p) => !m[p])
  const D = dist(inv)
  return mask((p) => D[p] > r)
}
const close = (m, r) => erode(dilate(m, r), r)
const open = (m, r) => dilate(erode(m, r), r)
function fillHoles(m) {
  // flood background from border
  const out = new Uint8Array(N).fill(1)
  const st = []
  for (let x = 0; x < W; x++) {
    st.push(x, (H - 1) * W + x)
  }
  for (let y = 0; y < H; y++) {
    st.push(y * W, y * W + W - 1)
  }
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
function components(m) {
  // 8-connected, returns list of {pixels, cx, cy}
  const seen = new Uint8Array(N),
    comps = []
  for (let s = 0; s < N; s++) {
    if (!m[s] || seen[s]) continue
    const st = [s],
      px = []
    seen[s] = 1
    let sx = 0,
      sy = 0
    while (st.length) {
      const p = st.pop()
      px.push(p)
      const x = p % W,
        y = (p / W) | 0
      sx += x
      sy += y
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx,
            ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const n = ny * W + nx
          if (m[n] && !seen[n]) {
            seen[n] = 1
            st.push(n)
          }
        }
    }
    comps.push({ px, cx: sx / px.length, cy: sy / px.length })
  }
  return comps
}

// ---- regions (source px)
const R = JSON.parse(fs.readFileSync('./regions.json'))
const L = JSON.parse(fs.readFileSync('./labels.json')) // name -> id
const lab = new Uint8Array(N) // 0 = unassigned / transparent
const assign = (m, name, onlyFree = true) => {
  const id = L[name]
  for (let p = 0; p < N; p++) if (m[p] && opaque(p) && (!onlyFree || !lab[p])) lab[p] = id
}

// front props first
assign(
  mask((p, x, y) => inPoly(R.mug, x, y) && !PINK.has(idx[p])),
  'mug',
)
assign(
  mask((p, x, y) => inPoly(R.mugHandle, x, y) && !PINK.has(idx[p]) && !OLIVE.has(idx[p])),
  'mug',
)
assign(
  mask((p, x, y) => inPoly(R.laptop, x, y)),
  'laptop',
)
const bookCore = mask((p, x, y) => inPoly(R.books, x, y) && [21, 31, 0, 7, 14].includes(idx[p]))
const bookZone = dilate(fillHoles(close(bookCore, 6)), 4)
assign(
  mask((p, x, y) => bookZone[p] && inPoly(R.books, x, y) && !OLIVE.has(idx[p])),
  'books',
)

// hat: closed olive component in the hat box
const olive = mask((p, x, y) => OLIVE.has(idx[p]) && inBox(R.hatBox, x, y))
const hatCore = fillHoles(close(olive, 16))
const hatZone = dilate(hatCore, 5)
assign(
  mask(
    (p, x, y) => hatZone[p] && inBox(R.hatBox, x, y) && !SKIN.has(idx[p]) && !inPoly(R.face, x, y),
  ),
  'hat',
)

// plant
assign(
  mask((p, x, y) => inPoly(R.plant, x, y) && !PINK.has(idx[p])),
  'plant',
)

// face + features
const faceSkin = mask((p, x, y) => inPoly(R.face, x, y) && !lab[p] && SKIN.has(idx[p]))
const faceHull = dilate(fillHoles(close(faceSkin, 6)), 4)
const faceM = mask((p, x, y) => faceHull[p] && inPoly(R.face, x, y) && !lab[p])
const feat = mask((p) => faceM[p] && !SKIN.has(idx[p]))
const FEATS = ['browL', 'browR', 'eyeL', 'eyeR', 'nose', 'mouth']
const featMasks = Object.fromEntries(FEATS.map((f) => [f, new Uint8Array(N)]))
for (const c of components(feat)) {
  if (c.px.length < 6) continue
  const f = FEATS.find((f) => inBox(R[f], c.cx, c.cy))
  if (f) for (const p of c.px) featMasks[f][p] = 1
}
for (const f of FEATS) {
  // include enclosed pixels (e.g. skin-toned lip highlights, iris shading)
  const filled = fillHoles(close(featMasks[f], f === 'mouth' ? 4 : 2))
  assign(
    mask((p, x, y) => filled[p] && faceM[p] && inBox(R[f], x, y)),
    f,
  )
}
assign(faceM, 'face')

// hand/forearm
assign(
  mask((p, x, y) => inPoly(R.hand, x, y)),
  'hand',
)
assign(
  mask((p, x, y) => SKIN.has(idx[p]) && inBox(R.armBox, x, y)),
  'hand',
)

// hair: thick dark masses (opening removes thin outlines), holes filled for highlights
const dark = mask((p, x, y) => DARK.has(idx[p]) && !lab[p] && inBox(R.charBox, x, y))
const hairCore = open(dark, 3)
const hairBig = new Uint8Array(N)
for (const c of components(hairCore)) if (c.px.length > 1500) for (const p of c.px) hairBig[p] = 1
const hairFilled = fillHoles(close(dilate(hairBig, 2), 4))
const hairM = mask(
  (p) =>
    hairFilled[p] &&
    !lab[p] &&
    !PINK.has(idx[p]) &&
    (DARK.has(idx[p]) || ![14, 0, 11].includes(idx[p])),
)
// thin strands touching the hair mass
const hairNear = dilate(hairM, 14)
for (let p = 0; p < N; p++)
  if (
    !hairM[p] &&
    hairNear[p] &&
    !lab[p] &&
    DARK.has(idx[p]) &&
    inBox(R.charBox, p % W, (p / W) | 0)
  )
    hairM[p] = 1
assign(
  mask((p, x, y) => hairM[p] && y < R.hairSplitY),
  'hairBack',
)
assign(
  mask((p, x, y) => hairM[p] && y >= R.hairSplitY),
  'hairFront',
)

// neck / chest skin
assign(
  mask((p, x, y) => SKIN.has(idx[p]) && inBox(R.neckBox, x, y)),
  'neck',
)
// shirt: remaining non-pink pixels in shirt zone
assign(
  mask((p, x, y) => inPoly(R.shirt, x, y) && !PINK.has(idx[p])),
  'shirt',
)
// desk / blob by colour and height
assign(
  mask((p, x, y) => y >= R.deskY && PINK.has(idx[p])),
  'desk',
)
assign(
  mask((p) => PINK.has(idx[p])),
  'blob',
)

// propagate leftovers from nearest labelled neighbour (BFS)
let frontier = []
for (let p = 0; p < N; p++) if (lab[p]) frontier.push(p)
let left = 0
for (let p = 0; p < N; p++) if (opaque(p) && !lab[p]) left++
console.log('unassigned before propagation', left)
while (frontier.length) {
  const next = []
  for (const p of frontier) {
    const x = p % W
    for (const n of [p - 1, p + 1, p - W, p + W]) {
      if (n < 0 || n >= N || (x === 0 && n === p - 1) || (x === W - 1 && n === p + 1)) continue
      if (opaque(n) && !lab[n]) {
        lab[n] = lab[p]
        next.push(n)
      }
    }
  }
  frontier = next
}

fs.writeFileSync('.cache/labels.bin', lab)
fs.writeFileSync('.cache/idx.bin', idx)
fs.writeFileSync('.cache/meta.json', JSON.stringify({ W, H }))
// overlay
const COLORS = JSON.parse(fs.readFileSync('./label-colors.json'))
const ov = Buffer.alloc(N * 4)
for (let p = 0; p < N; p++) {
  if (!lab[p]) continue
  const c = COLORS[lab[p]]
  const i = p * 4
  const g = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11) / 255
  ov.set([c[0] * (0.45 + 0.55 * g), c[1] * (0.45 + 0.55 * g), c[2] * (0.45 + 0.55 * g), 255], i)
}
await sharp(ov, { raw: { width: W, height: H, channels: 4 } })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile('.cache/overlay-full.png')
const counts = {}
for (let p = 0; p < N; p++) if (lab[p]) counts[lab[p]] = (counts[lab[p]] || 0) + 1
console.log(
  Object.entries(L)
    .map(([k, v]) => `${k}:${counts[v] || 0}`)
    .join(' '),
)
