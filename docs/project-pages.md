# Pages projet (études de cas)

Pages publiées : **`/projects/exmed`** (EXMED DA OPO PHONO, voir [plus bas](#exmed-da-opo-phono))
et **`/projects/ste-soeurs`** (Ste SŒURS, voir [plus bas](#ste-sœurs)).

Les projets fictifs de la maquette (Poppy, Lumière, Mindful) ont été retirés le 2026-09-26 :
données, étude de cas Poppy, visuels et sources. `/projects/poppy` redirige vers `/#projets`.
Les composants du gabarit d'origine (`ProjectHero` split, `ProjectStory`, `ProjectProcess`,
`ProjectShowcase`, `ProjectMedia` et ses emplacements « Visuel à venir ») restent disponibles
pour un prochain projet, mais ne sont plus utilisés.

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

`CaseStudy` : `hero` → `sections[]` (rendues dans l'ordre) → `conclusion` (`quote`, `body?`,
`cta`).

- `hero.layout` : `'split'` (défaut, Poppy : titre + tagline + tags à gauche, visuel à droite) ou
  `'wide'` (EXMED : titre sur plusieurs lignes, sous-titre, rangée d'infos, très grand visuel
  dessous ; `imageMobile` optionnel = recadrage portrait < 640 px ; `fullImage` = visuel entier
  au ratio naturel au lieu du recadrage 16:10).
- `sections[].kind` :

| Kind        | Composant          | Rôle                                                                            |
| ----------- | ------------------ | ------------------------------------------------------------------------------- |
| `story`     | `ProjectStory`     | Chapitre texte + grand visuel, alterne gauche/droite                            |
| `process`   | `ProjectProcess`   | Frise d'icônes Research → Prototype                                             |
| `showcase`  | `ProjectShowcase`  | Écrans finaux en cadres fixes (rangées de 1 ou 2)                               |
| `tools`     | `ProjectTools`     | Logos officiels, rôle optionnel sous chaque outil (`notes`)                     |
| `intro`     | `ProjectIntro`     | Deux colonnes : phrase forte / description ; ou texte + grand visuel (`figure`) |
| `issues`    | `ProjectIssues`    | Problèmes en lignes éditoriales : numéro, grand mot-clé, une phrase             |
| `statement` | `ProjectStatement` | Une grande phrase très aérée, centrée ou alignée à gauche, bandeau optionnel    |
| `flow`      | `ProjectFlow`      | Processus métier en grandes lignes typographiques, étapes surlignées            |
| `feature`   | `ProjectFeature`   | Titre (index optionnel « 03 ») + groupes de visuels réels                       |
| `notes`     | `ProjectNotes`     | Étapes sans visuel : grand numéro, titre, texte, côte à côte                    |
| `steps`     | `ProjectSteps`     | Récapitulatif numéroté sur bandeau encre                                        |
| `facts`     | `ProjectFacts`     | Liste d'infos minimaliste (client, rôle…)                                       |

Les 4 premiers kinds sont les chapitres du gabarit d'origine, numérotés « 01. », « 02. »… dans
l'ordre d'affichage (désactivable avec `chapterNumbers: false`).

### Visuels : `ProjectMedia` et `ProjectFigure`

- `{ kind: 'image', image }` : image réelle (`ResponsiveImage`, AVIF + WebP), `object-cover`.
- `{ kind: 'placeholder', label, screens }` : **emplacement à remplacer**. Affiche 1 à 3
  téléphones neutres et l'étiquette « Visuel à venir · label ». Jamais de faux écran.
- `ProjectFigure` (sections `feature`) : image réelle **au ratio naturel**, jamais recadrée.
  Avec `surface` (couleur de fond de l'image), l'artwork est centré sur une tuile (logos) ;
  avec `zoomable`, clic → vue pleine taille dans un `<dialog>` natif (Échap, focus rendu au
  déclencheur ; < `lg` l'écran garde sa largeur d'export et se parcourt au doigt).
- Mises en page de groupe (`FigureGroup.layout`) : `wide`, `inset` (10/12 centré), `feature` /
  `feature-reverse` (1 grand + les autres empilés ; si ce sont des écrans, la colonne empilée
  reste collée à l'écran en `lg`), `pair` (7/5 décalés).
- `label` sur un visuel : grand mot en capitales au-dessus (« Boutons », « Champs »…).
- `feature` accepte `tinted` (bandeau nude).
- `feature` accepte `subsections[]` : sous-parties du même chapitre (titre H3, texte, `keywords`
  optionnels, groupes de visuels), rendues sous les visuels dans la même `<section>`, séparées
  par un filet.
- `lib/responsive-image.ts` : `responsiveImage(name, widths, size, alt)` construit les srcset à
  partir des fichiers générés par `npm run images` (erreur explicite si un fichier manque).

## Composants (`components/projects/`)

| Composant                                                                                       | Rôle                                                                    |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `ProjectHero`                                                                                   | Retour aux projets, grand titre, tagline, tags, infos, visuel principal |
| `ProjectHeroWide`                                                                               | Hero éditorial : titre en lignes, sous-titre + infos, visuel 16:10      |
| `ProjectFigure`                                                                                 | Visuel au ratio naturel, tuile d'artwork, agrandissement (lightbox)     |
| `ProjectIntro`, `ProjectFlow`, `ProjectFeature`, `ProjectNotes`, `ProjectSteps`, `ProjectFacts` | Blocs éditoriaux (voir tableau des kinds)                               |
| `ProjectStory`                                                                                  | Une idée = texte + grand visuel ; alterne gauche/droite (`mediaRight`)  |
| `ProjectHeading`                                                                                | En-tête de chapitre commun (numéro, titre accentué, texte, phrase clé)  |
| `ProjectMedia`                                                                                  | Visuel ou emplacement, révélé au scroll                                 |
| `ProjectProcess`                                                                                | Frise courte Research → Prototype                                       |
| `ProjectShowcase`                                                                               | Écrans finaux : texte + grand visuel, puis rangées de 1 ou 2 visuels    |
| `ProjectTools`                                                                                  | Logos officiels sur tuiles douces                                       |
| `ProjectOutro`                                                                                  | `ProjectConclusion` (phrase + CTA) et `ProjectNavigation` (préc./suiv.) |

`ProjectNavigation` : « Projet précédent » / « Retour aux projets » / « Projet suivant », dans
l'ordre de la Home parmi les projets publiés. N'affiche rien s'il n'y a qu'une page (cas
actuel).

## Mise en page

- Chapitres `ProjectStory` (≥ `lg`) : 2 colonnes égales, hauteur min. 36 rem ; le visuel touche
  le bord de l'écran, un seul coin intérieur arrondi (5 rem), comme la maquette. Le texte reste
  aligné sur la grille du site (`max(3rem, (100vw − 90rem)/2 + 4.5rem)`).
- Titres de chapitre : Chubbo 32 → 46 px ; texte : `text-lead` (Chillax 19 px).
- **H1 des pages projet : 72 px max** (fluide en dessous : 36 px à 320 px pour EXMED, 44 → 72 px
  pour Poppy).
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
   `scripts/optimize-images.mjs` (option `extract` pour recadrer une planche), lancer
   `npm run images`.
2. Créer `data/case-studies/<slug>.ts` (copier `poppy.ts`) et l'ajouter au tableau
   `caseStudies` de `data/case-studies/index.ts`.
3. Dans `data/projects.ts`, passer le `href` de la carte à `/projects/<slug>`.

4. Ajouter son SEO (entrée `projectsSeo` + image de partage) : voir [seo.md](seo.md#ajouter-un-projet).

La route, la navigation précédent/suivant, le `<head>` et le sitemap suivent automatiquement.

## EXMED DA OPO PHONO

Route **`/projects/exmed`** — client SACEM, rôle UI/UX Designer, 2024, UI Design & UX Design,
outils Figma · Maze · Illustrator, livrable « Refonte et création de logo ».

- Données : `data/case-studies/exmed.ts` (contenu), carte Home dans `data/projects.ts`
  (4ᵉ carte, `href: '/projects/exmed'`). Maze : `assets/tools/maze.svg` (Simple Icons, CC0),
  déclaré dans `caseStudyTools` de `data/tools.ts` → **absent du dock de la Home**.
- Textes : uniquement ceux fournis dans le brief ; les légendes décrivent ce que montrent les
  visuels. Aucun chiffre, résultat de test ou fonctionnalité ajoutés.

### Assets (`assets-src/projects/EXMED/`)

| Source                                   | Généré (`src/assets/images/`)                                      | Où                           |
| ---------------------------------------- | ------------------------------------------------------------------ | ---------------------------- |
| `0 - Home Exmed.png`                     | `exmed-home` (960/1440)                                            | Hero (16:10, calé en haut)   |
| `0 - Home Exmed.png` (recadré)           | `project-exmed` (434/868)                                          | Carte Home + hero mobile     |
| `1- Mes DA.png`                          | `exmed-list` (960/1440)                                            | 03 Interface, pleine largeur |
| `2.1 - Information sur DA.png`           | `exmed-detail` (760/1453)                                          | 03 Interface, grand visuel   |
| `tous les Logos.png` (3 découpes)        | `exmed-logo-light` / `-dark` / `-gradient` (568)                   | Identité visuelle (tuiles)   |
| `Documentation - Exmed.png` (5 découpes) | `exmed-doc-foundations`, `-states`, `-cards`, `-tables`, `-alerts` | 03 Interface                 |

Non utilisés : `Logos.png`, `Logos-1.png`, `Logos-2.png` (mêmes 3 versions du logo, exports de
308 px, moins nets que les découpes de la planche). L'image Cloudinary de référence est identique
à `0 - Home Exmed.png` (1440 × 1119) : l'asset local est utilisé.

**Absents du dossier** : moodboard, wireframes, visuels de prototype / Maze, ancien logo,
versions avant/après. Les étapes 01 Moodboard, 02 Wireframes, 04 Prototype et 05 Itérations sont
donc **typographiques** (`notes`) ; les 3 versions du logo ne sont pas présentées comme les
« deux pistes » (non identifiables dans les fichiers).

### Structure

Hero (wide) → Le projet (`intro`) → Comprendre le besoin (`flow`, bandeau nude, étapes
Identification + Qualification en terracotta = rôle d'EXMED, mention « représentation
simplifiée ») → Refonte et création de logo (`feature`, grande tuile noire + 2 tuiles blanches)
→ 01 Moodboard / 02 Wireframes (`notes`, bandeau) → 03 Interface (`feature` : liste pleine
largeur, détail + composants, documentation 10/12, tableaux + alertes) → 04 Prototype / 05
Itérations (`notes`, pastille « Testé avec Maze ») → Le processus (`steps`, bandeau encre) →
Outils (Figma, Maze, Illustrator + rôle) → Informations (`facts`) → conclusion → navigation.

### Animations

Hero : cascade titre → sous-titre → infos (0,08 s), puis visuel (fondu + 32 px + échelle
0,985 → 1, 1,1 s, délai 0,45 s). Au scroll : `Reveal` sur les textes, visuels en fondu + zoom
1,04 → 1 dans leur cadre, filets du flux et du processus qui se tracent (`scaleX`), étapes en
cascade. Survol : zoom 1,015 des écrans agrandissables et pastille « Agrandir ». Mouvement
réduit : tout est visible d'emblée.

### Responsive

< `lg` : une colonne partout ; hero mobile en recadrage portrait (cartes d'applications) ;
infos 2 × 2, 4 colonnes dès `sm`, 2 × 2 entre `lg` et `xl`, 4 dès `xl` ; flux en lignes
empilées ; `notes` côte à côte dès `md` ; processus : liste < `sm`, 2 colonnes, 5 dès `lg`.
Pastille « Agrandir » toujours visible au tactile. Vérifié à 320, 375, 390, 414, 768, 1024 et
1440 px : aucun scroll horizontal, aucune image cassée, aucune erreur console.
Captures : `comparisons/exmed-1440-full.png`, `comparisons/exmed-375-mobile.png`.

## Ste SŒURS

Route **`/projects/ste-soeurs`** — « Refonte UI du portail SACEM » : client SACEM, rôle UI/UX
Designer, 2023, UI Design, outil Figma, livrable « Refonte UI du portail SACEM ».

- Données : `data/case-studies/ste-soeurs.ts`, carte Home dans `data/projects.ts` (après EXMED).
  Navigation : EXMED ↔ Ste SŒURS.
- Textes : uniquement ceux du brief. Aucune recherche ou test utilisateur, aucun chiffre ou
  résultat. Les étapes du process ne reprennent que ce que montrent les textes et les assets.

### Assets (`assets-src/projects/STE-SOEURS/`, @2x sauf la landing)

| Source                                        | Généré                                                                                            | Où                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `landing-page.png`                            | `ste-landing` (960/1440)                                                                          | Hero (entière) + Nouvelle interface    |
| `1. soeur - Mes programmes - Setlist…`        | `ste-setlists` (960/1600/2880, bas vide retiré)                                                   | Le projet (texte + visuel)             |
| `2.2 - Ste - Declarer un programme…`          | `ste-declare` (800/1488/2976)                                                                     | Nouvelle interface (grand écran)       |
| `landing-page.png` (partie gauche, 739 × 800) | `project-ste-soeurs` (434/739)                                                                    | Carte Home                             |
| `Documentation -Ste soeur.png` (7 découpes)   | `ste-doc-forms`, `-buttons`, `-switch-stepper`, `-datepicker`, `-lists`, `-alerts`, `-typography` | Design System, Harmoniser l'expérience |

L'image Cloudinary de référence est identique (octet pour octet) à `landing-page.png`.

**Absents du dossier** : écrans de l'ancien portail (→ pas d'avant/après : section « La nouvelle
interface »), maquettes mobiles / variantes (→ section Modularité typographique), écran
« déclaration des dates » (seul le composant date picker existe), documentation des
espacements (→ « Harmoniser l'expérience » montre boutons, champs et listes seulement).
Les icônes de la planche ne sont pas présentées (petites et peu lisibles une fois découpées).

### Structure

Hero (wide : `landing-page.png` entière, ratio d'origine ; la carte de la Home en montre la partie gauche) → Le projet (`intro` + écran Setlists) → Le besoin (`issues` :
Expérience, Identité, UI, Design System) → L'objectif (`statement` centré) → La nouvelle
interface (`feature` : déclaration d'un programme + landing collée à droite) → Design System
(`feature` teinté : date picker, switch & stepper, typographie, alertes, puis sa sous-partie
**Harmoniser l'expérience** — `subsections` : filet, titre H3, « Boutons · Champs · Listes »,
visuels à grands libellés ; même bande, une seule section depuis le 2026-09-28) → Modularité
(`statement` aligné à gauche, bandeau) → Le processus (`steps`, 4 colonnes) → Outil (Figma) →
Informations → conclusion → navigation.

Animations, responsive : mêmes règles qu'EXMED. Vérifié à 320, 375, 390, 414, 768, 1024 et
1440 px (et en mouvement réduit) : aucun scroll horizontal, aucune image cassée, aucune erreur
console. Captures : `comparisons/ste-soeurs-1440-full.png`, `comparisons/ste-soeurs-375-mobile.png`.
