import { motion, useReducedMotion, type Variants } from 'motion/react'
import { easeOutSoft } from '@/animations/variants'
import { cn } from '@/lib/utils'
import type { Experience } from '@/types/experience'

/** Horizontal offset (px) of each badge, repeated: the line gently waves (mockup). */
const BADGE_OFFSETS = [0, 10, -6] as const
/** Vertical gap between steps (40 / 24 px): the segment height adds the same amount. */
const STEP_GAP = 'gap-10 lg:gap-6'

const badge: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 20 } },
}
const segment: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.9, ease: 'easeInOut', delay: 0.25 } },
}
const connector: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.45, ease: easeOutSoft, delay: 0.2 } },
}
const content: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOutSoft, delay: 0.3 } },
}

/**
 * Vertical career timeline. Each step draws its own segment down to the next
 * badge, so the line follows the content height without any measuring.
 * On scroll: badge pops, connector and segment draw, text slides in.
 */
export function Timeline({ items }: { items: Experience[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <ol className={cn('flex flex-col', STEP_GAP)}>
      {items.map((item, index) => {
        const offset = BADGE_OFFSETS[index % BADGE_OFFSETS.length] ?? 0
        const nextOffset = BADGE_OFFSETS[(index + 1) % BADGE_OFFSETS.length] ?? 0
        const isLast = index === items.length - 1
        const isCurrent = item.end === null
        const Icon = item.icon

        return (
          <motion.li
            key={item.id}
            className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[5.5rem_2.5rem_minmax(0,1fr)] sm:gap-x-0 lg:grid-cols-[5.5rem_3.5rem_minmax(0,1fr)]"
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          >
            {!isLast && (
              <svg
                aria-hidden="true"
                viewBox="0 0 40 100"
                preserveAspectRatio="none"
                className="absolute top-9 left-[calc(2.25rem-20px)] h-[calc(100%+40px)] w-10 overflow-visible sm:top-11 sm:left-[calc(2.75rem-20px)] lg:h-[calc(100%+24px)]"
              >
                <motion.path
                  d={`M${20 + offset} 0 C${20 + offset} 50 ${20 + nextOffset} 50 ${20 + nextOffset} 100`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  className="text-ink/25"
                  variants={segment}
                />
              </svg>
            )}

            <motion.span
              variants={badge}
              style={{ x: offset }}
              className="relative z-10 grid size-[4.5rem] place-items-center rounded-full border-[5px] border-nude-50 bg-blush shadow-soft sm:size-[5.5rem]"
            >
              <Icon aria-hidden="true" strokeWidth={1.6} className="size-6 text-ink sm:size-7" />
            </motion.span>

            <span aria-hidden="true" className="hidden items-center sm:mt-11 sm:flex sm:h-0">
              <motion.span
                variants={connector}
                style={{ x: offset }}
                className="flex h-px flex-1 origin-left items-center bg-ink/25"
              >
                <span
                  className={cn(
                    'ml-auto size-1.5 translate-x-1/2 rounded-full',
                    isCurrent ? 'bg-coral' : 'bg-ink/35',
                  )}
                />
              </motion.span>
            </span>

            <motion.div variants={content} className="pt-2 sm:pt-6 sm:pl-5">
              <p className="text-[0.9375rem] text-ink-muted lg:text-lg">
                <time dateTime={String(item.start)}>{item.start}</time> –{' '}
                {item.end === null ? (
                  'Aujourd’hui'
                ) : (
                  <time dateTime={String(item.end)}>{item.end}</time>
                )}
                <span className="sr-only">{isCurrent ? ' (poste actuel)' : ''}</span>
              </p>
              <h3 className="mt-1 font-sans text-lg font-semibold text-ink lg:text-[1.375rem]">
                {item.role}
              </h3>
              <p className="mt-1 text-[0.9375rem] text-ink-muted lg:text-lg">{item.company}</p>
              <p className="mt-2 max-w-[31rem] text-[0.9375rem] leading-relaxed text-ink-muted/85 lg:text-lg">
                {item.description}
              </p>
            </motion.div>
          </motion.li>
        )
      })}
    </ol>
  )
}
