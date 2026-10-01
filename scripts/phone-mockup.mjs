/**
 * Phone mock-ups for generated visuals (hero board, home card, share image).
 * Draws the same phone as src/components/projects/PhoneMockup.tsx around a
 * real screen export: the proportions below must stay in sync with it.
 */
import sharp from 'sharp'

/** Screen of the mock-up, in export px (iPhone 390 × 844). */
const SCREEN = { width: 390, height: 844 }

/** Frame proportions, as fractions of the phone width. */
const FRAME = {
  ring: 0.012,
  bezel: 0.028,
  radius: 0.175,
  notchWidth: 0.4,
  notchHeight: 0.07,
  notchRadius: 0.036,
}

const svg = (width, height, body) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${body}</svg>`,
  )

/**
 * What the phone displays: the export scrolled by `offset`, with its bottom
 * navigation bar (`nav` px, cut from the same export) kept at the bottom.
 * @param {{ file: string, background: string, extract?: import('sharp').Region, offset?: number, nav?: number }} screen
 */
async function viewport({ file, background, extract, offset = 0, nav = 0 }) {
  let source = sharp(file)
  if (extract) source = source.extract(extract)
  const full = await source.flatten({ background }).png().toBuffer()
  const { height } = await sharp(full).metadata()

  const view = await sharp(full)
    .extract({ left: 0, top: offset, ...SCREEN })
    .toBuffer()
  if (!nav) return view

  const bar = await sharp(full)
    .extract({ left: 0, top: height - nav, width: SCREEN.width, height: nav })
    .toBuffer()
  return sharp(view)
    .composite([{ input: bar, left: 0, top: SCREEN.height - nav }])
    .toBuffer()
}

/**
 * One phone, `width` px wide, as a transparent PNG.
 * @param {Parameters<typeof viewport>[0]} screen
 * @param {number} width
 */
async function phone(screen, width) {
  const inset = Math.round(width * (FRAME.ring + FRAME.bezel))
  const ring = Math.round(width * FRAME.ring)
  const screenWidth = width - inset * 2
  const screenHeight = Math.round((screenWidth * SCREEN.height) / SCREEN.width)
  const height = screenHeight + inset * 2
  const radius = width * FRAME.radius

  const display = await sharp(await viewport(screen))
    .resize(screenWidth, screenHeight)
    .composite([
      {
        input: svg(
          screenWidth,
          screenHeight,
          `<rect width="${screenWidth}" height="${screenHeight}" rx="${radius - inset}"/>`,
        ),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()

  const notchWidth = width * FRAME.notchWidth
  const notchHeight = width * FRAME.notchHeight
  const notchRadius = width * FRAME.notchRadius
  const notchLeft = (width - notchWidth) / 2
  const notchBottom = inset + notchHeight

  const body = svg(
    width,
    height,
    `<defs><linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f1eadf"/><stop offset="0.5" stop-color="#cfc6b8"/><stop offset="1" stop-color="#ebe3d6"/>
    </linearGradient></defs>
    <rect width="${width}" height="${height}" rx="${radius}" fill="url(#ring)"/>
    <rect x="${ring}" y="${ring}" width="${width - ring * 2}" height="${height - ring * 2}" rx="${radius - ring}" fill="#0b0b0b"/>`,
  )
  const notch = svg(
    width,
    height,
    `<path fill="#0b0b0b" d="M${notchLeft} ${inset - 1}H${notchLeft + notchWidth}V${notchBottom - notchRadius}a${notchRadius} ${notchRadius} 0 0 1 ${-notchRadius} ${notchRadius}H${notchLeft + notchRadius}a${notchRadius} ${notchRadius} 0 0 1 ${-notchRadius} ${-notchRadius}Z"/>`,
  )

  const input = await sharp(body)
    .composite([{ input: display, left: inset, top: inset }, { input: notch }])
    .png()
    .toBuffer()
  return { input, width, height, radius }
}

/**
 * Phones on a plain board, each with a soft shadow.
 * @param {{ width: number, height: number, background: string, phones: (Parameters<typeof viewport>[0] & { width: number, left: number, top: number })[] }} board
 * @returns {Promise<Buffer>} PNG
 */
export async function phoneBoard({ width, height, background, phones }) {
  // Shadows may spill over the board: compose on a larger canvas, then crop.
  const margin = Math.ceil(Math.max(...phones.map((item) => item.width)) * 0.2)
  const layers = []
  for (const { width: phoneWidth, left, top, ...screen } of phones) {
    const device = await phone(screen, phoneWidth)
    const blur = phoneWidth * 0.05
    const pad = Math.ceil(blur * 3)
    const shadow = await sharp(
      svg(
        device.width + pad * 2,
        device.height + pad * 2,
        `<rect x="${pad}" y="${pad}" width="${device.width}" height="${device.height}" rx="${device.radius}" fill="#5e3c2c" fill-opacity="0.22"/>`,
      ),
    )
      .blur(blur)
      .png()
      .toBuffer()
    layers.push(
      {
        input: shadow,
        left: margin + left - pad,
        top: margin + top - pad + Math.round(phoneWidth * 0.045),
      },
      { input: device.input, left: margin + left, top: margin + top },
    )
  }

  const canvas = await sharp({
    create: { width: width + margin * 2, height: height + margin * 2, channels: 3, background },
  })
    .composite(layers)
    .png()
    .toBuffer()
  return sharp(canvas).extract({ left: margin, top: margin, width, height }).png().toBuffer()
}
