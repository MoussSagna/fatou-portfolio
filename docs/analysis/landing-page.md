# Analyse de la maquette — Landing page

Source : `maquette/landingpage web.png` (760 × 2069 px). C'est une capture **desktop réduite** :
toutes les mesures ci-dessous sont projetées sur un viewport de référence de **1440 px**
(facteur ≈ 1,895). Asset illustration : `maquette/bitmoji.png` (1536 × 1024, fond transparent).

## Grille & layout

| Élément                      | Maquette (760) | Référence 1440 | Implémentation                                                                 |
| ---------------------------- | -------------- | -------------- | ------------------------------------------------------------------------------ |
| Gouttière latérale           | 37 px          | ≈ 70 px        | `container-page` → 72 px (xl)                                                  |
| Largeur de contenu           | 686 px         | ≈ 1300 px      | max 1440 px − 2 × 72                                                           |
| Hauteur header               | ≈ 52 px        | ≈ 96 px        | `h-24`                                                                         |
| Hauteur hero (header inclus) | ≈ 507 px       | ≈ 960 px       | Remplacé : `100svh` (hero entier visible sans scroll)                          |
| Colonne texte hero           | ≈ 47 %         | ≈ 650 px       | grille `1fr / 1.2fr` (texte / bitmoji)                                         |
| Illustration hero            | 24 % → bord    | 86 % largeur   | Remplacé : colonne de droite calée sur la hauteur d'écran (voir responsive.md) |

Structure verticale de la page (ordre) :

1. **Header** — logo `SARAH•` + rôle, 5 liens centrés, CTA pilule noir « Discutons ↗ ».
2. **Hero** — eyebrow, titre sur 3 lignes (3ᵉ en terracotta), paragraphe, CTA « Voir mes projets »,
   CTA vidéo (cercle play + « 1 MIN »), indicateur « SCROLL » à gauche, illustration à droite.
3. **Projets sélectionnés** — eyebrow + filet, lien « Voir tous les projets ↗ », 3 cartes (image
   arrondie ≈ 16 px, catégorie en eyebrow, titre, description 2 lignes, bouton cercle ↗).
4. **Compétences** — 2 colonnes : titre « Du design au réel. » + texte + CTA outline « Télécharger
   mon CV » / grille 3 × 2 de tuiles (icône ligne + label) sur fond `nude-200`.
5. **Logiciels** — eyebrow + rangée de 8 logos d'app (tuile arrondie + label).
6. **Parcours** — titre « Un parcours tourné vers l'impact. » + texte + CTA / timeline verticale à
   3 étapes (icône dans un cercle, année, poste, contexte, description), note manuscrite
   « Same goal, bigger impact ♡ ».
7. **Contact** — grande carte arrondie `nude-200` : « Un projet en tête ? » + texte + CTA noir, blob
   décoratif et traits « sparkle » corail.
8. **Footer** — logo, liens, réseaux (LinkedIn, Instagram, Behance, Dribbble), signature
   « Designing a kinder digital world. », copyright, liens légaux.

## Couleurs (échantillonnées)

Voir [colors.md](../colors.md). Principal écart avec la palette de départ : le terracotta de la
maquette est **plus profond** (`#9E5442` vs `#B86B55`), et le point du logo est un **corail**
(`#DE7E69`).

## Typographie observée

- Titres : sans géométrique très grasse, interlignage serré (~0,96), approche légèrement négative.
- Texte : sans humaniste légère, gris chaud, interlignage aéré (~1,75).
- Labels : capitales très espacées (~0,35 em), petite taille.

Décision : **Chubbo** (titres) et **Chillax** (texte) comme demandé. Leur dessin diffère de la
maquette (Chubbo a des formes plus « soft serif »). On a donc calé les tailles sur les **largeurs
de ligne** de la maquette plutôt que sur la taille nominale. Voir [typography.md](../typography.md).

## Composants identifiés

`Logo`, `Eyebrow` (± filet), `Button` (plein / outline, pilule), `IconCircleButton` (↗ projets),
`VideoCta`, `ScrollIndicator`, `ProjectCard`, `SkillTile`, `ToolLogo`, `TimelineItem`,
`HandwrittenNote`, `ContactCard`, `Footer`.

## Animations potentielles

Apparition en cascade du hero, reveal au scroll des sections, hover des cartes projet (léger zoom
image + flèche), hover des tuiles compétences, flèche du scroll qui oscille, indicateur actif de la
tab bar mobile. Plus tard : clignement/sourire du bitmoji.

## Assets nécessaires

- ✅ Bitmoji (fourni) — optimisé en AVIF/WebP.
- ⏳ Visuels des projets Poppy, Lumière, Mindful (mockups téléphones / laptop).
- ⏳ Logos officiels des logiciels (voir backlog Sprint 4 — licences Adobe).
- ⏳ Vidéo de présentation (CTA « Voir la vidéo »).
- ⏳ CV PDF.
- ⏳ Notes manuscrites « Same goal, bigger impact » (SVG ou police manuscrite).
