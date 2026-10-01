import type { ReactNode } from 'react'
import { Reveal } from '@/animations/Reveal'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { SectionId } from '@/types/site'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow: string
  /** Optional element aligned right of the eyebrow (e.g. "Voir tous les projets"). */
  action?: ReactNode
  className?: string
}

/** Revealed section header: eyebrow + hairline, optional action on the right. */
export function SectionHeader({ eyebrow, action, className }: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-8 gap-y-4 max-lg:flex-col max-lg:justify-center',
        className,
      )}
    >
      {/* Section headers are larger and darker than the hero eyebrow (mockup).
          Below lg the header is centred: a mirrored hairline before the label balances it. */}
      <Eyebrow
        withRule
        className="font-semibold text-ink max-lg:max-w-full max-lg:before:h-px max-lg:before:w-8 max-lg:before:bg-ink-muted/40 max-lg:before:content-[''] max-sm:tracking-[0.3em] sm:max-lg:before:w-20 lg:text-[0.9375rem]"
      >
        {eyebrow}
      </Eyebrow>
      {action}
    </Reveal>
  )
}

interface SectionShellProps extends Omit<SectionHeaderProps, 'className'> {
  id: SectionId
  children?: ReactNode
  className?: string
}

/** Common landing section frame: anchor id, vertical rhythm, revealed header. */
export function SectionShell({ id, eyebrow, action, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      aria-label={eyebrow}
      className={cn('container-page scroll-mt-6 py-16 lg:py-24', className)}
    >
      <SectionHeader eyebrow={eyebrow} action={action} />
      {children}
    </section>
  )
}
