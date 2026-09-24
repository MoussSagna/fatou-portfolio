# Sprint 8 — Responsive mobile

**Objectif** : tout le site (Home + pages projet) utilisable sans cassure de 320 px au grand
desktop, sans modifier le desktop validé. Détails : [responsive.md](../responsive.md).

## Méthode

1. Audit automatique (puppeteer) à 320 → 1920 px : scroll horizontal, éléments hors écran,
   textes coupés, cibles tactiles < 44 px ; captures pleine page.
2. Corrections uniquement sous `lg` ou entre `lg` et `xl`.
3. Nouvel audit + revue des captures + comparaison au pixel à 1440 px (avant / après).

## Problèmes trouvés et corrigés

| Où                     | Problème                                                                                       | Correction                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Parcours (320 px)      | Titre `nowrap` : **scroll horizontal de 20 px**                                                | `nowrap` seulement dès `xl`                                |
| Parcours (1024 px)     | Titre qui chevauche la frise                                                                   | Idem : passe sur 3 lignes entre `lg` et `xl`               |
| En-têtes (320 px)      | « Logiciels que j'utilise » + filet débordent                                                  | Eyebrow `min-w-0` (le filet se rétracte), approche 0,3 em  |
| Logiciels (320 px)     | Libellés serrés en 4 colonnes                                                                  | Grille `auto-fit` (3 colonnes à 320, 4 dès ≈ 360 px)       |
| Contact (< 640 px)     | Traits décoratifs rognés par la carte                                                          | Repositionnés au-dessus de la fin du titre                 |
| Header (1024 px)       | Liens collés au bouton                                                                         | Espacement 32 px entre `lg` et `xl`                        |
| Hero (1024 px)         | « Voir la vidéo » renvoyé à la ligne                                                           | Espacement et padding du bouton réduits entre `lg` et `xl` |
| Footer (1024 px)       | Rôle du logo et signature coupés sur plusieurs lignes                                          | Footer sur 2 rangées entre `lg` et `xl`, textes insécables |
| Poppy outils (1024 px) | **Débordement de 18 px**                                                                       | Tuiles 96 px et espacement 8 px entre `lg` et `xl`         |
| Poppy hero (mobile)    | Vide de 120 px avant le chapitre 01 ; titre 68 px trop large pour un nom de 7 lettres à 320 px | Marge basse réduite ; titre 44 → 68 px sous `sm`           |
| Tactile (partout)      | Liens du footer, réseaux, légal, e-mail, retour : 19–27 px                                     | Utilitaire `touch-hit` (zone 44 px), liens du footer 44 px |
| Tab bar (paysage)      | Pas de marge pour l'encoche                                                                    | `safe-area-inset-left/right`                               |

## Tests

- **Aucun scroll horizontal** à 320, 360, 375, 390, 414, 600, 667, 768, 844, 900, 1024, 1100,
  1280, 1440, 1920 px (Home + Poppy), y compris pendant les animations (défilement complet,
  animations actives).
- Tab bar : onglet actif qui suit le scroll (Accueil › Projets › Parcours › Contact), dernier
  lien du footer 39 px au-dessus de la barre, aucun contenu resté invisible après les
  apparitions.
- Desktop 1440 px : **identique au pixel** avant / après (hors bruit de l'animation du bitmoji).
- `npm run check` (typecheck, oxlint, prettier) et `npm run build` OK.

## Problèmes restants

1. **Visuel Poppy flou** sur les grandes cartes mobiles et écrans haute densité : source de
   868 px seulement (export HD attendu, déjà noté au Sprint 7).
2. **iPhone SE (375 × 640)** : le bas du bitmoji passe sous la tab bar au chargement (connu).
3. **Bundle JS** : 161 kB gzip, avertissement Vite > 500 kB (déjà présent) ; découpage par route
   à prévoir dans la passe performance.
4. De 600 à 767 px, les cartes projet (une colonne) sont grandes ; choix assumé plutôt qu'une
   grille 2 + 1 avec une carte orpheline.
5. Tests réalisés en émulation Chrome ; à confirmer sur un vrai iPhone (safe areas, flou de la
   tab bar dans Safari).

## Captures

`comparisons/sprint-08-home-320-before-after.png`, `sprint-08-home-1024-before-after.png`,
`sprint-08-project-320-1024.png`.

## Validation

⏳ En attente de validation.
