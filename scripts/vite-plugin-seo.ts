/**
 * SEO at build time (see docs/seo.md). The app renders on the client, so the
 * initial HTML is the only thing social crawlers (and a first indexing pass)
 * read. This plugin:
 * - injects the home head (title, description, canonical, Open Graph, X card,
 *   JSON-LD) into index.html, in dev and build;
 * - writes one HTML file per public route (dist/projects/<slug>.html and
 *   dist/projects/<slug>/index.html) with that route's head, so every URL
 *   serves its own metadata;
 * - writes dist/sitemap.xml and dist/robots.txt.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { homeHead, publicRoutes, renderHead } from '../src/seo/head.ts'

/** Placeholder used when VITE_SITE_URL is missing — never deploy with it. */
const PLACEHOLDER_URL = 'https://example.com'
const MARKER = /<!--seo-->[\s\S]*?<!--\/seo-->|<!--seo-->/

const wrap = (head: string) => `<!--seo-->\n    ${head}\n    <!--/seo-->`

export function seo(siteUrlEnv: string | undefined): Plugin {
  const siteUrl = (siteUrlEnv || PLACEHOLDER_URL).replace(/\/$/, '')
  let outDir = 'dist'
  let isBuild = false

  return {
    name: 'portfolio-seo',
    configResolved(config) {
      outDir = config.build.outDir
      isBuild = config.command === 'build'
      if (isBuild && !siteUrlEnv) {
        config.logger.warn(
          `\n[seo] VITE_SITE_URL is not set: canonical, Open Graph and sitemap URLs use ${PLACEHOLDER_URL}. Set it before deploying (see .env.example).\n`,
        )
      }
    },
    transformIndexHtml(html) {
      return html.replace(MARKER, wrap(renderHead(homeHead(siteUrl))))
    },
    async closeBundle() {
      if (!isBuild) return
      const indexHtml = await readFile(join(outDir, 'index.html'), 'utf8')
      const routes = publicRoutes(siteUrl)

      for (const route of routes) {
        if (route.path === '/') continue
        const html = indexHtml.replace(MARKER, wrap(renderHead(route.head)))
        // /projects/x.html (clean URLs: Netlify, Vercel, Cloudflare Pages, GitHub
        // Pages…) and /projects/x/index.html (servers resolving directories).
        for (const file of [
          join(outDir, `${route.path}.html`),
          join(outDir, route.path, 'index.html'),
        ]) {
          await mkdir(dirname(file), { recursive: true })
          await writeFile(file, html)
        }
      }

      const urls = routes
        .map((route) => `  <url>\n    <loc>${route.head.canonical}</loc>\n  </url>`)
        .join('\n')
      await writeFile(
        join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      await writeFile(
        join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      )
    },
  }
}
