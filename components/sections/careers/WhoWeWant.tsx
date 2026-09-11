'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function WhoWeWant() {
  const t = useTranslations('careers.whoWeWant')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const roles = t.raw('roles') as string[]

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

  const roleVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.55,
        ease: easeStandard,
      },
    },
  }

  const closingVariant = {
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
            {/* Roles: simple stacked list with prominent typography */}
            <div className='flex flex-col space-y-3 sm:space-y-5 mb-14 sm:mb-18'>
              {roles.map((role, index) => (
                <motion.div
                  key={index}
                  variants={roleVariant}
                  className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-vx-white tracking-tight leading-tight'
                >
                  {role}
                </motion.div>
              ))}
            </div>

            {/* Closing line visually set apart */}
            <div className='pt-8 border-t border-vx-line/50 w-full'>
              <motion.p
                variants={closingVariant}
                className='vx-body text-vx-muted text-xl sm:text-2xl font-light leading-relaxed max-w-3xl'
              >
                {t('closingLine')}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
