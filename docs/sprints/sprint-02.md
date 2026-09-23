# Sprint 2 — Hero

**Objectif** : reproduire le hero de la maquette (texte, CTA, scroll, bitmoji) avec des
animations d'entrée subtiles.

## Tâches

- [x] Composant `Bitmoji` (picture AVIF/WebP, ratio fixe, prêt pour calques) → [bitmoji.md](../bitmoji.md)
- [x] `HeroSection` : eyebrow, titre 3 lignes (3ᵉ en terracotta), paragraphe, CTA projets, CTA vidéo, indicateur scroll
- [x] Placement de l'illustration calé sur le visage (86 % de largeur, débord à droite)
- [x] Animation d'entrée en cascade + flèche scroll animée
- [x] Mise en page mobile/tablette empilée

## Boucle de comparaison

| Itération | Écarts relevés                                                                                                                                        | Corrections                                                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | Titre sur 4 lignes (colonne trop étroite pour Chubbo), eyebrow sans espacement, paragraphe trop clair, retours à la ligne différents                  | Mesure des largeurs de texte dans le navigateur → titre 88 px + `nowrap` par ligne, colonne 50 %, paragraphe 21 px / 1,75, gris assombri |
| 2         | Eyebrow toujours serré (cause : `cn` supprimait `text-eyebrow`), paragraphe/CTA 6–10 px trop bas, « Voir la vidéo » trop petit, « SCROLL » trop petit | `cn` configuré, marges resserrées, tailles ajustées                                                                                      |
| 3         | Positions à ±5 px près ; seul le dessin des polices diffère                                                                                           | Nav à 16 px. Arrêt de la boucle                                                                                                          |

Captures : `comparisons/sprint-02-hero-iter1.png` → `comparisons/sprint-02-hero-iter3.png`.

## Écarts connus (documentés, non corrigés)

1. **Polices** : Chubbo/Chillax ≠ police de la maquette (voir [typography.md](../typography.md)).
   Les tailles sont calées sur les largeurs de ligne ; les retours à la ligne sont identiques.
2. **Composition de l'illustration** : l'asset fourni n'est pas exactement celui de la maquette
   (livres plus à droite, tasse plus grande). Avec le visage à la même position et à la même
   échelle, les livres sont en partie coupés par le bord droit à 1440 px.
3. **CTA vidéo** : pointe vers `#` en attendant la vidéo (`site.introVideo.url`).

## Validation

✅ Hero fidèle en structure, proportions, couleurs et placement. `npm run check` et `npm run build` passent.

## Retouche post-sprint (demande utilisateur)

- Texte manuscrit « Design a kinder digital world ♡ » retiré du bitmoji (voir [bitmoji.md](../bitmoji.md)).
- Bitmoji et textes réduits : le hero tient maintenant dans l'écran sans scroller (voir
  [responsive.md](../responsive.md)). On s'écarte volontairement de la maquette, où le hero
  dépassait la hauteur d'un écran de portable.
