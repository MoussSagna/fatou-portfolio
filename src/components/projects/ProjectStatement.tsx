import { Reveal } from '@/animations/Reveal'
import type { StatementSection } from '@/types/project'
import { cn } from '@/lib/utils'
import { Accented, SectionLabel } from './ProjectHeading'

/** One large sentence with a lot of air around it, centred or left-aligned. */
export function ProjectStatement({ section }: { section: StatementSection }) {
  const titleId = `section-${section.id}`
  const centered = section.align !== 'left'

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className={cn(section.tinted && 'bg-nude-200')}
    >
      <Reveal
        className={cn(
          'container-page py-24 sm:py-32 lg:py-44',
          centered && 'flex flex-col items-center text-center',
        )}
      >
        {section.title ? (
          <>
            <SectionLabel>{section.label}</SectionLabel>
            <h2
              id={titleId}
              className="mt-6 text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-balance lg:mt-8"
            >
              {section.title}
            </h2>
          </>
        ) : (
          <SectionLabel as="h2" id={titleId}>
            {section.label}
          </SectionLabel>
        )}
        <p
          className={cn(
            'mt-8 font-display text-[clamp(2rem,1rem+3.6vw,5rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance text-ink lg:mt-12',
            centered ? 'max-w-[62rem]' : 'max-w-[56rem]',
          )}
        >
          <Accented value={section.quote} />
        </p>
        {section.body && (
          <p
            className={cn(
              'mt-8 max-w-[36rem] text-[1.1875rem] leading-relaxed text-ink-muted lg:mt-12 lg:text-xl',
              !centered && 'lg:ml-[33%]',
            )}
          >
            {section.body}
          </p>
        )}
      </Reveal>
    </section>
  )
}
