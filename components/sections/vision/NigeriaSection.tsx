'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function NigeriaSection() {
  const t = useTranslations('vision.nigeria')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

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
    <Section
      theme='dark'
      className='overflow-hidden border-t border-vx-line/40 py-24 md:py-36'
    >
      <Container>
        <div ref={sectionRef} className='max-w-3xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.div variants={itemVariants} className='mb-6'>
              <EyebrowLabel>{t('title')}</EyebrowLabel>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className='vx-h2 text-vx-white tracking-tight mb-8'
            >
              {t('heading')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='vx-body text-vx-muted text-xl sm:text-2xl font-light leading-relaxed max-w-2xl'
            >
              {t('copy')}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
