'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { motionDurations, easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function CareersHero() {
  const t = useTranslations('careers.hero')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.14,
        delayChildren: prefersReduced ? 0 : 0.08,
      },
    },
  }

  const headlineVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : motionDurations.narrative,
        ease: easeStandard,
      },
    },
  }

  const copyVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
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
    <section className='relative w-full bg-vx-black text-vx-white pt-24 pb-20 md:pt-36 md:pb-28 border-b border-vx-line/40'>
      <Container>
        <div ref={sectionRef} className='max-w-4xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.h1
              variants={headlineVariant}
              className='vx-h1 text-vx-white tracking-tight mb-8 md:mb-12 max-w-4xl'
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              variants={copyVariant}
              className='vx-body text-vx-muted text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl'
            >
              {t('copy')}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
