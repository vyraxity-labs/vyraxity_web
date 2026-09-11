'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { motion } from 'motion/react'
import { motionDurations, easeStandard, useReducedMotion } from '@/lib/motion'
import { useInViewOnce } from '@/lib/hooks/useInViewOnce'

export function ContactHero() {
  const t = useTranslations('contact.hero')
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInViewOnce(sectionRef)
  const prefersReduced = useReducedMotion()

  const [copied, setCopied] = useState(false)
  const email = t('email')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email to clipboard', err)
    }
  }

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.14,
        delayChildren: prefersReduced ? 0 : 0.08,
      },
    },
  }

  const headlineVariant = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : motionDurations.narrative,
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

  const emailVariant = {
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
    <section className='relative w-full bg-vx-black text-vx-white pt-24 pb-20 md:pt-36 md:pb-28 border-b border-vx-line/40'>
      <Container>
        <div ref={sectionRef} className='max-w-4xl'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='flex flex-col items-start'
          >
            <motion.h1
              variants={headlineVariant}
              className='vx-h1 text-vx-white tracking-tight mb-8 md:mb-12 max-w-4xl'
            >
              {t('headline')}
            </motion.h1>

            <motion.p
              variants={copyVariant}
              className='vx-body text-vx-muted text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mb-12 sm:mb-16'
            >
              {t('copy')}
            </motion.p>

            {/* Prominent Direct Email affordance: Clickable mailto + Click-to-copy */}
            <motion.div
              variants={emailVariant}
              className='pt-8 border-t border-vx-line/50 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6'
            >
              <div className='flex flex-col space-y-2'>
                <span className='font-mono text-xs uppercase tracking-widest text-vx-muted'>
                  {t('email_label')}
                </span>
                <a
                  href={`mailto:${email}`}
                  className='text-2xl sm:text-3xl md:text-4xl font-mono text-vx-white hover:text-vx-amber transition-colors tracking-tight'
                >
                  {email}
                </a>
              </div>

              <button
                type='button'
                onClick={handleCopy}
                aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
                className='self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-vx-sm border border-vx-line text-sm font-mono text-vx-muted hover:text-vx-white hover:border-vx-line-hover transition-colors cursor-pointer'
              >
                {copied ? (
                  <>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='text-vx-amber'
                    >
                      <polyline points='20 6 9 17 4 12' />
                    </svg>
                    <span className='text-vx-amber'>{t('copied')}</span>
                  </>
                ) : (
                  <>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
                      <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                    </svg>
                    <span>{t('copy_email')}</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
