import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { primaryNav } from '@/data/navigation'
import { Logo } from './Logo'

/**
 * Top bar. Links are shown from `lg` up; below, navigation moves to the
 * sticky bottom tab bar (no hamburger by design).
 */
export function SiteHeader() {
  return (
    <header className="container-page flex h-20 items-center justify-between lg:h-24">
      <Logo />

      <nav aria-label="Navigation principale" className="hidden lg:block">
        <ul className="flex items-center gap-14">
          {primaryNav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="relative rounded-sm py-1 text-base font-medium text-ink/90 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Button asChild className="h-10 px-5 text-sm lg:h-14 lg:px-9 lg:text-base">
        <a href="#contact">
          Discutons
          <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
        </a>
      </Button>
    </header>
  )
}
