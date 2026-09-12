import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import "./airacter.css";
import { AiracterHero } from "@/components/sections/airacter/AiracterHero";
import { RelationshipToVyraxity } from "@/components/sections/airacter/RelationshipToVyraxity";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.airacter' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/products/airacter`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}/products/airacter`,
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

export default function AiracterPage() {

  return (
    <>
      <div className="airacter-scope w-full">
        <AiracterHero />
      </div>
      <RelationshipToVyraxity />
    </>
  );
}


