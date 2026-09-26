import type { AccentText, ChapterText } from '@/types/project'
import { cn } from '@/lib/utils'

/** "Text *accent*" — the accent ending is set in terracotta. */
export function Accented({ value }: { value: AccentText }) {
  return (
    <>
      {value.text}
      {value.accent && (
        <>
          {' '}
          <span className="text-terracotta">{value.accent}</span>
        </>
      )}
    </>
  )
}

interface ProjectHeadingProps {
  /** Chapter number, displayed as "01." — omitted when the page does not number chapters. */
  number?: number
  chapter: ChapterText
  /** id of the <h2>, referenced by the section's aria-labelledby. */
  titleId: string
  className?: string
}

/** Chapter heading shared by the template chapters: number, title, short copy. */
export function ProjectHeading({ number, chapter, titleId, className }: ProjectHeadingProps) {
  const { label, title, body, highlight } = chapter

  return (
    <div className={cn('max-w-[35rem]', className)}>
      <p className="text-[0.9375rem] text-ink-muted lg:text-base">
        {number !== undefined && (
          <span className="mr-2 tabular-nums">{String(number).padStart(2, '0')}.</span>
        )}
        <span>{label}</span>
      </p>
      <h2
        id={titleId}
        className="mt-3 text-[clamp(2rem,1.3rem+2vw,2.875rem)] leading-[1.06] tracking-[-0.02em] text-balance lg:mt-4"
      >
        <Accented value={title} />
      </h2>
      {body.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-lead text-ink-muted lg:mt-6">
          {paragraph}
        </p>
      ))}
      {highlight && <p className="mt-5 text-lead font-semibold text-ink lg:mt-6">{highlight}</p>}
    </div>
  )
}

interface SectionLabelProps {
  children: React.ReactNode
  /** `h2` when the label is the section title ("Le projet"). */
  as?: 'p' | 'h2'
  id?: string
  /** Light text, for dark bands. */
  inverted?: boolean
  className?: string
}

/** Editorial section label: letter-spaced capitals + hairline, as on the home page. */
export function SectionLabel({
  children,
  as: Tag = 'p',
  id,
  inverted = false,
  className,
}: SectionLabelProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'flex min-w-0 items-center gap-4 font-sans text-eyebrow font-medium whitespace-nowrap uppercase sm:gap-6',
        inverted ? 'text-nude-100/70' : 'text-ink-muted',
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn('h-px w-8 sm:w-20', inverted ? 'bg-nude-100/30' : 'bg-ink-muted/40')}
      />
    </Tag>
  )
}
