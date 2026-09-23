# Couleurs

Valeurs échantillonnées sur la maquette (moyenne de zones, pixels d'encre dominants), puis
ajustées pour le contraste. Source de vérité : `src/styles/globals.css`.

| Token (Tailwind) | Valeur    | Palette de départ | Usage                                    |
| ---------------- | --------- | ----------------- | ---------------------------------------- |
| `nude-100`       | `#F8EEE6` | `#F7EDE6`         | Fond principal (`bg-background`)         |
| `nude-50`        | `#FBEFE8` | `#FBEFE8`         | Fond clair, tab bar mobile               |
| `nude-200`       | `#F3E4DB` | `#F2E2D9`         | Cartes, tuiles compétences, bloc contact |
| `blush`          | `#F0D6CA` | —                 | Blobs décoratifs                         |
| `line`           | `#E2D2C8` | —                 | Filets, bordures                         |
| `terracotta`     | `#9E5442` | `#B86B55`         | Mots accentués, focus, sélection         |
| `coral`          | `#DE7E69` | `#D4937D`         | Point du logo, petits traits décoratifs  |
| `olive`          | `#4B4A33` | `#5B6040`         | Écho de l'illustration (usage rare)      |
| `ink`            | `#111111` | `#111111`         | Titres, boutons pleins                   |
| `ink-muted`      | `#4D4845` | `#5F5A57`         | Texte courant                            |
| `white`          | `#FFFFFF` | `#FFFFFF`         | Texte sur boutons                        |

## Écarts justifiés

- **Terracotta** : la maquette est nettement plus profonde (`#9E5442`). Bonus : contraste 4,83:1
  sur `nude-100` (AA texte normal), contre 3,48:1 pour `#B86B55`. Sur `nude-200` : 4,45:1 →
  réserver le terracotta aux gros textes sur les cartes.
- **Corail** : le point du logo est plus vif que le « terracotta clair » proposé.
- **Gris texte** : assombri à `#4D4845` car Chillax a des fûts fins ; avec `#5F5A57` le paragraphe
  paraissait plus pâle que la maquette.

## Aliases shadcn

`background`, `foreground`, `primary` (= ink), `accent` (= terracotta), `muted`, `border`, `ring`…
pointent vers ces tokens : tout composant shadcn ajouté hérite de la palette nude.
