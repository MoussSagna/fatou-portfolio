import { motion, type Variants } from 'motion/react'
import { Reveal } from '@/animations/Reveal'
import type { FactsSection, ProjectFact } from '@/types/project'
import { cn } from '@/lib/utils'
import { SectionLabel } from './ProjectHeading'

interface FactListProps {
  facts: ProjectFact[]
  className?: string
  /** Motion variants of each fact (hero cascade); static when omitted. */
  itemVariants?: Variants
}

/** "CLIENT / SACEM" pairs as a description list. */
export function FactList({ facts, className, itemVariants }: FactListProps) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-7', className)}>
      {facts.map(({ label, value }) => (
        <motion.div key={label} variants={itemVariants}>
          <dt className="text-[0.6875rem] font-medium tracking-[0.28em] text-ink-muted uppercase">
            {label}
          </dt>
          <dd className="mt-2 text-base leading-snug font-medium text-ink lg:mt-3 lg:text-lg">
            {value}
          </dd>
        </motion.div>
      ))}
    </dl>
  )
}

/** Minimal closing block of project facts. */
export function ProjectFacts({ section }: { section: FactsSection }) {
  const titleId = `section-${section.id}`

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="container-page grid gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24"
    >
      <Reveal className="lg:col-span-4">
        <SectionLabel as="h2" id={titleId}>
          {section.label}
        </SectionLabel>
      </Reveal>
      <Reveal delay={0.08} className="lg:col-span-8">
        <FactList facts={section.facts} className="grid-cols-2 sm:grid-cols-3 sm:gap-y-10" />
      </Reveal>
    </section>
  )
}
