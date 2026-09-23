# Typographie

| Rôle                        | Police      | Graisses chargées | Classe               |
| --------------------------- | ----------- | ----------------- | -------------------- |
| Titres, hero, logo          | **Chubbo**  | 400, 500, 700     | `font-display`       |
| Texte, nav, boutons, labels | **Chillax** | 400, 500, 600     | `font-sans` (défaut) |

Les deux polices viennent de [Fontshare](https://www.fontshare.com) (Indian Type Foundry,
**ITF Free Font License** : usage personnel et commercial gratuit).

## Fichiers

- `public/fonts/*.woff2` — self-hostés (≈ 140 Ko au total), `font-display: swap`.
- `src/styles/fonts.css` — déclarations `@font-face`.
- `index.html` — `preload` de `chubbo-700` et `chillax-400` (polices du hero).

Pour ajouter une graisse : télécharger le woff2 depuis Fontshare, le placer dans `public/fonts/`
et ajouter un `@font-face`. Fallbacks : Chubbo → Chillax → system-ui.

## Échelle (fluide, référence 1440 px)

| Token          | Min → Max  | Interligne | Approche  | Usage               |
| -------------- | ---------- | ---------- | --------- | ------------------- |
| `text-display` | 40 → 76 px | 0,96       | −0,015 em | Titre du hero       |
| `text-h2`      | 36 → 64 px | 1          | −0,03 em  | Titres de section   |
| `text-h3`      | 24 → 32 px | 1,1        | —         | Titres de cartes    |
| `text-lead`    | 16 → 19 px | 1,7        | —         | Paragraphes d'intro |
| `text-eyebrow` | 13 px      | 1          | 0,36 em   | Labels en capitales |

`text-display` et `text-lead` sont aussi plafonnés par la **hauteur** d'écran (`7.4svh` et
`2.3svh`) pour que le hero tienne sans scroll sur les écrans bas.

`text-h2` et `text-h3` seront recalibrés sur la maquette dans leurs sprints respectifs.

## Écart connu avec la maquette

La maquette utilise une sans géométrique grasse pour les titres. **Chubbo** a un dessin
différent (formes plus rondes, légèrement « soft serif ») et **Chillax** a une hauteur d'x plus
petite que la police de texte de la maquette. Elles sont conservées comme demandé ; les tailles ont
été **calées sur les largeurs de ligne mesurées** dans la maquette (ex. « en expériences »
≈ 606 px à 1440 px), de sorte que les retours à la ligne et les masses restent identiques.
