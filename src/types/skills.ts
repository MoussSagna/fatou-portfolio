import type { LucideIcon } from 'lucide-react'

export interface Skill {
  id: string
  label: string
  icon: LucideIcon
}

export interface Tool {
  id: string
  name: string
  /** URL of the official logo (self-hosted SVG). */
  logo: string
}
