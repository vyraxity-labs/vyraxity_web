'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { motion } from 'motion/react'
import { motionDurations, easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function ProductsHero() {
  const t = useTranslations('products.hero')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  }

  const eyebrowVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: easeStandard,
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
    <section className='relative w-full bg-vx-black text-vx-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-vx-line/40'>
      <Container>
        <div ref={sectionRef} className='max-w-4xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.div variants={eyebrowVariant} className='mb-6'>
              <EyebrowLabel>{t('eyebrow')}</EyebrowLabel>
            </motion.div>

            <motion.h1
              variants={headlineVariant}
              className='vx-h1 text-vx-white tracking-tight mb-8'
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              variants={copyVariant}
              className='vx-body text-vx-muted text-xl sm:text-2xl font-light max-w-2xl'
            >
              {t('copy')}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
