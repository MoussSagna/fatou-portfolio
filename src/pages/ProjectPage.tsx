import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router'
import { ProjectHero } from '@/components/projects/ProjectHero'
import { ProjectConclusion, ProjectNavigation } from '@/components/projects/ProjectOutro'
import { ProjectProcess } from '@/components/projects/ProjectProcess'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { ProjectStory } from '@/components/projects/ProjectStory'
import { ProjectTools } from '@/components/projects/ProjectTools'
import { getAdjacentProjects, getCaseStudy } from '@/data/case-studies'
import { site } from '@/data/site'

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
  const { story, process, showcase, tools, conclusion, hero } = caseStudy
  const { previous, next } = getAdjacentProjects(project.slug)

  return (
    <article>
      <ProjectHero project={project} hero={hero} />
      {story.map((chapter, index) => (
        <ProjectStory
          key={chapter.id}
          chapter={chapter}
          number={index + 1}
          mediaRight={index % 2 === 1}
        />
      ))}
      <ProjectProcess process={process} number={story.length + 1} />
      <ProjectShowcase showcase={showcase} number={story.length + 2} />
      <ProjectTools tools={tools} number={story.length + 3} />
      <ProjectConclusion conclusion={conclusion} />
      <ProjectNavigation previous={previous} next={next} />
    </article>
  )
}
