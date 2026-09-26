import {
  Lightbulb,
  MousePointerClick,
  PenTool,
  Search,
  Smartphone,
  Target,
  UserRound,
} from 'lucide-react'
import type { CaseStudy, CaseStudySection, StoryChapter } from '@/types/project'
import { projects } from '../projects'

const poppy = projects.find((project) => project.slug === 'poppy')
if (!poppy) throw new Error('Project "poppy" missing from data/projects.ts')

const story = (chapter: StoryChapter): CaseStudySection => ({ kind: 'story', chapter })

/**
 * Poppy case study. Copy is a first draft to validate; `placeholder` media are
 * slots for the final screen exports (see docs/project-pages.md).
 */
export const poppyCaseStudy: CaseStudy = {
  slug: 'poppy',
  hero: {
    tagline: { text: 'Moins chercher,', accent: 'mieux regarder.' },
    description:
      'Une application mobile de streaming de films et séries, pensée pour trouver rapidement quoi regarder et en profiter partout.',
    tags: ['UI/UX Design', 'Product Design', 'Mobile App'],
    meta: [
      { label: 'Projet personnel', icon: UserRound },
      { label: 'Application mobile', icon: Smartphone },
    ],
    image: poppy.image,
  },
  sections: [
    story({
      id: 'contexte',
      label: 'Contexte',
      title: { text: 'Des catalogues immenses,', accent: 'une soirée qui passe.' },
      body: [
        'Films, séries, documentaires : les plateformes n’ont jamais proposé autant de contenus. Pourtant, choisir quoi regarder reste souvent long et frustrant.',
      ],
      highlight: 'Comment aider chacun à trouver le bon programme, au bon moment ?',
      media: { kind: 'placeholder', label: 'Photo d’ambiance', screens: 1 },
    }),
    story({
      id: 'probleme',
      label: 'Le problème',
      title: { text: 'Une navigation qui fatigue', accent: 'avant même de commencer.' },
      body: [
        'Menus chargés, recommandations peu pertinentes, recherche laborieuse : les mêmes irritants reviennent d’une application à l’autre.',
        'Pour les spectateurs occasionnels comme pour les passionnés, le temps passé à chercher prend le pas sur le plaisir de regarder.',
      ],
      media: { kind: 'placeholder', label: 'Parcours et irritants', screens: 2 },
    }),
    story({
      id: 'solution',
      label: 'La solution',
      title: { text: 'Une expérience', accent: 'simple et personnelle.' },
      body: [
        'Poppy met le contenu au premier plan : une navigation claire, une recherche rapide et des recommandations qui s’adaptent aux goûts de chacun.',
        'Chaque écran est pensé pour le mobile : lisible d’une main, fluide, sans détour.',
      ],
      media: { kind: 'placeholder', label: 'Accueil et recommandations', screens: 3 },
    }),
    {
      kind: 'process',
      chapter: {
        label: 'Ma démarche',
        title: { text: 'Un processus centré', accent: 'sur l’utilisateur.' },
        body: [
          'De la compréhension des besoins au prototype interactif, chaque étape a nourri la suivante.',
        ],
        steps: [
          { label: 'Research', icon: Search },
          { label: 'Define', icon: Target },
          { label: 'Ideate', icon: Lightbulb },
          { label: 'Design', icon: PenTool },
          { label: 'Prototype', icon: MousePointerClick },
        ],
      },
    },
    {
      kind: 'showcase',
      chapter: {
        label: 'Le produit',
        title: { text: 'Du premier lancement', accent: 'au générique de fin.' },
        body: [
          'Onboarding, recherche, fiche film, bande-annonce, profil, abonnement et téléchargements : une interface cohérente sur tout le parcours.',
        ],
        rows: [
          [{ kind: 'placeholder', label: 'Onboarding et connexion', screens: 3 }],
          [
            { kind: 'placeholder', label: 'Accueil', screens: 2 },
            { kind: 'placeholder', label: 'Recherche', screens: 2 },
          ],
          [{ kind: 'placeholder', label: 'Fiche film et bande-annonce', screens: 3 }],
          [
            { kind: 'placeholder', label: 'Profil', screens: 2 },
            { kind: 'placeholder', label: 'Abonnement et téléchargements', screens: 2 },
          ],
        ],
      },
    },
    {
      kind: 'tools',
      chapter: {
        label: 'Outils utilisés',
        title: { text: 'Des outils pour donner vie aux idées.' },
        body: [],
        toolIds: ['figma', 'photoshop', 'illustrator', 'notion', 'miro'],
      },
    },
  ],
  conclusion: {
    quote:
      'Un projet qui m’a permis de repenser la découverte de contenus, en remettant le plaisir de regarder au centre.',
    cta: 'Voir les autres projets',
  },
}
