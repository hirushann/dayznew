import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { EzearchSpotlight } from "@/components/sections/ezearch-spotlight";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Intro } from "@/components/sections/intro";
import { Process } from "@/components/sections/process";
import { ServicesBento } from "@/components/sections/services-bento";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Intro />
      <ServicesBento />
      <Industries />
      <Process />
      <FeaturedWork />
      <EzearchSpotlight />
      <Stats />
      <Testimonials />
      <Cta />
    </>
  );
}
