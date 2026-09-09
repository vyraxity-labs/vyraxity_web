import { useInView, type UseInViewOptions } from 'motion/react'
import React from 'react'

export interface UseInViewOnceOptions extends Omit<UseInViewOptions, 'once'> {
  once?: boolean
}

/**
 * Custom hook wrapping motion/react `useInView` configured to trigger once
 * with the brand-standard margin ("-10% 0px") for section / card reveals.
 */
export function useInViewOnce(
  ref: React.RefObject<Element | null>,
  options?: UseInViewOnceOptions,
): boolean {
  return useInView(ref, {
    once: true,
    margin: '-10% 0px',
    ...options,
  })
}
