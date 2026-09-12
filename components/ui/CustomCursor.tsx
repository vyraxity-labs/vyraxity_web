'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/lib/motion'

type CursorState = 'default' | 'link' | 'card' | 'text'

function subscribePointerFine(callback: () => void) {
  const mediaQuery = window.matchMedia('(pointer: fine)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

function getPointerFineSnapshot() {
  return window.matchMedia('(pointer: fine)').matches
}

function getPointerFineServerSnapshot() {
  return false
}

export function CustomCursor() {
  const prefersReduced = useReducedMotion()
  const isPointerFine = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot,
  )
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isPointerFine || prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Identify interactive targets
      const target = e.target as HTMLElement | null
      if (!target) return

      // 1. Cards (highest priority)
      const cardTarget = target.closest('[data-cursor="card"]')
      if (cardTarget) {
        // setCursorState('card')
        return
      }

      // 2. Interactive elements (links, buttons, inputs)
      const interactiveTarget = target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor="link"], .cursor-pointer',
      )
      if (interactiveTarget) {
        setCursorState('link')
        return
      }

      // 3. Text and text-like elements
      const textTarget = target.closest(
        'p, h1, h2, h3, h4, h5, h6, span, li, blockquote, q, cite, code, pre, label, dt, dd, [data-cursor="text"]',
      )
      if (
        textTarget &&
        !target.closest('svg, img, video, canvas') &&
        (textTarget.hasAttribute('data-cursor') ||
          (textTarget.textContent && textTarget.textContent.trim().length > 0))
      ) {
        setCursorState('text')
        return
      }

      // 4. Default state
      setCursorState('default')
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isPointerFine, prefersReduced])

  // Strictly disabled on touch devices or under reduced motion
  if (!isPointerFine || prefersReduced) {
    return null
  }

  // Variants for cursor follower
  const cursorVariants = {
    default: {
      width: 8,
      height: 8,
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: '#F2A93B',
      borderColor: 'transparent',
      borderWidth: 0,
    },
    text: {
      width: 2,
      height: 18,
      x: mousePosition.x - 1,
      y: mousePosition.y - 9,
      backgroundColor: '#F2A93B',
      borderColor: 'transparent',
      borderWidth: 0,
    },
    link: {
      width: 26,
      height: 26,
      x: mousePosition.x - 13,
      y: mousePosition.y - 13,
      backgroundColor: 'transparent',
      borderColor: 'rgba(242, 169, 59, 0.85)',
      borderWidth: 1.5,
    },
    card: {
      width: 44,
      height: 44,
      x: mousePosition.x - 22,
      y: mousePosition.y - 22,
      backgroundColor: 'rgba(242, 169, 59, 0.12)',
      borderColor: '#F2A93B',
      borderWidth: 1.5,
    },
  }

  return (
    <motion.div
      aria-hidden='true'
      className='pointer-events-none fixed top-0 left-0 z-50 rounded-full select-none flex items-center justify-center font-mono text-xs text-vx-amber uppercase tracking-wider'
      variants={cursorVariants}
      animate={cursorState}
      initial={false}
      style={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 700,
        damping: 38,
        mass: 0.25,
      }}
    >
      {cursorState === 'card' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className='select-none font-bold'
        >
          &rarr;
        </motion.span>
      )}
    </motion.div>
  )
}
