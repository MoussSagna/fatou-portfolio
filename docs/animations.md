# Animations

Librairie : **Motion** (`motion/react`), le nom actuel de Framer Motion.

## Principes

- Subtiles, rapides (0,3–0,8 s), une seule courbe : `easeOutSoft = cubic-bezier(0.22, 1, 0.36, 1)`
  (aussi disponible en CSS : `ease-(--ease-out-soft)`).
- Les états de survol simples (couleur, flèche qui glisse) restent en **CSS** ; Motion sert aux
  apparitions, séquences et transitions de layout.

## Variantes partagées (`src/animations/variants.ts`)

| Nom               | Effet                                                          |
| ----------------- | -------------------------------------------------------------- |
| `fadeUp`          | opacité 0 → 1, y 24 → 0, 0,7 s                                 |
| `stagger()`       | cascade des enfants (délai configurable)                       |
| `revealUp(delay)` | comme `fadeUp`, avec un délai de départ (révélation au scroll) |

## En place

| Où             | Animation                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Hero           | Cascade eyebrow → 3 lignes du titre → paragraphe → CTA → scroll                                                  |
| Hero           | Illustration : fondu + montée, léger décalage (0,25 s)                                                           |
| Hero           | Flèche « scroll » qui oscille doucement (boucle 1,8 s)                                                           |
| Boutons        | Fond encre → terracotta, flèche ↗ qui glisse, `scale 0.98` au clic                                               |
| Nav desktop    | Soulignement terracotta qui se dessine au survol                                                                 |
| Tab bar mobile | Pastille active qui glisse d'un onglet à l'autre (`layoutId`)                                                    |
| Bitmoji (hero) | Clignements irréguliers, brise dans les cheveux, sourire discret — CSS, voir [bitmoji.md](bitmoji.md#animations) |

## Reduced motion

`<MotionConfig reducedMotion="user">` dans `App.tsx` : si l'utilisateur a activé
`prefers-reduced-motion`, Motion désactive les transformations (translations, boucles) et ne
garde que les fondus. Le défilement doux (`scroll-behavior: smooth`) est aussi désactivé.

`Reveal` va plus loin : avec `prefers-reduced-motion`, il rend son contenu **directement visible**
(`initial={false}`), sans fondu ni translation. Aucun contenu ne dépend d'une animation pour
apparaître.

## Révélation au scroll (`src/animations/Reveal.tsx`)

Seule abstraction ajoutée : un composant `Reveal`. Pas de `StaggerContainer` : le décalage se fait
avec la prop `delay`, qui suffit et reste lisible.

```tsx
<Reveal>…</Reveal>              // apparaît en entrant dans le viewport
<Reveal delay={0.12}>…</Reveal> // idem, 120 ms plus tard
```

| Paramètre       | Valeur                                                                   |
| --------------- | ------------------------------------------------------------------------ |
| Effet           | `opacity 0 → 1`, `translateY 24px → 0`                                   |
| Durée           | 0,7 s                                                                    |
| Easing          | `easeOutSoft` — `cubic-bezier(0.22, 1, 0.36, 1)` (départ vif, fin douce) |
| Déclenchement   | `whileInView`, marge basse −12 % : l'élément est déjà un peu entré       |
| Répétition      | une seule fois (`once: true`), pas de ré-animation en remontant          |
| Décalage cartes | 0,12 s par carte (`CARD_STAGGER`)                                        |

Comportement au scroll :

- **Desktop** : l'en-tête (eyebrow + « Voir tous les projets ») apparaît, puis les 3 cartes en
  cascade (0 / 0,12 / 0,24 s), puisqu'elles entrent ensemble dans le viewport.
- **Mobile** (une colonne) : chaque carte apparaît quand elle entre dans le viewport. Le délai
  ne s'additionne pas visiblement puisqu'elles arrivent l'une après l'autre.
- Toute nouvelle section qui utilise `SectionShell` révèle son en-tête automatiquement.

Performance : uniquement `opacity` et `transform` (composités par le navigateur, aucun recalcul de
layout). Un seul IntersectionObserver est partagé par Motion.

## Survol des cartes projet (CSS)

| Élément                   | Effet                                                        | Durée / easing      |
| ------------------------- | ------------------------------------------------------------ | ------------------- |
| Bloc visuel               | monte de 4 px (`-translate-y-1`)                             | 500 ms, easeOutSoft |
| Image                     | zoom 1,03                                                    | 700 ms, easeOutSoft |
| Bouton rond ↗             | se remplit d'encre, flèche blanche qui glisse en diagonale   | 300 ms              |
| « Voir tous les projets » | le soulignement se rétracte vers la droite, la flèche glisse | 500 / 300 ms        |

Les mêmes états s'appliquent au **focus clavier** (`group-focus-within`). Toute la carte est un
seul lien (lien « étiré » sur le titre) : un seul arrêt de tabulation par projet.

## Compétences

- Colonne texte : un `Reveal`.
- Tuiles : `Reveal` avec 60 ms d'écart (`TILE_STAGGER`) ; survol CSS : montée 4 px, fond
  `blush`, icône terracotta (500 ms, easeOutSoft).

## Logiciels — dock

`src/components/tools/ToolsDock.tsx` (Motion : `useMotionValue`, `useTransform`, `useSpring`).

| Réglage          | Valeur                               | Rôle                                         |
| ---------------- | ------------------------------------ | -------------------------------------------- |
| `DOCK_RANGE`     | 260 px                               | distance au curseur sur laquelle on magnifie |
| `DOCK_MAX_SCALE` | 1,35                                 | échelle de l'icône sous le curseur           |
| `DOCK_LIFT`      | −10 px                               | soulèvement de l'icône sous le curseur       |
| `DOCK_SPRING`    | raideur 320, amorti 24, masse 0,35   | suivi souple, sans rebond excessif           |
| Entrée           | ressort (380 / 17), +70 ms par icône | « pop » en cascade                           |

- La magnification n'est activée que si `(hover: hover) and (pointer: fine)` et sans mouvement
  réduit : aucun écouteur `mousemove` sur mobile.
- Les icônes s'agrandissent par `transform` depuis leur base (`originY: 1`) : pas de recalcul de
  layout, les voisines ne sont pas poussées.
- La position du curseur est une `MotionValue` : aucun re-render React pendant le survol.

## Parcours

`components/experience/Timeline.tsx` et `components/decor/HandwrittenNote.tsx`.

- Chaque étape (`<li>`) a son propre `whileInView` : pastille en ressort (320 / 20), trait
  horizontal `scaleX` 0,45 s, segment `pathLength` 0,9 s (délai 0,25 s), texte en fondu +
  glissement de 16 px.
- Pas de `vector-effect: non-scaling-stroke` sur les tracés animés en `pathLength` : il fausse
  le calcul des tirets. Le segment n'est étiré que verticalement, donc le trait reste net.
- Note manuscrite : chaque ligne est un `<image>` SVG découvert par un `clipPath` dont la
  largeur s'anime (0,9 s puis 1 s, courbe « écriture » `[0.45, 0.05, 0.4, 1]`), puis le cœur
  en `pathLength` (0,6 s).

## Contact & footer

- Carte contact et footer : `Reveal`.
- `Sparkles` (`components/decor/Sparkles.tsx`) : 3 traits en `pathLength` (0,35 s chacun,
  décalés de 0,1 s, départ à 0,45 s), une seule fois.
- Icônes sociales : couleur terracotta + montée de 2 px au survol (CSS, 300 ms).

## Pages projet

Voir [project-pages.md](project-pages.md#animations).

## Prévu

Sprint 8 : passe globale responsive, animations, accessibilité et performance.
