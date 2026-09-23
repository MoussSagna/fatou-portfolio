# Bitmoji

Deux versions du même personnage, servies par un seul composant :

| Version         | Fichier                                                 | Poids                               | Usage                                                 |
| --------------- | ------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| **image**       | `src/assets/images/bitmoji-{768,1200,1536}.{avif,webp}` | 30–115 Ko                           | Par défaut ; placeholder pendant le chargement du SVG |
| **vectorielle** | `src/assets/bitmoji/bitmoji.svg`                        | 247 Ko (≈ 85 Ko gzip), chunk séparé | Hero (`<Bitmoji animated />`)                         |

## Sources

- `maquette/bitmoji.png` : original fourni, conservé tel quel.
- `assets-src/bitmoji.png` : version retouchée (texte manuscrit « Design a kinder digital
  world ♡ » supprimé, reste identique au pixel près). C'est la source des deux versions.
- `npm run images` régénère les images AVIF/WebP.
- `npm run bitmoji:vector` régénère le SVG (voir [Génération](#génération-du-svg)).

## Utilisation

```tsx
import { Bitmoji } from '@/components/bitmoji/Bitmoji'

<Bitmoji sizes="(min-width: 1024px) 55vw, 100vw" />   // image (défaut)
<Bitmoji variant="vector" />                          // SVG en calques, statique
<Bitmoji animated />                                  // SVG + data-animated="true"
```

- La boîte garde toujours un **ratio 3:2** : passer d'une version à l'autre ne change ni la position
  ni la taille.
- La version vectorielle est chargée **à la demande** (`React.lazy`) ; pendant le chargement,
  l'image s'affiche à sa place.
- Accessibilité : le conteneur porte `role="img"` et le texte alternatif ; le SVG est
  `aria-hidden`.
- ⚠️ Le SVG est injecté dans le DOM : ses IDs sont globaux. **Une seule instance vectorielle par
  page.**

## Structure du SVG

`viewBox="0 0 1536 1024"`, ordre d'empilement de l'arrière vers l'avant :

```
#bitmoji
├── #scene-back        décor arrière (statique)
│   ├── #blob          formes roses
│   ├── #desk          bureau
│   └── #plant         plante
├── #body
│   ├── #shirt         chemise
│   └── #neck          cou / décolleté
├── #hair-base         silhouette sombre statique (comble les jours quand les cheveux bougent)
├── #hair-back         .bitmoji-hair — cheveux autour de la tête (au-dessus du menton)
├── #hair-front        .bitmoji-hair — longues mèches sur les épaules
├── #face
│   ├── path.face-base aplat de peau sous tous les traits (aucun trou quand ils bougent)
│   ├── (ombres et contour du visage)
│   ├── #nose
│   ├── #left-eyebrow
│   ├── #right-eyebrow
│   ├── #left-eye      .bitmoji-eye
│   │   ├── .eye-open        œil ouvert (pivot inline = ligne de fermeture)
│   │   │   ├── .eye-white
│   │   │   ├── .iris          (groupe, plusieurs tons de brun)
│   │   │   ├── .pupil
│   │   │   ├── .eye-outline   (paupière, cils)
│   │   │   └── .eye-highlight (reflet, au-dessus de tout)
│   │   └── .eye-lid         trait d'œil fermé (opacity 0 au repos)
│   ├── #right-eye     même structure
│   └── #mouth         lèvres + ligne du sourire
├── #hand              main sur la joue + avant-bras
├── #hat               chapeau + ruban
└── #scene-front       décor avant (statique)
    ├── #laptop        (dégradé #bitmoji-laptop-lid)
    ├── #mug
    └── #books
```

« Gauche » et « droite » désignent le côté vu par le spectateur. Les sous-parties des yeux
utilisent des **classes** (et non des IDs), puisqu'elles existent en double.

`#hand` est hors de `#body`, car il passe devant le visage.

## Animations

Tout est dans `src/components/bitmoji/bitmoji.css`. Seuls `transform` et `opacity` sont animés,
en CSS pur (aucun JavaScript par image), et uniquement sur `.bitmoji-vector[data-animated]`.

| Animation          | Cible         | Réglage                                                                                                                                                                                             |
| ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bitmojiBlink`     | `.eye-open`   | Cycle de 13,3 s, 3 clignements à intervalles irréguliers (5,7 s · 0,4 s, un double · 7,2 s). Fermeture ≈ 70 ms (ease-in), maintien ≈ 50 ms, réouverture ≈ 130 ms (ease-out) : `scaleY(0.1)` + fondu |
| `bitmojiLid`       | `.eye-lid`    | Même cycle : le trait d'œil fermé apparaît pendant la fermeture                                                                                                                                     |
| `bitmojiHairFloat` | `#hair-front` | 9 s : repos → `skewX(0.55deg)` → léger retour → repos (≈ 2 px en bout de mèche à l'écran)                                                                                                           |
| `bitmojiHairFloat` | `#hair-back`  | 11 s, amplitude 0,25°, déphasée de 3,5 s (jamais synchrone avec l'avant)                                                                                                                            |
| `bitmojiSmile`     | `#mouth`      | 16 s : long repos, puis la bouche s'élargit à peine (`scale(1.035, 1.02)`), tenue, relâchée                                                                                                         |

Pivots : `.eye-open` porte son `transform-origin` en ligne, calculé à la génération pour que
l'œil se referme **exactement** sur le trait `.eye-lid`. La bouche pivote au centre, les
cheveux depuis les racines (`transform-box: fill-box`).

Choix vérifiés :

- **Cheveux** : cisaillement (`skewX`) plutôt que rotation. La rotation déplace les racines et
  ouvre une marche entre `hair-back` et `hair-front`. `hair-front` recouvre aussi `hair-back` sur
  10 px (mêmes couleurs), ce qui rend la jonction invisible.
- **Visage statique** : seuls `.eye-open`, `.eye-lid`, `#mouth` et les cheveux bougent ; la peau
  (`face-base`) reste dessous, donc aucun trou pendant un clignement ou un sourire.
- **Accessibilité** : tout est dans `@media (prefers-reduced-motion: no-preference)`. Avec la
  réduction des animations, le rendu est exactement l'état de repos (paupières invisibles).
- **Performance** :
  - les animations sont mises en pause hors écran (`useInView` de Motion → `data-paused`) ;
  - mesure à 60 i/s avec le CPU ralenti 4× (mobile), aucune image au-delà de 17 ms ;
  - pas de `will-change` : il n'accélère pas les éléments internes d'un SVG, il consommerait de la
    mémoire pour rien.

Pour ajuster : modifier les durées ou les pourcentages des `@keyframes`. Pour changer l'amplitude
des cheveux, modifier la variable `--hair-sway`.

## Génération du SVG

Pipeline : `scripts/bitmoji-vector/` (outils de dev uniquement, rien n'est livré au navigateur).

1. `palette.mjs` : palette de 32 couleurs par k-means (`palette.json`, déjà générée).
2. `segment.mjs` : attribue chaque pixel à une partie. Il combine des zones (`regions.json`), des
   familles de couleurs, de la morphologie (ouverture pour séparer les masses de cheveux des traits
   fins) et des composantes connexes (traits du visage attribués selon leur position).
   Contrôle visuel : `.cache/overlay-full.png`.
3. `trace.mjs` : pour chaque partie, un aplat de silhouette, puis chaque ton est vectorisé avec
   **potrace** (courbes de Bézier) et rempli avec la **couleur moyenne réelle** de ses pixels.
   Réglages par partie : tracé fin pour les contours et textes, simplifié pour les décors.
   Reflets des yeux : îlots blancs séparés du blanc de l'œil (≥ `highlightMinPx`), car l'iris
   touche parfois la paupière et ne les entoure pas.
4. `build.mjs` : SVGO (IDs, classes et groupes conservés), gradient préfixé, `aria-hidden`.

Pour ajuster une découpe, modifier `regions.json` (coordonnées dans l'image 1536 × 1024) puis
relancer `npm run bitmoji:vector`.

Dépendances de dev : `potrace`, `svgo`. `npm audit` signale une vulnérabilité modérée dans
`phin`, un client HTTP embarqué par `jimp` (dépendance de potrace). Elle ne concerne que le
chargement d'images par URL, que le script n'utilise pas, et rien n'est livré au site.

## Fidélité et limites

Comparaison avec l'original en 3 itérations (écart moyen final ≈ 6,8 / 255 par canal) :

1. Liseré blanc autour des yeux, iris trop sombre, jours entre visage, cheveux et chapeau,
   dégradé de l'ordinateur en bandes, texte de la tasse abîmé → corrigés.
2. Contours sombres perdus, « boîte » autour des livres → couleurs moyennes réelles, conservation
   systématique des teintes sombres, livres découpés par couleur.
3. Liseré de peau autour du visage → corrigé. Poids 958 Ko → 245 Ko.

Limites connues :

- **Ombres douces → aplats** : la peau, le chapeau et le blob sont rendus en 3 à 6 tons nets au
  lieu de dégradés doux. Le style est cohérent, mais un peu plus « posterisé » que l'original.
- **Textures simplifiées** : la texture aquarelle du blob, les pages des livres et le grain du
  chapeau sont lissés.
- **Petits textes** (tasse, livres) : lettres légèrement plus grasses et irrégulières. Ce sont
  des tracés, pas du texte.
- **Pointes de cheveux** derrière l'anse de la tasse : quelques pixels sont rattachés à la tasse.
- **Œil fermé** : il n'existe pas dans l'original. C'est un trait de paupière généré (arc entre
  les coins de l'œil), cohérent avec le style, mais pas dessiné par l'illustratrice.
- **Sourire** : élargissement subtil de la bouche existante. Un sourire aux commissures qui
  remontent demanderait une seconde bouche dessinée pour faire un morphing.

Le hero utilise la version vectorielle animée. `<Bitmoji />` sans option affiche toujours
l'image, par exemple pour un usage statique ailleurs.
