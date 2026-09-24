import lumiere434Avif from '@/assets/images/project-lumiere-434.avif'
import lumiere434Webp from '@/assets/images/project-lumiere-434.webp'
import lumiere868Avif from '@/assets/images/project-lumiere-868.avif'
import lumiere868Webp from '@/assets/images/project-lumiere-868.webp'
import mindful434Avif from '@/assets/images/project-mindful-434.avif'
import mindful434Webp from '@/assets/images/project-mindful-434.webp'
import mindful868Avif from '@/assets/images/project-mindful-868.avif'
import mindful868Webp from '@/assets/images/project-mindful-868.webp'
import poppy434Avif from '@/assets/images/project-poppy-434.avif'
import poppy434Webp from '@/assets/images/project-poppy-434.webp'
import poppy868Avif from '@/assets/images/project-poppy-868.avif'
import poppy868Webp from '@/assets/images/project-poppy-868.webp'
import type { Project, ResponsiveImage } from '@/types/project'

/** Source artwork size (assets-src/projects/*.png). */
const VISUAL = { width: 868, height: 940 } as const

const visual = (
  small: [string, string],
  large: [string, string],
  alt: string,
): ResponsiveImage => ({
  avif: `${small[0]} 434w, ${large[0]} 868w`,
  webp: `${small[1]} 434w, ${large[1]} 868w`,
  src: large[1],
  ...VISUAL,
  alt,
})

/**
 * Selected projects, in display order. Static for now: swap this export for an
 * API call later without touching the components.
 */
export const projects: Project[] = [
  {
    slug: 'poppy',
    title: 'Poppy',
    category: 'Application mobile',
    description: 'Application de streaming movie & TV',
    image: visual(
      [poppy434Avif, poppy434Webp],
      [poppy868Avif, poppy868Webp],
      "Deux écrans de l'application Poppy : inscription et catalogue de films.",
    ),
    href: '/projects/poppy',
  },
  {
    slug: 'lumiere',
    title: 'Lumière',
    category: 'Plateforme web',
    description: 'Expérience e-commerce mode & lifestyle',
    image: visual(
      [lumiere434Avif, lumiere434Webp],
      [lumiere868Avif, lumiere868Webp],
      'Site Lumière sur ordinateur et mobile : page « Elevate your style » et collection.',
    ),
    href: '#projets',
  },
  {
    slug: 'mindful',
    title: 'Mindful',
    category: 'Application mobile',
    description: "Application bien-être et suivi d'objectifs",
    image: visual(
      [mindful434Avif, mindful434Webp],
      [mindful868Avif, mindful868Webp],
      "Deux écrans de l'application Mindful : objectifs du jour et accueil « Good Morning ».",
    ),
    href: '#projets',
  },
]

/** Destination of "Voir tous les projets" until a projects page exists. */
export const allProjectsHref = '#projets'
