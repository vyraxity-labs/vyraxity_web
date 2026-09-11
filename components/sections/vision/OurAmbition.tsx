'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function OurAmbition() {
  const t = useTranslations('vision.ourAmbition')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const lines = t.raw('lines') as string[]

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.09,
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
            <motion.h2
              variants={itemVariants}
              className='vx-h2 text-vx-white tracking-tight mb-14'
            >
              {t('heading')}
            </motion.h2>

            {/* Preserving short declarative rhythm: distinct lines with generous spacing */}
            <div className='flex flex-col space-y-6 sm:space-y-8 text-vx-muted text-lg sm:text-xl md:text-2xl font-light leading-relaxed'>
              {lines.map((line, index) => {
                const isFinalPunchline = index >= lines.length - 2

                return (
                  <motion.p
                    key={index}
                    variants={itemVariants}
                    className={
                      isFinalPunchline
                        ? 'text-vx-white font-normal pl-4 border-l-2 border-vx-amber/60'
                        : ''
                    }
                  >
                    {line}
                  </motion.p>
                )
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
