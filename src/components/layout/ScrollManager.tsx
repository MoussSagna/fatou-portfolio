import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

/**
 * Scroll behaviour for client-side navigation:
 * - new page → jump to the top instantly (no smooth scroll across pages);
 * - link with a hash (`/#projets`) → scroll to that section, smoothly when
 *   staying on the same page (CSS `scroll-behavior`, off with reduced motion);
 * - back / forward → left to the browser.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef<string | null>(null)

  useLayoutEffect(() => {
    const isFirstRender = previousPath.current === null
    const samePage = previousPath.current === pathname
    previousPath.current = pathname
    if (navigationType === 'POP' && !isFirstRender) return

    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) target.scrollIntoView({ behavior: samePage ? 'auto' : 'instant' })
    else if (!samePage && !isFirstRender) window.scrollTo({ top: 0, behavior: 'instant' })
    // `key` changes on every navigation, even to the same URL (clicking "Projets" twice).
  }, [pathname, hash, key, navigationType])

  return null
}
