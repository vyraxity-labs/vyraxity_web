'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function Belief() {
  const t = useTranslations('home.belief')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  // Retrieve raw array of declarative copy lines
  const copyLines = t.raw('copy') as string[]

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

  return (
    <Section id='vision' theme='light' className='overflow-hidden'>
      <Container>
        <div ref={sectionRef} className='max-w-4xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.div variants={itemVariants} className='mb-6'>
              <EyebrowLabel>{t('eyebrow')}</EyebrowLabel>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className='vx-h2 text-vx-ink-text tracking-tight mb-12'
            >
              {t('headline')}
            </motion.h2>

            {/* Separated declarative paragraphs with deliberate typographic pacing */}
            <div className='flex flex-col space-y-5 text-vx-ink-secondary text-lg sm:text-xl md:text-2xl leading-relaxed font-normal'>
              {copyLines.map((line, index) => {
                const isShortDeclarative =
                  line.startsWith('We can') || line.startsWith('And we can')
                const isFinalStatement = index === copyLines.length - 1

                return (
                  <motion.p
                    key={index}
                    variants={itemVariants}
                    className={`
                      ${isShortDeclarative ? 'text-vx-ink-text font-medium pl-3 border-l-2 border-vx-ink-accent/40 sm:pl-4' : ''}
                      ${isFinalStatement ? 'pt-4 text-vx-ink-text font-medium' : ''}
                    `.trim()}
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
