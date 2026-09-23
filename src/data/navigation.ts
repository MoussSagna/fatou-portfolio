import { FolderOpen, House, Mail, Route } from 'lucide-react'
import type { NavItem, TabItem } from '@/types/site'

/** Desktop header links — order follows the mockup. */
export const primaryNav: NavItem[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
]

/** Mobile / tablet sticky bottom tab bar. */
export const tabNav: TabItem[] = [
  { id: 'accueil', label: 'Accueil', icon: House },
  { id: 'projets', label: 'Projets', icon: FolderOpen },
  { id: 'parcours', label: 'Parcours', icon: Route },
  { id: 'contact', label: 'Contact', icon: Mail },
]
