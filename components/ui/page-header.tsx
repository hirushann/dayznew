import type { CSSProperties, ReactNode } from "react";
import { HeroTitle } from "./hero-title";

export function PageHeader({
  label,
  title,
  accent,
  intro,
  children,
}: {
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-44 pb-20 md:pt-56 md:pb-28">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div className="container-site">
        <p className="micro-label hero-fade">[ {label} ]</p>
        <HeroTitle text={title} accent={accent} className="text-display mt-6 max-w-[18ch]" />
        {intro && (
          <p
            className="hero-fade text-lead text-fg-muted mt-10 max-w-2xl"
            style={{ "--d": "450ms" } as CSSProperties}
          >
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-fade mt-10" style={{ "--d": "600ms" } as CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
