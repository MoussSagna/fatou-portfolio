/**
 * Builds the SEO `<head>` of each public route from src/seo/data.ts. Pure
 * functions: used by the client (useSeo) and by the build (per-route HTML,
 * sitemap). See docs/seo.md.
 */
import {
  homeSeo,
  legalSeo,
  person,
  projectsSeo,
  siteSeo,
  type LegalSeo,
  type PageSeo,
  type ProjectSeo,
} from './data.ts'

export interface HeadTag {
  /** `name` (description, twitter:*) or `property` (og:*). */
  key: 'name' | 'property'
  id: string
  content: string
}

export interface HeadData {
  title: string
  canonical: string
  metas: HeadTag[]
  jsonLd: Record<string, unknown>
}

type JsonLdNode = Record<string, unknown>

/** Absolute URL of a path on the site (no trailing slash except the root). */
export const absoluteUrl = (siteUrl: string, path: string) =>
  new URL(path, `${siteUrl.replace(/\/$/, '')}/`).href

export const projectPath = (project: ProjectSeo) => project.canonical ?? `/projects/${project.slug}`

function pageHead(
  siteUrl: string,
  path: string,
  page: PageSeo,
  type: 'website' | 'article',
  graph: JsonLdNode[],
): HeadData {
  const url = absoluteUrl(siteUrl, path)
  const image = absoluteUrl(siteUrl, page.ogImage)
  const meta = (key: HeadTag['key'], id: string, content: string): HeadTag => ({ key, id, content })

  return {
    title: page.metaTitle,
    canonical: url,
    metas: [
      meta('name', 'description', page.metaDescription),
      meta('name', 'robots', 'index, follow, max-image-preview:large'),
      meta('property', 'og:type', type),
      meta('property', 'og:site_name', siteSeo.siteName),
      meta('property', 'og:locale', siteSeo.locale),
      meta('property', 'og:title', page.metaTitle),
      meta('property', 'og:description', page.metaDescription),
      meta('property', 'og:url', url),
      meta('property', 'og:image', image),
      meta('property', 'og:image:width', '1200'),
      meta('property', 'og:image:height', '630'),
      meta('property', 'og:image:alt', page.ogImageAlt),
      meta('name', 'twitter:card', 'summary_large_image'),
      meta('name', 'twitter:title', page.metaTitle),
      meta('name', 'twitter:description', page.metaDescription),
      meta('name', 'twitter:image', image),
      meta('name', 'twitter:image:alt', page.ogImageAlt),
    ],
    jsonLd: { '@context': 'https://schema.org', '@graph': graph },
  }
}

/** Person + WebSite, shared by every page (referenced by @id). */
function identityGraph(siteUrl: string): JsonLdNode[] {
  const home = absoluteUrl(siteUrl, '/')
  return [
    {
      '@type': 'Person',
      '@id': `${home}#person`,
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.description,
      knowsAbout: person.knowsAbout,
      url: home,
    },
    {
      '@type': 'WebSite',
      '@id': `${home}#website`,
      url: home,
      name: siteSeo.siteName,
      inLanguage: siteSeo.language,
      author: { '@id': `${home}#person` },
    },
  ]
}

export function homeHead(siteUrl: string): HeadData {
  return pageHead(siteUrl, '/', homeSeo, 'website', identityGraph(siteUrl))
}

export function projectHead(siteUrl: string, project: ProjectSeo): HeadData {
  const home = absoluteUrl(siteUrl, '/')
  const url = absoluteUrl(siteUrl, projectPath(project))

  return pageHead(siteUrl, projectPath(project), project, 'article', [
    ...identityGraph(siteUrl),
    {
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      name: project.title,
      headline: project.metaTitle,
      description: project.metaDescription,
      url,
      image: absoluteUrl(siteUrl, project.ogImage),
      dateCreated: project.year,
      inLanguage: siteSeo.language,
      creator: { '@id': `${home}#person` },
      // The organization the work was produced for.
      sourceOrganization: { '@type': 'Organization', name: project.client },
      isPartOf: { '@id': `${home}#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: home },
        { '@type': 'ListItem', position: 2, name: project.title, item: url },
      ],
    },
  ])
}

export function legalHead(siteUrl: string, page: LegalSeo): HeadData {
  const home = absoluteUrl(siteUrl, '/')
  return pageHead(siteUrl, page.path, page, 'website', [
    ...identityGraph(siteUrl),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: home },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.title,
          item: absoluteUrl(siteUrl, page.path),
        },
      ],
    },
  ])
}

export const findLegalSeo = (path: string | undefined) =>
  legalSeo.find((page) => page.path === path)

export const findProjectSeo = (slug: string | undefined) =>
  projectsSeo.find((project) => project.slug === slug)

/** Every public route with its head, for the build (HTML files, sitemap). */
export function publicRoutes(siteUrl: string): { path: string; head: HeadData }[] {
  return [
    { path: '/', head: homeHead(siteUrl) },
    ...projectsSeo.map((project) => ({
      path: projectPath(project),
      head: projectHead(siteUrl, project),
    })),
    ...legalSeo.map((page) => ({ path: page.path, head: legalHead(siteUrl, page) })),
  ]
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Head markup for the static HTML files. Every tag carries `data-seo` so the client can replace it. */
export function renderHead(head: HeadData): string {
  const lines = [
    `<title data-seo>${escapeHtml(head.title)}</title>`,
    `<link data-seo rel="canonical" href="${escapeHtml(head.canonical)}" />`,
    ...head.metas.map(
      (tag) => `<meta data-seo ${tag.key}="${tag.id}" content="${escapeHtml(tag.content)}" />`,
    ),
    // `<` escaped so the JSON can never close the script element.
    `<script data-seo type="application/ld+json">${JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
  return lines.join('\n    ')
}
