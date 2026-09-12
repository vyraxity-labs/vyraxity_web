import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { OurStory } from '@/components/sections/about/OurStory'
import { WhatWeAre } from '@/components/sections/about/WhatWeAre'
import { WhatWeBelieve } from '@/components/sections/about/WhatWeBelieve'
import { BuildingToward } from '@/components/sections/about/BuildingToward'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.about' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}/about`,
      siteName: 'Vyraxity',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default function AboutPage() {

  return (
    <>
      <AboutHero />
      <OurStory />
      <WhatWeAre />
      <WhatWeBelieve />
      <BuildingToward />
    </>
  )
}

