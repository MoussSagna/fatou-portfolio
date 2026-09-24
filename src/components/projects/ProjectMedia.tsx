import { motion, useReducedMotion } from 'motion/react'
import { Blob } from '@/components/decor/Blob'
import { easeOutSoft } from '@/animations/variants'
import type { ProjectMedia as Media } from '@/types/project'
import { cn } from '@/lib/utils'

interface ProjectMediaProps {
  media: Media
  /** Frame classes: aspect ratio / height and radii depend on the layout. */
  className?: string
  /** `sizes` attribute for real images. */
  sizes: string
}

/**
 * Large visual of a case study. Real images fill the frame (object-cover);
 * placeholders show a neutral device composition until the export exists.
 * Reveal: fades in while settling from a 1.06 zoom, once, inside the frame.
 */
export function ProjectMedia({ media, className, sizes }: ProjectMediaProps) {
  const reduceMotion = useReducedMotion()

  return (
    <figure className={cn('relative overflow-hidden bg-nude-200', className)}>
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: easeOutSoft }}
      >
        {media.kind === 'image' ? (
          <picture>
            <source type="image/avif" srcSet={media.image.avif} sizes={sizes} />
            <source type="image/webp" srcSet={media.image.webp} sizes={sizes} />
            <img
              src={media.image.src}
              width={media.image.width}
              height={media.image.height}
              alt={media.image.alt}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </picture>
        ) : (
          <DevicePlaceholder screens={media.screens} label={media.label} />
        )}
      </motion.div>

      {media.kind === 'placeholder' && (
        <figcaption className="absolute bottom-4 left-4 rounded-full bg-nude-50/85 px-3.5 py-1.5 text-xs text-ink-muted backdrop-blur-sm lg:bottom-6 lg:left-6 lg:text-[0.8125rem]">
          Visuel à venir · <span className="text-ink">{media.label}</span>
        </figcaption>
      )}
      {media.kind === 'image' && media.caption && (
        <figcaption className="sr-only">{media.caption}</figcaption>
      )}
    </figure>
  )
}

/** Phones sized on the frame height, the middle one raised. Decorative only. */
function DevicePlaceholder({ screens, label }: { screens: number; label: string }) {
  return (
    <div
      role="img"
      aria-label={`Emplacement du visuel « ${label} », à venir`}
      className="absolute inset-0 flex items-center justify-center gap-[4%]"
    >
      <Blob className="absolute top-1/2 left-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 text-blush" />
      {Array.from({ length: screens }, (_, index) => (
        <Phone key={index} raised={screens === 3 && index === 1} />
      ))}
    </div>
  )
}

function Phone({ raised }: { raised: boolean }) {
  return (
    <div
      className={cn(
        'relative aspect-[9/19] rounded-[14%/6.6%] bg-ink p-[3.5%] shadow-float',
        raised ? 'h-[72%] -translate-y-[4%]' : 'h-[64%]',
      )}
    >
      <span className="absolute top-[3.2%] left-1/2 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-ink" />
      <div className="flex h-full flex-col gap-[4%] rounded-[11%/5.2%] bg-[linear-gradient(170deg,#2f2826,#151212)] px-[7%] pt-[18%]">
        <span className="h-[2.5%] w-2/5 rounded-full bg-white/15" />
        <span className="h-[30%] rounded-[10%/16%] bg-white/8" />
        <span className="flex h-[16%] gap-[6%]">
          <span className="flex-1 rounded-[14%/12%] bg-white/8" />
          <span className="flex-1 rounded-[14%/12%] bg-white/8" />
          <span className="flex-1 rounded-[14%/12%] bg-white/8" />
        </span>
        <span className="h-[2.5%] w-1/3 rounded-full bg-white/10" />
        <span className="flex h-[16%] gap-[6%]">
          <span className="flex-1 rounded-[14%/12%] bg-white/8" />
          <span className="flex-1 rounded-[14%/12%] bg-white/8" />
          <span className="flex-1 rounded-[14%/12%] bg-white/8" />
        </span>
      </div>
    </div>
  )
}
