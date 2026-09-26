/**
 * Generates responsive AVIF/WebP variants from high-resolution sources.
 * Sources live in /assets-src (not bundled); outputs go to /src/assets/images.
 * Usage: npm run images
 */
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const SOURCE_DIR = new URL('../assets-src/', import.meta.url)
const OUTPUT_DIR = new URL('../src/assets/images/', import.meta.url)

const HOME = '0 - Home Exmed.png'
const LOGOS = 'tous les Logos.png'
const DOC = 'Documentation - Exmed.png'

/** @param {[string, string, number[], import('sharp').Region?][]} entries */
function exmed(entries) {
  return entries.map(([name, file, widths, extract]) => ({
    name,
    file: `projects/EXMED/${file}`,
    widths,
    extract,
  }))
}

/**
 * `extract` crops the source first (px, in source coordinates) — used to pull
 * single components out of a large design board.
 * @type {{ name: string, file: string, widths: number[], extract?: import('sharp').Region }[]}
 */
const IMAGES = [
  { name: 'bitmoji', file: 'bitmoji.png', widths: [768, 1200, 1536] },
  // Provisional project visuals cropped from the mockup — replace with HD exports.
  { name: 'project-poppy', file: 'projects/poppy.png', widths: [434, 868] },
  { name: 'project-lumiere', file: 'projects/lumiere.png', widths: [434, 868] },
  { name: 'project-mindful', file: 'projects/mindful.png', widths: [434, 868] },

  // EXMED DA OPO PHONO — real exports from assets-src/projects/EXMED (see docs/project-pages.md).
  ...exmed([
    // Home card: the two application cards of the home screen (below its header), card ratio 217:235.
    ['project-exmed', HOME, [434, 868], { left: 537, top: 67, width: 868, height: 940 }],
    ['exmed-home', HOME, [960, 1440]],
    ['exmed-list', '1- Mes DA.png', [960, 1440]],
    ['exmed-detail', '2.1 - Information sur DA.png', [760, 1453]],
    // Logo board: the three variants, without the board frame.
    ['exmed-logo-light', LOGOS, [568], { left: 3, top: 192, width: 568, height: 254 }],
    ['exmed-logo-dark', LOGOS, [568], { left: 3, top: 480, width: 568, height: 240 }],
    ['exmed-logo-gradient', LOGOS, [568], { left: 3, top: 735, width: 568, height: 240 }],
    // Documentation board (1548 × 7706): one crop per component family, inside the panels.
    ['exmed-doc-foundations', DOC, [960, 1436], { left: 56, top: 47, width: 1436, height: 1203 }],
    ['exmed-doc-states', DOC, [690], { left: 90, top: 1690, width: 690, height: 660 }],
    ['exmed-doc-tables', DOC, [960, 1410], { left: 68, top: 2652, width: 1410, height: 1098 }],
    ['exmed-doc-cards', DOC, [960, 1410], { left: 68, top: 6082, width: 1410, height: 750 }],
    ['exmed-doc-alerts', DOC, [960, 1410], { left: 68, top: 6868, width: 1410, height: 488 }],
  ]),
]

await mkdir(OUTPUT_DIR, { recursive: true })

for (const image of IMAGES) {
  let source = sharp(fileURLToPath(new URL(image.file, SOURCE_DIR)))
  if (image.extract) source = source.extract(image.extract)
  for (const width of image.widths) {
    const resized = source.clone().resize({ width, withoutEnlargement: true })
    const base = fileURLToPath(new URL(`${image.name}-${width}`, OUTPUT_DIR))
    await resized.clone().avif({ quality: 62, effort: 6 }).toFile(`${base}.avif`)
    await resized.clone().webp({ quality: 82, alphaQuality: 90 }).toFile(`${base}.webp`)
  }
  console.log(`✔ ${image.name}`)
}
