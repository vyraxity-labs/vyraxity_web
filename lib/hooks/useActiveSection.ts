'use client'

import { useEffect, useState } from 'react'

export interface UseActiveSectionOptions {
  rootMargin?: string
  threshold?: number | number[]
}

/**
 * Hook to determine which section (by element id) is currently active / visible in viewport.
 * Uses IntersectionObserver with a negative top margin to account for sticky navigation header
 * and prevent boundary flickering.
 */
export function useActiveSection(
  sectionIds: string[],
  options: UseActiveSectionOptions = {},
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const { rootMargin = '-20% 0px -50% 0px', threshold = 0 } = options

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const observerMap = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')
          if (id) {
            if (entry.isIntersecting) {
              observerMap.set(id, entry.intersectionRatio)
            } else {
              observerMap.delete(id)
            }
          }
        })

        // Pick the intersecting section that has the highest ratio or highest position
        if (observerMap.size > 0) {
          // Find first matching section in order of DOM appearance
          for (const id of sectionIds) {
            if (observerMap.has(id)) {
              setActiveSection(id)
              return
            }
          }
        } else {
          setActiveSection(null)
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds, rootMargin, threshold])

  return activeSection
}
