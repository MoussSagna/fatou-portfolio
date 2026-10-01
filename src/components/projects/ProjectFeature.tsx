import { Reveal } from '@/animations/Reveal'
import type { FeatureSection, FeatureSubsection, FigureGroup } from '@/types/project'
import { cn } from '@/lib/utils'
import { Accented, SectionLabel } from './ProjectHeading'
import { ProjectFigure } from './ProjectFigure'
import { ProjectScreenBoard } from './ProjectScreenBoard'

/**
 * Editorial chapter: heading (with an optional step index) next to its copy,
 * then groups of real visuals whose layout varies from group to group.
 */
export function ProjectFeature({ section }: { section: FeatureSection }) {
  const titleId = `section-${section.id}`

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className={cn(section.tinted && 'bg-nude-200')}
    >
      <div className="container-page py-20 sm:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-6">
            <SectionLabel>
              {section.index && (
                <span className="mr-4 font-semibold text-terracotta sm:mr-6">{section.index}</span>
              )}
              {section.label}
            </SectionLabel>
            <h2
              id={titleId}
              className="mt-6 text-[clamp(2.5rem,1.3rem+3.8vw,5.5rem)] leading-[0.98] tracking-[-0.03em] text-balance lg:mt-8"
            >
              {section.index && <span className="sr-only">{section.index} — </span>}
              <Accented value={section.title} />
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            {section.body.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn('text-lead text-ink-muted', index > 0 && 'mt-5 lg:mt-6')}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {section.figures.map((group) => (
          <FigureRow key={group.items.map((item) => item.image.src).join('|')} group={group} />
        ))}

        {section.board && <ProjectScreenBoard board={section.board} />}

        {section.subsections?.map((subsection) => (
          <FeatureSubpart key={subsection.id} subsection={subsection} />
        ))}
      </div>
    </section>
  )
}

/**
 * Sub-part of the same chapter (same band, no new section): a hairline and a
 * smaller heading carry the story on from the visuals above.
 */
function FeatureSubpart({ subsection }: { subsection: FeatureSubsection }) {
  const titleId = `subsection-${subsection.id}`

  return (
    <div
      id={subsection.id}
      role="group"
      aria-labelledby={titleId}
      className="mt-20 scroll-mt-24 border-t border-line pt-14 lg:mt-32 lg:pt-20"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-6">
          <h3
            id={titleId}
            className="text-[clamp(2rem,1.2rem+2.4vw,3.75rem)] leading-[1.02] tracking-[-0.03em] text-balance"
          >
            <Accented value={subsection.title} />
          </h3>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          {subsection.body.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn('text-lead text-ink-muted', index > 0 && 'mt-5 lg:mt-6')}
            >
              {paragraph}
            </p>
          ))}
          {subsection.keywords && (
            <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-ink uppercase">
              {subsection.keywords.join(' · ')}
            </p>
          )}
        </Reveal>
      </div>

      {subsection.figures.map((group) => (
        <FigureRow key={group.items.map((item) => item.image.src).join('|')} group={group} />
      ))}
    </div>
  )
}

/** One group of visuals. Every layout collapses to a single column below `md` / `lg`. */
function FigureRow({ group }: { group: FigureGroup }) {
  const { layout, items } = group
  const [first, ...rest] = items
  if (!first) return null

  if (layout === 'wide' || layout === 'inset') {
    return (
      <div className={cn('mt-12 lg:mt-20', layout === 'inset' && 'lg:mx-[8.33%]')}>
        <ProjectFigure figure={first} sizes="(min-width: 1440px) 81rem, 94vw" />
      </div>
    )
  }

  if (layout === 'pair') {
    return (
      <div className="mt-12 grid items-start gap-10 md:grid-cols-12 md:gap-6 lg:mt-20 lg:gap-8">
        <ProjectFigure
          figure={first}
          sizes="(min-width: 768px) 56vw, 94vw"
          className="md:col-span-7"
        />
        {rest.map((figure) => (
          <ProjectFigure
            key={figure.image.src}
            figure={figure}
            sizes="(min-width: 768px) 40vw, 94vw"
            className="md:col-span-5 md:mt-24"
          />
        ))}
      </div>
    )
  }

  // feature / feature-reverse: one large visual + the others stacked beside it.
  return (
    <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
      <div className={cn('lg:col-span-7', layout === 'feature-reverse' && 'lg:order-2')}>
        <ProjectFigure
          figure={first}
          sizes="(min-width: 1024px) 56vw, 94vw"
          fill={Boolean(first.surface)}
          large
        />
      </div>
      <div
        className={cn(
          'flex flex-col gap-10 lg:col-span-5 lg:gap-8',
          // Screens stay in view beside a taller large visual; tiles stretch instead.
          !rest.some((figure) => figure.surface) && 'lg:sticky lg:top-28 lg:self-start',
        )}
      >
        {rest.map((figure) => (
          <ProjectFigure
            key={figure.image.src}
            figure={figure}
            sizes="(min-width: 1024px) 40vw, 94vw"
            fill={Boolean(figure.surface)}
            className={figure.surface ? 'lg:flex-1' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
