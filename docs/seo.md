# SEO

## Le problème d'une SPA React + Vite

Le site est rendu côté client : sans traitement, le HTML servi pour **toutes** les URL est le
même `index.html` (un `<div id="root">` vide). Conséquences :

- Google exécute le JavaScript, mais en différé ; le premier passage lit le HTML initial.
- Les aperçus de partage (LinkedIn, X, Slack, WhatsApp, iMessage…) **n'exécutent pas** le
  JavaScript : sans balises dans le HTML initial, pas de titre, de description ni d'image propres
  à chaque projet.

**Choix retenu : métadonnées pré-générées au build, sans changer d'architecture.** Un plugin
Vite écrit un fichier HTML par route publique, avec le `<head>` complet de cette route. Le
contenu des pages reste rendu par React (Google l'indexe après rendu). Une migration vers
Next.js ou un rendu serveur complet (SSR/SSG du contenu) n'est pas justifiée pour un portfolio
de quelques pages : elle imposerait de rendre Motion et les apparitions au scroll côté serveur,
pour un gain d'indexation marginal.

## Architecture

| Fichier                      | Rôle                                                                     |
| ---------------------------- | ------------------------------------------------------------------------ |
| `src/seo/data.ts`            | **Source unique** : personne, Home, SEO de chaque projet (données pures) |
| `src/seo/head.ts`            | Construit le `<head>` d'une route (meta, OG, X, canonical, JSON-LD)      |
| `src/seo/useSeo.ts`          | `<Seo />` : met à jour le `<head>` lors des navigations côté client      |
| `scripts/vite-plugin-seo.ts` | Build : HTML par route, `sitemap.xml`, `robots.txt`                      |
| `public/og/*.jpg`            | Images de partage 1200 × 630, générées par `npm run images`              |
| `.env.example`               | `VITE_SITE_URL` (domaine public)                                         |

`data.ts` et `head.ts` n'utilisent ni alias `@/` ni import d'asset (imports relatifs en `.ts`)
pour être chargés aussi par Node au build.

### Au build

1. `index.html` contient un marqueur `<!--seo-->`, remplacé par le `<head>` de la Home (aussi en
   dev).
2. Après le build, pour chaque projet de `projectsSeo` : `dist/projects/<slug>.html` **et**
   `dist/projects/<slug>/index.html`, copies d'`index.html` avec le `<head>` du projet. Les deux
   formes couvrent les hébergeurs à « clean URLs » (Netlify, Vercel, Cloudflare Pages, GitHub
   Pages) et les serveurs qui résolvent les dossiers.
3. `dist/sitemap.xml` (Home + projets publics) et `dist/robots.txt`.

### Côté client

`<Seo />` (Home) et `<Seo project={slug} />` (page projet) remplacent toutes les balises marquées
`data-seo` : le `<head>` correspond toujours à la page affichée, sans doublon. Les URL absolues
utilisent `VITE_SITE_URL`, ou l'origine courante à défaut.

## Métadonnées par page

| Balise                                                           | Source                                   |
| ---------------------------------------------------------------- | ---------------------------------------- |
| `<title>`, `og:title`, `twitter:title`                           | `metaTitle`                              |
| `description`, `og:description`, `twitter:description`           | `metaDescription`                        |
| `<link rel="canonical">`, `og:url`                               | `/` ou `/projects/<slug>` (`canonical`)  |
| `og:image` (+ `width`, `height`, `alt`), `twitter:image` (+ alt) | `ogImage`, `ogImageAlt`                  |
| `og:type`                                                        | `website` (Home), `article` (projets)    |
| `og:site_name`, `og:locale`                                      | `siteSeo`                                |
| `twitter:card`                                                   | `summary_large_image`                    |
| `robots`                                                         | `index, follow, max-image-preview:large` |

Pas de `meta keywords` : ignorée par Google et Bing, elle n'apporterait rien. Pas de
`twitter:site` : aucun compte X fourni.

### Textes actuels

- **Home** — « Fatou Fofana — UI/UX Designer | Design web & mobile » / « Fatou Fofana, UI/UX
  Designer spécialisée dans la conception d’interfaces web et mobile, la recherche utilisateur,
  le prototypage et les Design Systems. »
- **EXMED** — « EXMED DA OPO PHONO — UI/UX Design | Fatou Fofana »
- **Ste SŒURS** — « Ste SŒURS — Refonte UI | Fatou Fofana, UI/UX Designer »

## Données structurées (JSON-LD)

Un `@graph` par page, uniquement avec des informations fournies :

- **Person** (`#person`) : Fatou Fofana, UI/UX Designer, description, `knowsAbout` (compétences
  du texte de la Home). Pas de `sameAs` : les liens sociaux de `data/site.ts` sont encore des
  URL génériques ; pas d'e-mail ni de photo.
- **WebSite** (`#website`) : nom, langue, auteur.
- Pages projet : **CreativeWork** (nom, description, image, année, créatrice, `sourceOrganization`
  = client SACEM, `isPartOf` le site) + **BreadcrumbList** (Accueil › projet).

À vérifier après mise en ligne : <https://search.google.com/test/rich-results> et
<https://validator.schema.org>.

## Sitemap et robots

- `sitemap.xml` : `/`, `/projects/exmed`, `/projects/ste-soeurs` (généré depuis `projectsSeo`).
  Les anciennes routes (`/projects/poppy`, `/lumiere`, `/mindful`) et toute route inexistante en
  sont exclues.
- `robots.txt` : tout est autorisé, déclaration du sitemap.

## Routes

| URL                                               | Réponse du HTML                                                                    | Côté client                  |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------- |
| `/`                                               | `<head>` Home                                                                      | Home                         |
| `/projects/exmed`                                 | `<head>` EXMED                                                                     | Page EXMED                   |
| `/projects/ste-soeurs`                            | `<head>` Ste SŒURS                                                                 | Page Ste SŒURS               |
| `/projects/poppy`, `/lumiere`, `/mindful`, autres | fallback SPA (`index.html`, `<head>` Home, canonical `/`) ou 404 selon l'hébergeur | Redirection vers `/#projets` |

## Images

- Tous les visuels ont un `alt` descriptif (tiré des données, jamais de liste de mots-clés) ;
  les logos d'outils affichés à côté de leur nom ont `alt=""` (décoratifs, nom déjà lu). Les SVG
  décoratifs sont `aria-hidden`.
- AVIF + WebP en `srcset`, `width`/`height` sur chaque image (pas de CLS), `loading="lazy"`
  hors hero, `fetchPriority="high"` sur l'image du hero.
- Images de partage : JPEG 1200 × 630 (40–56 Ko) à des URL fixes dans `public/og/`.

## Performance

- La page projet est chargée à la demande (`React.lazy`) : la Home ne télécharge ni ses
  composants ni ses données (−13 Ko gzip sur le JS initial). Le bitmoji vectoriel était déjà
  chargé à la demande.
- Le JS initial restant (≈ 160 Ko gzip) est composé presque entièrement de react-dom,
  react-router et Motion. Pistes possibles, non faites car plus lourdes : `LazyMotion` + `m`
  (−20 à −30 Ko gzip, à appliquer à tous les composants animés), routeur plus léger.
- Polices : 6 fichiers woff2 auto-hébergés, `font-display: swap`, 2 préchargés (titres et texte
  courant).

## Ajouter un projet

1. Suivre [project-pages.md](project-pages.md#ajouter-un-projet) (données, visuels, page).
2. Ajouter l'image de partage dans `OG_IMAGES` de `scripts/optimize-images.mjs`
   (`public/og/<slug>.jpg`), lancer `npm run images`.
3. Ajouter une entrée dans `projectsSeo` (`src/seo/data.ts`) : `slug`, `title`, `metaTitle`
   (« Projet — angle | Fatou Fofana »), `metaDescription` (140–160 caractères, sans promesse ni
   chiffre non fourni), `ogImage`, `ogImageAlt`, `year`, `client`.

La route statique, le sitemap et le `<head>` client suivent automatiquement. En dev, un
avertissement apparaît dans la console si une étude de cas n'a pas d'entrée SEO.

## Côté hébergement (à faire)

1. **Domaine** : définir `VITE_SITE_URL` (ex. `https://www.domaine.fr`, sans `/` final) dans les
   variables d'environnement de l'hébergeur avant le build. Sans elle, le build affiche un
   avertissement et utilise `https://example.com` (à ne jamais déployer).
2. **Servir les fichiers avant le fallback SPA** : la règle « toute URL → `index.html` » ne doit
   s'appliquer qu'aux fichiers inexistants (comportement par défaut de Netlify, Vercel,
   Cloudflare Pages). Ne pas forcer la réécriture, sinon chaque projet renverrait le `<head>` de
   la Home.
3. **Anciennes URL** (`/projects/poppy`, `/lumiere`, `/mindful`) : idéalement une redirection
   301 vers `/` (ex. Netlify `_redirects` : `/projects/poppy / 301`), ou une vraie 404.
4. **Choisir une seule forme d'URL** (avec ou sans `www`, sans `/` final) et rediriger l'autre en
   301 ; c'est celle de `VITE_SITE_URL`.
5. Déclarer le site et le sitemap dans Google Search Console et Bing Webmaster Tools, puis
   tester les aperçus (LinkedIn Post Inspector, validateur de cartes X).
