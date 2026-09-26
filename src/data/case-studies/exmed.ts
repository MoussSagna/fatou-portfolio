import { responsiveImage } from '@/lib/responsive-image'
import type { CaseStudy, ProjectFact } from '@/types/project'
import { projects } from '../projects'

const exmed = projects.find((project) => project.slug === 'exmed')
if (!exmed) throw new Error('Project "exmed" missing from data/projects.ts')

/**
 * EXMED DA OPO PHONO case study. Every visual is a real export from
 * assets-src/projects/EXMED (cropped by scripts/optimize-images.mjs); no
 * moodboard, wireframe, Maze or before/after visual exists yet, so those
 * steps are typographic only (see docs/project-pages.md).
 */

const image = {
  home: responsiveImage(
    'exmed-home',
    [960, 1440],
    { width: 1440, height: 1119 },
    'Accueil de DA OPO PHONO by Exmed : titre « Nos applications » et cartes DA OPO PHONO et CONTRAT PHONO sur fond violet.',
  ),
  list: responsiveImage(
    'exmed-list',
    [960, 1440],
    { width: 1440, height: 1000 },
    'Écran « Demandes d’autorisations » : tableau des DA avec statuts Prête, Annulée, Verrouillée et Créée, barre d’actions et pagination.',
  ),
  detail: responsiveImage(
    'exmed-detail',
    [760, 1453],
    { width: 1453, height: 1543 },
    'Écran « DA N° 396059 » : ligne dépliée avec les données déclarées de l’œuvre, les données de documentation, la recherche personnalisée CISAC / SACEM et le choix Ide12.',
  ),
  logoLight: responsiveImage(
    'exmed-logo-light',
    [568],
    { width: 568, height: 254 },
    'Logo EXMED Media Exploration, version blanche sur fond noir.',
  ),
  logoDark: responsiveImage(
    'exmed-logo-dark',
    [568],
    { width: 568, height: 240 },
    'Logo EXMED Media Exploration, version noire.',
  ),
  logoGradient: responsiveImage(
    'exmed-logo-gradient',
    [568],
    { width: 568, height: 240 },
    'Logo EXMED Media Exploration, version en dégradé bleu et violet.',
  ),
  docFoundations: responsiveImage(
    'exmed-doc-foundations',
    [960, 1436],
    { width: 1436, height: 1203 },
    'Documentation Exmed : listes, champs de texte (états normal, survol, focus, erreur, désactivé), boutons et icônes d’actions.',
  ),
  docStates: responsiveImage(
    'exmed-doc-states',
    [690],
    { width: 690, height: 660 },
    'Documentation Exmed : boutons radio, chips de statut et cases à cocher, avec leurs états.',
  ),
  docCards: responsiveImage(
    'exmed-doc-cards',
    [960, 1410],
    { width: 1410, height: 750 },
    'Documentation Exmed : cartes d’applications DA OPO PHONO, CONTRAT PHONO et deux cartes de services.',
  ),
  docTables: responsiveImage(
    'exmed-doc-tables',
    [960, 1410],
    { width: 1410, height: 1098 },
    'Documentation Exmed : en-têtes et lignes du tableau « Liste des DA », états par défaut, survol et sélection.',
  ),
  docAlerts: responsiveImage(
    'exmed-doc-alerts',
    [960, 1410],
    { width: 1410, height: 488 },
    'Documentation Exmed : alertes de réconciliation automatique, de succès d’export, d’erreur et d’information.',
  ),
}

const facts: ProjectFact[] = [
  { label: 'Client', value: 'SACEM' },
  { label: 'Rôle', value: 'UI/UX Designer' },
  { label: 'Année', value: '2024' },
  { label: 'Catégorie', value: 'UI Design & UX Design' },
]

