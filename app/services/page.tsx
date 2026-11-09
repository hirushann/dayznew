import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { Process } from "@/components/sections/process";
import { ServicesGrid } from "@/components/sections/services-grid";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, web and mobile app development, UI/UX design, QA and WordPress from DayZ Solutions in Sri Lanka.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Everything you need to build and grow"
        accent="grow"
        intro="Custom software, web and mobile apps, design, testing and WordPress — from first idea to long-term support."
      />
      <section className="container-site pb-section">
        <h2 className="sr-only">All services</h2>
        <ServicesGrid />
      </section>
      <Process label="How we work" />
      <Cta />
    </>
  );
}
