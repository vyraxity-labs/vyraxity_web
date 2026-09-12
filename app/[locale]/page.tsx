import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Hero } from "@/components/sections/home/Hero";
import { Belief } from "@/components/sections/home/Belief";
import { WhatIsVyraxity } from "@/components/sections/home/WhatIsVyraxity";
import { CurrentProduct } from "@/components/sections/home/CurrentProduct";
import { Labs } from "@/components/sections/home/Labs";
import { Origin } from "@/components/sections/home/Origin";
import { Principles } from "@/components/sections/home/Principles";
import { BiggerAmbition } from "@/components/sections/home/BiggerAmbition";
import { ClosingCta } from "@/components/sections/home/ClosingCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.home' })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vyraxity.com'

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}`,
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

export default function Home() {
  return (
    <>
      <Hero />
      <Belief />
      <WhatIsVyraxity />
      <CurrentProduct />
      <Labs />
      <Origin />
      <Principles />
      <BiggerAmbition />
      <ClosingCta />
    </>
  );
}