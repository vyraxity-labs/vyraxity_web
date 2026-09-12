import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { VisionHero } from "@/components/sections/vision/VisionHero";
import { OurAmbition } from "@/components/sections/vision/OurAmbition";
import { NigeriaSection } from "@/components/sections/vision/NigeriaSection";
import { AfricaSection } from "@/components/sections/vision/AfricaSection";
import { WorldSection } from "@/components/sections/vision/WorldSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.vision' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/vision`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}/vision`,
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

export default function VisionPage() {

  return (
    <>
      <VisionHero />
      <OurAmbition />
      <NigeriaSection />
      <AfricaSection />
      <WorldSection />
    </>
  );
}


