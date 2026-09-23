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

export interface SocialLink {
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
}
