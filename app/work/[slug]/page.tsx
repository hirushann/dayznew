import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Cta } from "@/components/sections/cta";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectArt } from "@/components/ui/project-card";
import { getService } from "@/content/services";
import { getProject, projects } from "@/content/work";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: `${project.title} case study`, description: project.summary } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const services = project.services.flatMap((slug) => getService(slug) ?? []);
  // Only show facts that are filled in; unconfirmed (null) fields are skipped.
  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year?.toString() ?? null },
    { label: "Platform", value: project.platform },
    { label: "Category", value: project.category },
  ].filter((m): m is { label: string; value: string } => m.value !== null);

  return (
    <article>
      <PageHeader
        label={[project.badge ?? "Case study", project.category].join(" — ")}
        title={project.title}
        intro={project.summary}
      >
        {(project.productHref || project.links.length > 0) && (
          <div className="flex flex-wrap gap-3">
            {project.productHref && (
              <Link href={project.productHref} className={buttonClass("primary")}>
                Explore {project.title}
              </Link>
            )}
            {project.links.map((link, i) => (
              <ExternalLink
                key={link.href}
                href={link.href}
                className={buttonClass(project.productHref || i > 0 ? "ghost" : "primary")}
              >
                {link.label}
              </ExternalLink>
            ))}
          </div>
        )}
      </PageHeader>

      <section className="container-site">
        <dl className="rounded-card border-line bg-line grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-px overflow-hidden border">
          {meta.map((m) => (
            <div key={m.label} className="bg-bg p-6">
              <dt className="micro-label">{m.label}</dt>
              <dd className="mt-3 text-lg">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="group rounded-card border-line bg-surface-1 relative mt-6 aspect-[16/9] overflow-hidden border">
          <ProjectArt project={project} sizes="100vw" />
        </div>
      </section>

      <div className="container-site py-section space-y-24">
        {project.sections.map((section) => (
          <Reveal key={section.title} className="grid gap-6 md:grid-cols-12">
            <h2 className="font-display text-title font-semibold tracking-tight md:col-span-4">
              {section.title}
            </h2>
            <p className="text-lead text-fg-muted md:col-span-7 md:col-start-6">{section.body}</p>
          </Reveal>
        ))}

        {services.length > 0 && (
          <div className="grid gap-6 md:grid-cols-12">
            <h2 className="micro-label md:col-span-4">[ Services ]</h2>
            <ul className="flex flex-wrap gap-3 md:col-span-7 md:col-start-6">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="rounded-pill border-line-strong hover:border-accent block border px-5 py-2.5 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Cta />
    </article>
  );
}
