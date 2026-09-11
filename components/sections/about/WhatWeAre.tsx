'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function WhatWeAre() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const items = t.raw('whatWeAre') as string[]

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
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
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
            className='flex flex-col space-y-4 sm:space-y-6'
          >
            {items.map((statement, index) => {
              const isAccentOrAnchor = index === items.length - 1

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight ${
                    isAccentOrAnchor ? 'text-vx-white' : 'text-vx-white/90'
                  }`}
                >
                  {statement}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
