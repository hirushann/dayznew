import { Marquee } from "@/components/motion/marquee";
import { techStack } from "@/content/site";

export function TechMarquee() {
  return (
    <section aria-label="Technologies we work with" className="border-line border-y py-8">
      <Marquee className="font-display text-fg-muted text-2xl md:text-3xl">
        {techStack.map((tech) => (
          <span key={tech} className="flex items-center gap-12 whitespace-nowrap">
            {tech}
            <span aria-hidden className="bg-accent size-1.5 rounded-full" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
