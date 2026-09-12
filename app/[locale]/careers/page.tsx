import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { CareersHero } from '@/components/sections/careers/CareersHero'
import { WhoWeWant } from '@/components/sections/careers/WhoWeWant'
import { WorkingHere } from '@/components/sections/careers/WorkingHere'
import { OpeningsCta } from '@/components/sections/careers/OpeningsCta'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.careers' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/careers`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}/careers`,
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

export default function CareersPage() {

  return (
    <>
      <CareersHero />
      <WhoWeWant />
      <WorkingHere />
      <OpeningsCta />
    </>
  )
}
