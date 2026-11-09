import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Cta } from "@/components/sections/cta";
import { Process } from "@/components/sections/process";
import { PageHeader } from "@/components/ui/page-header";
import { getService, services } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  return service ? { title: service.title, description: service.summary } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader label="Service" title={service.title} intro={service.intro} />

      {service.offerings.length > 0 && (
        <section className="container-site pb-section">
          <p className="micro-label">[ What we do ]</p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {service.offerings.map((o, i) => (
              <li key={o.title}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <SpotlightCard className="h-full p-8">
                    <span className="text-accent font-mono text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display mt-8 text-2xl font-medium">{o.title}</h2>
                    {o.body && <p className="text-fg-muted mt-3 max-w-md">{o.body}</p>}
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {service.tools && (
        <section className="container-site pb-section grid gap-8 md:grid-cols-12">
          <p className="micro-label pt-3 md:col-span-3">[ Tools we use ]</p>
          <ul className="flex flex-wrap gap-3 md:col-span-9">
            {service.tools.map((tool) => (
              <li key={tool} className="rounded-pill border-line-strong border px-5 py-2.5">
                {tool}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Process label="How we work" />

      <section className="container-site pb-section">
        <p className="micro-label">[ More services ]</p>
        <ul className="border-line mt-8 border-t">
          {others.map((s) => (
            <li key={s.slug} className="border-line border-b">
              <Link
                href={`/services/${s.slug}`}
                className="group font-display hover:text-accent flex items-center justify-between py-5 text-xl transition-colors md:text-2xl"
              >
                {s.title}
                <ArrowUpRight className="ease-out-expo size-5 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Cta />
    </>
  );
}
