import { responsiveImage } from '@/lib/responsive-image'
import type { CaseStudy, ProjectFact } from '@/types/project'
import { projects } from '../projects'

const sugarMap = projects.find((project) => project.slug === 'sugar-map')
if (!sugarMap) throw new Error('Project "sugar-map" missing from data/projects.ts')

/**
 * SugarMap case study. Every visual is a real export from
 * assets-src/projects/SUGAR-MAP (see docs/project-pages.md). The numbered
 * exports are the app screens, shown in phone mock-ups; `interface.png` is the
 * layout reference of the board and is not displayed. Copy only states what
 * the exports show: no client, year or result was provided.
 */

/** Board colour of the presentation exports. */
const BOARD = '#fcf7ee'

/** App screen, 390 px wide (export margins cropped by scripts/optimize-images.mjs). */
const screen = (name: string, height: number, alt: string) =>
  responsiveImage(`sugarmap-${name}`, [390], { width: 390, height }, alt)

const image = {
  hero: responsiveImage(
    'sugarmap-hero',
    [960, 1440, 2160],
    { width: 2160, height: 1200 },
    'Trois écrans de SugarMap dans des iPhone : l’écran de lancement « Sugar Map — Découvrir des desserts près de vous », l’onboarding « Bievenue » et l’accueil avec ses sélections de desserts.',
  ),
  identity: responsiveImage(
    'sugarmap-identity',
    [960, 1280],
    { width: 1280, height: 508 },
    'Identité visuelle de SugarMap : logo dont le G est un donut, cinq couleurs (vert d’eau, beige, pêche, rose, crème) et typographies Poppins Bold et Montserrat Regular.',
  ),
  designSystem: responsiveImage(
    'sugarmap-design-system',
    [720, 1055],
    { width: 1055, height: 805 },
    'Design system de SugarMap : boutons en trois tailles et quatre styles, chips, barre de navigation dans ses quatre états, champs de texte et icônes favoris.',
  ),
  ai: responsiveImage(
    'sugarmap-ai',
    [960, 1280],
    { width: 1280, height: 794 },
    'À gauche, l’écran de fiche boutique généré par Stitch ; à droite, le même écran retravaillé sur Figma aux couleurs de SugarMap.',
  ),
  onboarding: screen(
    'onboarding',
    844,
    'Onboarding : illustration d’un donut, « Bievenue », « Le Google Maps des desserts — SugarMap vous montre les meilleurs desserts autour de vous » et bouton « Suivant ».',
  ),
  home: screen(
    'home',
    1632,
    'Accueil : recherche et sélections de desserts « Découvertes », « Tendances du moment », « Healthy & Vegan » et « Saveurs acidulées », barre de navigation en bas.',
  ),
  shop: screen(
    'shop',
    1279,
    'Fiche de la boutique Rolls : photos, note 4,6/5, adresse, boutons « Itinéraire » et « Appeler », horaires détaillés et contact, barre de navigation en bas.',
  ),
  favorites: screen(
    'favorites',
    949,
    'Favoris : recherche, onglets Boutiques et Desserts, cartes des boutiques Puffy Cookies et Rolls, barre de navigation en bas.',
  ),
  filters: screen(
    'filters',
    1059,
    'Filtres : type de desserts, envies du moment, tarif, distance et notes.',
  ),
  route: screen(
    'route',
    944,
    'Itinéraire : prochaine direction sur la carte, temps de trajet par mode de transport, distance totale, trafic, heure d’arrivée et bouton « Démarrer l’itinéraire », barre de navigation en bas.',
  ),
  map: screen(
    'map',
    884,
    'Carte : recherche, filtres et boutiques Rolls, Pâtisserie Azure et Glace Royale épinglées sur le plan, barre de navigation en bas.',
  ),
}

const facts: ProjectFact[] = [
  { label: 'Projet', value: 'Application mobile' },
  { label: 'Rôle', value: 'UI/UX Designer' },
  { label: 'Catégorie', value: 'UI Design' },
  { label: 'Outils', value: 'Stitch · Figma' },
]

