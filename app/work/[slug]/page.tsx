import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Cta } from "@/components/sections/cta";
import { JsonLdScript, ORG_ID, breadcrumbs } from "@/components/seo/json-ld";
import { buttonClass } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";
import { ExternalLink } from "@/components/ui/external-link";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectArt } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { getNextProject, getProject, projects } from "@/content/work";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = `${project.name} case study`;
  const og = project.images.og;
  return {
    title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    // Without an og image, the site-wide Open Graph image is inherited.
    ...(og && {
      openGraph: {
        type: "article",
        siteName: site.name,
        title: `${title} — ${site.name}`,
        description: project.tagline,
        images: [{ url: og, width: 1200, height: 630, alt: `${project.name} homepage` }],
      },
    }),
  };
}

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const services = (project.services ?? []).flatMap((slug) => getService(slug) ?? []);
  const desktopShots = project.images.gallery.filter((img) => img.device === "desktop");
  const mobileShots = project.images.gallery.filter((img) => img.device === "mobile");

  // Only facts that are filled in; unconfirmed fields are simply left out.
  const overview: { label: string; value: ReactNode }[] = [
    { label: "Client", value: project.client },
    { label: "Country", value: project.country },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
    { label: "Stack", value: project.stack.join(", ") || undefined },
    {
      label: "Live site",
      value: project.url && (
        <ExternalLink href={project.url} className="hover:text-accent underline">
          {project.url.replace(/^https?:\/\//, "")}
        </ExternalLink>
      ),
    },
  ].filter((row) => row.value !== undefined && row.value !== "");

  const path = `/work/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: `${project.name} case study`,
        description: project.tagline,
        url: `${site.url}${path}`,
        creator: { "@id": ORG_ID },
        about: { "@type": "Thing", name: project.name, ...(project.url && { url: project.url }) },
        ...(project.year && { dateCreated: String(project.year) }),
        ...(project.images.cover && { image: `${site.url}${project.images.cover.src}` }),
        ...(project.stack.length > 0 && { keywords: project.stack.join(", ") }),
      },
      breadcrumbs([
        { name: "Work", path: "/work" },
        { name: project.name, path },
      ]),
    ],
  };

  return (
    <article>
      <JsonLdScript data={jsonLd} />
      <PageHeader
        label={`${project.type} — ${project.category}`}
        title={project.name}
        intro={project.tagline}
      >
        <div className="flex flex-wrap gap-3">
          {project.productHref && (
            <Link href={project.productHref} className={buttonClass("primary")}>
              Explore {project.name}
            </Link>
          )}
          {project.url && (
            <ExternalLink
              href={project.url}
              className={buttonClass(project.productHref ? "ghost" : "primary")}
            >
              Visit site
            </ExternalLink>
          )}
          {project.links?.map((link) => (
            <ExternalLink key={link.href} href={link.href} className={buttonClass("ghost")}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </PageHeader>

      {/* Hero mockup */}
      <section className="container-site">
        {project.images.cover ? (
          <Parallax offset={40}>
            <BrowserFrame
              image={project.images.cover}
              url={project.url}
              sizes="(min-width: 1440px) 1344px, 100vw"
              eager
            />
          </Parallax>
        ) : (
          <div className="group rounded-card border-line bg-surface-1 relative aspect-[16/9] overflow-hidden border">
            <ProjectArt project={project} sizes="100vw" />
          </div>
        )}
      </section>

      {/* Overview */}
      <section className="container-site py-section grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="micro-label">[ Overview ]</p>
          <p className="font-display text-title mt-6 font-medium tracking-tight">
            {project.summary}
          </p>
        </Reveal>
        <dl className="divide-line border-line divide-y border-y lg:col-span-4 lg:col-start-9">
          {overview.map((row) => (
            <div key={row.label} className="flex justify-between gap-6 py-4">
              <dt className="micro-label shrink-0 pt-0.5">{row.label}</dt>
              <dd className="text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Challenge → solution */}
      {(project.challenge || project.solution) && (
        <section className="container-site pb-section grid gap-4 md:grid-cols-2">
          {[
            { title: "The challenge", body: project.challenge },
            { title: "Our solution", body: project.solution },
          ]
            .filter((block) => block.body)
            .map((block, i) => (
              <Reveal
                key={block.title}
                delay={i * 0.08}
                className="rounded-card border-line h-full border p-8 md:p-10"
              >
                <h2 className="micro-label">[ {block.title} ]</h2>
                <p className="text-lead mt-6">{block.body}</p>
              </Reveal>
            ))}
        </section>
      )}

      {/* Features */}
      {project.features.length > 0 && (
        <section className="container-site pb-section">
          <SectionHeading label="Key features" title="What we built" />
          <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, i) => (
              <li key={feature}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <SpotlightCard className="h-full p-8">
                    <span className="text-accent font-mono text-xs">{pad(i)}</span>
                    <p className="mt-6 text-lg">{feature}</p>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <section className="container-site pb-section">
          <SectionHeading label="Results" title="The outcome" />
          <ul className="border-line mt-16 border-t">
            {project.results.map((result) => (
              <li key={result} className="border-line font-display text-title border-b py-6">
                <Reveal>{result}</Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Gallery */}
      {project.images.gallery.length > 0 && (
        <section className="container-site pb-section">
          <SectionHeading label="Gallery" title="On every screen" />
          {desktopShots.length > 0 && (
            <ul className="mt-16 grid gap-6 md:grid-cols-2">
              {desktopShots.map((img, i) => (
                <li key={img.src}>
                  <Reveal delay={i * 0.08}>
                    <Parallax offset={i % 2 ? 30 : 15}>
                      <BrowserFrame
                        image={img}
                        url={project.url}
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </Parallax>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
          {mobileShots.length > 0 && (
            <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-3 md:mt-20 md:gap-10">
              {mobileShots.map((img, i) => (
                <li key={img.src}>
                  <Reveal delay={i * 0.08}>
                    {/* Middle phone drifts the other way for depth. */}
                    <Parallax offset={i === 1 ? -30 : 30}>
                      <PhoneFrame image={img} sizes="(min-width: 768px) 280px, 33vw" />
                    </Parallax>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section className="container-site pb-section grid gap-6 md:grid-cols-12">
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
        </section>
      )}

      {/* Next project */}
      {next.slug !== project.slug && (
        <section className="container-site pb-section">
          <Link
            href={`/work/${next.slug}`}
            className="group border-line hover:border-accent block border-t pt-10 transition-colors"
          >
            <span className="micro-label">[ Next project ]</span>
            <span className="font-display text-display mt-4 flex items-center justify-between gap-6 font-semibold tracking-tight">
              {next.name}
              <ArrowRight className="text-accent ease-out-expo size-10 shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:size-16" />
            </span>
            <span className="text-fg-muted mt-3 block max-w-xl">{next.tagline}</span>
          </Link>
        </section>
      )}

      <Cta />
    </article>
  );
}
