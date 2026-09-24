# Accessibilité

## En place

- `lang="fr"`, HTML sémantique : `header`, `nav` (avec `aria-label`), `main`, `section`
  (avec `aria-labelledby` / `aria-label`), un seul `h1`.
- Lien d'évitement « Aller au contenu » visible au focus.
- Focus visible partout : contour terracotta 2 px, décalé de 4 px.
- Contrastes sur `nude-100` : encre `#111` 16,5:1 ; texte `#4D4845` 7,9:1 ; terracotta 4,83:1 (AA).
- Icônes décoratives en `aria-hidden` ; liens icône-seule avec `aria-label`.
- Illustration avec texte alternatif descriptif.
- Onglet actif de la tab bar : `aria-current="location"`.
- `prefers-reduced-motion` respecté (voir [animations.md](animations.md)).
- Zones tactiles ≥ 44 × 44 px : tab bar, boutons, liens du footer ; petits liens inline agrandis
  par l'utilitaire `touch-hit` (voir [responsive.md](responsive.md#tactile)).
- Liens sociaux : icône seule avec `aria-label` précisant « (nouvel onglet) », `rel="noreferrer"`.
- Frise du parcours : `<ol>`, dates en `<time>`, « poste actuel » annoncé aux lecteurs d'écran.
- Liste des logiciels nommée (`aria-label`), logos en `alt=""` car le nom est affiché.
- Cartes projet : un seul lien par carte (lien étiré), focus visible sur toute la carte.

## À faire

- Audit Lighthouse / axe au Sprint 7.
- CTA « Voir la vidéo » : pointe vers `#` tant que la vidéo n'existe pas (à remplacer par une
  modale accessible ou un lien réel).
