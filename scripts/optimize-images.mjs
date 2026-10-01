/**
 * Generates responsive AVIF/WebP variants from high-resolution sources.
 * Sources live in /assets-src (not bundled); outputs go to /src/assets/images.
 * Usage: npm run images
 */
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { phoneBoard } from './phone-mockup.mjs'

const SOURCE_DIR = new URL('../assets-src/', import.meta.url)
const OUTPUT_DIR = new URL('../src/assets/images/', import.meta.url)

const HOME = '0 - Home Exmed.png'
const LOGOS = 'tous les Logos.png'
const DOC = 'Documentation - Exmed.png'

const STE_DOC = 'Documentation -Ste soeur.png'
const STE_DECLARE = '2.2 - Ste - Declarer un programme - ajout oeuvre non ref.png'

/**
 * @param {string} folder
 * @returns {(entries: [string, string, number[], import('sharp').Region?, string?][]) => typeof IMAGES}
 */
const fromFolder = (folder) => (entries) =>
  entries.map(([name, file, widths, extract, flatten]) => ({
    name,
    file: `projects/${folder}/${file}`,
    widths,
    extract,
    flatten,
  }))

const exmed = fromFolder('EXMED')
const steSoeurs = fromFolder('STE-SOEURS')
const sugarMap = fromFolder('SUGAR-MAP')

/** SugarMap backgrounds: app screens and presentation boards (sampled from the exports). */
const SUGAR_SCREEN = '#faf7f2'
const SUGAR_BOARD = '#fcf7ee'
const sugarFile = (file) => fileURLToPath(new URL(`projects/SUGAR-MAP/${file}`, SOURCE_DIR))

/**
 * SugarMap screens as shown in a phone: 390 px wide once the export margins
 * (drop shadow) are cropped. `offset` = scroll position, `nav` = height of the
 * bottom navigation bar, kept at the bottom of the phone. Same values as
 * src/data/case-studies/sugar-map.ts.
 */
const SUGAR_PHONE = {
  splash: { file: sugarFile('0- Homepage.png'), background: SUGAR_SCREEN },
  onboarding: { file: sugarFile('1- Onboarding.png'), background: SUGAR_SCREEN },
  home: { file: sugarFile('2.2- Homepage.png'), background: SUGAR_SCREEN, offset: 40, nav: 80 },
}

/** Hero board: the first three screens (0, 1, 2.2) in phones, built at 2160 px so screens stay at export size. */
const sugarHero = await phoneBoard({
  width: 2160,
  height: 1200,
  background: SUGAR_BOARD,
  phones: [
    { ...SUGAR_PHONE.splash, width: 450, left: 297, top: 168 },
    { ...SUGAR_PHONE.onboarding, width: 450, left: 855, top: 108 },
    { ...SUGAR_PHONE.home, width: 450, left: 1413, top: 168 },
  ],
})

/** Home card (217:235): the onboarding screen in a phone. */
const sugarCard = await phoneBoard({
  width: 868,
  height: 940,
  background: SUGAR_BOARD,
  phones: [{ ...SUGAR_PHONE.onboarding, width: 404, left: 232, top: 52 }],
})

/**
 * `extract` crops the source first (px, in source coordinates) — used to pull
 * single components out of a large design board. `flatten` fills transparent
 * areas (rounded corners of an export) with a colour. `input` replaces `file`
 * with an image built by this script.
 * @type {{ name: string, file?: string, input?: Buffer, widths: number[], extract?: import('sharp').Region, flatten?: string }[]}
 */
