import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/animations/Reveal'
import { easeOutSoft } from '@/animations/variants'
import type { IssuesSection } from '@/types/project'
import { Accented, SectionLabel } from './ProjectHeading'

/**
 * Problems as editorial rows: small number, large keyword, one sentence.
 * The keyword carries the idea; hairlines draw between rows.
 */
export function ProjectIssues({ section }: { section: IssuesSection }) {
  const titleId = `section-${section.id}`
  const reduceMotion = useReducedMotion()

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="container-page py-20 sm:py-24 lg:py-32"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-6">
          <SectionLabel>{section.label}</SectionLabel>
          <h2
            id={titleId}
            className="mt-6 text-[clamp(2.5rem,1.3rem+3.8vw,5.5rem)] leading-[0.98] tracking-[-0.03em] lg:mt-8"
          >
            <Accented value={section.title} />
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <p className="text-[1.1875rem] leading-relaxed text-ink lg:text-xl">{section.lead}</p>
        </Reveal>
      </div>

      <ol className="mt-14 lg:mt-20">
        {section.items.map((item, index) => (
          <li key={item.keyword} className="relative">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-ink/15"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: easeOutSoft }}
            />
            <Reveal
              delay={0.08}
              className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:items-baseline lg:py-10"
            >
              <span className="text-sm font-medium text-terracotta tabular-nums md:col-span-1 md:text-[0.9375rem]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[clamp(2rem,1.1rem+3vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-ink uppercase md:col-span-6">
                {item.keyword}
              </h3>
              <p className="max-w-[30rem] text-lead text-ink-muted md:col-span-5">{item.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <span aria-hidden="true" className="block h-px bg-ink/15" />
    </section>
  )
}
