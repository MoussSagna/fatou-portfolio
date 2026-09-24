# Sprint 5 — Parcours

**Objectif** : la section « Mon parcours », avec sa frise chronologique et la note manuscrite
« Same goal / Bigger impact ♡ », animées au scroll.

## Tâches

- [x] Données : `types/experience.ts`, `data/experience.ts` (période début/fin, poste, structure,
      description, icône). `end: null` affiche « Aujourd’hui » et met le point en terracotta
- [x] `Timeline` : pastilles décalées (ligne qui ondule comme la maquette), trait + point, texte
- [x] `HandwrittenNote` : police manuscrite convertie en tracés SVG (aucune police chargée)
- [x] Colonne texte : titre, paragraphe, bouton « En savoir plus » (lien CV en attendant)
- [x] Animations au scroll + mouvement réduit

## Animations

| Élément          | Effet                                                                          |
| ---------------- | ------------------------------------------------------------------------------ |
| Pastille         | apparaît avec un ressort (échelle 0,6 → 1)                                     |
| Trait + point    | se dessine vers la droite (`scaleX`, 0,45 s)                                   |
| Segment de ligne | se dessine jusqu'à la pastille suivante (`pathLength`, 0,9 s)                  |
| Texte            | fondu + glissement de 16 px depuis la droite                                   |
| Note manuscrite  | « Same goal » s'écrit, puis « Bigger impact », puis le cœur se trace (≈ 2,5 s) |

Chaque étape s'anime quand **elle** entre dans l'écran : la frise se construit au fil du scroll.
Chaque étape dessine son propre segment jusqu'à la suivante : la ligne suit la hauteur du texte
sans aucune mesure JavaScript.

## Boucle de comparaison (1440 px)

| Itération | Écarts                                                                                              | Corrections                                                                                                                        |
| --------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1         | Ligne à moitié dessinée (bug), titre sur 3 lignes, étapes trop espacées, paragraphe coupé autrement | Retrait de `vector-effect: non-scaling-stroke` (fausse `pathLength`), grille 2 colonnes + `nowrap`, écart 24 px, paragraphe 392 px |
| 2         | Titre 10 px trop bas, note trop fine, dernière description sur 3 lignes                             | `lg:pt-10`, trait de la note épaissi, description 496 px                                                                           |
| 3         | Écarts résiduels ci-dessous                                                                         | Arrêt                                                                                                                              |

Captures : `comparisons/sprint-05-parcours-iter1.png` → `sprint-05-parcours-iter3.png`,
`sprint-05-note-writing.png`, `sprint-05-mobile-tablet.png`.

## Écarts connus

1. **Dernière description** sur 3 lignes (2 dans la maquette, qui force ses retours à la ligne).
2. **Police manuscrite** : Dawning of a New Day (OFL), la plus proche trouvée, pas identique.
3. **Bouton** « En savoir plus » : taille des boutons du hero ; pointe vers `site.cvUrl` (`#`).
4. **Mobile** : la note manuscrite est masquée (décorative), le trait horizontal aussi.

## Tests

- Scroll : étapes révélées une à une (pastille → segment dessiné), note qui s'écrit.
- `prefers-reduced-motion` : tout visible immédiatement, note complète.
- Mobile 390 px / tablette 834 px : pas de débordement ; trait et point décollés du texte.
- Hero inchangé (0 octet de différence). `check` et `build` OK.

## Validation

✅ Section Parcours en place.
