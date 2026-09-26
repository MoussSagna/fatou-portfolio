import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/animations/Reveal'
import { easeOutSoft } from '@/animations/variants'
import type { ProcessChapter } from '@/types/project'
import { ProjectHeading } from './ProjectHeading'

interface ProjectProcessProps {
  process: ProcessChapter
  number?: number
}

/** Short design process: heading + a minimal step line (dotted connector, round icons). */
export function ProjectProcess({ process, number }: ProjectProcessProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="demarche"
      aria-labelledby="chapitre-demarche"
      className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-28"
    >
      <Reveal>
        <ProjectHeading number={number} chapter={process} titleId="chapitre-demarche" />
      </Reveal>

      <ol className="relative flex justify-between">
        {/* Connector runs between the first and last circle centres. */}
        <motion.span
          aria-hidden="true"
          className="absolute top-[1.375rem] right-[10%] left-[10%] origin-left border-t-2 border-dotted border-terracotta/25 sm:top-8"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.2, ease: easeOutSoft }}
        />
        {process.steps.map(({ label, icon: Icon }, index) => (
          <li key={label} className="relative w-1/5">
            <Reveal delay={0.1 + index * 0.08} className="flex flex-col items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-blush text-terracotta ring-6 ring-nude-100 sm:size-16">
                <Icon className="size-5 sm:size-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="text-[0.75rem] font-medium text-ink sm:text-base">{label}</span>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
