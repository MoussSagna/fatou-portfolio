import { findProjectSeo } from '@/seo/head'
import type { CaseStudy, Project } from '@/types/project'
import { projects } from '../projects'
import { exmedCaseStudy } from './exmed'
import { steSoeursCaseStudy } from './ste-soeurs'

/** Published case studies. Add a project: create its file here and register it below. */
const caseStudies: CaseStudy[] = [exmedCaseStudy, steSoeursCaseStudy]

if (import.meta.env.DEV) {
  for (const { slug } of caseStudies) {
    if (!findProjectSeo(slug)) console.warn(`[seo] "${slug}" has no entry in src/seo/data.ts`)
  }
}

export const caseStudyPath = (slug: string) => `/projects/${slug}`

export function getCaseStudy(slug: string | undefined) {
  const caseStudy = caseStudies.find((entry) => entry.slug === slug)
  const project = projects.find((entry) => entry.slug === slug)
  return caseStudy && project ? { caseStudy, project } : undefined
}

/** Previous / next projects that have a page, following the home page order. */
export function getAdjacentProjects(slug: string): { previous?: Project; next?: Project } {
  const published = projects.filter((project) =>
    caseStudies.some((entry) => entry.slug === project.slug),
  )
  const index = published.findIndex((project) => project.slug === slug)
  if (index === -1) return {}
  return { previous: published[index - 1], next: published[index + 1] }
}
