import { Footprints, Mountain, Music } from 'lucide-react'
import type { Experience } from '@/types/experience'

/**
 * Career timeline, most recent first. Static for now — shaped so it can be
 * served by an API / admin later (the icon would then become an icon key).
 */
export const experience: Experience[] = [
  {
    id: 'sacem',
    start: 2023,
    end: 2025,
    role: 'UI/UX Designer',
    company: 'SACEM',
    description: 'Création d’expériences utilisateur pour les solutions numériques de la Sacem.',
    missions: [
      'Analyse des besoins utilisateurs',
      'Création de wireframes et prototypes (Figma)',
      'Tests utilisateurs (scénarios, analyse, restitutions)',
      'Gestion et évolution du Design System',
      'Réalisation d’audits sur les parcours existants',
      'Collaboration avec équipes produit et développeurs',
    ],
    icon: Music,
  },
  {
    id: 'sonofsneakers',
    start: 2020,
    end: 2021,
    role: 'Webdesigner',
    company: 'SONOFSNEAKERS',
    missions: [
      'Création de l’arborescence du site',
      'Réalisation de maquette et prototype',
      'Création de supports de communication',
    ],
    icon: Footprints,
  },
  {
    id: 'team-trail-ouzbek',
    start: 2019,
    end: 2020,
    role: 'Webdesigner',
    company: 'Association Team Trail Ouzbek',
    missions: [
      'Création de l’arborescence du site',
      'Respect du cahier des charges',
      'Création du site avec WordPress',
      'Optimisation du référencement (SEO)',
      'Refonte du logo',
    ],
    icon: Mountain,
  },
]
