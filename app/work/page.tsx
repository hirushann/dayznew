import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/ui/page-header";
import { WorkGrid } from "@/components/sections/work-grid";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work",
  description: "Selected projects and case studies from DayZ Solutions.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Selected work"
        intro="Webshops, apps and products we've designed, built and shipped — for our clients and for ourselves."
      />
      <section className="container-site pb-section">
        <h2 className="sr-only">Projects</h2>
        <WorkGrid />
      </section>
      <Cta />
    </>
  );
}