export const exmedCaseStudy: CaseStudy = {
  slug: 'exmed',
  chapterNumbers: false,
  hero: {
    layout: 'wide',
    titleLines: ['EXMED', 'DA OPO PHONO'],
    subtitle: 'Refonte et création de logo',
    facts,
    image: image.home,
    // Card crop of the same home screen: the two application cards, large on phones.
    imageMobile: exmed.image,
  },
  sections: [
    {
      kind: 'intro',
      id: 'le-projet',
      label: 'Le projet',
      statement: {
        text: 'Identifier les usages déclarés pour mieux accompagner les processus métiers liés',
        accent: 'aux droits d’auteur.',
      },
      body: [
        'EXMED est un outil d’identification assistée et de qualification manuelle utilisé par les équipes métiers.',
        'Il leur permet de réaliser une partie de leur processus métier, avec un objectif principal : identifier les usages déclarés.',
        'Autrement dit, retrouver l’œuvre correspondant à une chanson, afin de déterminer ensuite les éléments nécessaires à la facturation des droits d’auteur.',
      ],
    },
    {
      kind: 'flow',
      id: 'besoin',
      label: 'Le contexte métier',
      title: { text: 'Comprendre', accent: 'le besoin.' },
      body: [
        'EXMED peut s’insérer dans plusieurs processus métiers nécessitant l’identification des usages déclarés en vue d’une facturation des droits d’auteur.',
      ],
      steps: [
        { label: 'Usage déclaré' },
        { label: 'Identification de l’œuvre', highlight: true },
        { label: 'Qualification', highlight: true },
        { label: 'Processus de facturation' },
      ],
      highlightLabel: 'Identification assistée et qualification manuelle : le rôle d’EXMED',
      note: 'Représentation simplifiée du processus métier.',
    },
    {
      kind: 'feature',
      id: 'identite',
      label: 'Identité visuelle',
      title: { text: 'Refonte et', accent: 'création de logo.' },
      body: [
        'Création d’un moodboard afin de définir l’univers visuel et les inspirations du projet.',
        'Conception du nouveau logo sur Illustrator, en proposant deux pistes graphiques.',
      ],
      figures: [
        {
          layout: 'feature',
          items: [
            { image: image.logoLight, surface: '#1d1d1b', caption: 'Version sur fond noir' },
            { image: image.logoDark, surface: '#ffffff', caption: 'Version noire' },
            { image: image.logoGradient, surface: '#ffffff', caption: 'Version dégradé' },
          ],
        },
      ],
    },
    {
      kind: 'notes',
      id: 'exploration',
      label: 'Moodboard et wireframes',
      tinted: true,
      items: [
        {
          index: '01',
          title: 'Moodboard',
          body: [
            'Une première phase d’exploration visuelle permet de définir l’univers graphique et les inspirations du projet.',
          ],
        },
        {
          index: '02',
          title: 'Wireframes',
          body: [
            'Réalisation de wireframes pour clarifier la hiérarchie des informations et fluidifier le parcours.',
          ],
        },
      ],
    },
    {
      kind: 'feature',
      id: 'interface',
      index: '03',
      label: 'UI Design',
      title: { text: 'Interface' },
      body: [
        'Les écrans de DA OPO PHONO : l’accueil des applications, la liste des demandes d’autorisation et le détail d’une demande, accompagnés de la documentation des composants.',
      ],
      figures: [
        {
          layout: 'wide',
          items: [
            {
              image: image.list,
              caption: 'Liste des demandes d’autorisation (DA)',
              zoomable: true,
            },
          ],
        },
        {
          layout: 'feature',
          items: [
            {
              image: image.detail,
              caption: 'Détail d’une DA : données déclarées et données de documentation',
              zoomable: true,
            },
            {
              image: image.docStates,
              caption: 'Radio, chips de statut et cases à cocher',
              zoomable: true,
            },
            { image: image.docCards, caption: 'Cartes d’applications', zoomable: true },
          ],
        },
        {
          layout: 'inset',
          items: [
            {
              image: image.docFoundations,
              caption: 'Documentation : listes, champs de texte, boutons et icônes',
              zoomable: true,
            },
          ],
        },
        {
          layout: 'pair',
          items: [
            { image: image.docTables, caption: 'Tableaux et leurs états', zoomable: true },
            { image: image.docAlerts, caption: 'Alertes et messages de retour', zoomable: true },
          ],
        },
      ],
    },
    {
      kind: 'notes',
      id: 'validation',
      label: 'Prototype et itérations',
      items: [
        {
          index: '04',
          title: 'Prototype',
          body: ['Prototype interactif testé via Maze afin d’identifier les points de friction.'],
          toolId: 'maze',
        },
        {
          index: '05',
          title: 'Itérations',
          body: [
            'Itérations suite aux retours utilisateurs.',
            'Tester, recueillir les retours, ajuster les écrans, puis tester à nouveau.',
          ],
        },
      ],
    },
    {
      kind: 'steps',
      id: 'processus',
      label: 'Récapitulatif',
      title: { text: 'Le', accent: 'processus.' },
      steps: [
        { label: 'Moodboard', body: 'Définition de l’univers visuel et des inspirations.' },
        { label: 'Logo', body: 'Conception du nouveau logo avec deux pistes graphiques.' },
        {
          label: 'Wireframes',
          body: 'Clarification de la hiérarchie des informations et du parcours.',
        },
        { label: 'Prototype', body: 'Prototype interactif testé via Maze.' },
        { label: 'Itérations', body: 'Évolution de la conception suite aux retours utilisateurs.' },
      ],
    },
    {
      kind: 'tools',
      chapter: {
        label: 'Logiciels',
        title: { text: 'Outils' },
        body: [],
        toolIds: ['figma', 'maze', 'illustrator'],
        notes: {
          figma: 'Outil principal de conception',
          maze: 'Tests du prototype',
          illustrator: 'Conception du logo',
        },
      },
    },
    {
      kind: 'facts',
      id: 'informations',
      label: 'Informations',
      facts: [
        ...facts,
        { label: 'Outils', value: 'Figma · Maze · Illustrator' },
        { label: 'Livrable', value: 'Refonte et création de logo' },
      ],
    },
  ],
  conclusion: {
    quote:
      'Un projet mêlant compréhension métier, recherche visuelle, conception d’interface et prototypage.',
    body: 'De l’exploration de l’identité visuelle aux itérations sur l’expérience, chaque étape a contribué à construire une solution adaptée aux besoins du métier.',
    cta: 'Voir les autres projets',
  },
}
