"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "@/components/ui/project-card";
import { categories, categoryLabels, projects, type Category } from "@/content/work";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = Category | "All";
const FILTERS: Filter[] = ["All", ...categories];
const label = (f: Filter) => (f === "All" ? "All" : categoryLabels[f]);
const count = (f: Filter) =>
  f === "All" ? projects.length : projects.filter((p) => p.category === f).length;

/** /work grid with category chips built from the project data. */
export function WorkGrid() {
  const [active, setActive] = useState<Filter>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            aria-label={`${label(f)}, ${count(f)} ${count(f) === 1 ? "project" : "projects"}`}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-pill border px-4 py-2 text-sm transition-colors duration-300",
              active === f
                ? "border-fg bg-fg text-bg"
                : "border-line-strong text-fg-muted hover:border-fg hover:text-fg",
            )}
          >
            {label(f)}
            <span className="ml-2 font-mono text-xs opacity-60">{count(f)}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? "project" : "projects"} shown
      </p>

      <motion.ul layout className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: duration.reveal * 0.6, ease: ease.out }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