export const sugarMapCaseStudy: CaseStudy = {
  slug: 'sugar-map',
  chapterNumbers: false,
  hero: {
    layout: 'wide',
    titleLines: ['Sugar', 'Map'],
    subtitle: 'Le Google Maps des desserts',
    facts,
    // Screens 0, 1 and 2.2 in phones.
    image: image.hero,
    fullImage: true,
    // Card visual (one phone): three phones are too small on a phone screen.
    imageMobile: sugarMap.image,
  },
  sections: [
    {
      kind: 'intro',
      id: 'le-projet',
      label: 'Le projet',
      statement: { text: 'Découvrir des desserts', accent: 'près de vous' },
      body: [
        'SugarMap est une application mobile qui montre les meilleurs desserts autour de vous.',
        'Une carte des boutiques, des sélections par envie, des favoris, des filtres et un itinéraire jusqu’à la pâtisserie choisie.',
      ],
    },
    {
      kind: 'feature',
      id: 'identite',
      label: 'Identité visuelle',
      title: { text: 'Identité', accent: 'visuelle' },
      body: [
        'Un logo gourmand dont le « G » devient un donut, une palette de couleurs douces et deux typographies : Poppins Bold et Montserrat Regular.',
      ],
      figures: [
        {
          layout: 'wide',
          items: [{ image: image.identity, caption: 'Logo, couleurs et typographie' }],
        },
      ],
    },
    {
      kind: 'feature',
      id: 'ia-et-outils',
      label: 'IA et outils',
      title: { text: 'De Stitch', accent: 'à Figma' },
      tinted: true,
      body: ['Un premier écran généré par Stitch, puis retravaillé sur Figma.'],
      figures: [
        {
          layout: 'wide',
          items: [
            {
              image: image.ai,
              caption: 'Fiche boutique : écran généré par Stitch, écran retravaillé sur Figma',
              zoomable: true,
            },
          ],
        },
      ],
    },
    {
      kind: 'feature',
      id: 'design-system',
      label: 'Composants',
      title: { text: 'Design', accent: 'System' },
      body: [
        'Boutons, chips, barre de navigation, champs de texte et icônes : les composants de l’application et leurs états.',
      ],
      figures: [
        {
          layout: 'inset',
          items: [
            {
              image: image.designSystem,
              caption: 'Button, chip, nav bar, text field et icons',
              zoomable: true,
            },
          ],
        },
      ],
    },
    {
      kind: 'feature',
      id: 'interface',
      label: 'UI Design',
      title: { text: 'Interface' },
      body: [
        'Les écrans de SugarMap : onboarding, accueil, fiche boutique, favoris, filtres, itinéraire et carte.',
      ],
      figures: [],
      // Composition of interface.png: five staggered columns (1, 2, 1, 2, 1 phones),
      // the outer ones cropped by the board. Listed in the order of the exports.
      board: {
        surface: BOARD,
        screens: [
          {
            id: 'onboarding',
            image: image.onboarding,
            caption: 'Onboarding',
            position: { left: 39.26, top: 18 },
          },
          {
            id: 'home',
            image: image.home,
            caption: 'Accueil',
            offset: 40,
            nav: 80,
            position: { left: 65.92, top: -25.8 },
          },
          {
            id: 'shop',
            image: image.shop,
            caption: 'Fiche boutique',
            offset: 250,
            nav: 80,
            position: { left: 65.92, top: 55.1 },
          },
          {
            id: 'favorites',
            image: image.favorites,
            caption: 'Favoris',
            offset: 72,
            nav: 78,
            position: { left: 12.6, top: 55.1 },
          },
          {
            id: 'filters',
            image: image.filters,
            caption: 'Filtres',
            position: { left: -10.7, top: 17.7 },
          },
          {
            id: 'route',
            image: image.route,
            caption: 'Itinéraire',
            offset: 76,
            nav: 80,
            position: { left: 89.22, top: 15.4 },
          },
          {
            id: 'map',
            image: image.map,
            caption: 'Carte',
            offset: 40,
            nav: 78,
            position: { left: 12.6, top: -25.8 },
          },
        ],
      },
    },
    {
      kind: 'facts',
      id: 'informations',
      label: 'Informations',
      facts,
    },
  ],
  conclusion: {
    quote:
      'Une application mobile gourmande, de l’identité visuelle aux écrans, pour trouver les meilleurs desserts autour de soi.',
    cta: 'Voir les autres projets',
  },
}
