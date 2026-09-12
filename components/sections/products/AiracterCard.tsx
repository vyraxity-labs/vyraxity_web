'use client'

import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function AiracterCard() {
  const t = useTranslations('products.airacterCard')
  const cardRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(cardRef)
  const prefersReduced = useReducedMotion()

  // Strip trailing arrow from CTA string if present because Button variant="link" renders an animated &rarr;
  const ctaText = t('cta')
    .replace(/→|\&rarr\;/g, '')
    .trim()

  const cardVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.6,
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
        data-cursor='card'
        className='relative w-full rounded-vx-lg border border-vx-line/80 bg-vx-ink/40 p-8 sm:p-12 md:p-16 overflow-hidden'
      >
        {/* Subtle Airacter violet-to-coral glow scoped to this component */}
        <div
          aria-hidden='true'
          style={
            {
              '--ar-primary': '#8B5CF6',
              '--ar-secondary': '#FF7A59',
            } as React.CSSProperties
          }
          className='absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,var(--ar-primary)_0%,var(--ar-secondary)_35%,transparent_70%)] opacity-20 blur-3xl pointer-events-none'
        />

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10'>
          {/* Left Column: Details */}
          <div className='lg:col-span-6 flex flex-col items-start'>
            {/* Status / Index label */}
            <div className='flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-vx-amber mb-6'>
              <span className='w-2 h-2 rounded-full bg-vx-amber inline-block' />
              <span>{t('label')}</span>
            </div>

            <h2 className='vx-h2 text-vx-white tracking-tight mb-4'>
              {t('name')}
            </h2>

            <p className='vx-body text-vx-muted text-lg sm:text-xl font-light mb-8 max-w-lg'>
              {t('description')}
            </p>

            <div className='flex flex-col sm:flex-row sm:items-center gap-6 pt-4 border-t border-vx-line/60 w-full'>
              <span className='font-mono text-xs uppercase tracking-wider text-vx-muted/80'>
                {t('status')}
              </span>

              <Button
                href='/products/airacter'
                variant='link'
                className='text-base sm:text-lg p-0 self-start'
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Right Column: Implied Product-Screen Preview */}
          <div className='lg:col-span-6 w-full flex items-center justify-center'>
            <div className='w-full aspect-16/10 rounded-vx-md border border-vx-line/80 bg-vx-black/70 flex flex-col justify-between p-6 backdrop-blur-sm relative'>
              {/* Top bar */}
              <div className='flex items-center justify-between pb-4 border-b border-vx-line/40'>
                <div className='flex items-center gap-2'>
                  <span className='w-2.5 h-2.5 rounded-full bg-vx-line/80 inline-block' />
                  <span className='w-2.5 h-2.5 rounded-full bg-vx-line/80 inline-block' />
                  <span className='w-2.5 h-2.5 rounded-full bg-vx-line/80 inline-block' />
                </div>
                <span className='font-mono text-[10px] uppercase tracking-widest text-vx-muted/60'>
                  {t('name')}.{t('os')}
                </span>
              </div>

              {/* Centered preview content */}
              <div className='flex-1 flex flex-col items-center justify-center py-8 text-center'>
                <div className='w-12 h-12 rounded-full border border-vx-line/80 flex items-center justify-center mb-3 text-vx-muted/60'>
                  <span className='font-mono text-sm font-bold'>A</span>
                </div>
                <span className='font-mono text-xs uppercase tracking-widest text-vx-muted/80 mb-1'>
                  {t('persona_engine')}
                </span>
                <span className='font-mono text-[11px] text-vx-muted/50'>
                  {t('status')}
                </span>
              </div>

              {/* Status footer */}
              <div className='pt-3 border-t border-vx-line/40 flex items-center justify-between font-mono text-[10px] text-vx-muted/50 uppercase'>
                <span>{t('footer.focus')}</span>
                <span className='text-vx-amber/80'>{t('footer.engine')}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
