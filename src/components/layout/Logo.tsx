import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/** "SARAH•" wordmark with the role underneath. Links back to the top. */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#accueil"
      aria-label={`${site.name}, ${site.role} — retour à l'accueil`}
      className={cn('inline-flex flex-col gap-1.5 rounded-sm lg:gap-2.5', className)}
    >
      <span className="flex items-center gap-2 font-display text-lg leading-none font-bold tracking-[0.42em] text-ink uppercase lg:text-2xl">
        {site.name}
        <span aria-hidden="true" className="size-2 -translate-x-1.5 rounded-full bg-coral" />
      </span>
      <span className="text-[0.625rem] leading-none font-medium tracking-[0.44em] text-ink-muted uppercase lg:text-xs">
        {site.role}
      </span>
    </a>
  )
}