const IMAGES = [
  { name: 'bitmoji', file: 'bitmoji.png', widths: [768, 1200, 1536] },

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

  // Ste SŒURS — real exports from assets-src/projects/STE-SOEURS (@2x, except the landing page).
  ...steSoeurs([
    // Home card: left of the landing page (logo, "SACEM Portal", Log in), card ratio 217:235.
    [
      'project-ste-soeurs',
      'landing-page.png',
      [434, 739],
      { left: 0, top: 0, width: 739, height: 800 },
    ],
    ['ste-landing', 'landing-page.png', [960, 1440]],
    // Setlists screen without the empty bottom of the artboard.
    [
      'ste-setlists',
      '1. soeur - Mes programmes - Setlist - tous.png',
      [960, 1600, 2880],
      { left: 0, top: 0, width: 2880, height: 1960 },
    ],
    ['ste-declare', STE_DECLARE, [800, 1488, 2976]],
    // Documentation board (2912 × 10454): one crop per component family.
    ['ste-doc-forms', STE_DOC, [720], { left: 300, top: 520, width: 720, height: 1470 }],
    ['ste-doc-buttons', STE_DOC, [680, 1353], { left: 1262, top: 250, width: 1353, height: 2100 }],
    ['ste-doc-switch-stepper', STE_DOC, [720], { left: 300, top: 2540, width: 720, height: 980 }],
    ['ste-doc-datepicker', STE_DOC, [720], { left: 300, top: 3550, width: 720, height: 1090 }],
    ['ste-doc-lists', STE_DOC, [1245, 2490], { left: 205, top: 8130, width: 2490, height: 860 }],
    ['ste-doc-alerts', STE_DOC, [1245, 2490], { left: 205, top: 8990, width: 2490, height: 830 }],
    ['ste-doc-typography', STE_DOC, [725], { left: 205, top: 9860, width: 725, height: 470 }],
  ]),

  // SugarMap — real exports from assets-src/projects/SUGAR-MAP (@1x). `interface.png` is the
  // layout reference of the screens board and is not published.
  { name: 'sugarmap-hero', input: sugarHero, widths: [960, 1440, 2160] },
  { name: 'project-sugar-map', input: sugarCard, widths: [434, 868] },
  ...sugarMap([
    // Numbered screens (phone mock-ups), without the drop-shadow margins of the exports.
    ['sugarmap-onboarding', '1- Onboarding.png', [390], undefined, SUGAR_SCREEN],
    ['sugarmap-home', '2.2- Homepage.png', [390], undefined, SUGAR_SCREEN],
    ['sugarmap-shop', '3-boutique.png', [390], undefined, SUGAR_SCREEN],
    [
      'sugarmap-favorites',
      '4-Favoris.png',
      [390],
      { left: 38, top: 13, width: 390, height: 949 },
      SUGAR_SCREEN,
    ],
    ['sugarmap-filters', '5-filtres.png', [390], undefined, SUGAR_SCREEN],
    [
      'sugarmap-route',
      '6-itineraire.png',
      [390],
      { left: 4, top: 1, width: 390, height: 944 },
      SUGAR_SCREEN,
    ],
    [
      'sugarmap-map',
      '7-map.png',
      [390],
      { left: 6, top: 0, width: 390, height: 884 },
      SUGAR_SCREEN,
    ],
    // Presentation boards: rounded corners filled with the board colour.
    ['sugarmap-identity', 'identite-visuelle.png', [960, 1280], undefined, SUGAR_BOARD],
    [
      'sugarmap-design-system',
      'design-system.png',
      [720, 1055],
      { left: 4, top: 0, width: 1055, height: 805 },
      SUGAR_BOARD,
    ],
    ['sugarmap-ai', 'Ia et outils.png', [960, 1280], undefined, SUGAR_BOARD],
  ]),
]

await mkdir(OUTPUT_DIR, { recursive: true })

for (const image of IMAGES) {
  let source = sharp(image.input ?? fileURLToPath(new URL(image.file, SOURCE_DIR)))
  if (image.extract) source = source.extract(image.extract)
  if (image.flatten) source = source.flatten({ background: image.flatten })
  for (const width of image.widths) {
    const resized = source.clone().resize({ width, withoutEnlargement: true })
    const base = fileURLToPath(new URL(`${image.name}-${width}`, OUTPUT_DIR))
    await resized.clone().avif({ quality: 62, effort: 6 }).toFile(`${base}.avif`)
    await resized.clone().webp({ quality: 82, alphaQuality: 90 }).toFile(`${base}.webp`)
  }
  console.log(`✔ ${image.name}`)
}

/**
 * Social share images (Open Graph / X card): 1200 × 630 JPEG at stable URLs in
 * /public/og, referenced by src/seo/data.ts. Crawlers need a fixed, absolute
 * URL, hence public/ rather than hashed assets.
 */
const OG_DIR = new URL('../public/og/', import.meta.url)
const OG_SIZE = { width: 1200, height: 630 }

/** @type {{ name: string, file?: string, input?: Buffer, extract?: import('sharp').Region, contain?: boolean }[]} */
const OG_IMAGES = [
  // Home: the hero illustration, whole, on the site background.
  { name: 'home', file: 'bitmoji.png', contain: true },
  // Case studies: their main visual, cropped to 1.91:1 from the top.
  { name: 'exmed', file: `projects/EXMED/${HOME}` },
  {
    name: 'ste-soeurs',
    // The landing page, as in the hero.
    file: 'projects/STE-SOEURS/landing-page.png',
  },
  // The hero board (three phones).
  { name: 'sugar-map', input: sugarHero },
]

await mkdir(OG_DIR, { recursive: true })

for (const image of OG_IMAGES) {
  let source = sharp(image.input ?? fileURLToPath(new URL(image.file, SOURCE_DIR)))
  if (image.extract) source = source.extract(image.extract)
  await source
    .resize({
      ...OG_SIZE,
      fit: image.contain ? 'contain' : 'cover',
      position: 'top',
      background: '#f8eee6',
    })
    .flatten({ background: '#f8eee6' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(fileURLToPath(new URL(`${image.name}.jpg`, OG_DIR)))
  console.log(`✔ og/${image.name}`)
}
