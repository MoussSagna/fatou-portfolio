import { useId } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import biggerImpact from '@/assets/notes/bigger-impact.svg'
import sameGoal from '@/assets/notes/same-goal.svg'
import { cn } from '@/lib/utils'

/** Each line is uncovered left → right, one after the other, like handwriting. */
const write = (width: number, delay: number, duration: number): Variants => ({
  hidden: { width: 0 },
  visible: { width, transition: { duration, delay, ease: [0.45, 0.05, 0.4, 1] } },
})
const heart: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.6, delay: 1.9, ease: 'easeInOut' },
      opacity: { duration: 0.01, delay: 1.9 },
    },
  },
}

/**
 * "Same goal / Bigger impact ♡" — script lines are SVG outlines (Dawning of a
 * New Day, OFL) loaded as images, so no font is downloaded. Writes itself in
 * once when scrolled into view.
 */
export function HandwrittenNote({ className }: { className?: string }) {
  const id = useId()
  const reduceMotion = useReducedMotion()

  return (
    <motion.svg
      role="img"
      aria-label="Same goal, bigger impact"
      viewBox="-4 0 256 132"
      className={cn('-rotate-[14deg] text-ink-muted', className)}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <defs>
        <clipPath id={`${id}-l1`}>
          <motion.rect x={-2} y={0} height={62} width={168} variants={write(168, 0.2, 0.9)} />
        </clipPath>
        <clipPath id={`${id}-l2`}>
          <motion.rect x={32} y={48} height={60} width={216} variants={write(216, 1.05, 1)} />
        </clipPath>
      </defs>
      <image href={sameGoal} x={-2} y={2} width={166} height={57} clipPath={`url(#${id}-l1)`} />
      <image
        href={biggerImpact}
        x={32}
        y={51}
        width={216}
        height={53}
        clipPath={`url(#${id}-l2)`}
      />
      <motion.path
        d="M214 126c-6-4-11-9-10-14 1-4 6-5 9-1 2-4 8-4 9 0 1 5-3 10-8 15"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={heart}
      />
    </motion.svg>
  )
}
