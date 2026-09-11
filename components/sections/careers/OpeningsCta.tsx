'use client'

import React, { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export interface JobOpening {
  title: string
  team: string
  location: string
  href: string
}

export interface OpeningsCtaProps {
  hasOpenings?: boolean
  openings?: JobOpening[]
}

export function OpeningsCta({
  hasOpenings = false,
  openings = [],
}: OpeningsCtaProps) {
  const t = useTranslations('careers.openings')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

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
            className='flex flex-col items-start w-full'
          >
            {!hasOpenings || openings.length === 0 ? (
              /* Empty state: quiet, restrained notice */
              <motion.div variants={itemVariants} className='w-full'>
                <p className='font-mono text-sm sm:text-base text-vx-muted tracking-wide'>
                  {t('empty')}
                </p>
              </motion.div>
            ) : (
              /* Filled state: hairline-list style reusing Labs metadata grammar */
              <motion.div variants={itemVariants} className='w-full flex flex-col space-y-8'>
                <div className='w-full border-t border-vx-line/60 divide-y divide-vx-line/40'>
                  {openings.map((job, idx) => (
                    <div
                      key={idx}
                      className='py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group'
                    >
                      <div className='flex flex-col space-y-1'>
                        <span className='font-mono text-xs uppercase tracking-wider text-vx-muted'>
                          {job.team} · {job.location}
                        </span>
                        <span className='text-xl sm:text-2xl font-medium text-vx-white tracking-tight group-hover:text-vx-amber transition-colors'>
                          {job.title}
                        </span>
                      </div>
                      <Button
                        href={job.href}
                        variant='secondary'
                        className='self-start sm:self-auto shrink-0'
                      >
                        Apply →
                      </Button>
                    </div>
                  ))}
                </div>

                <div className='pt-4'>
                  <Button href='#openings' variant='primary'>
                    {t('cta')}
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
