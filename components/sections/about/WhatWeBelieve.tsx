'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function WhatWeBelieve() {
  const t = useTranslations('about.whatWeBelieve')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const lines = t.raw('lines') as string[]

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

  const lineVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.65,
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
            {/* Core Belief statements in prominent two-line rhythm */}
            <div className='flex flex-col space-y-3 sm:space-y-4 mb-12 sm:mb-16'>
              {lines.map((line, index) => (
                <motion.h2
                  key={index}
                  variants={lineVariant}
                  className={`vx-h2 tracking-tight ${
                    index === 0 ? 'text-vx-white' : 'text-vx-muted'
                  }`}
                >
                  {line}
                </motion.h2>
              ))}
            </div>

            {/* Supporting explanatory copy visually separated */}
            <div className='pt-8 border-t border-vx-line/50 w-full'>
              <motion.p
                variants={copyVariant}
                className='vx-body text-vx-muted text-xl sm:text-2xl font-light leading-relaxed max-w-3xl'
              >
                {t('copy')}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
