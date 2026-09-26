import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/animations/Reveal'
import { easeOutSoft } from '@/animations/variants'
import type { FlowSection } from '@/types/project'
import { cn } from '@/lib/utils'
import { Accented, SectionLabel } from './ProjectHeading'

/**
 * Business flow as large type, one line per step; highlighted steps (the
 * product's scope) are set in terracotta. A visual simplification, labelled
 * as such by `note`.
 */
export function ProjectFlow({ section }: { section: FlowSection }) {
  const titleId = `section-${section.id}`
  const reduceMotion = useReducedMotion()
  const last = section.steps.length - 1

  return (
    <section id={section.id} aria-labelledby={titleId} className="bg-nude-200">
      <div className="container-page grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <Reveal className="lg:col-span-4">
          <SectionLabel>{section.label}</SectionLabel>
          <h2
            id={titleId}
            className="mt-6 text-[clamp(2.5rem,1.5rem+3vw,4.5rem)] leading-[0.98] tracking-[-0.03em] lg:mt-8"
          >
            <Accented value={section.title} />
          </h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-6 max-w-[26rem] text-lead text-ink-muted lg:mt-8">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <ol>
            {section.steps.map((step, index) => (
              <li key={step.label} className="relative">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-ink/15"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.9, delay: index * 0.1, ease: easeOutSoft }}
                />
                <Reveal
                  delay={0.1 + index * 0.1}
                  className="flex items-center gap-5 py-6 sm:gap-8 lg:py-8"
                >
                  <span
                    className={cn(
                      'w-7 shrink-0 text-sm font-medium tabular-nums sm:w-8 sm:text-[0.9375rem]',
                      step.highlight ? 'text-terracotta' : 'text-ink-muted',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'font-display text-[clamp(1.625rem,1rem+2.2vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.02em] text-balance',
                      step.highlight ? 'text-terracotta' : 'text-ink',
                    )}
                  >
                    {step.label}
                  </span>
                  {index < last && (
                    <ArrowDown
                      className="ml-auto size-5 shrink-0 text-ink-muted/70 sm:size-6"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
          <span aria-hidden="true" className="block h-px bg-ink/15" />

          <Reveal delay={0.2} className="mt-6 space-y-2 text-[0.9375rem] lg:mt-8">
            {section.highlightLabel && (
              <p className="flex items-start gap-3 text-ink">
                <span
                  aria-hidden="true"
                  className="mt-[0.45em] size-2 shrink-0 rounded-full bg-terracotta"
                />
                {section.highlightLabel}
              </p>
            )}
            <p className="pl-5 text-ink-muted">{section.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
