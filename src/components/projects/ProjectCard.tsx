import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

/**
 * Whole card is one link (single tab stop). Hover/focus: the visual lifts
 * slightly and zooms by 3 %, the round arrow fills with ink.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, description, image, href } = project

  return (
    <article className="group relative">
      <div className="overflow-hidden rounded-2xl bg-nude-200 transition-transform duration-500 ease-(--ease-out-soft) group-focus-within:-translate-y-1 group-hover:-translate-y-1">
        <picture>
          <source type="image/avif" srcSet={image.avif} sizes={IMAGE_SIZES} />
          <source type="image/webp" srcSet={image.webp} sizes={IMAGE_SIZES} />
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[217/235] w-full object-cover transition-transform duration-700 ease-(--ease-out-soft) group-focus-within:scale-[1.03] group-hover:scale-[1.03]"
          />
        </picture>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6 lg:mt-8">
        <div>
          <Eyebrow className="text-[0.6875rem] tracking-[0.28em]">{category}</Eyebrow>
          <h3 className="mt-3 text-h3 lg:mt-4">
            {/* Stretched link: the whole card is clickable. */}
            <a
              href={href}
              className="rounded-sm after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-terracotta"
            >
              {title}
            </a>
          </h3>
          <p className="mt-2 max-w-[15rem] text-base leading-relaxed text-ink-muted lg:text-[1.1875rem]">
            {description}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="mt-8 grid size-12 shrink-0 place-items-center rounded-full border border-ink/80 text-ink transition-colors duration-300 group-focus-within:border-ink group-focus-within:bg-ink group-focus-within:text-white group-hover:border-ink group-hover:bg-ink group-hover:text-white md:max-lg:hidden lg:mt-10 lg:size-16"
        >
          <ArrowUpRight
            className="size-5 transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-6"
            strokeWidth={2.25}
          />
        </span>
      </div>
    </article>
  )
}

/** 3 columns from md up, full width below. */
const IMAGE_SIZES = '(min-width: 1440px) 422px, (min-width: 768px) 30vw, 100vw'
