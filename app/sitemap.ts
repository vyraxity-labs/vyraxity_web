import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  const routes = [
    '',
    '/products',
    '/products/airacter',
    '/labs',
    '/vision',
    '/about',
    '/careers',
    '/contact',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const locale of routing.locales) {
      const url = `${siteUrl}/${locale}${route}`
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route.startsWith('/products') ? 0.8 : 0.6,
      })
    }
  }

  return sitemapEntries
}
