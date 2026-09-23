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
- Zones tactiles de la tab bar ≥ 44 px de haut.

## À faire

- Audit Lighthouse / axe au Sprint 7.
- CTA « Voir la vidéo » : pointe vers `#` tant que la vidéo n'existe pas (à remplacer par une
  modale accessible ou un lien réel).
