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
  /** Stable id, future route segment (/projets/:slug). */
  slug: string
  title: string
  /** Short type label shown as eyebrow ("Application mobile"…). */
  category: string
  description: string
  image: ResponsiveImage
  /** Case study link. Points to the section until project pages exist. */
  href: string
}
