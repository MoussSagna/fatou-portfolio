import { lazy, Suspense } from 'react'
import avif768 from '@/assets/images/bitmoji-768.avif'
import avif1200 from '@/assets/images/bitmoji-1200.avif'
import avif1536 from '@/assets/images/bitmoji-1536.avif'
import webp768 from '@/assets/images/bitmoji-768.webp'
import webp1200 from '@/assets/images/bitmoji-1200.webp'
import webp1536 from '@/assets/images/bitmoji-1536.webp'
import { cn } from '@/lib/utils'

const BitmojiVector = lazy(() => import('./BitmojiVector'))

/** Intrinsic size of the source artwork (assets-src/bitmoji.png). */
const BITMOJI_SIZE = { width: 1536, height: 1024 } as const

const ALT =
  'Illustration de Fatou, chapeau vert olive et chemise blanche, souriante devant son ordinateur portable, avec une tasse « Good design, brighter tomorrows », une plante et des livres UI/UX, Brand, Strategy, Product.'

interface BitmojiProps {
  /**
   * `image`: optimised AVIF/WebP (default).
   * `vector`: layered SVG whose parts can be animated (see docs/bitmoji.md).
   */
  variant?: 'image' | 'vector'
  /** Turns on the idle animations. Implies the `vector` variant. */
  animated?: boolean
  /** Responsive `sizes` hint for the image variant's srcset. */
  sizes?: string
  className?: string
}

/** Fatou's illustrated avatar. Keeps a fixed 3:2 box whatever the variant. */
export function Bitmoji({
  variant = 'image',
  animated = false,
  sizes = '100vw',
  className,
}: BitmojiProps) {
  const image = <BitmojiImage sizes={sizes} />
  const isVector = animated || variant === 'vector'

  return (
    <div className={cn('relative aspect-[3/2]', className)}>
      {isVector ? (
        <div role="img" aria-label={ALT} className="size-full">
          {/* The raster shows while the SVG chunk loads: same box, no layout shift. */}
          <Suspense fallback={image}>
            <BitmojiVector animated={animated} />
          </Suspense>
        </div>
      ) : (
        image
      )}
    </div>
  )
}

function BitmojiImage({ sizes }: { sizes: string }) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${avif768} 768w, ${avif1200} 1200w, ${avif1536} 1536w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${webp768} 768w, ${webp1200} 1200w, ${webp1536} 1536w`}
        sizes={sizes}
      />
      <img
        src={webp1200}
        width={BITMOJI_SIZE.width}
        height={BITMOJI_SIZE.height}
        alt={ALT}
        fetchPriority="high"
        decoding="async"
        className="size-full object-contain select-none"
        draggable={false}
      />
    </picture>
  )
}
