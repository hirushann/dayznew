import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import type { Project } from "@/content/work";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

/** Cover image if the project has one, otherwise a branded placeholder with the title. */
export function ProjectArt({
  project,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  project: Project;
  sizes?: string;
}) {
  return (
    <Parallax offset={30} className="absolute -inset-[8%]">
      {project.cover ? (
        <div className="ease-out-expo absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
      ) : (
        <>
          <div className="bg-grid absolute inset-0" />
          <div aria-hidden className="project-glow absolute inset-0" />
          <div className="ease-out-expo absolute inset-0 grid place-items-center transition-transform duration-700 group-hover:scale-105">
            {project.logo ? (
              <Image
                src={project.logo.src}
                alt={project.title}
                width={project.logo.width}
                height={project.logo.height}
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="h-auto w-1/2 max-w-md"
              />
            ) : (
              <span className="font-display text-hero font-semibold tracking-tight">
                {project.title}
              </span>
            )}
          </div>
        </>
      )}
    </Parallax>
  );
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View case study"
      className={cn("group block", className)}
    >
      <div className="rounded-card border-line bg-surface-1 relative aspect-[16/10] overflow-hidden border">
        <ProjectArt project={project} />
        {project.badge && <Badge className="absolute top-4 left-4 z-10">{project.badge}</Badge>}
      </div>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-medium">{project.title}</h3>
        <p className="micro-label">{project.category}</p>
      </div>
      <p className="text-fg-muted mt-2 max-w-xl">{project.summary}</p>
    </Link>
  );
}
