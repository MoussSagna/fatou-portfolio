import type { LucideIcon } from 'lucide-react'

/** Section anchors of the one-page landing. Keep in sync with <section id>. */
export type SectionId = 'accueil' | 'a-propos' | 'projets' | 'parcours' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export interface TabItem extends NavItem {
  icon: LucideIcon
}

export type SocialId = 'linkedin' | 'instagram' | 'behance' | 'dribbble'

export interface SocialLink {
  id: SocialId
  label: string
  href: string
}

export interface TextLink {
  label: string
  href: string
}

export interface SiteIdentity {
  name: string
  role: string
  email: string
  cvUrl: string
  introVideo: { url: string; duration: string }
  socials: SocialLink[]
  /** Footer signature, one entry per line (designed as three lines). */
  tagline: string[]
  legal: TextLink[]
}
