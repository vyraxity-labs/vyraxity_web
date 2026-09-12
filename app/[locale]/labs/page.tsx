import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { LabsHero } from '@/components/sections/labs/LabsHero'
import { WhatHappensHere } from '@/components/sections/labs/WhatHappensHere'
import { ExperimentCard } from '@/components/sections/labs/ExperimentCard'
import { LabsClosing } from '@/components/sections/labs/LabsClosing'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.labs' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/labs`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}/labs`,
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

export default function LabsPage() {

  const t = useTranslations('labsPage.experimentExample')

  return (
    <>
      <LabsHero />
      <WhatHappensHere />
      <Section
        theme='dark'
        className='overflow-hidden border-t border-vx-line/40 py-24 md:py-32'
      >
        <Container>
          <div className='max-w-5xl flex flex-col items-start'>
            <div className='font-mono text-xs uppercase tracking-widest text-vx-amber mb-6'>
              {t('title')}
            </div>
            <ExperimentCard
              system={t('system')}
              id={t('id')}
              status={t('status')}
              description={t('description')}
              meta={{
                status: t('meta.status'),
                version: t('meta.version'),
                updated: t('meta.updated'),
              }}
            />
          </div>
        </Container>
      </Section>
      <LabsClosing />
    </>
  )
}
