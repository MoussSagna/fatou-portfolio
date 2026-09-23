# Sprint 4 — Compétences & logiciels

**Objectif** : section « Mes compétences » + rangée « Logiciels que j'utilise », fidèles à la
maquette, avec une animation marquante mais sobre pour les logiciels.

## Tâches

- [x] Données : `data/skills.ts` (6 compétences, icônes lucide), `data/tools.ts` (8 logiciels)
- [x] Logos officiels SVG (svgl, Simple Icons pour Miro) → [tools.md](../tools.md)
- [x] `SkillTile` : tuile nude, icône trait, libellé ; survol : montée, icône terracotta
- [x] Colonne texte : titre « Du design / au réel. », paragraphe, bouton « Télécharger mon CV »
- [x] `ToolsDock` : effet **dock macOS** + apparition en « pop »
- [x] `SectionHeader` extrait de `SectionShell` (réutilisé pour « Logiciels que j'utilise »)
- [x] `useMediaQuery` : magnification réservée aux souris
- [x] Vite : logos SVG servis en fichiers (pas en base64 dans le JS)

## Animation des logiciels

- **Entrée** : les icônes « poppent » une à une (ressort, léger dépassement ×1,09), 70 ms d'écart.
- **Dock** (souris uniquement) : l'icône sous le curseur grossit (×1,35) et se soulève de 10 px,
  ses voisines l'accompagnent (×1,11) ; ressorts, retour doux au départ du curseur.
- **Tactile** : entrée + petit rebond au toucher (`scale 0.9`).
- **Mouvement réduit** : rangée statique, visible immédiatement.

Détails et réglages : [animations.md](../animations.md#logiciels--dock).

## Boucle de comparaison (1440 px)

| Itération | Écarts                                                                                                   | Corrections                                                              |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1         | Colonne tuiles trop étroite, icônes/libellés petits, section 8 px trop basse, titre et paragraphe petits | Grille `0.68fr / 1fr`, icônes 36 px, libellés 19 px, `lg:pt-16`          |
| 2         | Titre et paragraphe encore faibles, coupures du paragraphe différentes                                   | `text-h2` jusqu'à 72 px, paragraphe 21 px / 340 px → coupures identiques |
| 3         | Bloc logiciels 18 px trop bas                                                                            | `lg:mt-24` → aligné à 1 px                                               |

Captures : `comparisons/sprint-04-skills-iter1.png` → `sprint-04-skills-iter3.png`,
`sprint-04-dock-hover.png`, `sprint-04-mobile-tablet.png`.

## Écarts assumés

1. **Titre de section** : 72 px au lieu de ~84 px, pour rester dans l'échelle du hero (réduit
   pour tenir dans l'écran).
2. **Bouton CV** : même taille que les boutons du hero (cohérence), un peu plus petit que la
   maquette. Lien `site.cvUrl` = `#` en attendant le PDF.
3. **Logos sans cadre** pour les 8 logiciels (voir [tools.md](../tools.md)).
4. **Icônes de compétences** : équivalents lucide les plus proches (UI Design → `AppWindow`).

## Tests

- Scroll : en-tête, colonne texte, tuiles en cascade (60 ms), logos en pop.
- Dock : échelles mesurées au survol d'Adobe XD : 1,00 · 1,00 · 1,11 · **1,35** · 1,11 · 1,00…
- Mobile 390 px / tablette 834 px : pas de débordement ; la magnification est désactivée.
- `prefers-reduced-motion` : tout visible sans scroll ni animation.
- Hero inchangé (0 octet de différence sur la colonne texte). `check` et `build` OK.

## Validation

✅ Section compétences + logiciels en place.
