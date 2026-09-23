import { AppWindow, Feather, Layers, Play, Search, Users } from 'lucide-react'
import type { Skill } from '@/types/skills'

/** Skill tiles, in display order (3 × 2 grid on desktop). */
export const skills: Skill[] = [
  { id: 'ui-design', label: 'UI Design', icon: AppWindow },
  { id: 'ux-research', label: 'UX Research', icon: Search },
  { id: 'design-system', label: 'Design System', icon: Layers },
  { id: 'brand-design', label: 'Brand Design', icon: Feather },
  { id: 'prototyping', label: 'Prototyping', icon: Play },
  { id: 'user-testing', label: 'User Testing', icon: Users },
]
