import { site } from '@/data/site'
import { person } from '@/seo/data'
import type { LegalDocument } from '@/types/legal'

/**
 * Legal pages. Only facts known from the project are stated (no form, no
 * cookie, no analytics, self-hosted fonts); anything else is a visible
 * `[À compléter : …]` placeholder to fill in before going live.
 */
const updated = { label: '29 septembre 2026', iso: '2026-09-29' }
const HOST = '[À compléter : nom, adresse et contact de l’hébergeur du site]'

export const privacyPolicy: LegalDocument = {
  path: '/confidentialite',
  title: 'Politique de confidentialité',
  intro:
    'Cette page explique quelles données peuvent être traitées lorsque vous consultez ce portfolio et quels sont vos droits.',
  updated,
  sections: [
    {
      title: 'Responsable du site',
      body: [
        `Ce site est le portfolio de ${person.name}, ${person.jobTitle}. Pour toute question relative à vos données, vous pouvez écrire à ${site.email}.`,
      ],
    },
    {
      title: 'Données collectées',
      body: [
        'Ce site ne comporte ni formulaire, ni espace membre, ni outil de mesure d’audience. Aucune donnée personnelle n’est collectée directement par le site.',
      ],
    },
    {
      title: 'Prise de contact par e-mail',
      body: [
        'Le bouton « Me contacter » ouvre votre propre messagerie. Si vous envoyez un e-mail, les informations qu’il contient (votre adresse e-mail, votre nom et le contenu du message) sont utilisées uniquement pour vous répondre.',
        [
          'Elles ne sont ni vendues, ni cédées, ni transmises à des tiers.',
          'Elles sont conservées le temps nécessaire à l’échange.',
        ],
      ],
    },
    {
      title: 'Cookies',
      body: [
        'Ce site n’utilise aucun cookie, ni publicitaire, ni de mesure d’audience. Les polices de caractères sont hébergées sur le site lui-même : aucun service tiers n’est appelé pendant votre visite.',
      ],
    },
    {
      title: 'Hébergement',
      body: [
        'Comme tout site web, l’hébergeur peut enregistrer des journaux techniques (adresse IP, date et page consultée) nécessaires au bon fonctionnement et à la sécurité du service.',
        `Hébergeur : ${HOST}.`,
      ],
    },
    {
      title: 'Liens externes',
      body: [
        'Le site contient un lien vers LinkedIn. En le suivant, vous quittez ce site : la politique de confidentialité de LinkedIn s’applique alors.',
      ],
    },
    {
      title: 'Vos droits',
      body: [
        'Conformément au Règlement général sur la protection des données (RGPD), vous disposez des droits suivants sur les données vous concernant :',
        [
          'droit d’accès et de rectification ;',
          'droit à l’effacement ;',
          'droit d’opposition et de limitation du traitement.',
        ],
        `Pour exercer ces droits, écrivez à ${site.email}. Vous pouvez également adresser une réclamation à la CNIL (www.cnil.fr).`,
      ],
    },
    {
      title: 'Modification de cette politique',
      body: [
        'Cette politique peut être mise à jour si le site évolue. La date de dernière mise à jour figure en haut de la page.',
      ],
    },
  ],
}

export const termsOfUse: LegalDocument = {
  path: '/conditions-utilisation',
  title: 'Conditions d’utilisation',
  intro:
    'En consultant ce portfolio, vous acceptez les conditions d’utilisation décrites ci-dessous.',
  updated,
  sections: [
    {
      title: 'Objet du site',
      body: [
        `Ce site présente le parcours, les compétences et une sélection de projets de ${person.name}, ${person.jobTitle}. Il est proposé à titre d’information.`,
      ],
    },
    {
      title: 'Éditrice et hébergement',
      body: [`Éditrice : ${person.name}. Contact : ${site.email}.`, `Hébergeur : ${HOST}.`],
    },
    {
      title: 'Accès au site',
      body: [
        'Le site est accessible gratuitement. Son accès peut être suspendu ou modifié à tout moment, notamment pour des raisons de maintenance, sans que cela n’ouvre droit à une quelconque indemnité.',
      ],
    },
    {
      title: 'Propriété intellectuelle',
      body: [
        `Les textes, illustrations et créations présentés sur ce site sont la propriété de ${person.name}, sauf mention contraire. Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.`,
        [
          'Les projets réalisés pour des clients sont présentés à titre de référence professionnelle ; leurs noms, marques et visuels restent la propriété de leurs titulaires respectifs.',
          'Les logos des logiciels cités sont des marques de leurs propriétaires respectifs et sont utilisés uniquement pour indiquer les outils maîtrisés.',
        ],
      ],
    },
    {
      title: 'Téléchargement du CV',
      body: [
        'Le CV proposé au téléchargement est destiné à un usage personnel ou dans le cadre d’un recrutement. Il ne peut être diffusé ou modifié sans accord.',
      ],
    },
    {
      title: 'Liens externes',
      body: [
        'Le site peut renvoyer vers des sites tiers, comme LinkedIn. Leur contenu et leurs conditions d’utilisation ne relèvent pas de ce site.',
      ],
    },
    {
      title: 'Responsabilité',
      body: [
        'Les informations publiées sont vérifiées avec soin, mais peuvent contenir des inexactitudes ou ne plus être à jour. Leur utilisation se fait sous la seule responsabilité de l’utilisateur.',
      ],
    },
    {
      title: 'Droit applicable',
      body: [
        'Les présentes conditions sont régies par le droit français.',
        `Pour toute question, vous pouvez écrire à ${site.email}.`,
      ],
    },
  ],
}

export const legalDocuments: LegalDocument[] = [privacyPolicy, termsOfUse]
