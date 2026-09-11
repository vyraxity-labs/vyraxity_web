'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export interface FutureProductCardProps {
  label: string
  lines: string[]
  footer: string
}

export function FutureProductCard({
  label,
  lines,
  footer,
}: FutureProductCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(cardRef)
  const prefersReduced = useReducedMotion()

  const cardVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: easeStandard,
      },
    },
  }

  return (
    <div ref={cardRef} className='w-full'>
      <motion.div
        variants={cardVariants}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        className='relative w-full rounded-vx-lg border border-dashed border-vx-line bg-vx-black/40 p-8 sm:p-10 md:p-12 flex flex-col justify-between min-h-65 transition-colors'
      >
        {/* Top: Label */}
        <div className='flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-vx-muted/60 mb-8'>
          <span className='w-1.5 h-1.5 rounded-full bg-vx-muted/40 inline-block' />
          <span>{label}</span>
        </div>

        {/* Center / Body: Sparse lines */}
        <div className='flex flex-col space-y-2 mb-8'>
          {lines.map((line, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? 'vx-h2 text-xl sm:text-2xl text-vx-white/90 font-medium tracking-tight'
                  : index === lines.length - 1
                    ? 'font-mono text-xs uppercase tracking-widest text-vx-muted/50 pt-2'
                    : 'vx-body text-vx-muted/80 text-sm sm:text-base font-light'
              }
            >
              {line}
            </p>
          ))}
        </div>

        {/* Bottom indicator */}
        <div className='pt-4 border-t border-dashed border-vx-line/40 flex items-center justify-between font-mono text-[10px] text-vx-muted/40 uppercase'>
          <span>{footer}</span>
        </div>
      </motion.div>
    </div>
  )
}
