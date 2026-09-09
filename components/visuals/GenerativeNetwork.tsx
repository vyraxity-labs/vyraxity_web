'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/motion'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  isOrigin?: boolean
  pulsePhase?: number
}

export interface GenerativeNetworkProps {
  className?: string
}

export function GenerativeNetwork({ className = '' }: GenerativeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let isVisible = true
    let width = 0
    let height = 0

    // Responsive node count (40–60 nodes for performance & restraint)
    const getNodeCount = (w: number) => (w < 480 ? 32 : w < 768 ? 44 : 56)

    let nodes: Node[] = []

    const initNodes = () => {
      const count = getNodeCount(width)
      nodes = []

      // Origin node: placed off-center, slightly towards the lower-left, radiating outward
      nodes.push({
        x: width * 0.38,
        y: height * 0.52,
        vx: 0.05,
        vy: -0.04,
        radius: 3.5,
        isOrigin: true,
        pulsePhase: 0,
      })

      // Ambient drift velocity (slow, 15-25 seconds drift per cycle)
      for (let i = 1; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.08 + Math.random() * 0.12 // slow drift
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.2 + Math.random() * 1.2,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.scale(dpr, dpr)

      initNodes()
    }

    resize()
    window.addEventListener('resize', resize)

    // Draw single frame (or continuous loop)
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Connect nodes with subtle lines
      const maxDistance = Math.min(width, height) * 0.34
      const originMaxDistance = Math.min(width, height) * 0.45

      const origin = nodes[0]

      // Subtle radiating rings from origin
      if (origin && origin.isOrigin) {
        const pulse = Math.sin(origin.pulsePhase || 0)
        const ringRadius = 14 + pulse * 4

        ctx.beginPath()
        ctx.arc(origin.x, origin.y, ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(242, 169, 59, 0.18)' // subtle amber ring
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(origin.x, origin.y, ringRadius * 1.8, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(242, 169, 59, 0.07)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw lines between nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const thresholdDist =
            a.isOrigin || b.isOrigin ? originMaxDistance : maxDistance

          if (dist < thresholdDist) {
            const alpha = 1 - dist / thresholdDist

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)

            if (a.isOrigin || b.isOrigin) {
              // Lines connected to origin have a delicate amber hint
              ctx.strokeStyle = `rgba(242, 169, 59, ${alpha * 0.38})`
              ctx.lineWidth = 1
            } else {
              // Other connections use muted monochrome lines
              ctx.strokeStyle = `rgba(244, 243, 238, ${alpha * 0.09})`
              ctx.lineWidth = 0.75
            }
            ctx.stroke()
          }
        }
      }

      // Draw node points
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)

        if (node.isOrigin) {
          ctx.fillStyle = '#F2A93B' // brand amber origin
          ctx.shadowColor = '#F2A93B'
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0 // reset
        } else {
          ctx.fillStyle = 'rgba(244, 243, 238, 0.55)'
          ctx.fill()
        }
      }

      // Update positions if animation is active
      if (!prefersReduced) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          node.x += node.vx
          node.y += node.vy

          if (node.pulsePhase !== undefined) {
            node.pulsePhase += 0.012 // slow pulse (~10s)
          }

          // Soft boundary bounce / wrap
          if (node.x < -10) node.x = width + 10
          if (node.x > width + 10) node.x = -10
          if (node.y < -10) node.y = height + 10
          if (node.y > height + 10) node.y = -10
        }
      }
    }

    // If reduced motion is preferred, render a single static, balanced frame and stop
    if (prefersReduced) {
      draw()
      return () => {
        window.removeEventListener('resize', resize)
      }
    }

    // Continuous loop with pause on visibilitychange & IntersectionObserver
    const loop = () => {
      if (isVisible) {
        draw()
      }
      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    // Pause when tab is not visible
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Pause when canvas scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible =
          entry.isIntersecting && document.visibilityState === 'visible'
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReduced])

  return (
    <div
      className={`relative w-full aspect-square max-w-115 flex items-center justify-center ${className}`.trim()}
    >
      <canvas
        ref={canvasRef}
        aria-hidden='true'
        className='w-full h-full block select-none pointer-events-none'
      />
    </div>
  )
}
