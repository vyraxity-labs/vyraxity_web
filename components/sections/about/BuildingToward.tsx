'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function BuildingToward() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const items = t.raw('buildingToward') as string[]

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
      className='overflow-hidden py-24 md:py-36'
    >
      <Container>
        <div ref={sectionRef} className='max-w-4xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <div className='w-full border-t border-vx-line/60 divide-y divide-vx-line/40'>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className='py-8 sm:py-10 md:py-12 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10'
                >
                  <span className='font-mono text-xs sm:text-sm text-vx-muted uppercase tracking-wider shrink-0'>
                    0{index + 1}
                  </span>
                  <p className='text-xl sm:text-2xl md:text-3xl font-light text-vx-white tracking-tight leading-relaxed max-w-3xl'>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
