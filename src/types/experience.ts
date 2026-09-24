import type { LucideIcon } from 'lucide-react'

export interface Experience {
  id: string
  /** Start year. */
  start: number
  /** End year, or null for the current position ("Aujourd’hui"). */
  end: number | null
  role: string
  /** Company or context (Freelance, Studio créatif…). */
  company: string
  description: string
  icon: LucideIcon
}
