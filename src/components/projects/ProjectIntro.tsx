import { Reveal } from '@/animations/Reveal'
import type { IntroSection } from '@/types/project'
import { Accented, SectionLabel } from './ProjectHeading'

/** Two columns: a short, large statement on the left, the description on the right. */
export function ProjectIntro({ section }: { section: IntroSection }) {
  const titleId = `section-${section.id}`
  const [lead, ...rest] = section.body

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="container-page grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-36"
    >
      <Reveal className="lg:col-span-7 xl:col-span-6">
        <SectionLabel as="h2" id={titleId}>
          {section.label}
        </SectionLabel>
        <p className="mt-7 font-display text-[clamp(1.875rem,1.2rem+2.3vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance text-ink lg:mt-9">
          <Accented value={section.statement} />
        </p>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-16">
        {lead && <p className="text-[1.1875rem] leading-relaxed text-ink lg:text-xl">{lead}</p>}
        {rest.map((paragraph) => (
          <p key={paragraph} className="mt-5 text-lead text-ink-muted lg:mt-6">
            {paragraph}
          </p>
        ))}
      </Reveal>
    </section>
  )
}
