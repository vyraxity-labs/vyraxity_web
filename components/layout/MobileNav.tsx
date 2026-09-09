'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { motionDurations, easeStandard, useReducedMotion } from '@/lib/motion'

export interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations('nav')
  const prefersReduced = useReducedMotion()

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navLinks = [
    { key: 'products', href: '/products', label: t('links.products') },
    { key: 'labs', href: '/labs', label: t('links.labs') },
    { key: 'vision', href: '/vision', label: t('links.vision') },
    { key: 'about', href: '/about', label: t('links.about') },
    { key: 'careers', href: '/careers', label: t('links.careers') },
  ]

  // Editorial motion transitions - narrative duration (~0.8s) per visual direction
  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.3,
        ease: easeStandard,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 0.4,
        ease: easeStandard,
      },
    },
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      y: prefersReduced ? 0 : -20,
      transition: {
        duration: prefersReduced ? 0 : 0.3,
        ease: easeStandard,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : motionDurations.narrative,
        ease: easeStandard,
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: prefersReduced ? 0 : 24 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: easeStandard,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role='dialog'
          aria-modal='true'
          aria-label='Mobile Navigation'
          initial='closed'
          animate='open'
          exit='closed'
          variants={overlayVariants}
          className='fixed md:hidden inset-0 z-50 flex flex-col bg-vx-black text-vx-white px-6 py-6 sm:px-10 overflow-y-auto'
        >
          {/* Header bar inside menu matching nav height & alignment */}
          <div className='flex h-16 w-full items-center justify-between'>
            <Link
              href='/'
              onClick={onClose}
              className='font-mono text-base font-bold uppercase tracking-widest text-vx-white hover:text-vx-amber transition-colors duration-150'
            >
              {t('logo')}
            </Link>

            <button
              type='button'
              onClick={onClose}
              aria-label='Close navigation menu'
              className='font-mono text-xs uppercase tracking-widest text-vx-muted hover:text-vx-amber transition-colors duration-150 cursor-pointer p-2'
            >
              CLOSE
            </button>
          </div>

          {/* Editorial Stacked Links */}
          <motion.nav
            variants={menuVariants}
            className='flex flex-1 flex-col justify-between pt-12 pb-10'
          >
            <ul className='flex flex-col space-y-6 sm:space-y-8'>
              {navLinks.map((link) => (
                <motion.li key={link.key} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className='vx-h2 inline-block text-vx-white hover:text-vx-amber transition-colors duration-200'
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Visually distinct Contact CTA at bottom */}
            <motion.div
              variants={itemVariants}
              className='pt-8 border-t border-vx-line/50'
            >
              <Link
                href='/contact'
                onClick={onClose}
                className='font-mono text-sm uppercase tracking-widest text-vx-muted hover:text-vx-amber transition-colors duration-150'
              >
                [ {t('contact')} ]
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
