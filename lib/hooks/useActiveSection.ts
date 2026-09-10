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

        // Pick the intersecting section that has the highest ratio
        if (observerMap.size > 0) {
          let bestId: string | null = null;
          let maxRatio = -1;

          for (const [id, ratio] of observerMap.entries()) {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              bestId = id;
            }
          }

          setActiveSection(bestId);
        } else {
          setActiveSection(null);
        }
      },
      {
        rootMargin,
        threshold: threshold || [0, 0.25, 0.5, 0.75, 1],
      },
    );

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
