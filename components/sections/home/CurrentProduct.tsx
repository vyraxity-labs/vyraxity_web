'use client'

import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function CurrentProduct() {
  const t = useTranslations('home.currentProduct')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  // Strip trailing arrow from CTA string if present because Button variant="link" renders an animated &rarr;
  const ctaText = t('cta')
    .replace(/→|\&rarr\;/g, '')
    .trim()

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
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
    <Section
      id='products'
      theme='dark'
      className='relative overflow-hidden border-t border-vx-line/40 py-28 md:py-36'
    >
      <Container>
        <div ref={sectionRef}>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'
          >
            {/* Left Column: Product Info */}
            <div className='lg:col-span-5 flex flex-col items-start z-10'>
              <motion.div variants={itemVariants} className='mb-6'>
                <EyebrowLabel variant='accent'>{t('eyebrow')}</EyebrowLabel>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className='vx-h1 text-vx-white tracking-tight mb-4'
              >
                {t('headline')}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className='font-mono text-base sm:text-lg text-vx-amber/90 font-medium mb-6 tracking-wide'
              >
                {t('subheadline')}
              </motion.p>

              <motion.p
                variants={itemVariants}
                className='vx-body text-vx-muted mb-10 max-w-lg'
              >
                {t('copy')}
              </motion.p>

              <motion.div variants={itemVariants}>
                <Button
                  href='/products/airacter'
                  variant='link'
                  className='text-lg'
                >
                  {ctaText}
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Dominant Product Preview Frame with subtle Airacter violet-to-coral glow */}
            <div className='lg:col-span-7 relative w-full flex items-center justify-center'>
              {/* Airacter subtle scoped glow background (violet #8B5CF6 to coral #FF7A59) */}
              <div
                aria-hidden='true'
                style={
                  {
                    '--ar-primary': '#8B5CF6',
                    '--ar-secondary': '#FF7A59',
                  } as React.CSSProperties
                }
                className='absolute inset-0 -m-6 sm:-m-10 rounded-2xl bg-[radial-gradient(ellipse_at_center,var(--ar-primary)_0%,var(--ar-secondary)_30%,transparent_70%)] opacity-15 blur-3xl pointer-events-none'
              />

              {/* Dominant Product Frame */}
              <motion.div
                variants={itemVariants}
                data-cursor='card'
                className='relative z-10 w-full aspect-16/10 max-w-2xl rounded-vx-lg border border-vx-line/80 bg-vx-ink/80 flex flex-col justify-between p-6 sm:p-8 backdrop-blur-sm'
              >
                {/* Mock UI Frame Header */}
                <div className='flex items-center justify-between pb-4 border-b border-vx-line/40'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2.5 h-2.5 rounded-full bg-vx-line/80 inline-block' />
                    <span className='w-2.5 h-2.5 rounded-full bg-vx-line/80 inline-block' />
                    <span className='w-2.5 h-2.5 rounded-full bg-vx-line/80 inline-block' />
                  </div>
                  <span className='font-mono text-[11px] uppercase tracking-widest text-vx-muted/60'>
                    {t('headline')}.{t('preview')}
                  </span>
                </div>

                {/* Mock UI Content Canvas */}
                <div className='flex-1 flex flex-col items-center justify-center py-10 text-center'>
                  <div className='w-12 h-12 rounded-full border border-vx-line/80 flex items-center justify-center mb-4 text-vx-muted/60'>
                    <span className='font-mono text-sm font-bold'>A</span>
                  </div>
                  <span className='font-mono text-xs uppercase tracking-widest text-vx-muted/80 mb-1'>
                    {t('preview_text')}
                  </span>
                  <span className='font-mono text-[11px] text-vx-muted/50'>
                    {t('launch_text')}
                  </span>
                </div>

                {/* Mock UI Status Footer */}
                <div className='pt-4 border-t border-vx-line/40 flex items-center justify-between font-mono text-[10px] text-vx-muted/50 uppercase'>
                  <span>
                    {t('footer.ai')} / {t('footer.focus')}
                  </span>
                  <span className='text-vx-amber/80'>{t('footer.stage')}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
