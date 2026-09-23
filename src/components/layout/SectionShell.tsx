import type { ReactNode } from 'react'
import { Reveal } from '@/animations/Reveal'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { SectionId } from '@/types/site'
import { cn } from '@/lib/utils'

interface SectionShellProps {
  id: SectionId
  eyebrow: string
  /** Optional element aligned right of the eyebrow (e.g. "Voir tous les projets"). */
  action?: ReactNode
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
      <Reveal className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        {/* Section headers are larger and darker than the hero eyebrow (mockup). */}
        <Eyebrow withRule className="font-semibold text-ink lg:text-[0.9375rem]">
          {eyebrow}
        </Eyebrow>
        {action}
      </Reveal>
      {children}
    </section>
  )
}
