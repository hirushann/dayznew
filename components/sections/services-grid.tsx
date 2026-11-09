import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

// Bento rhythm on the 12-col grid: wide/narrow, then three-up rows.
const SPANS = ["lg:col-span-7", "lg:col-span-5"];
const DEFAULT_SPAN = "lg:col-span-4";

export function ServicesGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-12", className)}>
      {services.map((service, i) => (
        <li key={service.slug} className={SPANS[i] ?? DEFAULT_SPAN}>
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <SpotlightCard className="h-full">
              <Link
                href={`/services/${service.slug}`}
                data-cursor="View"
                className="flex h-full min-h-72 flex-col justify-between gap-10 p-8"
              >
                <div className="flex items-start justify-between">
                  <service.icon className="text-accent size-8" strokeWidth={1.5} aria-hidden />
                  <span className="text-fg-muted font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display flex items-center gap-2 text-2xl font-medium">
                    {service.title}
                    <ArrowUpRight
                      aria-hidden
                      className="text-accent size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="text-fg-muted mt-3 max-w-md">{service.summary}</p>
                </div>
              </Link>
            </SpotlightCard>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
