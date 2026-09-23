# Documentation — Portfolio Sarah, UI/UX Designer

Portfolio one-page, frontend uniquement (pas de backend, BDD, auth ni admin pour l'instant).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build de prod dans dist/
npm run check      # typecheck + lint (oxlint) + format (prettier)
npm run images     # régénère les images optimisées depuis assets-src/
npm run bitmoji:vector  # régénère le bitmoji SVG en calques
```

## Sommaire

| Document                                             | Contenu                                       |
| ---------------------------------------------------- | --------------------------------------------- |
| [analysis/landing-page.md](analysis/landing-page.md) | Analyse détaillée de la maquette              |
| [architecture.md](architecture.md)                   | Stack, dossiers, conventions, dépendances     |
| [design-system.md](design-system.md)                 | Tokens, composants, règles                    |
| [colors.md](colors.md)                               | Palette et usages                             |
| [typography.md](typography.md)                       | Chubbo / Chillax, échelle fluide              |
| [animations.md](animations.md)                       | Langage de mouvement, reduced motion          |
| [responsive.md](responsive.md)                       | Breakpoints, tab bar mobile                   |
| [accessibility.md](accessibility.md)                 | Règles a11y                                   |
| [bitmoji.md](bitmoji.md)                             | Intégration et animations du bitmoji          |
| [tools.md](tools.md)                                 | Logos des logiciels : sources, marques, ajout |
| [sprints/](sprints/)                                 | Comptes rendus de sprint                      |
| [comparisons/](comparisons/)                         | Captures maquette ↔ rendu                     |

## Méthode

Chaque sprint suit : objectif → tâches → implémentation → vérification → comparaison avec la
maquette → correction (max. 3 itérations) → documentation → validation.

Les comparaisons sont faites en capturant le rendu à **1440 px**, réduit à 760 px et placé à côté
de la maquette (captures dans `comparisons/`).

## Roadmap

| Sprint | Contenu                                           | Statut     |
| ------ | ------------------------------------------------- | ---------- |
| 0      | Initialisation, analyse, outillage                | ✅ Terminé |
| 1      | Design system, fonts, layout, navigation          | ✅ Terminé |
| 2      | Hero                                              | ✅ Terminé |
| 3      | Projets                                           | ✅ Terminé |
| 4      | Compétences + logiciels                           | ✅ Terminé |
| 5      | Parcours                                          | À faire    |
| 6      | Contact + footer                                  | À faire    |
| 7      | Responsive, animations, polish, a11y, performance | À faire    |
