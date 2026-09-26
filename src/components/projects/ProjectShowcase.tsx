import { Reveal } from '@/animations/Reveal'
import type { ProjectMedia as Media, ShowcaseChapter } from '@/types/project'
import { cn } from '@/lib/utils'
import { ProjectHeading } from './ProjectHeading'
import { ProjectMedia } from './ProjectMedia'

interface ProjectShowcaseProps {
  showcase: ShowcaseChapter
  number?: number
}

/**
 * Final screens. First row: text + large visual; then rows of one wide visual
 * or two side by side — never a grid of thumbnails.
 */
export function ProjectShowcase({ showcase, number }: ProjectShowcaseProps) {
  const [firstRow = [], ...rows] = showcase.rows

  return (
    <section
      id="produit"
      aria-labelledby="chapitre-produit"
      className="container-page pb-16 sm:pb-20 lg:pb-28"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <ProjectHeading number={number} chapter={showcase} titleId="chapitre-produit" />
        </Reveal>
        {firstRow.map((media) => (
          <ProjectMedia
            key={mediaKey(media)}
            media={media}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3] rounded-[1.75rem] lg:rounded-[2.5rem]"
          />
        ))}
      </div>

      {rows.map((row) => (
        <div
          key={row.map(mediaKey).join('|')}
          className={cn('mt-5 grid gap-5 lg:mt-8 lg:gap-8', row.length > 1 && 'md:grid-cols-2')}
        >
          {row.map((media) => (
            <ProjectMedia
              key={mediaKey(media)}
              media={media}
              sizes={row.length > 1 ? '(min-width: 768px) 45vw, 100vw' : '90rem'}
              className={cn(
                'rounded-[1.75rem] lg:rounded-[2.5rem]',
                row.length > 1 ? 'aspect-[4/3]' : 'aspect-[4/3] md:aspect-[2/1]',
              )}
            />
          ))}
        </div>
      ))}
    </section>
  )
}

const mediaKey = (media: Media) => (media.kind === 'image' ? media.image.src : media.label)
