import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import type { Project } from "@/content/work";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { BrowserFrame } from "./device-frame";
import { ExternalLink } from "./external-link";

/** Card art: the cover in a browser frame, else the logo, else the project name. */
export function ProjectArt({
  project,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project;
  sizes?: string;
}) {
  const { cover } = project.images;
  return (
    <Parallax offset={30} className="absolute -inset-[8%]">
      <div className="bg-grid absolute inset-0" />
      <div aria-hidden className="project-glow absolute inset-0" />
      {cover ? (
        // Frame sits low and bleeds off the bottom edge of the card.
        <div className="ease-out-expo absolute inset-x-[16%] top-[20%] transition-transform duration-700 group-hover:-translate-y-2">
          <BrowserFrame image={cover} url={project.url} sizes={sizes} />
        </div>
      ) : (
        <div className="ease-out-expo absolute inset-0 grid place-items-center transition-transform duration-700 group-hover:scale-105">
          {project.logo ? (
            <Image
              src={project.logo.src}
              alt={project.name}
              width={project.logo.width}
              height={project.logo.height}
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="h-auto w-1/2 max-w-md"
            />
          ) : (
            <span className="font-display text-hero font-semibold tracking-tight">
              {project.name}
            </span>
          )}
        </div>
      )}
    </Parallax>
  );
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article data-cursor="View case study" className={cn("group relative", className)}>
      <div className="rounded-card border-line bg-surface-1 relative aspect-[16/10] overflow-hidden border">
        <ProjectArt project={project} />
        {project.type === "Our product" && (
          <Badge className="absolute top-4 left-4 z-10">Our product</Badge>
        )}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-medium">{project.name}</h3>
        <span className="micro-label rounded-pill border-line border px-2.5 py-1">
          {project.category}
        </span>
      </div>
      <p className="text-fg-muted mt-2 max-w-xl">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {/* Stretched link: the whole card opens the case study. */}
        <Link
          href={`/work/${project.slug}`}
          className="hover:text-accent font-medium transition-colors after:absolute after:inset-0"
        >
          View case study
        </Link>
        {project.url && (
          <ExternalLink
            href={project.url}
            className="text-fg-muted hover:text-accent relative z-10 transition-colors"
          >
            Visit site
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
