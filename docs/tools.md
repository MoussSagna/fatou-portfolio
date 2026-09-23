# Logiciels (logos)

Données : `src/data/tools.ts`. Logos : `src/assets/tools/*.svg`, servis comme fichiers (pas
inlinés dans le JS, voir `vite.config.ts`) et chargés en différé.

## Sources

| Logiciel    | Fichier           | Source                                                                                                                                                |
| ----------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Figma       | `figma.svg`       | [svgl](https://svgl.app) — logo officiel                                                                                                              |
| Photoshop   | `photoshop.svg`   | svgl — icône produit officielle Adobe                                                                                                                 |
| Illustrator | `illustrator.svg` | svgl — icône produit officielle Adobe                                                                                                                 |
| Adobe XD    | `adobe-xd.svg`    | svgl — icône produit officielle Adobe                                                                                                                 |
| Lightroom   | `lightroom.svg`   | svgl — icône produit officielle Adobe                                                                                                                 |
| Notion      | `notion.svg`      | svgl — logo officiel                                                                                                                                  |
| Slack       | `slack.svg`       | svgl — logo officiel                                                                                                                                  |
| Miro        | `miro.svg`        | Symbole officiel ([Simple Icons](https://simpleicons.org)) posé sur le carré jaune de l'icône d'app, aux couleurs de la marque (`#FFD02F`, `#050038`) |

Aucun logo n'a été redessiné ni modifié (hormis la composition de l'icône Miro, à partir de son
symbole et de ses couleurs officiels).

## Marques

Ces logos sont des marques de leurs propriétaires respectifs. Ils sont utilisés uniquement pour
**indiquer les logiciels maîtrisés** (usage nominatif), sans suggérer de partenariat. Pour un
usage plus poussé, se référer aux chartes : Adobe
(<https://www.adobe.com/legal/permissions.html>), Figma, Notion, Miro, Slack.

## Ajouter / retirer un logiciel

1. Déposer le SVG officiel dans `src/assets/tools/` (svgl.app est une bonne source).
2. Ajouter (ou retirer) l'entrée dans `src/data/tools.ts`.

La rangée s'adapte : grille 4 colonnes sur mobile, 8 sur tablette, ligne répartie sur desktop.
Au-delà de 8 logiciels sur desktop, vérifier l'espacement (le dock magnifie sur ±260 px).

## Choix de présentation

La maquette encadrait seulement Notion, Miro et Slack. Nous affichons **tous les logos sans
cadre** : les icônes Adobe et Miro sont déjà des tuiles, un cadre aurait créé un « cadre dans le
cadre », et le rendu est plus homogène. Google Drive, cité dans le brief mais absent de la
maquette, n'est pas affiché (une ligne à ajouter si besoin).
