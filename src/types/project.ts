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

export interface CaseStudy {
  /** Matches `Project.slug`: title, category and card visual come from there. */
  slug: string
  hero: {
    tagline: AccentText
    description: string
    tags: string[]
    meta: ProjectMeta[]
    image: ResponsiveImage
  }
  /** Context, problem, solution… in reading order. */
  story: StoryChapter[]
  process: ChapterText & { steps: ProcessStep[] }
  /** Final screens: first row sits next to the text, then one or two visuals per row. */
  showcase: ChapterText & { rows: ProjectMedia[][] }
  tools: ChapterText & { toolIds: string[] }
  conclusion: { quote: string; cta: string }
}
