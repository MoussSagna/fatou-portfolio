import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  /** Draws the short hairline after the label, as in section headers. */
  withRule?: boolean
  className?: string
}

/** Small letter-spaced uppercase label above titles ("UI/UX DESIGNER", "PROJETS SÉLECTIONNÉS"…). */
export function Eyebrow({ children, withRule = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-4 text-eyebrow font-medium whitespace-nowrap text-ink-muted uppercase sm:gap-6',
        className,
      )}
    >
      {children}
      {withRule && <span aria-hidden="true" className="h-px w-8 bg-ink-muted/40 sm:w-20" />}
    </p>
  )
}
