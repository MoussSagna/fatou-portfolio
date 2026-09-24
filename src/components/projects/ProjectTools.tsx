import { Reveal } from '@/animations/Reveal'
import { tools as allTools } from '@/data/tools'
import type { CaseStudy } from '@/types/project'
import { ProjectHeading } from './ProjectHeading'

interface ProjectToolsProps {
  tools: CaseStudy['tools']
  number: number
}

/** Official logos on soft tiles, next to the chapter title. */
export function ProjectTools({ tools, number }: ProjectToolsProps) {
  const used = allTools.filter((tool) => tools.toolIds.includes(tool.id))

  return (
    <section
      id="outils"
      aria-labelledby="chapitre-outils"
      className="container-page grid items-center gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24"
    >
      <Reveal>
        <ProjectHeading number={number} chapter={tools} titleId="chapitre-outils" />
      </Reveal>

      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:flex sm:justify-between lg:gap-x-2 xl:gap-x-4">
        {used.map((tool, index) => (
          <li key={tool.id}>
            <Reveal delay={index * 0.07} className="flex flex-col items-center gap-3 lg:gap-4">
              <span className="grid size-20 place-items-center rounded-2xl bg-nude-50 shadow-soft lg:size-24 lg:rounded-[1.5rem] xl:size-[6.5rem]">
                <img
                  src={tool.logo}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="size-10 object-contain lg:size-12 xl:size-14"
                />
              </span>
              <span className="text-[0.8125rem] text-ink-muted lg:text-[0.9375rem]">
                {tool.name}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
