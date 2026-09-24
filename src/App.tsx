import { MotionConfig } from 'motion/react'
import { Navigate, Route, Routes } from 'react-router'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HomePage } from '@/pages/HomePage'
import { ProjectPage } from '@/pages/ProjectPage'

export default function App() {
  return (
    // "user": honours prefers-reduced-motion (transforms off, opacity kept).
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <a
        href="#contenu"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="contenu">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </MotionConfig>
  )
}
