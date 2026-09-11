'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function AfricaSection() {
  const t = useTranslations('vision.africa')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const listItems = t.raw('list') as string[]

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
        duration: prefersReduced ? 0 : 0.55,
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
              className='vx-body text-vx-muted text-xl sm:text-2xl font-light leading-relaxed mb-12 max-w-2xl'
            >
              {t('copy')}
            </motion.p>

            {/* Compact stacked list of all 6 items */}
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-vx-line/60 font-mono text-sm sm:text-base text-vx-white'>
              {listItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className='flex items-center gap-3'
                >
                  <span
                    className='w-1.5 h-1.5 rounded-full bg-vx-amber inline-block'
                    aria-hidden='true'
                  />
                  <span className='tracking-wide'>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
