import { Counter } from "@/components/motion/counter";
import { stats } from "@/content/company";

/** Hidden until content/company.ts has real numbers. */
export function Stats() {
  if (stats.length === 0) return null;
  return (
    <section aria-label="By the numbers" className="container-site py-section">
      <dl className="rounded-card border-line bg-line grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-bg flex flex-col-reverse gap-6 p-8">
            <dt className="text-fg-muted">{stat.label}</dt>
            <dd className="font-display text-display font-semibold">
              <Counter to={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
