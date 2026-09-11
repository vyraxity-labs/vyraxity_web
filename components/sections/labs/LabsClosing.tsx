'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function LabsClosing() {
  const t = useTranslations('labsPage')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 0.8,
        ease: easeStandard,
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
      theme='dark'
      className='overflow-hidden border-t border-vx-line/40 py-28 md:py-40'
    >
      <Container>
        <div ref={sectionRef} className='max-w-3xl mx-auto text-center'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-center justify-center'
          >
            <motion.p
              variants={itemVariants}
              className='vx-body text-vx-white/90 text-xl sm:text-2xl md:text-3xl font-light leading-relaxed'
            >
              {t('closing')}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
