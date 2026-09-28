import { Reveal } from '@/animations/Reveal'
import type { IntroSection } from '@/types/project'
import { cn } from '@/lib/utils'
import { Accented, SectionLabel } from './ProjectHeading'
import { ProjectFigure } from './ProjectFigure'

/**
 * Two columns: a short, large statement on the left, the description on the
 * right — or, with a `figure`, statement + description on the left and a
 * large visual on the right.
 */
export function ProjectIntro({ section }: { section: IntroSection }) {
  const titleId = `section-${section.id}`
  const [lead, ...rest] = section.body
  const { figure } = section

  const description = (
    <>
      {lead && <p className="text-[1.1875rem] leading-relaxed text-ink lg:text-xl">{lead}</p>}
      {rest.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-lead text-ink-muted lg:mt-6">
          {paragraph}
        </p>
      ))}
    </>
  )

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className={cn(
        'container-page grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-36',
        figure && 'lg:items-center',
      )}
    >
      <Reveal className={figure ? 'lg:col-span-5' : 'lg:col-span-7 xl:col-span-6'}>
        <SectionLabel as="h2" id={titleId}>
          {section.label}
        </SectionLabel>
        <p className="mt-7 font-display text-[clamp(1.875rem,1.2rem+2.3vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance text-ink lg:mt-9">
          <Accented value={section.statement} />
        </p>
        {figure && <div className="mt-8 lg:mt-10">{description}</div>}
      </Reveal>

      {figure ? (
        <div className="lg:col-span-7">
          <ProjectFigure figure={figure} sizes="(min-width: 1024px) 56vw, 94vw" />
        </div>
      ) : (
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          {description}
        </Reveal>
      )}
    </section>
  )
}
