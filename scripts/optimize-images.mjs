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

/** @type {{ name: string, file: string, widths: number[] }[]} */
const IMAGES = [{ name: 'bitmoji', file: 'bitmoji.png', widths: [768, 1200, 1536] }]

await mkdir(OUTPUT_DIR, { recursive: true })

for (const image of IMAGES) {
  const source = sharp(fileURLToPath(new URL(image.file, SOURCE_DIR)))
  for (const width of image.widths) {
    const resized = source.clone().resize({ width, withoutEnlargement: true })
    const base = fileURLToPath(new URL(`${image.name}-${width}`, OUTPUT_DIR))
    await resized.clone().avif({ quality: 62, effort: 6 }).toFile(`${base}.avif`)
    await resized.clone().webp({ quality: 82, alphaQuality: 90 }).toFile(`${base}.webp`)
  }
  console.log(`✔ ${image.name}`)
}
