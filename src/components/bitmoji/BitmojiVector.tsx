import { useRef } from 'react'
import { useInView } from 'motion/react'
import svg from '@/assets/bitmoji/bitmoji.svg?raw'
import './bitmoji.css'

interface BitmojiVectorProps {
  animated: boolean
}

/**
 * Layered SVG inlined in the DOM so its parts (#left-eye, #mouth, #hair-front…)
 * can be targeted by CSS. Loaded lazily by <Bitmoji>.
 * The markup is our own generated asset (scripts/bitmoji-vector), not user content.
 */
export default function BitmojiVector({ animated }: BitmojiVectorProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Idle animations repaint the SVG: pause them while off screen.
  const inView = useInView(ref)

  return (
    <div
      ref={ref}
      className="bitmoji-vector size-full"
      data-animated={animated || undefined}
      data-paused={(animated && !inView) || undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
