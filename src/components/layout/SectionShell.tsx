import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { SectionId } from '@/types/site'
import { cn } from '@/lib/utils'

interface SectionShellProps {
  id: SectionId
  eyebrow: string
  children?: ReactNode
  className?: string
}

/** Common landing section frame: anchor id, vertical rhythm, eyebrow label. */
export function SectionShell({ id, eyebrow, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      aria-label={eyebrow}
      className={cn('container-page scroll-mt-6 py-16 lg:py-24', className)}
    >
      <Eyebrow withRule>{eyebrow}</Eyebrow>
      {children}
    </section>
  )
}
