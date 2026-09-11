import { AboutHero } from '@/components/sections/about/AboutHero'
import { OurStory } from '@/components/sections/about/OurStory'
import { WhatWeAre } from '@/components/sections/about/WhatWeAre'
import { WhatWeBelieve } from '@/components/sections/about/WhatWeBelieve'
import { BuildingToward } from '@/components/sections/about/BuildingToward'

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

