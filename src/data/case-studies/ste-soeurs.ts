import { responsiveImage } from '@/lib/responsive-image'
import type { CaseStudy, ProjectFact } from '@/types/project'

/**
 * Ste SŒURS case study. Every visual is a real export from
 * assets-src/projects/STE-SOEURS (cropped by scripts/optimize-images.mjs).
 * No screen of the former portal and no mobile mock-up exist, so there is no
 * before / after and the modularity section is typographic
 * (see docs/project-pages.md).
 */

const image = {
  landing: responsiveImage(
    'ste-landing',
    [960, 1440],
    { width: 1440, height: 800 },
    'Landing page du portail SACEM : « Welcome to the collective management organization », titre « SACEM Portal », bouton « Log in » et photo d’une personne au casque audio.',
  ),
  setlists: responsiveImage(
    'ste-setlists',
    [960, 1600, 2880],
    { width: 2880, height: 1960 },
    'Écran « Setlists » : filtres, onglets Submitted / Draft et liste de dix programmes avec leur numéro, leur nombre d’œuvres et leurs actions.',
  ),
  declare: responsiveImage(
    'ste-declare',
    [800, 1488, 2976],
    { width: 2976, height: 5048 },
    'Écran « Report a live performance », étape 2 : recherche d’œuvres, formulaire d’ajout d’une œuvre non référencée, panneau « My setlist » et résultats de recherche.',
  ),
  forms: responsiveImage(
    'ste-doc-forms',
    [720],
    { width: 720, height: 1470 },
    'Documentation : champs de formulaire dans les états Default, Focus, Filling, Valide et Hover valide.',
  ),
  buttons: responsiveImage(
    'ste-doc-buttons',
    [680, 1353],
    { width: 1353, height: 2100 },
    'Documentation : boutons en état par défaut et au survol (Log in, Create a setlist, Check my setlists, Check events…).',
  ),
  switchStepper: responsiveImage(
    'ste-doc-switch-stepper',
    [720],
    { width: 720, height: 980 },
    'Documentation : switch Submitted / Drafts et stepper en trois étapes.',
  ),
  datepicker: responsiveImage(
    'ste-doc-datepicker',
    [720],
    { width: 720, height: 1090 },
    'Documentation : date picker avec sélection d’une plage de dates.',
  ),
  lists: responsiveImage(
    'ste-doc-lists',
    [1245, 2490],
    { width: 2490, height: 860 },
    'Documentation : lignes de liste des programmes, avec actions ou bouton « Finalize ».',
  ),
  alerts: responsiveImage(
    'ste-doc-alerts',
    [1245, 2490],
    { width: 2490, height: 830 },
    'Documentation : alertes et confirmations (erreur, succès, confirmation d’annulation, case à cocher).',
  ),
  typography: responsiveImage(
    'ste-doc-typography',
    [725],
    { width: 725, height: 470 },
    'Documentation : graisses typographiques Bold 700, SemiBold 600, Medium 500 et Regular 400.',
  ),
}

const facts: ProjectFact[] = [
  { label: 'Client', value: 'SACEM' },
  { label: 'Rôle', value: 'UI/UX Designer' },
  { label: 'Année', value: '2023' },
  { label: 'Catégorie', value: 'UI Design' },
  { label: 'Outil', value: 'Figma' },
]

