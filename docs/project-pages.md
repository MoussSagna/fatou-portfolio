# Pages projet (études de cas)

Première page : **`/projects/poppy`**. Référence visuelle : `maquette/projetc.png`.

## Routing

- `react-router` (v7, mode déclaratif) : `BrowserRouter` dans `main.tsx`, routes dans `App.tsx`.
  - `/` → `HomePage`
  - `/projects/:slug` → `ProjectPage` (slug inconnu → redirection vers `/#projets`)
  - toute autre URL → `/`
- Header, footer, logo et tab bar pointent vers `/#section` (`<Link>`) : ils fonctionnent depuis
  n'importe quelle page. Les ancres internes à la Home (hero) restent des `<a href="#…">`.
- `components/layout/ScrollManager.tsx` : nouvelle page → haut de page instantané ; lien avec
  ancre → défilement vers la section (doux sur la même page, désactivé en mouvement réduit) ;
  précédent / suivant → laissé au navigateur.
- Sur une page projet : « Projets » est marqué courant dans le header (`aria-current`) et actif
  dans la tab bar.
- **Hébergement** : prévoir la réécriture SPA (toute URL → `index.html`), ex. Netlify
  `/* /index.html 200`, Vercel `rewrites`. `vite dev` et `vite preview` le font déjà.

## Données

Contenu séparé de l'UI :

| Fichier                       | Rôle                                                        |
| ----------------------------- | ----------------------------------------------------------- |
| `data/projects.ts`            | Résumé (titre, catégorie, visuel, `href` de la carte)       |
| `data/case-studies/<slug>.ts` | Contenu de l'étude de cas (type `CaseStudy`)                |
| `data/case-studies/index.ts`  | Registre, `getCaseStudy(slug)`, `getAdjacentProjects(slug)` |
| `types/project.ts`            | `CaseStudy`, `StoryChapter`, `ProjectMedia`, `AccentText`…  |

`CaseStudy` : `hero` (tagline, description, tags, meta, image) → `story[]` (chapitres texte +
visuel : contexte, problème, solution…) → `process` (étapes) → `showcase` (écrans finaux,
rangées de 1 ou 2 visuels) → `tools` (ids de `data/tools.ts`) → `conclusion`.

Les titres sont des `AccentText` : `{ text, accent }`, la fin `accent` est en terracotta. Les
numéros de chapitre (01, 02…) sont calculés dans l'ordre d'affichage.

### Visuels : `ProjectMedia`

- `{ kind: 'image', image }` : image réelle (`ResponsiveImage`, AVIF + WebP), `object-cover`.
- `{ kind: 'placeholder', label, screens }` : **emplacement à remplacer**. Affiche 1 à 3
  téléphones neutres et l'étiquette « Visuel à venir · label ». Jamais de faux écran.

## Composants (`components/projects/`)

| Composant         | Rôle                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| `ProjectHero`     | Retour aux projets, grand titre, tagline, tags, infos, visuel principal |
| `ProjectStory`    | Une idée = texte + grand visuel ; alterne gauche/droite (`mediaRight`)  |
| `ProjectHeading`  | En-tête de chapitre commun (numéro, titre accentué, texte, phrase clé)  |
| `ProjectMedia`    | Visuel ou emplacement, révélé au scroll                                 |
| `ProjectProcess`  | Frise courte Research → Prototype                                       |
| `ProjectShowcase` | Écrans finaux : texte + grand visuel, puis rangées de 1 ou 2 visuels    |
| `ProjectTools`    | Logos officiels sur tuiles douces                                       |
| `ProjectOutro`    | `ProjectConclusion` (phrase + CTA) et `ProjectNavigation` (préc./suiv.) |

`ProjectNavigation` n'affiche rien tant qu'un seul projet a une page.

## Mise en page

- Chapitres `ProjectStory` (≥ `lg`) : 2 colonnes égales, hauteur min. 36 rem ; le visuel touche
  le bord de l'écran, un seul coin intérieur arrondi (5 rem), comme la maquette. Le texte reste
  aligné sur la grille du site (`max(3rem, (100vw − 90rem)/2 + 4.5rem)`).
- Titres de chapitre : Chubbo 32 → 46 px ; texte : `text-lead` (Chillax 19 px).
- Showcase : rangée seule en 2:1 (4:3 sur mobile), paires en 4:3.

## Animations

| Élément          | Effet                                                            |
| ---------------- | ---------------------------------------------------------------- |
| Hero (texte)     | Cascade `fadeUp` (0,08 s) au chargement                          |
| Hero (visuel)    | Fondu + montée 24 px + échelle 0,98 → 1, 1 s                     |
| Textes chapitres | `Reveal` (fondu + 24 px)                                         |
| Visuels          | Fondu + zoom 1,06 → 1 dans leur cadre, 1,1 s, une fois           |
| Frise démarche   | Pointillés qui se tracent (`scaleX`), étapes en cascade (0,08 s) |
| Outils           | `Reveal` en cascade (0,07 s)                                     |
| Survols          | Flèche retour qui glisse, boutons existants (encre ↔ terracotta) |

Uniquement `opacity` / `transform`. Mouvement réduit : tout est visible d'emblée.

## Responsive

- < `lg` : texte puis visuel pour chaque chapitre, visuels arrondis dans les gouttières.
- Frise : 5 étapes sur une ligne dès 390 px (pastilles 44 px).
- Outils : 3 colonnes sur mobile, une ligne dès `sm`.
- Tab bar mobile conservée, aucun menu hamburger.

## Ajouter un projet

1. Exporter les visuels HD dans `assets-src/projects/<slug>/`, les ajouter à
   `scripts/optimize-images.mjs`, lancer `npm run images`.
2. Créer `data/case-studies/<slug>.ts` (copier `poppy.ts`) et l'ajouter au tableau
   `caseStudies` de `data/case-studies/index.ts`.
3. Dans `data/projects.ts`, passer le `href` de la carte à `/projects/<slug>`.

La route, la navigation précédent/suivant et le titre d'onglet suivent automatiquement.
