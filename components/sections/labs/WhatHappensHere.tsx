'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

interface LabItem {
  title: string
  description: string
}

export function WhatHappensHere() {
  const t = useTranslations('labsPage.whatHappensHere')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const items = t.raw('items') as LabItem[]

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
        duration: prefersReduced ? 0 : 0.5,
        ease: easeStandard,
      },
    },
  }

  return (
    <Section
      theme='dark'
      className='overflow-hidden border-t border-vx-line/40 py-24 md:py-32'
    >
      <Container>
        <div ref={sectionRef} className='max-w-5xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.h2
              variants={itemVariants}
              className='vx-h2 text-vx-white tracking-tight mb-16'
            >
              {t('heading')}
            </motion.h2>

            {/* Clean list layout: horizontal hairline dividers, numbered 01-04, explicitly no icon-card grid */}
            <div className='w-full divide-y divide-vx-line/60 border-y border-vx-line/60'>
              {items.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className='py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline'
                >
                  {/* Numbering + Title */}
                  <div className='md:col-span-4 flex items-baseline gap-4'>
                    <span className='font-mono text-xs sm:text-sm text-vx-amber select-none'>
                      0{index + 1}
                    </span>
                    <h3 className='font-sans text-xl sm:text-2xl font-bold text-vx-white tracking-tight'>
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className='md:col-span-8'>
                    <p className='vx-body text-vx-muted text-base sm:text-lg leading-relaxed font-light'>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
