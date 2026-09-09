import React from 'react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const t = useTranslations('home.hero')

  return (
    <section className='relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-vx-black text-vx-white pt-12 pb-8 sm:pt-16 sm:pb-12 overflow-hidden'>
      <Container className='flex-1 flex flex-col justify-center my-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
          {/* Left Column: Eyebrow, Headline, Supporting Copy, CTAs, Supporting Statement */}
          <div className='lg:col-span-7 flex flex-col items-start z-10'>
            <EyebrowLabel className='mb-6'>{t('eyebrow')}</EyebrowLabel>

            <h1 className='vx-h1 text-vx-white tracking-tight mb-8'>
              {t('headline')}
            </h1>

            <p className='vx-body text-vx-muted max-w-xl mb-10'>
              {t('supportingCopy')}
            </p>

            {/* CTAs */}
            <div className='flex flex-wrap items-center gap-4 mb-10'>
              <Button href='/products' variant='primary'>
                {t('primaryCta')}
              </Button>
              <Button href='/vision' variant='secondary'>
                {t('secondaryCta')}
              </Button>
            </div>

            {/* Supporting Statement */}
            <p className='font-mono text-xs text-vx-muted/80 max-w-md border-l border-vx-line pl-4'>
              {t('supportingStatement')}
            </p>
          </div>

          {/* Right Column: Visual Placeholder Box (swapped for GenerativeNetwork in Step 3.2) */}
          <div className='lg:col-span-5 w-full flex items-center justify-center'>
            <div className='relative w-full aspect-square max-w-110 border border-vx-line/60 rounded-vx-md flex flex-col items-center justify-center p-6 bg-vx-ink/40 text-center'>
              <span className='font-mono text-xs uppercase tracking-widest text-vx-muted/60 mb-2'>
                Generative Network Visual
              </span>
              <span className='font-mono text-[10px] text-vx-muted/40'>
                [ Step 3.2 Component Area ]
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Subtle Scroll Hint Indicator */}
      <div className='w-full flex justify-center pt-8'>
        <span className='font-mono text-xs uppercase tracking-widest text-vx-muted/60 flex items-center gap-2 select-none'>
          <span aria-hidden='true' className='animate-bounce'>
            &darr;
          </span>
          {t('scrollHint')}
        </span>
      </div>
    </section>
  )
}
