import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/animations/Reveal'
import { SectionShell } from '@/components/layout/SectionShell'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { allProjectsHref, projects } from '@/data/projects'

/** Cards cascade by this step (s) when several enter the viewport together. */
const CARD_STAGGER = 0.12

export function ProjectsSection() {
  return (
    <SectionShell
      id="projets"
      eyebrow="Projets sélectionnés"
      className="lg:pt-20"
      action={
        <a
          href={allProjectsHref}
          className="group inline-flex items-center gap-2.5 rounded-sm text-[0.9375rem] font-semibold text-ink lg:text-[1.1875rem]"
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-500 ease-(--ease-out-soft) group-hover:bg-[length:0%_1px] group-hover:bg-right-bottom">
            Voir tous les projets
          </span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-5"
            aria-hidden="true"
          />
        </a>
      }
    >
      <ul className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-3 lg:mt-10">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * CARD_STAGGER}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
