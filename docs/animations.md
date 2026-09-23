# Animations

Librairie : **Motion** (`motion/react`), le nom actuel de Framer Motion.

## Principes

- Subtiles, rapides (0,3–0,8 s), une seule courbe : `easeOutSoft = cubic-bezier(0.22, 1, 0.36, 1)`
  (aussi disponible en CSS : `ease-(--ease-out-soft)`).
- Les états de survol simples (couleur, flèche qui glisse) restent en **CSS** ; Motion sert aux
  apparitions, séquences et transitions de layout.

## Variantes partagées (`src/animations/variants.ts`)

| Nom         | Effet                                    |
| ----------- | ---------------------------------------- |
| `fadeUp`    | opacité 0 → 1, y 24 → 0, 0,7 s           |
| `stagger()` | cascade des enfants (délai configurable) |

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

## Prévu

Sprint 3+ : composant `Reveal` (apparition au scroll), hover des cartes projet.
