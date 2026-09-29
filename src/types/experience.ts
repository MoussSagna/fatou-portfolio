import type { LucideIcon } from 'lucide-react'

export interface Experience {
  id: string
  /** Start year. */
  start: number
  /** End year, or null for the current position ("Aujourd’hui"). */
  end: number | null
  role: string
  /** Company or organisation. */
  company: string
  /** Optional one-line summary of the position. */
  description?: string
  /** Main tasks, shown as a short list. */
  missions?: string[]
  icon: LucideIcon
}
