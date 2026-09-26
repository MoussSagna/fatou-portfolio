import type { LucideIcon } from 'lucide-react'

/** Responsive image served in two modern formats. */
export interface ResponsiveImage {
  /** `srcset` strings, e.g. "a-434.avif 434w, a-868.avif 868w". */
  avif: string
  webp: string
  /** Fallback `src`. */
  src: string
  width: number
  height: number
  alt: string
}

export interface Project {
  /** Stable id, also the case study route segment (/projects/:slug). */
  slug: string
  title: string
  /** Short type label shown as eyebrow ("Application mobile"…). */
  category: string
  description: string
  image: ResponsiveImage
  /** Card destination: the case study route, or the section until the page exists. */
  href: string
}

/* ------------------------------------------------------------------ */
/* Case study (project detail page) — see docs/project-pages.md        */
/* ------------------------------------------------------------------ */

/** Text whose ending is set in terracotta ("Moins chercher, *mieux regarder.*"). */
export interface AccentText {
  text: string
  accent?: string
}

/**
 * A visual slot. `placeholder` marks a screen still to be exported: it renders
 * a neutral device composition labelled "visuel à venir", never a fake screen.
 */
export type ProjectMedia =
  | { kind: 'image'; image: ResponsiveImage; caption?: string }
  | { kind: 'placeholder'; label: string; screens: 1 | 2 | 3 }

/** Shared heading of every case study chapter. */
export interface ChapterText {
  /** Short label after the chapter number ("Contexte"). */
  label: string
  title: AccentText
  body: string[]
  /** Optional closing line set in bold (key question, takeaway). */
  highlight?: string
}

/** One idea = one text block + one large visual. Layout alternates automatically. */
export interface StoryChapter extends ChapterText {
  id: string
  media: ProjectMedia
}

export interface ProcessStep {
  label: string
  icon: LucideIcon
}

export interface ProjectMeta {
  label: string
  icon: LucideIcon
}

/** "CLIENT — SACEM": a labelled project fact (hero, information block). */
export interface ProjectFact {
  label: string
  value: string
}

/** Two-column opening: title, tagline, tags and the visual side by side (Poppy). */
export interface SplitHero {
  layout?: 'split'
  tagline: AccentText
  description: string
  tags: string[]
  meta: ProjectMeta[]
  image: ResponsiveImage
}

/** Editorial opening: title lines, subtitle, facts row, then a very large visual (EXMED). */
export interface WideHero {
  layout: 'wide'
  /** Title split into display lines ("EXMED", "DA OPO PHONO"). */
  titleLines: string[]
  subtitle: string
  facts: ProjectFact[]
  image: ResponsiveImage
  /** Portrait crop of the same visual for phones (< 640 px), where 16:10 is too small. */
  imageMobile?: ResponsiveImage
}

/**
 * A real visual shown at its natural ratio (never cropped), unlike
 * `ProjectMedia` which fills a fixed frame.
 */
export interface ProjectFigure {
  image: ResponsiveImage
  /** Visible caption under the visual. */
  caption?: string
  /**
   * Artwork on a tile (logos): the image is centred on this colour, which
   * must match the image background. Screens omit it and fill their frame.
   */
  surface?: string
  /** Screens only: the visual opens full size on click (dense UI stays legible). */
  zoomable?: boolean
}

/** How a group of figures is laid out. */
export type FigureLayout =
  /** One visual across the content width. */
  | 'wide'
  /** One large visual + the others stacked beside it (first = large). */
  | 'feature'
  /** Same, large visual on the right. */
  | 'feature-reverse'
  /** Two visuals side by side, 5 / 7 columns. */
  | 'pair'
  /** One visual centred on a narrower column. */
  | 'inset'

export interface FigureGroup {
  layout: FigureLayout
  items: ProjectFigure[]
}

/** Editorial chapter with an optional big index ("03") and groups of real visuals. */
export interface FeatureSection {
  kind: 'feature'
  id: string
  /** Step number shown large before the title ("03"). */
  index?: string
  label: string
  title: AccentText
  body: string[]
  figures: FigureGroup[]
}

/** Two-column introduction: a short statement on the left, the description on the right. */
export interface IntroSection {
  kind: 'intro'
  id: string
  label: string
  statement: AccentText
  body: string[]
}

/** Simplified business flow, one large line per step. */
export interface FlowSection {
  kind: 'flow'
  id: string
  label: string
  title: AccentText
  body: string[]
  steps: { label: string; highlight?: boolean }[]
  /** Legend of the highlighted steps. */
  highlightLabel?: string
  /** Honesty note: what the diagram is (and is not). */
  note: string
}

/** Process steps without visuals, set as typography side by side. */
export interface NotesSection {
  kind: 'notes'
  id: string
  /** Accessible name of the block. */
  label: string
  tinted?: boolean
  items: { index: string; title: string; body: string[]; toolId?: string }[]
}

/** Numbered recap of the whole process. */
export interface StepsSection {
  kind: 'steps'
  id: string
  label: string
  title: AccentText
  steps: { label: string; body: string }[]
}

/** Minimal list of project facts. */
export interface FactsSection {
  kind: 'facts'
  id: string
  label: string
  facts: ProjectFact[]
}

export type ProcessChapter = ChapterText & { steps: ProcessStep[] }
/** Final screens: first row sits next to the text, then one or two visuals per row. */
export type ShowcaseChapter = ChapterText & { rows: ProjectMedia[][] }
export type ToolsChapter = ChapterText & {
  toolIds: string[]
  /** Optional role of each tool in the project, keyed by tool id. */
  notes?: Record<string, string>
}

/**
 * Page body, rendered in order. `story`, `process`, `showcase` and `tools`
 * are the numbered chapters of the original template; the other kinds are
 * editorial blocks.
 */
export type CaseStudySection =
  | { kind: 'story'; chapter: StoryChapter }
  | { kind: 'process'; chapter: ProcessChapter }
  | { kind: 'showcase'; chapter: ShowcaseChapter }
  | { kind: 'tools'; chapter: ToolsChapter }
  | IntroSection
  | FlowSection
  | FeatureSection
  | NotesSection
  | StepsSection
  | FactsSection

export interface CaseStudy {
  /** Matches `Project.slug`: title, category and card visual come from there. */
  slug: string
  hero: SplitHero | WideHero
  sections: CaseStudySection[]
  /** Numbers the template chapters "01.", "02."… (default true). */
  chapterNumbers?: boolean
  conclusion: { quote: string; body?: string; cta: string }
}
