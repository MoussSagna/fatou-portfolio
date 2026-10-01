import { FolderOpen, House, Mail, UserRound } from 'lucide-react'
import type { NavItem, TabItem } from '@/types/site'

/** Header + footer links — order follows the Home sections. */
export const primaryNav: NavItem[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
]

/** Mobile / tablet sticky bottom tab bar — same order as the Home sections. */
export const tabNav: TabItem[] = [
  { id: 'accueil', label: 'Accueil', icon: House },
  { id: 'a-propos', label: 'À propos', icon: UserRound },
  { id: 'projets', label: 'Projets', icon: FolderOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
]
