import { useTranslations } from 'next-intl'
import { ProductsHero } from '@/components/sections/products/ProductsHero'
import { AiracterCard } from '@/components/sections/products/AiracterCard'
import { FutureProductCard } from '@/components/sections/products/FutureProductCard'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export default function ProductsPage() {
  const t = useTranslations('products')
  const futureProducts = t.raw('future') as Array<{
    label: string
    lines: string[]
    footer: string
  }>

  return (
    <>
      <ProductsHero />
      <Section theme='dark' className='pt-16 pb-12 md:pt-24 md:pb-16'>
        <Container>
          <div className='flex flex-col gap-10 sm:gap-12'>
            <AiracterCard />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10'>
              {futureProducts.map((item, index) => (
                <FutureProductCard
                  key={index}
                  label={item.label}
                  lines={item.lines}
                  footer={item.footer}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
