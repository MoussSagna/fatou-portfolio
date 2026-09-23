# Architecture

## Stack

| Outil                           | Rôle                                                                      |
| ------------------------------- | ------------------------------------------------------------------------- |
| Vite 8 + React 19               | Build et UI                                                               |
| TypeScript 6 (`strict`)         | Typage, + `noUncheckedIndexedAccess`                                      |
| Tailwind CSS 4                  | Styles ; tokens dans `src/styles/globals.css` (`@theme`)                  |
| shadcn/ui (base Radix)          | Primitives accessibles, copiées dans `src/components/ui`                  |
| Motion (`motion/react`)         | Animations. C'est le nouveau nom officiel de **Framer Motion** (même API) |
| lucide-react                    | Icônes ligne (cohérentes avec la maquette, utilisées par shadcn)          |
| `cn` + class-variance-authority | Fusion de classes Tailwind (remplace clsx + tailwind-merge) et variantes  |
| oxlint + Prettier               | Lint et formatage (plugin Tailwind pour trier les classes)                |
| sharp (dev)                     | Script d'optimisation des images                                          |
| potrace + svgo (dev)            | Génération du bitmoji vectoriel (`scripts/bitmoji-vector/`)               |

Pas de routeur pour l'instant : page unique avec ancres. Quand des pages de détail projet
arriveront, ajouter `react-router` et déplacer `HomePage` sous une route.

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
    layout/              SiteHeader, MobileTabBar, Logo, SectionShell
    ui/                  primitives (Button shadcn, Eyebrow…)
  data/                  données statiques : site, navigation, projects, skills, tools (bientôt experience)
  hooks/                 useActiveSection (scroll-spy), useMediaQuery
  lib/                   utils (cn)
  pages/                 HomePage (assemble les sections)
  sections/              une section = un fichier (Hero, Projects, Skills, Experience, Contact)
  styles/                globals.css (tokens), fonts.css
  types/                 types partagés
docs/                    cette documentation
maquette/                références visuelles fournies
```

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
