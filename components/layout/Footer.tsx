import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'

export function Footer() {
  const t = useTranslations('footer')

  const siteLinks = [
    { key: 'products', href: '/products', label: t('links.products') },
    { key: 'labs', href: '/labs', label: t('links.labs') },
    { key: 'vision', href: '/vision', label: t('links.vision') },
    { key: 'about', href: '/about', label: t('links.about') },
    { key: 'careers', href: '/careers', label: t('links.careers') },
    { key: 'contact', href: '/contact', label: t('links.contact') },
  ]

  // Plain-text wordmark links, not icons, per anti-icon-cliche stance
  const socialLinks = [
    {
      key: 'github',
      href: 'https://github.com/vyraxity',
      label: t('social.github'),
    },
    {
      key: 'linkedin',
      href: 'https://linkedin.com/company/vyraxity',
      label: t('social.linkedin'),
    },
    { key: 'x', href: 'https://x.com/vyraxity', label: t('social.x') },
    {
      key: 'instagram',
      href: 'https://instagram.com/vyraxity',
      label: t('social.instagram'),
    },
  ]

  return (
    <footer className='w-full bg-vx-black border-t border-vx-line/60 pt-20 pb-16 text-vx-white'>
      <Container>
        {/* Top block: Wordmark + Tagline and Nav links */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-vx-line/40'>
          {/* Brand Col */}
          <div className='md:col-span-6 lg:col-span-7 flex flex-col justify-between'>
            <div>
              <Link
                href='/'
                className='font-mono text-lg font-bold uppercase tracking-widest text-vx-white hover:text-vx-amber transition-colors duration-150 inline-block'
              >
                {t('wordmark')}
              </Link>
              <p className='mt-4 text-vx-muted text-base leading-relaxed max-w-sm whitespace-pre-line'>
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Site Navigation Links Col */}
          <div className='md:col-span-6 lg:col-span-5'>
            <nav aria-label='Footer Navigation'>
              <ul className='grid grid-cols-2 gap-y-3 gap-x-8'>
                {siteLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className='text-sm text-vx-muted hover:text-vx-white transition-colors duration-150 inline-block'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social wordmark links */}
            <div className='mt-10 pt-6 border-t border-vx-line/30'>
              <ul className='flex flex-wrap items-center gap-6'>
                {socialLinks.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-mono text-xs uppercase tracking-wider text-vx-muted hover:text-vx-amber transition-colors duration-150 inline-block'
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright & Built in Nigeria signature */}
        <div className='pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-vx-muted/80'>
          <p>{t('copyright')}</p>
          <p className='tracking-wider uppercase text-vx-muted'>
            {t('signature')}
          </p>
        </div>
      </Container>
    </footer>
  )
}
