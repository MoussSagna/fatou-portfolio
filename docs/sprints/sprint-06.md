# Sprint 6 — Contact & footer

**Objectif** : la carte « Un projet en tête ? » et le footer, fidèles à la maquette.

## Tâches

- [x] `ContactSection` : grande carte nude (plus large que la grille), titre + petits traits
      corail, texte, bouton « Me contacter » (`mailto`) sur un blob rose, adresse e-mail
- [x] `Sparkles` : 3 traits d'emphase qui se dessinent à l'entrée dans l'écran
- [x] `Blob` : forme organique décorative (carte, coin de section)
- [x] `SiteFooter` : logo, navigation, réseaux, séparateur, signature, © (année automatique),
      liens légaux
- [x] `SocialIcon` : logos LinkedIn, Instagram, Behance, Dribbble (Simple Icons, CC0),
      en `currentColor`
- [x] Données : `site.socials` (avec `id`), `site.tagline` (3 lignes), `site.legal`
- [x] Tab bar mobile : la marge basse passe du `<main>` au footer (dernier élément de la page)

## Boucle de comparaison (1440 px)

| Itération | Écarts                                                                                | Corrections                                                                                                      |
| --------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1         | Paragraphe sur 3 lignes et petit, footer trop petit et trop bas, signature mal coupée | Paragraphe 21 px + retour forcé sur desktop, footer 16 px, icônes 24 px, séparateur 64 px, signature en 3 lignes |
| 2         | Liens du footer trop pâles, petits traits du titre petits                             | Liens en encre, traits agrandis                                                                                  |
| 3         | Écarts mineurs ci-dessous                                                             | Arrêt                                                                                                            |

Captures : `comparisons/sprint-06-contact-footer-iter1.png` → `…-iter3.png`,
`sprint-06-mobile-tablet.png`.

## Écarts / ajouts assumés

1. **Adresse e-mail affichée** sous le bouton (demandée par le brief, absente de la maquette),
   discrète. Adresse provisoire : `hello@fatou.design`.
2. **Bouton** « Me contacter » : taille des autres boutons (cohérence), plus petit que la maquette.
3. **Année** du copyright calculée automatiquement.
4. **Liens légaux** vers `#` : pages Confidentialité / Conditions à créer avant la mise en ligne.
5. **Réseaux** : URLs génériques à remplacer dans `data/site.ts`.

## Tests

- Mobile 390 / tablette 834 : pas de débordement, dernier lien du footer 39 px au-dessus de la
  tab bar, onglet « Contact » actif en bas de page.
- Petits traits : invisibles avant le scroll, dessinés ensuite ; visibles d'emblée en mouvement
  réduit (carte et footer aussi).
- Hero inchangé (0 octet de différence). `check` et `build` OK.

## Validation

✅ Contact et footer en place : la landing page est complète.
