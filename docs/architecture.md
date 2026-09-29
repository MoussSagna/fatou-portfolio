# Architecture

## Stack

| Outil                           | Rôle                                                                      |
| ------------------------------- | ------------------------------------------------------------------------- |
| Vite 8 + React 19               | Build et UI                                                               |
| TypeScript 6 (`strict`)         | Typage, + `noUncheckedIndexedAccess`                                      |
| Tailwind CSS 4                  | Styles ; tokens dans `src/styles/globals.css` (`@theme`)                  |
| shadcn/ui (base Radix)          | Primitives accessibles, copiées dans `src/components/ui`                  |
| Motion (`motion/react`)         | Animations. C'est le nouveau nom officiel de **Framer Motion** (même API) |
| react-router                    | Routes Home / pages projet                                                |
| lucide-react                    | Icônes ligne (cohérentes avec la maquette, utilisées par shadcn)          |
| `cn` + class-variance-authority | Fusion de classes Tailwind (remplace clsx + tailwind-merge) et variantes  |
| oxlint + Prettier               | Lint et formatage (plugin Tailwind pour trier les classes)                |
| sharp (dev)                     | Script d'optimisation des images                                          |
| potrace + svgo (dev)            | Génération du bitmoji vectoriel (`scripts/bitmoji-vector/`)               |

Routing : `react-router` v7 (`/`, `/projects/:slug`, `/confidentialite`, `/conditions-utilisation`),
voir [project-pages.md](project-pages.md) et [Pages légales](#pages-légales).

## Arborescence

```
assets-src/              images sources haute résolution (non bundlées)
public/fonts/            woff2 self-hostés (Chubbo, Chillax)
scripts/                 optimize-images.mjs, bitmoji-vector/ (génération du SVG en calques)
src/
  animations/            variantes Motion partagées + Reveal (apparition au scroll)
  assets/images/         images générées (AVIF/WebP, hashées par Vite)
  assets/bitmoji/        bitmoji.svg généré (calques animables)
  components/
    bitmoji/             Bitmoji (image ou SVG en calques, chargé à la demande) + bitmoji.css
    layout/              SiteHeader, MobileTabBar, Logo, SectionShell, SiteFooter, ScrollManager
    projects/            ProjectCard + composants des pages projet
    ui/                  primitives (Button shadcn, Eyebrow…)
  data/                  données statiques : site, navigation, projects, skills, tools, experience
  data/case-studies/     contenu des pages projet (un fichier par projet)
  hooks/                 useActiveSection (scroll-spy), useMediaQuery
  lib/                   utils (cn), responsive-image (srcset depuis les images générées)
  pages/                 HomePage (assemble les sections), ProjectPage (template étude de cas)
  seo/                   données SEO, construction du <head>, composant <Seo /> (voir seo.md)
  sections/              une section = un fichier (Hero, About, Skills, Experience, Tools, Projects, Contact)
  styles/                globals.css (tokens), fonts.css
  types/                 types partagés
docs/                    cette documentation
maquette/                références visuelles fournies
```

## Ordre de la Home

Hero → À propos (`#a-propos`, présentation ; nom repris de `seo/data.ts`) → Compétences
(`#competences`) → Parcours (`#parcours`) → Logiciels (`#logiciels`) → Projets (`#projets`) →
Contact → footer. Le bouton « Scroll » du hero a été retiré le 2026-09-28.

## Conventions

- **Une section = un composant** dans `sections/`, composé de petits composants réutilisables.
- **Données séparées du rendu** : les composants lisent `src/data/*.ts`, typés dans `src/types`.
  Pour brancher une API plus tard, remplacer l'export statique par un fetch/hook sans toucher aux
  composants.
- **Ancres** : le type `SectionId` garantit que la navigation et les `id` de sections restent
  synchronisés.
- Alias d'import `@/` → `src/`.
- Pas d'état global : aucun besoin actuellement.

## Dépendances retirées après `shadcn init`

`@fontsource-variable/geist` (on utilise Chubbo/Chillax), `tw-animate-css` et le paquet `shadcn`
en runtime (inutiles tant qu'aucun composant animé Radix n'est utilisé ; le CLI reste utilisable
via `npx shadcn@latest add …`), `clsx` et `tailwind-merge` (remplacés par `cn`).

Attention : tout nouveau token de taille de texte (`--text-*`) doit être déclaré dans
`src/lib/utils.ts`, sinon `cn` le confond avec une couleur et le supprime.

## Pages légales

`/confidentialite` et `/conditions-utilisation` (liens « Confidentialité » et « Conditions » du
footer, `site.legal`).

- Contenu : `data/legal.ts` (type `LegalDocument`, `types/legal.ts`) ; gabarit :
  `pages/LegalPage.tsx`, chargé à la demande. Les routes sont générées depuis `legalSeo`
  (`seo/data.ts`), qui fournit aussi le `<head>`, la page HTML statique et l'entrée du sitemap.
- Seuls des faits vérifiés dans le projet sont affirmés (aucun formulaire, cookie ni outil
  d'audience, polices auto-hébergées). Les informations manquantes sont des placeholders
  `[À compléter : …]`, surlignés à l'écran : **hébergeur à renseigner avant la mise en ligne**.
  L'e-mail vient de `site.email` (encore provisoire).
- Tab bar mobile : aucun onglet actif sur ces pages.
