import { cn } from '@/lib/utils'

/** Soft organic blush shape used behind content (contact card, section corners). */
export function Blob({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 150" className={cn('pointer-events-none', className)}>
      <path
        fill="currentColor"
        d="M62 9c46-14 128 6 134 58 6 49-47 82-104 76C39 138 1 112 4 69 7 34 30 19 62 9Z"
      />
    </svg>
  )
}
