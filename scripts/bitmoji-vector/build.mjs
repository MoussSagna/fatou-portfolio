/**
 * Regenerates src/assets/bitmoji/bitmoji.svg from assets-src/bitmoji.png.
 *   1. segment.mjs  — splits the artwork into named parts (hair, eyes, mouth…)
 *   2. trace.mjs    — traces each part colour by colour with potrace
 *   3. SVGO         — optimises paths while keeping ids, classes and groups
 * Usage: npm run bitmoji:vector   (palette.mjs is only needed to rebuild palette.json)
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { optimize } from 'svgo'

const here = fileURLToPath(new URL('.', import.meta.url))
const OUTPUT = fileURLToPath(new URL('../../src/assets/bitmoji/bitmoji.svg', import.meta.url))

for (const step of ['segment.mjs', 'trace.mjs']) {
  execFileSync(process.execPath, [step], { cwd: here, stdio: 'inherit' })
}

const raw = fs.readFileSync(`${here}.cache/bitmoji.svg`, 'utf8')
const { data } = optimize(raw, {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          collapseGroups: false,
          mergePaths: false,
          // keeps the closed-eye lids, hidden until a blink
          removeHiddenElems: false,
          removeUselessStrokeAndFill: false,
        },
      },
    },
  ],
})

// Namespaced gradient id (inline SVG ids are global) + decorative for assistive tech:
// the React wrapper carries the accessible name.
const svg = data
  .replaceAll('laptop-lid', 'bitmoji-laptop-lid')
  .replace('<svg ', '<svg aria-hidden="true" focusable="false" ')

fs.mkdirSync(fileURLToPath(new URL('.', `file://${OUTPUT}`)), { recursive: true })
fs.writeFileSync(OUTPUT, svg)
console.log(`✔ ${OUTPUT.split('/src/')[1]} — ${(svg.length / 1024).toFixed(0)} KB`)
