# Responsive

| Breakpoint | Largeur   | Navigation           | Hero                                      |
| ---------- | --------- | -------------------- | ----------------------------------------- |
| Mobile     | < 640 px  | Tab bar en bas       | Texte puis illustration (pleine largeur)  |
| Tablet     | 640–1023  | Tab bar en bas       | Idem, illustration plus grande            |
| Desktop    | ≥ 1024 px | Liens dans le header | 2 colonnes, tient dans la hauteur d'écran |

Référence de calibrage desktop : **1440 px**. Au-delà, le contenu est plafonné à 1440 px.

## Hero « above the fold »

Le hero doit tenir entièrement à l'écran (texte, CTA et bitmoji visibles sans scroller) :

- ≥ `lg` : hauteur `100svh − header` (bornée 32–60 rem), grille 2 colonnes centrée verticalement ;
  largeur du bitmoji limitée à `(100svh − 12rem) × 1,5` ; indicateur « scroll » en position absolue,
  masqué si l'écran fait moins de 44 rem de haut.
- < `lg` : empilé, bitmoji à 82 % de largeur sur mobile, CTA sur une seule ligne.

Vérifié sans scroll : 1920×960, 1440×800, 1536×740, 1280×680, 1024×680, 834×1100, 430×830,
390×760. Exception : sur les très petits écrans (375×640, iPhone SE), le bas du bitmoji passe
sous la tab bar.

## Pas de menu hamburger

Sous `lg`, les liens du header sont masqués et remplacés par la **tab bar sticky**
(`MobileTabBar`) : Accueil, Projets, Parcours, Contact.

- Pilule flottante, fond `nude-50` translucide + flou, bordure blanche, ombre douce.
- Safe area iOS : `padding-bottom: calc(env(safe-area-inset-bottom) + 0.75rem)` et
  `viewport-fit=cover` dans `index.html`.
- `<main>` réserve l'espace en bas pour que le contenu ne soit jamais masqué.
- L'onglet actif suit le scroll (`useActiveSection`, un seul IntersectionObserver) et est annoncé via
  `aria-current="location"`.

Le seuil est `lg` (et non `md`) : à 768 px, logo + 5 liens + CTA ne tiennent pas confortablement.

## Vérifié (Sprint 2)

390 × 844, 834 × 1194, 1440 × 900 : aucun débordement horizontal. Capture :
`comparisons/sprint-02-mobile-tablet.png`.
