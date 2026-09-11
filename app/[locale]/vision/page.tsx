import { VisionHero } from "@/components/sections/vision/VisionHero";
import { OurAmbition } from "@/components/sections/vision/OurAmbition";
import { NigeriaSection } from "@/components/sections/vision/NigeriaSection";
import { AfricaSection } from "@/components/sections/vision/AfricaSection";
import { WorldSection } from "@/components/sections/vision/WorldSection";

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


