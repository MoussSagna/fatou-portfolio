import { useEffect, useMemo } from 'react'
import {
  findLegalSeo,
  findProjectSeo,
  homeHead,
  legalHead,
  projectHead,
  type HeadData,
} from './head.ts'

/**
 * Origin used for canonical / Open Graph URLs: VITE_SITE_URL when set (see
 * .env.example), otherwise the current origin.
 */
export const SITE_URL: string = import.meta.env.VITE_SITE_URL || window.location.origin

/**
 * Applies a route's SEO head on client navigation. The static HTML of each
 * route already contains the same tags (build plugin); they are replaced here
 * so the head always matches the page on screen.
 */
export function useSeo(head: HeadData) {
  useEffect(() => {
    const doc = document.head
    doc.querySelectorAll('[data-seo]').forEach((element) => {
      if (element.tagName !== 'TITLE') element.remove()
    })

    document.title = head.title

    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = head.canonical
    canonical.dataset.seo = ''
    doc.append(canonical)

    for (const tag of head.metas) {
      const meta = document.createElement('meta')
      meta.setAttribute(tag.key, tag.id)
      meta.content = tag.content
      meta.dataset.seo = ''
      doc.append(meta)
    }

    const jsonLd = document.createElement('script')
    jsonLd.type = 'application/ld+json'
    jsonLd.textContent = JSON.stringify(head.jsonLd)
    jsonLd.dataset.seo = ''
    doc.append(jsonLd)
  }, [head])
}

/** Home head, a project head by slug or a legal page head by path; renders nothing. */
export function Seo({ project, legal }: { project?: string; legal?: string }) {
  const head = useMemo(() => {
    const projectSeo = findProjectSeo(project)
    if (projectSeo) return projectHead(SITE_URL, projectSeo)
    const legalPageSeo = findLegalSeo(legal)
    return legalPageSeo ? legalHead(SITE_URL, legalPageSeo) : homeHead(SITE_URL)
  }, [project, legal])
  useSeo(head)
  return null
}
