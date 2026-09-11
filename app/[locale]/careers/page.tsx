import { CareersHero } from '@/components/sections/careers/CareersHero'
import { WhoWeWant } from '@/components/sections/careers/WhoWeWant'
import { WorkingHere } from '@/components/sections/careers/WorkingHere'
import { OpeningsCta } from '@/components/sections/careers/OpeningsCta'

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
