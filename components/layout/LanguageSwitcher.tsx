'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

export interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const currentLocale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div
      role='region'
      aria-label='Language switcher'
      className={cn(
        'inline-flex items-center gap-1 font-mono text-xs tracking-wider uppercase select-none',
        className
      )}
    >
      {routing.locales.map((locale, index) => {
        const isActive = locale === currentLocale

        return (
          <span key={locale} className='inline-flex items-center'>
            <button
              type='button'
              onClick={() => handleLocaleChange(locale)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Switch language to ${locale.toUpperCase()}`}
              className={cn(
                'transition-colors duration-150 py-0.5 px-1 rounded-vx-sm cursor-pointer',
                isActive
                  ? 'text-vx-amber font-semibold'
                  : 'text-vx-muted hover:text-vx-white font-normal'
              )}
            >
              {locale.toUpperCase()}
            </button>
            {index < routing.locales.length - 1 && (
              <span aria-hidden='true' className='text-vx-line mx-0.5 select-none'>
                /
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
