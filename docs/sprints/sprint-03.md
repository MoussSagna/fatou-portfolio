# Sprint 3 — Projets

**Objectif** : la section « Projets sélectionnés », fidèle à la maquette, avec apparition au scroll
et micro-interactions, sans toucher au hero.

## Tâches

- [x] Données : `src/types/project.ts`, `src/data/projects.ts` (Poppy, Lumière, Mindful). Ajouter un
      projet = ajouter une entrée (+ son visuel dans `assets-src/projects/`, puis `npm run images`)
- [x] `ProjectCard` : visuel arrondi, catégorie, titre (Chubbo), description, bouton rond ↗ ;
      toute la carte est un lien
- [x] `SectionShell` : en-tête révélé au scroll + zone d'action à droite (« Voir tous les projets »)
- [x] `Reveal` (Motion) : fondu + translation au scroll, décalage entre cartes
- [x] Survol / focus : montée de 4 px, zoom 1,03, bouton qui se remplit
- [x] Responsive : 1 colonne sur mobile, 3 colonnes à partir de 768 px
- [x] Accessibilité : un lien par carte, focus visible, `alt` descriptifs, reduced motion

## Boucle de comparaison (1440 px, sections alignées sur leur haut)

| Itération | Écarts                                                                                                    | Corrections                                                               |
| --------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1         | En-tête 10 px trop bas, lien « Voir tous les projets » trop petit, descriptions trop petites, flèche fine | `lg:pt-20`, lien 19 px semi-gras, descriptions 19 px / largeur max 240 px |
| 2         | Eyebrow de section plus grand et plus sombre dans la maquette                                             | `SectionShell` : 15 px, semi-gras, encre (le hero n'est pas concerné)     |
| 3         | Écarts résiduels : dessin des polices, coupure « Mindful »                                                | Arrêt, documentés ci-dessous                                              |

Captures : `comparisons/sprint-03-projects-iter1.png` → `sprint-03-projects-iter3.png`,
`sprint-03-hover.png`, `sprint-03-mobile-tablet.png`.

## Tests

- Scroll desktop : invisible au chargement → en-tête puis cartes en cascade.
- Scroll mobile : chaque carte apparaît à son entrée dans le viewport.
- `prefers-reduced-motion` : tout est visible immédiatement, sans animation.
- Aucun débordement horizontal (390, 834, 1440 px), tab bar mobile inchangée.
- Hero : colonne de texte identique au pixel près avant/après (desktop et mobile).
- `npm run check` et `npm run build` passent.

## Écarts connus / à faire

1. **Visuels provisoires** : extraits de la maquette (≈ 220 px de large, agrandis ×4), donc un
   peu flous. À remplacer par les exports HD des projets dans `assets-src/projects/`
   (ratio ≈ 868 × 940), puis `npm run images`.
2. **Liens** : cartes et « Voir tous les projets » pointent vers `#projets` en attendant les
   pages projet (`href` dans `data/projects.ts`, `allProjectsHref`).
3. **Coupure « Mindful »** : la maquette coupe « Application bien-être / et suivi… », mais aucune
   largeur unique ne reproduit les trois coupures de la maquette. Nous avons « … bien-être et /
   suivi d'objectifs ».
4. **Tablette (768–1023 px)** : le bouton rond est masqué pour laisser la place au texte en
   3 colonnes. La carte entière reste cliquable.

## Validation

✅ Section Projets conforme en structure, proportions et hiérarchie ; animations et interactions
en place.
