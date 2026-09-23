import sharp from 'sharp'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

process.chdir(fileURLToPath(new URL('.', import.meta.url)))
fs.mkdirSync('.cache', { recursive: true })
const src = '../../assets-src/bitmoji.png'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const K = +(process.argv[2] || 32)
// sample opaque pixels
const pts = []
for (let i = 0; i < data.length; i += 4 * 7)
  if (data[i + 3] > 200) pts.push([data[i], data[i + 1], data[i + 2]])
// k-means++ init
const d2 = (a, b) =>
  (a[0] - b[0]) ** 2 * 0.3 + (a[1] - b[1]) ** 2 * 0.59 + (a[2] - b[2]) ** 2 * 0.11
let C = [pts[0]]
while (C.length < K) {
  let best = null,
    bd = -1
  for (let j = 0; j < pts.length; j += 13) {
    const m = Math.min(...C.map((c) => d2(c, pts[j])))
    if (m > bd) {
      bd = m
      best = pts[j]
    }
  }
  C.push([...best])
}
for (let it = 0; it < 25; it++) {
  const s = C.map(() => [0, 0, 0, 0])
  for (const p of pts) {
    let bi = 0,
      bd = 1e9
    C.forEach((c, i) => {
      const d = d2(c, p)
      if (d < bd) {
        bd = d
        bi = i
      }
    })
    s[bi][0] += p[0]
    s[bi][1] += p[1]
    s[bi][2] += p[2]
    s[bi][3]++
  }
  C = s.map((v, i) => (v[3] ? [v[0] / v[3], v[1] / v[3], v[2] / v[3]] : C[i]))
}
C = C.map((c) => c.map(Math.round))
fs.writeFileSync('./palette.json', JSON.stringify(C))
// quantized preview + swatch
const q = Buffer.alloc(info.width * info.height * 4)
const counts = new Array(C.length).fill(0)
for (let i = 0, p = 0; i < data.length; i += 4, p++) {
  if (data[i + 3] < 128) continue
  let bi = 0,
    bd = 1e9
  for (let k = 0; k < C.length; k++) {
    const d = d2(C[k], [data[i], data[i + 1], data[i + 2]])
    if (d < bd) {
      bd = d
      bi = k
    }
  }
  counts[bi]++
  q.set([...C[bi], 255], i)
}
await sharp(q, { raw: { width: info.width, height: info.height, channels: 4 } })
  .flatten({ background: '#F8EEE6' })
  .resize({ width: 900 })
  .png()
  .toFile('.cache/quant.png')
let sw = ''
C.forEach((c, i) => {
  sw += `<rect x="${(i % 8) * 120}" y="${Math.floor(i / 8) * 60}" width="120" height="60" fill="rgb(${c})"/><text x="${(i % 8) * 120 + 4}" y="${Math.floor(i / 8) * 60 + 16}" font-size="13" fill="${c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11 > 128 ? '#000' : '#fff'}">${i}: ${counts[i]}</text>`
})
await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${Math.ceil(C.length / 8) * 60}">${sw}</svg>`,
  ),
)
  .png()
  .toFile('.cache/swatch.png')
console.log(
  C.map(
    (c, i) =>
      i + ':#' + c.map((v) => v.toString(16).padStart(2, '0')).join('') + '(' + counts[i] + ')',
  ).join(' '),
)
