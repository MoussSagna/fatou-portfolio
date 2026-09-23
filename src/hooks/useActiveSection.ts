import { useEffect, useState } from 'react'
import type { SectionId } from '@/types/site'

/**
 * Scroll-spy: returns the id of the section currently crossing the
 * middle band of the viewport. One observer for all sections.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId | undefined {
  const [active, setActive] = useState<SectionId | undefined>(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id as SectionId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
