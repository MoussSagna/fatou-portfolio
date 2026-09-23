# Sprint 0 — Initialisation

**Objectif** : analyser l'existant et la maquette, poser le socle technique.

## Tâches

- [x] Analyser le dossier : vide, à part `maquette/` (landing desktop + bitmoji)
- [x] Analyser la maquette → [analysis/landing-page.md](../analysis/landing-page.md)
- [x] Échantillonner les couleurs (script sharp sur zones de la maquette)
- [x] Vérifier le bitmoji : fond réellement transparent, alpha quasi binaire → pas de halo sur nude
- [x] Initialiser Vite 8 + React 19 + TypeScript 6 (`strict`, `noUncheckedIndexedAccess`)
- [x] Installer Tailwind 4 (`@tailwindcss/vite`), shadcn/ui (base Radix), Motion, lucide-react
- [x] Nettoyer les dépendances ajoutées par shadcn (Geist, tw-animate-css, shadcn runtime, clsx, tailwind-merge)
- [x] Qualité : oxlint + Prettier (tri des classes Tailwind), script `npm run check`
- [x] Pipeline d'images : `npm run images` (sharp → AVIF/WebP responsive)
- [x] Outillage de comparaison visuelle (captures Chrome headless à 1440 px, côte à côte avec la maquette)

## Problèmes rencontrés

- `shadcn init` génère un `cn` qui supprimait nos tailles de texte custom (confondues avec des
  couleurs) → configuré dans `src/lib/utils.ts`.
- TypeScript 6 déprécie `baseUrl` → alias `@/*` via `paths` seul.

## Validation

`npm run check` ✅ · `npm run build` ✅ · le serveur de dev démarre ✅
