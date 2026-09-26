import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router'
import { ProjectFacts } from '@/components/projects/ProjectFacts'
import { ProjectFeature } from '@/components/projects/ProjectFeature'
import { ProjectFlow } from '@/components/projects/ProjectFlow'
import { ProjectHero } from '@/components/projects/ProjectHero'
import { ProjectHeroWide } from '@/components/projects/ProjectHeroWide'
import { ProjectIntro } from '@/components/projects/ProjectIntro'
import { ProjectNotes } from '@/components/projects/ProjectNotes'
import { ProjectConclusion, ProjectNavigation } from '@/components/projects/ProjectOutro'
import { ProjectProcess } from '@/components/projects/ProjectProcess'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { ProjectSteps } from '@/components/projects/ProjectSteps'
import { ProjectStory } from '@/components/projects/ProjectStory'
import { ProjectTools } from '@/components/projects/ProjectTools'
import { getAdjacentProjects, getCaseStudy } from '@/data/case-studies'
import { site } from '@/data/site'
import type { CaseStudy } from '@/types/project'

/** Case study template (/projects/:slug) — content comes from data/case-studies. */
export function ProjectPage() {
  const { slug } = useParams()
  const entry = getCaseStudy(slug)
  const title = entry?.project.title

  useEffect(() => {
    if (!title) return
    const previousTitle = document.title
    document.title = `${title} — ${site.name}, ${site.role}`
    return () => {
      document.title = previousTitle
    }
  }, [title])

  if (!entry) return <Navigate to="/#projets" replace />

  const { project, caseStudy } = entry
  const { hero, conclusion } = caseStudy
  const { previous, next } = getAdjacentProjects(project.slug)

  return (
    <article>
      {hero.layout === 'wide' ? (
        <ProjectHeroWide hero={hero} />
      ) : (
        <ProjectHero project={project} hero={hero} />
      )}
      <CaseStudySections caseStudy={caseStudy} />
      <ProjectConclusion conclusion={conclusion} />
      <ProjectNavigation previous={previous} next={next} />
    </article>
  )
}

/**
 * Renders the body in order. Template chapters are numbered "01.", "02."… in
 * display order (unless `chapterNumbers` is false); story chapters alternate
 * their visual left / right.
 */
function CaseStudySections({ caseStudy }: { caseStudy: CaseStudy }) {
  const numbered = caseStudy.chapterNumbers !== false
  let chapterCount = 0
  let storyCount = 0
  const nextNumber = () => (numbered ? ++chapterCount : undefined)

  return caseStudy.sections.map((section) => {
    switch (section.kind) {
      case 'story': {
        const mediaRight = storyCount++ % 2 === 1
        return (
          <ProjectStory
            key={section.chapter.id}
            chapter={section.chapter}
            number={nextNumber()}
            mediaRight={mediaRight}
          />
        )
      }
      case 'process':
        return <ProjectProcess key="process" process={section.chapter} number={nextNumber()} />
      case 'showcase':
        return <ProjectShowcase key="showcase" showcase={section.chapter} number={nextNumber()} />
      case 'tools':
        return <ProjectTools key="tools" tools={section.chapter} number={nextNumber()} />
      case 'intro':
        return <ProjectIntro key={section.id} section={section} />
      case 'flow':
        return <ProjectFlow key={section.id} section={section} />
      case 'feature':
        return <ProjectFeature key={section.id} section={section} />
      case 'notes':
        return <ProjectNotes key={section.id} section={section} />
      case 'steps':
        return <ProjectSteps key={section.id} section={section} />
      case 'facts':
        return <ProjectFacts key={section.id} section={section} />
    }
  })
}
