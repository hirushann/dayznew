import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and case studies from DayZ Solutions.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Selected work"
        intro="Products we've designed, built and shipped for our clients and ourselves."
      />
      <section className="container-site pb-section">
        <h2 className="sr-only">Projects</h2>
        <ul className="grid gap-x-6 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={(i % 2) * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <Cta />
    </>
  );
}
