'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function BiggerAmbition() {
  const t = useTranslations('home.biggerAmbition')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const fullCopy = t('copy')
  // Split copy before the final emotional punchline: "We are starting small. Our ambition is not small."
  const splitIndex = fullCopy.indexOf('We are starting small.')
  const bodyCopy =
    splitIndex !== -1 ? fullCopy.slice(0, splitIndex).trim() : fullCopy
  const punchline = splitIndex !== -1 ? fullCopy.slice(splitIndex).trim() : ''

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
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
        duration: prefersReduced ? 0 : 0.5,
        ease: easeStandard,
      },
    },
  }

  return (
    <Section
      id='ambition'
      theme='dark'
      className='overflow-hidden border-t border-vx-line/40 py-28 md:py-36'
    >
      <Container>
        <div ref={sectionRef} className='max-w-4xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.div variants={itemVariants} className='mb-6'>
              <EyebrowLabel>{t('eyebrow')}</EyebrowLabel>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className='vx-h1 text-vx-white tracking-tight mb-10'
            >
              {t('headline')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='vx-body text-vx-muted text-lg sm:text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl font-normal'
            >
              {bodyCopy}
            </motion.p>

            {/* Emotional Punchline: Visually set apart with larger type & amber accent */}
            {punchline && (
              <motion.div
                variants={itemVariants}
                className='pt-8 border-t border-vx-line/50 w-full'
              >
                <p className='text-2xl sm:text-3xl md:text-4xl font-semibold text-vx-white tracking-tight leading-snug'>
                  <span>{t('footer1')}</span>
                  <span className='text-vx-amber'>{t('footer2')}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
