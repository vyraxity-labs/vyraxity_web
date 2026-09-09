import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function Nav() {
  const t = useTranslations('nav')

  const navLinks = [
    { key: 'products', href: '/products', label: t('links.products') },
    { key: 'labs', href: '/labs', label: t('links.labs') },
    { key: 'vision', href: '/vision', label: t('links.vision') },
    { key: 'about', href: '/about', label: t('links.about') },
    { key: 'careers', href: '/careers', label: t('links.careers') },
  ]

  return (
    <header className='sticky top-0 z-50 w-full bg-vx-black transition-colors'>
      <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16'>
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
    </header>
  )
}
