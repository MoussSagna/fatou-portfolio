import { MotionConfig } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HomePage } from '@/pages/HomePage'
import { legalSeo } from '@/seo/data'

// Case studies and legal pages load on demand: the home page does not ship their code and data.
const ProjectPage = lazy(() =>
  import('@/pages/ProjectPage').then((module) => ({ default: module.ProjectPage })),
)
const LegalRoute = lazy(() =>
  import('@/pages/LegalPage').then((module) => ({ default: module.LegalRoute })),
)

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
          <Route
            path="projects/:slug"
            element={
              // Keeps the footer below the fold while the chunk loads.
              <Suspense fallback={<div className="min-h-svh" />}>
                <ProjectPage />
              </Suspense>
            }
          />
          {legalSeo.map(({ path }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <LegalRoute />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
      <MobileTabBar />
    </MotionConfig>
  )
}
