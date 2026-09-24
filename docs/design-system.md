# Design system

Identité : minimaliste, chaleureuse, premium — fond nude, encre noire, accent terracotta.
Tokens : `src/styles/globals.css`. Détails : [colors.md](colors.md), [typography.md](typography.md).

## Espacements & grille

- Zone tactile : utilitaire `touch-hit` (≥ 44 × 44 px via `::after`, sans effet sur la mise en page).
- Conteneur : utilitaire `container-page` → `max-w-[90rem]` centré, gouttières 20 / 32 / 48 / 72 px
  (mobile / sm / lg / xl).
- Rythme vertical des sections : `py-16` mobile, `py-24` desktop (ajusté par section).
- Échelle d'espacement Tailwind standard (multiples de 4 px).

## Rayons

`--radius: 1rem`. Boutons et tab bar : pilule (`rounded-full`). Cartes : `rounded-2xl` (≈ 16–24 px
selon la maquette, à confirmer au Sprint 3).

## Ombres

Très discrètes, teintées chaudes : `shadow-soft` (cartes), `shadow-float` (tab bar).
La maquette est presque plate : préférer les aplats `nude-200` aux ombres.

## Composants disponibles

| Composant                                      | Fichier                                | Notes                                                                                                                                        |
| ---------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                       | `components/ui/button.tsx`             | shadcn re-skinné : `default` (encre → terracotta au survol), `outline`, `ghost` ; tailles `default`, `lg`, `icon` ; `asChild` pour les liens |
| `Eyebrow`                                      | `components/ui/eyebrow.tsx`            | Label capitales espacées, option `withRule` (filet)                                                                                          |
| `Logo`                                         | `components/layout/Logo.tsx`           | `FATOU•` + rôle (nom tiré de `site.name`)                                                                                                    |
| `SiteHeader`                                   | `components/layout/SiteHeader.tsx`     | Liens visibles à partir de `lg`                                                                                                              |
| `MobileTabBar`                                 | `components/layout/MobileTabBar.tsx`   | Tab bar sticky < `lg`                                                                                                                        |
| `SectionShell`                                 | `components/layout/SectionShell.tsx`   | Cadre commun des sections : ancre, en-tête révélé au scroll (eyebrow 15 px semi-gras + filet), `action` optionnelle à droite                 |
| `ProjectCard`                                  | `components/projects/ProjectCard.tsx`  | Carte projet, entièrement cliquable ; données `data/projects.ts`                                                                             |
| `Reveal`                                       | `animations/Reveal.tsx`                | Apparition au scroll — voir [animations.md](animations.md)                                                                                   |
| `SectionHeader`                                | `components/layout/SectionShell.tsx`   | En-tête de section seul (eyebrow + filet + action), pour les sous-blocs                                                                      |
| `SkillTile`                                    | `components/skills/SkillTile.tsx`      | Tuile compétence ; données `data/skills.ts`                                                                                                  |
| `ToolsDock`                                    | `components/tools/ToolsDock.tsx`       | Rangée de logiciels, effet dock ; données `data/tools.ts`                                                                                    |
| `Timeline`                                     | `components/experience/Timeline.tsx`   | Frise du parcours ; données `data/experience.ts`                                                                                             |
| `HandwrittenNote`                              | `components/decor/HandwrittenNote.tsx` | Note manuscrite animée (tracés SVG dans `assets/notes/`)                                                                                     |
| `Sparkles`                                     | `components/decor/Sparkles.tsx`        | 3 traits d'emphase qui se dessinent                                                                                                          |
| `Blob`                                         | `components/decor/Blob.tsx`            | Forme organique décorative (`text-*` pour la couleur)                                                                                        |
| `SocialIcon`                                   | `components/ui/social-icon.tsx`        | Logos des réseaux (Simple Icons, CC0)                                                                                                        |
| `SiteFooter`                                   | `components/layout/SiteFooter.tsx`     | Footer ; données `data/site.ts`                                                                                                              |
| `ProjectHero`, `ProjectStory`, `ProjectMedia`… | `components/projects/`                 | Pages projet — voir [project-pages.md](project-pages.md)                                                                                     |
| `Bitmoji`                                      | `components/bitmoji/Bitmoji.tsx`       | `variant="image" \| "vector"`, `animated` — voir [bitmoji.md](bitmoji.md)                                                                    |

## Règles

1. Une seule couleur d'accent par écran (terracotta) ; le corail reste décoratif.
2. Titres toujours en `font-display` gras, texte en Chillax.
3. Les CTA principaux sont des pilules noires avec flèche ↗.
4. Pas de nouvel élément graphique qui ne soit pas dans la maquette.
