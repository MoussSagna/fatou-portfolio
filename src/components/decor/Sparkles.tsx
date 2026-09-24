import { motion, useReducedMotion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

/** Three hand-drawn emphasis strokes radiating from the bottom-left corner. */
const STROKES = ['M9 16 14 3', 'M16 23 29 15', 'M18 33 34 34'] as const

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
}
const stroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.35, ease: 'easeOut' }, opacity: { duration: 0.01 } },
  },
}

/** Decorative "✦" strokes that draw themselves once in view (mockup: title & CTA accents). */
export function Sparkles({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      className={cn('pointer-events-none', className)}
      variants={group}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true }}
    >
      {STROKES.map((d) => (
        <motion.path key={d} d={d} variants={stroke} />
      ))}
    </motion.svg>
  )
}
