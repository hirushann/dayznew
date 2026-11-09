import Link from "next/link";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/button";

const DEFAULT_ACTIONS = (
  <Magnetic strength={0.45}>
    <Link
      href="/contact"
      className={buttonClass("primary", "size-36 rounded-full p-0 text-base md:size-44")}
    >
      Start a project
    </Link>
  </Magnetic>
);

export function Cta({
  label = "Next step",
  title = "Let's build something",
  text = "Tell us about your project. We'll set up an initial consultation to understand your vision, requirements and challenges.",
  actions = DEFAULT_ACTIONS,
}: {
  label?: string;
  title?: string;
  text?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="py-section relative isolate overflow-hidden">
      <div
        aria-hidden
        className="cta-glow absolute top-1/2 left-1/2 -z-10 size-[min(60rem,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <div className="container-site flex flex-col items-center text-center">
        <p className="micro-label">[ {label} ]</p>
        <SplitText
          as="h2"
          text={title}
          className="font-display text-hero mt-6 max-w-[12ch] font-semibold tracking-tight"
        />
        <p className="text-lead text-fg-muted mt-8 max-w-xl">{text}</p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      </div>
    </section>
  );
}
