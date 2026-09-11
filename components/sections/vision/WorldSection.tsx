'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function WorldSection() {
  const t = useTranslations('vision.world')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const closingLines = t.raw('closingLines') as string[]

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

  const closingLineVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.7,
        ease: easeStandard,
      },
    },
  }

  return (
    <Section
      theme='dark'
      className='overflow-hidden border-t border-vx-line/40 py-28 md:py-44'
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
              <EyebrowLabel variant='accent'>{t('title')}</EyebrowLabel>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className='vx-h2 text-vx-white tracking-tight mb-8'
            >
              {t('heading')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='vx-body text-vx-muted text-xl sm:text-2xl font-light leading-relaxed mb-16 sm:mb-24 max-w-2xl'
            >
              {t('copy')}
            </motion.p>

            {/* Closing Lines: The final, largest-type moment on the vision page */}
            <div className='flex flex-col space-y-4 sm:space-y-6 pt-10 border-t border-vx-line/60 w-full'>
              {closingLines.map((line, index) => (
                <motion.div
                  key={index}
                  variants={closingLineVariant}
                  className={
                    index === 0
                      ? 'vx-h1 text-vx-muted tracking-tight'
                      : 'vx-h1 text-vx-white tracking-tight'
                  }
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
