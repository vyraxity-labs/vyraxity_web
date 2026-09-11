import { ProductsHero } from "@/components/sections/products/ProductsHero";
import { AiracterCard } from "@/components/sections/products/AiracterCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <Section theme="dark" className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <div className="flex flex-col gap-12">
            <AiracterCard />
          </div>
        </Container>
      </Section>
    </>
  );
}

