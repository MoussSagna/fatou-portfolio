import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { revealUp } from './variants'

type RevealProps = Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'variants'> & {
  /** Seconds to wait once in view — used to cascade siblings. */
  delay?: number
}

/**
 * Fades and lifts its content the first time it enters the viewport.
 * With prefers-reduced-motion the content is rendered as is: no fade, nothing
 * hidden — visibility never depends on the animation.
 */
export function Reveal({ delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={revealUp(delay)}
      {...props}
    />
  )
}