export const steSoeursCaseStudy: CaseStudy = {
  slug: 'ste-soeurs',
  chapterNumbers: false,
  hero: {
    layout: 'wide',
    titleLines: ['Ste', 'Sœurs'],
    subtitle: 'Refonte UI du portail SACEM',
    facts,
    // The landing page, whole (the home card shows its left part).
    image: image.landing,
    fullImage: true,
  },
  sections: [
    {
      kind: 'intro',
      id: 'le-projet',
      label: 'Le projet',
      statement: { text: 'Un portail pour les', accent: 'organismes de gestion collective.' },
      body: [
        'Ste SŒURS est un portail destiné aux organismes de gestion collective. Il permet notamment de déclarer les dates d’événements et de saisir la liste des œuvres présentées lors de ces événements.',
        'Les sociétés sœurs de la SACEM exercent des activités équivalentes à l’étranger, ce qui nécessite une interface suffisamment modulable pour répondre à différents contextes.',
      ],
      figure: { image: image.setlists, caption: 'Liste des programmes (setlists)', zoomable: true },
    },
    {
      kind: 'issues',
      id: 'besoin',
      label: 'Problématique',
      title: { text: 'Le', accent: 'besoin' },
      lead: 'Le portail existant présentait plusieurs limites.',
      items: [
        {
          keyword: 'Expérience',
          text: 'Une expérience utilisateur incohérente entre les différentes pages : landing page, déclaration des dates, déclaration des programmes.',
        },
        {
          keyword: 'Identité',
          text: 'Une identité visuelle vieillissante, non alignée avec les standards actuels de la SACEM et de ses sociétés sœurs.',
        },
        {
          keyword: 'UI',
          text: 'Des composants UI non harmonisés : boutons, champs, tableaux, espacements.',
        },
        {
          keyword: 'Design System',
          text: 'L’absence de design system structuré, compliquant la maintenance et l’évolution du produit.',
        },
      ],
    },
    {
      kind: 'statement',
      id: 'objectif',
      label: 'L’objectif',
      quote: {
        text: 'Moderniser l’UI pour rendre le portail plus simple,',
        accent: 'efficace et agréable à utiliser.',
      },
      body: 'Créer un design system réutilisable pour faciliter la cohérence, la maintenance et l’évolution du produit.',
    },
    {
      kind: 'feature',
      id: 'interface',
      label: 'UI Design',
      title: { text: 'La nouvelle', accent: 'interface' },
      body: [
        'La landing page du portail et la déclaration d’un programme : recherche d’œuvres, ajout d’une œuvre non référencée et constitution de la setlist.',
      ],
      figures: [
        {
          layout: 'feature',
          items: [
            {
              image: image.declare,
              caption: 'Déclarer un programme : ajout d’une œuvre non référencée',
              zoomable: true,
            },
            { image: image.landing, caption: 'Landing page', zoomable: true },
          ],
        },
      ],
    },
    {
      kind: 'feature',
      id: 'design-system',
      label: 'Composants',
      title: { text: 'Design', accent: 'System' },
      tinted: true,
      body: [
        'Un design system réutilisable a été pensé pour harmoniser les composants et faciliter l’évolution du produit.',
        'Les composants ont été adaptés afin de créer une expérience plus cohérente entre les différentes pages du portail.',
      ],
      figures: [
        {
          layout: 'feature-reverse',
          items: [
            { image: image.datepicker, caption: 'Date picker', zoomable: true },
            { image: image.switchStepper, caption: 'Switch et stepper', zoomable: true },
            { image: image.typography, caption: 'Typographie', zoomable: true },
          ],
        },
        {
          layout: 'wide',
          items: [{ image: image.alerts, caption: 'Alertes et confirmations', zoomable: true }],
        },
      ],
      subsections: [
        {
          id: 'harmonisation',
          title: { text: 'Harmoniser', accent: 'l’expérience' },
          body: [
            'Des composants UI non harmonisés étaient l’une des limites du portail : boutons, champs et listes sont désormais réunis dans la documentation du portail.',
          ],
          keywords: ['Boutons', 'Champs', 'Listes'],
          figures: [
            {
              layout: 'feature',
              items: [
                {
                  image: image.buttons,
                  label: 'Boutons',
                  caption: 'Default et hover',
                  zoomable: true,
                },
                {
                  image: image.forms,
                  label: 'Champs',
                  caption: 'Default, focus, saisie, valide',
                  zoomable: true,
                },
              ],
            },
            {
              layout: 'wide',
              items: [
                {
                  image: image.lists,
                  label: 'Listes',
                  caption: 'Lignes de programmes et leurs actions',
                  zoomable: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      kind: 'statement',
      id: 'modularite',
      label: 'Modularité',
      title: 'Un portail pensé pour différents contextes',
      quote: {
        text: 'Les sociétés sœurs de la SACEM exercent des activités équivalentes à l’étranger,',
        accent: 'ce qui nécessite un portail modulable.',
      },
      align: 'left',
      tinted: true,
    },
    {
      kind: 'steps',
      id: 'processus',
      label: 'Process',
      title: { text: 'Le', accent: 'processus' },
      steps: [
        {
          label: 'Analyse de l’existant',
          body: 'Identification des limites du portail : expérience, identité visuelle, composants, design system.',
        },
        {
          label: 'Harmonisation UI',
          body: 'Harmonisation des composants : boutons, champs, listes.',
        },
        {
          label: 'Conception du design system',
          body: 'Documentation de composants réutilisables et de leurs états.',
        },
        {
          label: 'Refonte des interfaces',
          body: 'Landing page, liste des programmes et déclaration d’un programme.',
        },
      ],
    },
    {
      kind: 'tools',
      chapter: {
        label: 'Logiciel',
        title: { text: 'Outil' },
        body: [],
        toolIds: ['figma'],
        notes: { figma: 'Outil de conception' },
      },
    },
    {
      kind: 'facts',
      id: 'informations',
      label: 'Informations',
      facts: [...facts, { label: 'Livrable', value: 'Refonte UI du portail SACEM' }],
    },
  ],
  conclusion: {
    quote:
      'Une refonte centrée sur la cohérence, la simplicité d’utilisation et la création d’une base UI réutilisable.',
    body: 'Le travail combine modernisation de l’interface et structuration d’un langage visuel capable d’accompagner l’évolution du portail.',
    cta: 'Voir les autres projets',
  },
}
