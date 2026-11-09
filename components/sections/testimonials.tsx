"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/content/company";

/** Native scroll-snap carousel: swipe, trackpad and keyboard work for free. Hidden while empty. */
export function Testimonials() {
  const ref = useRef<HTMLUListElement>(null);
  if (testimonials.length === 0) return null;

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-section">
      <div className="container-site flex flex-wrap items-end justify-between gap-8">
        <SectionHeading label="Kind words" title="What clients say" className="flex-1" />
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => page(dir)}
              aria-label={dir === -1 ? "Previous testimonials" : "Next testimonials"}
              className="border-line-strong hover:border-fg grid size-12 place-items-center rounded-full border transition-colors"
            >
              {dir === -1 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
            </button>
          ))}
        </div>
      </div>
      <ul
        ref={ref}
        tabIndex={0}
        aria-label="Testimonials"
        data-lenis-prevent
        className="container-site mt-12 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-4"
      >
        {testimonials.map((t) => (
          <li
            key={t.name}
            className="rounded-card border-line bg-surface-1 w-[min(85vw,32rem)] shrink-0 snap-start border p-8"
          >
            <figure className="flex h-full flex-col justify-between gap-10">
              <blockquote className="text-lead">“{t.quote}”</blockquote>
              <figcaption>
                <span className="block font-medium">{t.name}</span>
                <span className="text-fg-muted text-sm">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
