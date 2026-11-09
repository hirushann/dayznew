import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Cta } from "@/components/sections/cta";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a software studio in Nittambuwa, Sri Lanka, building custom software, web and mobile apps since ${site.founded}.`,
};

// TODO: confirm — add a team section once names, roles and photos are supplied.
export default function AboutPage() {
  const [lead, ...rest] = about.story;
  return (
    <>
      <PageHeader label="About" title="Day to day solutions from A to Z" accent="Z" />

      <section className="container-site pb-section grid gap-8 md:grid-cols-12">
        <p className="micro-label pt-3 md:col-span-3">[ Our story ]</p>
        <div className="space-y-8 md:col-span-9">
          <Reveal>
            <p className="font-display text-title font-medium tracking-tight">{lead}</p>
          </Reveal>
          {rest.map((p) => (
            <Reveal key={p}>
              <p className="text-lead text-fg-muted max-w-3xl">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-site pb-section">
        <SectionHeading label="What we stand for" title="Why work with us" />
        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {about.values.map((v, i) => (
            <li key={v.title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <SpotlightCard className="h-full p-8">
                  <span className="text-accent font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-8 text-2xl font-medium">{v.title}</h3>
                  <p className="text-fg-muted mt-3">{v.body}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Stats />
      <Process label="How we work" />
      <Cta />
    </>
  );
}
