'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function ClosingCta() {
  const t = useTranslations('home.closingCta')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  // Deliberately the quietest, most confident moment on the page: simple fade
  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 0.8,
        ease: easeStandard,
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
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
      id='join'
      theme='dark'
      className='overflow-hidden border-t border-vx-line/40 py-32 md:py-48'
    >
      <Container>
        <div ref={sectionRef} className='max-w-4xl mx-auto text-center'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-center justify-center'
          >
            <motion.h2
              variants={itemVariants}
              className='vx-h1 text-vx-white tracking-tight mb-4 max-w-3xl'
            >
              {t('headline')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className='vx-body text-vx-muted text-xl sm:text-2xl md:text-3xl font-light mb-12'
            >
              {t('copy')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className='flex flex-wrap items-center justify-center gap-4'
            >
              <Button href='/about' variant='primary'>
                {t('primaryCta')}
              </Button>
              <Button href='/contact' variant='secondary'>
                {t('secondaryCta')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
