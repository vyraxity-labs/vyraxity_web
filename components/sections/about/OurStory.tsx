'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function OurStory() {
  const t = useTranslations('about.ourStory')
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

  const closingVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.65,
        ease: easeStandard,
      },
    },
  }

  return (
    <Section
      theme='dark'
      className='overflow-hidden border-b border-vx-line/40 py-24 md:py-36'
    >
      <Container>
        <div ref={sectionRef} className='max-w-4xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.h2
              variants={itemVariants}
              className='vx-h2 text-vx-white tracking-tight mb-8 md:mb-10'
            >
              {t('heading')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='vx-body text-vx-muted text-xl sm:text-2xl font-light leading-relaxed mb-12 sm:mb-16 max-w-3xl'
            >
              {t('copy')}
            </motion.p>

            {/* Closing lines: visually set apart with prominent editorial punch */}
            <div className='pt-8 border-t border-vx-line/50 w-full flex flex-col space-y-3 sm:space-y-4'>
              {closingLines.map((line, index) => (
                <motion.div
                  key={index}
                  variants={closingVariants}
                  className={
                    index === closingLines.length - 1
                      ? 'text-2xl sm:text-3xl md:text-4xl font-semibold text-vx-white tracking-tight'
                      : 'text-2xl sm:text-3xl md:text-4xl font-light text-vx-muted tracking-tight'
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
