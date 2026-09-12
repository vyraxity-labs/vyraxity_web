'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function FollowTheJourney() {
  const t = useTranslations('contact.followTheJourney')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const socialLinks = [
    {
      key: 'github',
      href: 'https://github.com/vyraxity',
      label: t('links.github'),
    },
    {
      key: 'linkedin',
      href: 'https://linkedin.com/company/vyraxity',
      label: t('links.linkedin'),
    },
    {
      key: 'x',
      href: 'https://x.com/vyraxity',
      label: t('links.x'),
    },
    {
      key: 'instagram',
      href: 'https://instagram.com/vyraxity',
      label: t('links.instagram'),
    },
  ]

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
        duration: prefersReduced ? 0 : 0.55,
        ease: easeStandard,
      },
    },
  }

  return (
    <Section
      theme='dark'
      className='overflow-hidden border-t border-vx-line/40 py-20 md:py-32'
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
              className='vx-h2 text-vx-white tracking-tight mb-8 sm:mb-12'
            >
              {t('heading')}
            </motion.h2>

            {/* Plain text row, consistent with footer social links treatment */}
            <motion.ul
              variants={itemVariants}
              className='flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-vx-line/50 w-full'
            >
              {socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-mono text-base sm:text-lg text-vx-muted hover:text-vx-amber transition-colors duration-150 inline-flex items-center gap-1.5'
                  >
                    <span>{link.label}</span>
                    <span aria-hidden='true' className='text-xs opacity-60'>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
