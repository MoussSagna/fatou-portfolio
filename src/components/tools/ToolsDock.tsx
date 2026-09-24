import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Tool } from '@/types/skills'

/** Cursor distance (px) over which neighbours are magnified. */
const DOCK_RANGE = 260
/** Scale / lift of the icon right under the cursor. */
const DOCK_MAX_SCALE = 1.35
const DOCK_LIFT = -10
const DOCK_SPRING = { stiffness: 320, damping: 24, mass: 0.35 }

/** Entrance: icons pop in one after another with a small spring overshoot. */
const pop: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 17, delay: 0.1 + index * 0.07 },
  }),
}

interface ToolsDockProps {
  tools: Tool[]
}

/**
 * Software row with a macOS-dock feel: on a mouse, icons near the cursor grow
 * and lift on springs. Touch devices get the entrance + a tap bounce; reduced
 * motion gets a static row.
 */
export function ToolsDock({ tools }: ToolsDockProps) {
  const reduceMotion = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const magnify = finePointer && !reduceMotion
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <motion.ul
      aria-label="Logiciels maîtrisés"
      className="grid grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-8 md:grid-cols-8 md:gap-x-2 lg:flex lg:items-end lg:justify-between lg:px-4"
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      onMouseMove={magnify ? (event) => mouseX.set(event.clientX) : undefined}
      onMouseLeave={magnify ? () => mouseX.set(Number.POSITIVE_INFINITY) : undefined}
    >
      {tools.map((tool, index) => (
        <motion.li key={tool.id} custom={index} variants={pop} className="flex justify-center">
          <DockItem tool={tool} mouseX={mouseX} />
        </motion.li>
      ))}
    </motion.ul>
  )
}

function DockItem({ tool, mouseX }: { tool: Tool; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect()
    return box ? x - (box.left + box.width / 2) : Number.POSITIVE_INFINITY
  })
  const scale = useSpring(
    useTransform(distance, [-DOCK_RANGE, 0, DOCK_RANGE], [1, DOCK_MAX_SCALE, 1]),
    DOCK_SPRING,
  )
  const y = useSpring(
    useTransform(distance, [-DOCK_RANGE, 0, DOCK_RANGE], [0, DOCK_LIFT, 0]),
    DOCK_SPRING,
  )

  return (
    <motion.div
      ref={ref}
      whileTap={{ scale: 0.9 }}
      className="group flex flex-col items-center gap-3 lg:gap-4"
    >
      <motion.img
        src={tool.logo}
        alt=""
        width={56}
        height={56}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ scale, y, originY: 1 }}
        className="size-11 object-contain select-none sm:size-12 lg:size-14"
      />
      <span className="text-[0.8125rem] text-ink-muted transition-colors duration-300 group-hover:text-ink lg:text-[0.9375rem]">
        {tool.name}
      </span>
    </motion.div>
  )
}
