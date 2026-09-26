import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/animations/Reveal'
import { easeOutSoft } from '@/animations/variants'
import type { StepsSection } from '@/types/project'
import { Accented, SectionLabel } from './ProjectHeading'

/**
 * Process recap on a dark band: large numbers, a hairline that draws above
 * each step, label and one line. Five columns from `lg`, a list below.
 */
export function ProjectSteps({ section }: { section: StepsSection }) {
  const titleId = `section-${section.id}`
  const reduceMotion = useReducedMotion()

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="container-page pb-16 sm:pb-20 lg:pb-28"
    >
      <div className="rounded-[1.75rem] bg-ink px-6 py-16 text-nude-100 sm:rounded-[2.5rem] sm:px-10 sm:py-20 lg:rounded-[3rem] lg:px-16 lg:py-24">
        <Reveal>
          <SectionLabel inverted>{section.label}</SectionLabel>
          <h2
            id={titleId}
            className="mt-6 text-[clamp(2.5rem,1.3rem+3.8vw,5.5rem)] leading-[0.98] tracking-[-0.03em] text-nude-100 lg:mt-8 [&_span]:text-coral"
          >
            <Accented value={section.title} />
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:mt-20 lg:grid-cols-5 lg:gap-x-8">
          {section.steps.map((step, index) => (
            <li key={step.label} className="relative pt-6 lg:pt-8">
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-nude-100/25"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: easeOutSoft }}
              />
              <Reveal
                delay={0.1 + index * 0.08}
                className="grid grid-cols-[4.5rem_1fr] gap-x-4 sm:block"
              >
                <span className="font-display text-[clamp(2.75rem,2rem+2.4vw,4.5rem)] leading-none font-bold tracking-[-0.03em] text-coral tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="sm:mt-8">
                  <h3 className="font-sans text-sm font-semibold tracking-[0.24em] text-nude-100 uppercase">
                    {step.label}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-nude-100/70">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
