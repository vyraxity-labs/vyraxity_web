'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

export function Nav() {
  const t = useTranslations('nav')
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 40)
    })
  }, [scrollY])

  const navLinks = [
    { key: 'products', href: '/products', label: t('links.products') },
    { key: 'labs', href: '/labs', label: t('links.labs') },
    { key: 'vision', href: '/vision', label: t('links.vision') },
    { key: 'about', href: '/about', label: t('links.about') },
    { key: 'careers', href: '/careers', label: t('links.careers') },
  ]

  return (
    <header className='sticky top-0 z-50 w-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none'>
      <div
        className={cn(
          'w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
          isScrolled ? 'pt-3 px-4 sm:px-6' : 'pt-0 px-0',
        )}
      >
        <div
          className={cn(
            'mx-auto flex h-16 items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
            isScrolled
              ? 'max-w-5xl rounded-vx-lg bg-vx-black/75 backdrop-blur-md px-6 md:px-8 border border-vx-line/60'
              : 'w-full max-w-7xl bg-vx-black px-6 md:px-10 lg:px-16 border-b border-transparent',
          )}
        >
          {/* Logo / Wordmark */}
          <Link
            href='/'
            className='font-mono text-base font-bold uppercase tracking-widest text-vx-white hover:text-vx-amber transition-colors duration-150'
          >
            {t('logo')}
          </Link>

          {/* Desktop Primary Nav */}
          <nav
            aria-label='Main Navigation'
            className='hidden md:flex items-center gap-8'
          >
            <ul className='flex items-center gap-8'>
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className='text-sm text-vx-muted hover:text-vx-white transition-colors duration-150'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact CTA - bracketed style per Visual Direction */}
            <Link
              href='/contact'
              className='font-mono text-xs uppercase tracking-wider text-vx-muted hover:text-vx-amber transition-colors duration-150'
            >
              [ {t('contact')} ]
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
