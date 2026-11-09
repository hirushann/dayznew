import { TextScrub } from "@/components/motion/text-scrub";

// Copy from the current site's custom software page.
const STATEMENT =
  "We harness the power of innovation and expert craftsmanship to deliver custom software that transforms your business challenges into competitive advantages — scalable, secure and efficient by design.";

export function Intro() {
  return (
    <section className="container-site py-section grid gap-8 md:grid-cols-12">
      <p className="micro-label pt-3 md:col-span-3">[ 01 — Who we are ]</p>
      <TextScrub
        text={STATEMENT}
        className="font-display text-title font-medium tracking-tight md:col-span-9"
      />
    </section>
  );
}
