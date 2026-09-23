import { motion } from 'motion/react'
import { tabNav } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import type { SectionId } from '@/types/site'

const TAB_IDS: readonly SectionId[] = tabNav.map((item) => item.id)

/**
 * Sticky bottom tab bar for mobile & tablet (< lg). Floats above the
 * iOS home indicator thanks to env(safe-area-inset-bottom).
 */
export function MobileTabBar() {
  const active = useActiveSection(TAB_IDS)

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden"
    >
      <ul className="flex w-full max-w-md items-center justify-between rounded-full border border-white/60 bg-nude-50/85 p-1.5 shadow-float backdrop-blur-xl">
        {tabNav.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id} className="flex-1">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'relative flex flex-col items-center gap-1 rounded-full py-2 text-[0.6875rem] font-medium transition-colors duration-300',
                  isActive ? 'text-terracotta' : 'text-ink-muted hover:text-ink',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-nude-200"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <Icon className="relative size-5" strokeWidth={1.6} aria-hidden="true" />
                <span className="relative">{label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
