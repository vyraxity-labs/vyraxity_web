'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function AiracterHero() {
  const t = useTranslations('airacter.hero')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

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
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18 },
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
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'var(--ar-base)' }}
      className='relative w-full text-(--ar-text) pt-20 pb-20 md:pt-28 md:pb-32 overflow-hidden border-b border-vx-line/40'
    >
      {/* Background ambient radial glow using Prism violet-to-coral tokens */}
      <div
        aria-hidden='true'
        className='absolute top-1/4 right-1/4 w-150 h-150 rounded-full bg-[radial-gradient(ellipse_at_center,var(--ar-primary)_0%,var(--ar-secondary)_30%,transparent_70%)] opacity-15 blur-3xl pointer-events-none'
      />

      <Container>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10'
        >
          {/* Left Column: Copy & CTAs */}
          <div className='lg:col-span-6 flex flex-col items-start'>
            {/* Header tag: A deliberate bridge to Vyraxity brand in amber/mono */}
            <motion.div variants={itemVariants} className='mb-6'>
              <EyebrowLabel variant='accent'>{t('headerTag')}</EyebrowLabel>
            </motion.div>

            {/* Headline with Prism gradient text accent */}
            <motion.h1
              variants={itemVariants}
              className='vx-h1 tracking-tight mb-4 text-(--ar-text)'
            >
              Meet{' '}
              <span
                style={{
                  backgroundImage: 'var(--ar-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Airacter
              </span>
              .
            </motion.h1>

            {/* Subheadline in warm coral / secondary Prism tone */}
            <motion.p
              variants={itemVariants}
              style={{ color: 'var(--ar-secondary)' }}
              className='font-mono text-base sm:text-lg font-medium tracking-wide mb-6'
            >
              {t('subheadline')}
            </motion.p>

            {/* Body copy in Prism muted palette */}
            <motion.p
              variants={itemVariants}
              style={{ color: 'var(--ar-muted)' }}
              className='vx-body text-lg sm:text-xl font-light mb-10 max-w-xl leading-relaxed'
            >
              {t('copy')}
            </motion.p>

            {/* Primary Action Button using Airacter Prism button gradient & launch indicator */}
            <motion.div
              variants={itemVariants}
              className='flex flex-col sm:flex-row sm:items-center gap-6'
            >
              <a
                href='https://airacter.com'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  background: 'var(--ar-gradient)',
                  borderRadius: 'var(--ar-radius-card)',
                }}
                className='inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white shadow-none transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--ar-primary) group'
              >
                <span>{ctaText}</span>
                <span className='ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1'>
                  &rarr;
                </span>
              </a>

              <span
                style={{ color: 'var(--ar-muted)' }}
                className='font-mono text-xs uppercase tracking-widest'
              >
                {t('launchIndicator')}
              </span>
            </motion.div>
          </div>

          {/* Right Column: Interactive/Implied Chat Interface Mockup */}
          <div className='lg:col-span-6 w-full flex items-center justify-center'>
            <motion.div
              variants={itemVariants}
              style={{
                backgroundColor: 'var(--ar-surface)',
                borderRadius: 'var(--ar-radius-card)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
              className='w-full max-w-lg aspect-4/3 border p-6 sm:p-8 flex flex-col justify-between relative shadow-none'
            >
              {/* Chat Header with Personas */}
              <div className='flex items-center justify-between pb-4 border-b border-white/5'>
                <div className='flex items-center gap-3'>
                  {/* Persona identity avatars (abstract color dots) */}
                  <div className='flex -space-x-1.5'>
                    <span
                      style={{ backgroundColor: 'var(--ar-primary)' }}
                      className='w-3.5 h-3.5 rounded-full ring-2 ring-(--ar-surface) inline-block'
                    />
                    <span
                      style={{ backgroundColor: 'var(--ar-secondary)' }}
                      className='w-3.5 h-3.5 rounded-full ring-2 ring-(--ar-surface) inline-block'
                    />
                    <span
                      style={{ backgroundColor: '#38BDF8' }}
                      className='w-3.5 h-3.5 rounded-full ring-2 ring-(--ar-surface) inline-block'
                    />
                  </div>
                  <span
                    style={{ color: 'var(--ar-text)' }}
                    className='font-mono text-xs tracking-wider'
                  >
                    {t('name')} / {t('active_personas')}
                  </span>
                </div>
                <span
                  style={{ color: 'var(--ar-muted)' }}
                  className='font-mono text-[11px] uppercase tracking-widest opacity-60'
                >
                  {t('preview')}
                </span>
              </div>

              {/* Chat Conversation Stream */}
              <div className='flex-1 flex flex-col justify-center space-y-4 py-6'>
                {/* Persona Message */}
                <div className='flex items-start gap-3'>
                  <span
                    style={{ background: 'var(--ar-gradient)' }}
                    className='w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0'
                  >
                    A
                  </span>
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '12px',
                      color: 'var(--ar-text)',
                    }}
                    className='p-3.5 text-sm sm:text-base font-light max-w-xs sm:max-w-sm'
                  >
                    {t('bot_text')}
                  </div>
                </div>

                {/* User Response Message */}
                <div className='flex items-start justify-end gap-3'>
                  <div
                    style={{
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      color: 'var(--ar-text)',
                    }}
                    className='p-3.5 text-sm sm:text-base font-light max-w-xs'
                  >
                    {t('user_text')}
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                }}
                className='p-3 border flex items-center justify-between'
              >
                <span
                  style={{ color: 'var(--ar-muted)' }}
                  className='text-xs sm:text-sm font-light opacity-60'
                >
                  {t('text_box_placeholder')}
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--ar-primary)',
                    borderRadius: '6px',
                  }}
                  className='w-5 h-5 flex items-center justify-center text-[10px] text-white'
                >
                  &uarr;
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
