import { motion, useReducedMotion } from 'motion/react'
import { easeOutSoft } from '@/animations/variants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { ScreenBoard } from '@/types/project'
import { PhoneMockup } from './PhoneMockup'

/**
 * Mobile screens in phones on a rounded board. From `lg`: staggered columns
 * cropped by the board, each phone placed by its `position`. Below: the same
 * phones whole, in reading order, in a row that swipes inside the board (no
 * page overflow). Revealed once, like the other visuals.
 */
export function ProjectScreenBoard({ board }: { board: ScreenBoard }) {
  const reduceMotion = useReducedMotion()
  // The row only scrolls below lg: it is a tab stop there, for keyboard scrolling.
  const composed = useMediaQuery('(min-width: 1024px)')

  return (
    <div
      className="mt-12 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:mt-20 lg:rounded-[2.5rem]"
      style={{ backgroundColor: board.surface }}
    >
      <motion.ul
        aria-label="Écrans de l’application"
        tabIndex={composed ? undefined : 0}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: easeOutSoft }}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto overscroll-x-contain px-8 py-10 -outline-offset-4 sm:gap-10 sm:px-12 sm:py-14 lg:relative lg:block lg:aspect-[1280/735] lg:overflow-hidden lg:p-0 [&::-webkit-scrollbar]:hidden"
      >
        {board.screens.map((screen) => (
          <li
            key={screen.id}
            className="w-[62vw] max-w-[16.5rem] shrink-0 snap-center lg:absolute lg:w-[21.48%] lg:max-w-none"
            style={{ left: `${screen.position.left}%`, top: `${screen.position.top}%` }}
          >
            <figure>
              <PhoneMockup screen={screen} sizes="(min-width: 1024px) 20vw, 264px" />
              <figcaption className="mt-5 text-center text-[0.8125rem] leading-snug text-ink-muted sm:text-[0.9375rem] lg:sr-only">
                {screen.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
