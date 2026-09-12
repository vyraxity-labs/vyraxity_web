import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // Supported locales for the app
  locales: ['en', 'fr'],

  // Default locale if none is matched
  defaultLocale: 'en',


  // Do not show /en in URLs for the default locale, but prefix other locales
  localePrefix: 'as-needed',
})
