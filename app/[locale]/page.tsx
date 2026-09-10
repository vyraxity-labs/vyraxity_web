import { Hero } from "@/components/sections/home/Hero";
import { Belief } from "@/components/sections/home/Belief";
import { WhatIsVyraxity } from "@/components/sections/home/WhatIsVyraxity";
import { CurrentProduct } from "@/components/sections/home/CurrentProduct";
import { Labs } from "@/components/sections/home/Labs";
import { Origin } from "@/components/sections/home/Origin";
import { Principles } from "@/components/sections/home/Principles";

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
    </>
  );
}