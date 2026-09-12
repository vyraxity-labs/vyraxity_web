export function getOrganizationStructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vyraxity',
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description:
      'Vyraxity is a technology company building ambitious software and exploring emerging technologies from Africa for the world.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Nigeria',
    },
    sameAs: [
      'https://github.com/vyraxity',
      'https://linkedin.com/company/vyraxity',
      'https://x.com/vyraxity',
      'https://instagram.com/vyraxity',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Software Engineering',
      'Emerging Technologies',
      'Product Development',
    ],
  }
}
