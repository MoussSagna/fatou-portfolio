import { MotionConfig } from 'motion/react'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HomePage } from '@/pages/HomePage'

export default function App() {
  return (
    // "user": honours prefers-reduced-motion (transforms off, opacity kept).
    <MotionConfig reducedMotion="user">
      <a
        href="#contenu"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="contenu" className="pb-[calc(env(safe-area-inset-bottom)+6rem)] lg:pb-0">
        <HomePage />
      </main>
      <MobileTabBar />
    </MotionConfig>
  )
}
