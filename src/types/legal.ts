/** A paragraph, or a bulleted list when an array. `[À compléter : …]` marks missing information. */
export type LegalBlock = string | string[]

export interface LegalSection {
  title: string
  body: LegalBlock[]
}

export interface LegalDocument {
  /** Route path, also the SEO key (see seo/data.ts `legalSeo`). */
  path: string
  title: string
  intro: string
  /** Last update, shown under the title. */
  updated: { label: string; iso: string }
  sections: LegalSection[]
}
