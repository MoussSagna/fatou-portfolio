# Sprint 1 — Design system, fonts, layout, navigation

**Objectif** : un socle visuel fidèle à la maquette, prêt à accueillir les sections.

## Tâches

- [x] Tokens couleurs, typo, rayons, ombres, easing → `src/styles/globals.css`
- [x] Aliases shadcn branchés sur la palette nude
- [x] Chubbo + Chillax self-hostés (woff2), préchargés
- [x] Structure des dossiers (voir [architecture.md](../architecture.md))
- [x] `Button` shadcn re-skinné (pilules), `Eyebrow`, `Logo`
- [x] `SiteHeader` desktop (logo, 5 liens, CTA « Discutons »)
- [x] `MobileTabBar` sticky (< lg), safe area iOS, onglet actif selon le scroll
- [x] `HomePage` + squelettes de sections avec ancres typées (`SectionId`)
- [x] Lien d'évitement, focus visibles, `MotionConfig reducedMotion="user"`

## Comparaison header (1440 px → 760 px)

| Élément             | Maquette  | Rendu       |
| ------------------- | --------- | ----------- |
| Logo SARAH• largeur | 86 px     | 90 px       |
| Bouton Discutons    | 93 × 30   | 92 × 29     |
| Bloc de liens       | 221 → 502 | ≈ 243 → 515 |

Écart restant : le bloc de liens est ~20 px (à l'échelle maquette) plus à droite, car il est
centré entre le logo et le CTA. Jugé acceptable.

## Validation

✅ Header conforme · tab bar vérifiée à 390 px et 834 px · aucun débordement horizontal.
