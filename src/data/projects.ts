import { responsiveImage } from '@/lib/responsive-image'
import type { Project } from '@/types/project'

/** Card artwork size (217:235 ratio). */
const VISUAL = { width: 868, height: 940 } as const

/**
 * Selected projects, in display order. Static for now: swap this export for an
 * API call later without touching the components.
 */
export const projects: Project[] = [
  {
    slug: 'exmed',
    title: 'EXMED DA OPO PHONO',
    category: 'UI & UX Design',
    description: 'Refonte et création de logo',
    image: responsiveImage(
      'project-exmed',
      [434, 868],
      VISUAL,
      'Accueil de DA OPO PHONO : cartes des applications DA OPO PHONO et CONTRAT PHONO sur fond violet.',
    ),
    href: '/projects/exmed',
  },
  {
    slug: 'ste-soeurs',
    title: 'Ste SŒURS',
    category: 'UI Design',
    description: 'Refonte UI du portail SACEM',
    image: responsiveImage(
      'project-ste-soeurs',
      [434, 739],
      { width: 739, height: 800 },
      'Landing page du portail SACEM : logo, titre « SACEM Portal » et bouton « Log in ».',
    ),
    href: '/projects/ste-soeurs',
  },
]

/** Destination of "Voir tous les projets" until a projects page exists. */
export const allProjectsHref = '#projets'
