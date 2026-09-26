import { Maximize2, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { easeOutSoft } from '@/animations/variants'
import type { ProjectFigure as Figure } from '@/types/project'
import { cn } from '@/lib/utils'

interface ProjectFigureProps {
  figure: Figure
  /** `sizes` attribute of the image. */
  sizes: string
  /** Tile stretches to its container height (feature layouts). */
  fill?: boolean
  /** Tile layout at the feature's large slot: more padding around artwork. */
  large?: boolean
  className?: string
}

/**
 * Real visual at its natural ratio. Screens sit in a soft frame; artwork with
 * a `surface` (logos) is centred on a tile of that colour. Revealed once:
 * fade in while settling from a 1.04 zoom inside the frame.
 */
export function ProjectFigure({ figure, sizes, fill, large, className }: ProjectFigureProps) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const { image, caption, surface, zoomable } = figure

  const picture = (
    <picture className="contents">
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className={cn(
          'block w-full',
          surface
            ? 'max-h-full object-contain'
            : 'h-auto transition-transform duration-700 ease-(--ease-out-soft)',
          zoomable && 'group-hover:scale-[1.015]',
        )}
        // Artwork is never upscaled past its export size.
        style={surface ? { maxWidth: image.width } : undefined}
      />
    </picture>
  )

  const reveal = (
    <motion.div
      className={cn(surface && 'flex size-full items-center justify-center')}
      initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease: easeOutSoft }}
    >
      {picture}
    </motion.div>
  )

  const frameClass = cn(
    'relative block w-full overflow-hidden',
    surface
      ? cn(
          'min-h-[11rem] rounded-[1.5rem] sm:min-h-[14rem] lg:rounded-[2rem]',
          large ? 'aspect-[4/3] px-[10%] py-[12%] lg:aspect-auto' : 'px-[9%] py-[10%]',
          fill && 'lg:flex-1',
        )
      : 'rounded-[1rem] bg-white shadow-soft ring-1 ring-ink/5 sm:rounded-[1.5rem]',
  )

  return (
    <figure className={cn('flex flex-col', fill && 'lg:h-full', className)}>
      {zoomable ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className={cn(frameClass, 'group cursor-zoom-in text-left')}
        >
          {reveal}
          <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-4 sm:bottom-4 [@media(hover:hover)]:opacity-0">
            <Maximize2 className="size-3.5" aria-hidden="true" />
            Agrandir
          </span>
        </button>
      ) : (
        <div className={frameClass} style={surface ? { backgroundColor: surface } : undefined}>
          {reveal}
        </div>
      )}

      {caption && (
        <figcaption className="mt-3 text-[0.8125rem] leading-snug text-ink-muted lg:mt-4 lg:text-[0.9375rem]">
          {caption}
        </figcaption>
      )}

      {zoomable && open && <Lightbox figure={figure} onClose={() => setOpen(false)} />}
    </figure>
  )
}

/**
 * Full-size view in a native modal <dialog> (focus trap, Escape, inert page).
 * Below lg the screen keeps its export width and pans, so dense UI stays
 * readable on a phone; from lg it fits the width and scrolls vertically.
 */
function Lightbox({ figure, onClose }: { figure: Figure; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { image, caption } = figure
  // Every exit goes through the native close (focus returns to the trigger);
  // its `close` event then unmounts the lightbox.
  const close = () => dialogRef.current?.close()

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={caption ?? image.alt}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-ink/92 p-0 text-white backdrop:bg-transparent"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-ink/70 px-4 py-3 backdrop-blur-md sm:px-6">
        <p className="min-w-0 truncate text-sm text-white/80">{caption}</p>
        <button
          type="button"
          onClick={close}
          autoFocus
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20"
        >
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">Fermer</span>
        </button>
      </div>
      <div
        className="overflow-x-auto px-4 pb-8 sm:px-6 lg:px-12"
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          decoding="async"
          className="mx-auto h-auto max-w-none rounded-lg lg:w-full lg:max-w-[min(100%,90rem)]"
        />
      </div>
    </dialog>
  )
}
