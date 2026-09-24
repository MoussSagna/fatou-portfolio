# Sprint 7 — Page projet Poppy

**Objectif** : première page de détail projet (`/projects/poppy`), sous forme de template
réutilisable, fidèle à `maquette/projetc.png`. Détails : [project-pages.md](../project-pages.md).

## Tâches

- [x] Routing `react-router` (prévu par `architecture.md`), `ScrollManager`
- [x] Cartes projet cliquables (seule modification de la Home), liens header / footer / tab bar
      en `/#section` pour fonctionner depuis une page projet
- [x] Types `CaseStudy`, données `data/case-studies/poppy.ts`, registre
- [x] Template `ProjectPage` + 8 composants dans `components/projects/`
- [x] Animations d'entrée et au scroll, mouvement réduit respecté
- [x] Responsive 390 / 834 / 1440

## Boucle de comparaison (1440 px)

| Itération | Écarts                                                                                               | Corrections                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1         | Grand vide entre hero et chapitre 01, visuel du hero trop petit, tagline trop « serif », tags petits | Marge basse du hero réduite, visuel 40 rem, tagline en Chillax medium, tags 15 px |
| 2         | Bandeau de conclusion (image floutée) gris et terne, citation en Chubbo                              | Fond chaud dégradé, citation en Chillax                                           |
| 3         | Image floutée toujours sans intérêt                                                                  | Remplacée par un dégradé nude → blush + formes organiques. Arrêt                  |

Captures : `comparisons/sprint-07-project-iter1.png`, `…-iter2.png`, `…-iter3-full.png`,
`sprint-07-mobile-tablet.png`.

## Écarts restants / à fournir

1. **Visuels Poppy manquants** : seul le visuel de la carte existe (utilisé dans le hero, basse
   résolution : 868 px, recadré de la maquette). Les autres blocs sont des **emplacements
   « Visuel à venir »** (photo d'ambiance, parcours, accueil, onboarding, recherche, fiche film,
   profil, abonnement…). À remplacer par les exports Figma.
2. **Textes** : premier jet qualitatif à valider (aucune statistique inventée). Durée et année
   du projet non renseignées (inconnues).
3. **Outils** : Figma, Photoshop, Illustrator, Notion, Miro repris de la maquette, à confirmer.
4. Header : le bouton reste « Discutons » (header validé) au lieu de « Tous les projets ».
5. Non repris (décor de la maquette MORI) : feuille au-dessus du titre, notes manuscrites,
   bouton « Voir en détail » (pas de destination).
6. Retour arrière navigateur : revient en haut de la page précédente, sans restaurer la
   position exacte.

## Tests

- `npm run check` (typecheck, oxlint, prettier) et `npm run build` OK.
- Navigation : carte Poppy → page en haut ; « Retour aux projets », menu et CTA → section
  Projets de la Home ; slug inconnu → `/#projets` ; titre d'onglet mis à jour ; aucune erreur
  console.
- 390 / 834 / 1440 : aucun débordement horizontal ; tab bar « Projets » active.
- Home : rendu inchangé.

## Validation

⏳ En attente de validation.
