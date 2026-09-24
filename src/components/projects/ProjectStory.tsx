import { Reveal } from '@/animations/Reveal'
import type { StoryChapter } from '@/types/project'
import { cn } from '@/lib/utils'
import { ProjectHeading } from './ProjectHeading'
import { ProjectMedia } from './ProjectMedia'

interface ProjectStoryProps {
  chapter: StoryChapter
  number: number
  /** Media on the right (text left). Chapters alternate. */
  mediaRight?: boolean
}

/**
 * One idea = one text block + one large visual. From `lg` the visual bleeds to
 * the viewport edge with a single rounded inner corner; below, text then visual.
 */
export function ProjectStory({ chapter, number, mediaRight = false }: ProjectStoryProps) {
  const titleId = `chapitre-${chapter.id}`

  return (
    <section
      id={chapter.id}
      aria-labelledby={titleId}
      className="flex flex-col lg:grid lg:min-h-[36rem] lg:grid-cols-2"
    >
      <div
        className={cn(
          'flex items-center px-5 py-14 sm:px-8 sm:py-16 lg:py-24',
          mediaRight
            ? 'lg:pr-16 lg:pl-[max(3rem,calc((100vw-90rem)/2+4.5rem))] xl:pr-24'
            : 'lg:order-2 lg:pr-[max(3rem,calc((100vw-90rem)/2+4.5rem))] lg:pl-16 xl:pl-24',
        )}
      >
        <Reveal>
          <ProjectHeading number={number} chapter={chapter} titleId={titleId} />
        </Reveal>
      </div>

      <div className="px-5 sm:px-8 lg:px-0">
        <ProjectMedia
          media={chapter.media}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn(
            'aspect-[4/3] rounded-[1.75rem] lg:aspect-auto lg:h-full lg:rounded-none',
            mediaRight ? 'lg:rounded-tl-[5rem]' : 'lg:rounded-br-[5rem]',
          )}
        />
      </div>
    </section>
  )
}
