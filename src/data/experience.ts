import { BriefcaseBusiness, GraduationCap, Rocket } from 'lucide-react'
import type { Experience } from '@/types/experience'

/**
 * Career timeline, most recent first. Static for now — shaped so it can be
 * served by an API / admin later (the icon would then become an icon key).
 */
export const experience: Experience[] = [
  {
    id: 'freelance',
    start: 2023,
    end: null,
    role: 'UI/UX Designer',
    company: 'Freelance',
    description:
      'Accompagnement de marques et startups sur leurs produits digitaux (UI/UX, branding, stratégie).',
    icon: GraduationCap,
  },
  {
    id: 'studio',
    start: 2022,
    end: 2023,
    role: 'UI/UX Designer',
    company: 'Studio créatif',
    description:
      'Conception d’interfaces et de design systems pour des clients variés (web & mobile).',
    icon: BriefcaseBusiness,
  },
  {
    id: 'agence',
    start: 2021,
    end: 2022,
    role: 'Junior UI/UX Designer',
    company: 'Agence digitale',
    description:
      'Participation à la conception de sites web et applications mobiles, de la recherche utilisateur au prototype.',
    icon: Rocket,
  },
]
