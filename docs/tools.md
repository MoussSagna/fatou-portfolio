# Logiciels (logos)

Données : `src/data/tools.ts`. Logos : `src/assets/tools/*.svg`, servis comme fichiers (pas
inlinés dans le JS, voir `vite.config.ts`) et chargés en différé.

## Sources

| Logiciel    | Fichier           | Source                                                                                                                                                                       |
| ----------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Figma       | `figma.svg`       | [svgl](https://svgl.app) — logo officiel                                                                                                                                     |
| Photoshop   | `photoshop.svg`   | svgl — icône produit officielle Adobe                                                                                                                                        |
| Illustrator | `illustrator.svg` | svgl — icône produit officielle Adobe                                                                                                                                        |
| Notion      | `notion.svg`      | svgl — logo officiel                                                                                                                                                         |
| Miro        | `miro.svg`        | Symbole officiel ([Simple Icons](https://simpleicons.org)) posé sur le carré jaune de l'icône d'app, aux couleurs de la marque (`#FFD02F`, `#050038`)                        |
| Claude      | `claude.svg`      | svgl — logo officiel (Anthropic)                                                                                                                                             |
| Maze        | `maze.svg`        | Symbole officiel ([Simple Icons](https://simpleicons.org), CC0 ; source : press kit Maze), noir. **Pages projet uniquement** (`caseStudyTools`), pas dans le dock de la Home |

Aucun logo n'a été redessiné ni modifié (hormis la composition de l'icône Miro, à partir de son
symbole et de ses couleurs officiels).

## Marques

Ces logos sont des marques de leurs propriétaires respectifs. Ils sont utilisés uniquement pour
**indiquer les logiciels maîtrisés** (usage nominatif), sans suggérer de partenariat. Pour un
usage plus poussé, se référer aux chartes : Adobe
(<https://www.adobe.com/legal/permissions.html>), Figma, Notion, Miro, Anthropic (Claude).

## Ajouter / retirer un logiciel

1. Déposer le SVG officiel dans `src/assets/tools/` (svgl.app est une bonne source).
2. Ajouter (ou retirer) l'entrée dans `src/data/tools.ts`.

La rangée s'adapte : grille 3 colonnes sur mobile (2 rangées de 3), une ligne de 6 dès `sm`,
ligne répartie sur desktop. Si le nombre de logiciels change, ajuster les colonnes de la grille
(`ToolsDock.tsx`) pour éviter une rangée incomplète.

Le 2026-09-29 : Adobe XD, Lightroom et Slack retirés, Claude ajouté (6 logiciels).

## Choix de présentation

La maquette encadrait seulement Notion, Miro et Slack. Nous affichons **tous les logos sans
cadre** : les icônes Adobe et Miro sont déjà des tuiles, un cadre aurait créé un « cadre dans le
cadre », et le rendu est plus homogène. Google Drive, cité dans le brief mais absent de la
maquette, n'est pas affiché (une ligne à ajouter si besoin).
