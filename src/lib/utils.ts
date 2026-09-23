import { createCn } from 'cn/config'

/**
 * Class joiner + Tailwind conflict resolver. Custom font-size tokens from
 * styles/globals.css must be declared here, otherwise `text-display` would be
 * mistaken for a text colour and dropped next to `text-ink`.
 */
export const cn = createCn({
  extend: {
    classGroups: { 'font-size': [{ text: ['display', 'h2', 'h3', 'lead', 'eyebrow'] }] },
  },
})
