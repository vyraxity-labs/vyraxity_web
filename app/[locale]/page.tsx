import { Hero } from "@/components/sections/home/Hero";
import { Belief } from "@/components/sections/home/Belief";
import { WhatIsVyraxity } from "@/components/sections/home/WhatIsVyraxity";
import { CurrentProduct } from "@/components/sections/home/CurrentProduct";

export default function Home() {
  return (
    <>
      <Hero />
      <Belief />
      <WhatIsVyraxity />
      <CurrentProduct />
    </>
  );
}