# Responsive

## Stratégie

- **Mobile first** avec les breakpoints Tailwind standards, sans breakpoint personnalisé.
- La **version desktop (1440 px) est la référence validée** : les corrections responsive se font
  sous `lg`, ou entre `lg` et `xl` (`lg:… xl:<valeur desktop>`), jamais sur la valeur desktop.
  Contrôle : capture pleine page à 1440 px comparée au pixel près avant / après.
- Layouts flexibles (`grid`, `flex-wrap`, `minmax`, `clamp()`, `max-w-*`) plutôt que des largeurs
  fixes. Aucun `overflow-x: hidden` global : chaque débordement est corrigé à sa source. Seuls
  des décors (blobs) sont rognés volontairement par leur section (`overflow-x-clip`,
  `overflow-hidden`).

## Breakpoints

| Breakpoint | Largeur     | Navigation           | Mise en page                                                  |
| ---------- | ----------- | -------------------- | ------------------------------------------------------------- |
| base       | < 640 px    | Tab bar en bas       | Une colonne, gouttières 20 px                                 |
| `sm`       | 640–767 px  | Tab bar en bas       | Une colonne, gouttières 32 px                                 |
| `md`       | 768–1023 px | Tab bar en bas       | Projets et logiciels sur une ligne, reste empilé              |
| `lg`       | 1024–1279   | Liens dans le header | 2 colonnes, espacements resserrés (header, footer, hero)      |
| `xl`       | ≥ 1280 px   | Liens dans le header | Valeurs desktop validées ; contenu plafonné à 1440 px (90rem) |

Vérifié : 320, 360, 375, 390, 414, 600, 667, 768, 844, 900, 1024, 1100, 1280, 1440, 1920 px,
Home et page projet : **aucun scroll horizontal**, y compris pendant les animations d'entrée.

## Navigation mobile : tab bar sticky (pas de hamburger)

Sous `lg`, les liens du header sont masqués et remplacés par `MobileTabBar` : Accueil, Projets,
Parcours, Contact. Le header garde le logo et « Discutons » (hauteur 80 px).

- Pilule flottante centrée (`max-w-md`), fond `nude-50` translucide + flou, bordure blanche,
  `shadow-float`, `z-50`.
- Safe areas iOS (`viewport-fit=cover` dans `index.html`) : bas
  `calc(env(safe-area-inset-bottom) + 0.75rem)`, côtés `max(1rem, env(safe-area-inset-left/right))`
  pour le paysage.
- Onglets ≥ 44 px de haut ; actif suivi au scroll (`useActiveSection`), pastille qui glisse
  (`layoutId`), `aria-current="location"`. Sur une page projet, « Projets » est actif.
- **Rien n'est masqué** : le footer (dernier élément de chaque page) réserve
  `env(safe-area-inset-bottom) + 7.5rem` en bas ; le dernier lien reste 39 px au-dessus de la
  barre.
- Seuil `lg` et non `md` : à 768 px, logo + 5 liens + CTA ne tiennent pas confortablement.

## Adaptations par section

| Section         | Mobile / tablette                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Header          | Logo + « Discutons » ; entre `lg` et `xl`, liens espacés de 32 px (56 px dès `xl`)                              |
| Hero            | Eyebrow → titre → texte → CTA → bitmoji (82 % de large) ; indicateur « scroll » masqué ; CTA sur 1 ligne à 1024 |
| En-têtes        | L'eyebrow ne passe jamais à la ligne : le filet se rétracte en premier (`min-w-0`), approche 0,3 em < `sm`      |
| Projets         | 1 colonne, puis 3 dès `md` ; carte entière cliquable                                                            |
| Compétences     | 2 colonnes (tuiles 4:3), 3 dès `sm`                                                                             |
| Logiciels       | Grille `auto-fit` 72 px min : 3 colonnes à 320 px, 4 dès ≈ 360 px, 8 dès `md`, rangée « dock » dès `lg`         |
| Parcours        | Frise simplifiée (pastilles 72 px, sans trait horizontal) ; titre sur une ligne seulement dès `xl`              |
| Contact         | Carte pleine largeur, CTA sous le texte ; traits décoratifs gardés dans la carte                                |
| Footer          | Empilé (liens de 44 px de haut) ; entre `lg` et `xl` sur 2 rangées, 1 seule dès `xl`                            |
| Page projet     | Texte puis visuel pour chaque chapitre ; titre 44 → 68 px sous `sm` (tient jusqu'à « MINDFUL » à 320 px)        |
| Outils (projet) | 3 colonnes, une ligne dès `sm` ; tuiles 96 px entre `lg` et `xl`                                                |

## Hero « above the fold »

- ≥ `lg` : hauteur `100svh − header` (bornée 32–60 rem), grille 2 colonnes ; largeur du bitmoji
  limitée à `(100svh − 12rem) × 1,5` ; indicateur « scroll » masqué si l'écran fait moins de
  44 rem de haut.
- < `lg` : empilé, bitmoji à 82 % de large (100 % dès `sm`, max. 34 rem).
- Exception connue : sur les très petits écrans (375 × 640, iPhone SE), le bas du bitmoji passe
  sous la tab bar au chargement.

## Typographie

Échelle fluide (`clamp()`, voir [typography.md](typography.md)) : les titres rétrécissent sans
breakpoint. Seuls les titres forcés sur une ligne (`whitespace-nowrap`) ont été limités aux
largeurs où ils tiennent.

## Tactile

- Cibles ≥ 44 × 44 px. Pour les petits liens inline (réseaux, légal, e-mail, « Voir tous les
  projets », « Retour aux projets », logo), l'utilitaire **`touch-hit`** (`globals.css`) agrandit
  la zone cliquable par un `::after` invisible, sans changer la mise en page.
- Aucune fonction ne dépend du survol : dans Tailwind 4, `hover:` n'est appliqué que si
  `(hover: hover)` ; l'effet dock des logiciels n'est actif qu'avec un pointeur fin.

## Captures

`comparisons/sprint-08-home-320-before-after.png`, `…-home-1024-before-after.png`,
`…-project-320-1024.png`.
