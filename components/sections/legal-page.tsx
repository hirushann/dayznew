import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import type { LegalDoc } from "@/content/legal";

export const legalMetadata = (doc: LegalDoc): Metadata => ({
  alternates: { canonical: `/${doc.slug}` },
  title: doc.title,
  description: doc.intro,
});

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHeader label="Legal" title={doc.title} intro={doc.intro} />
      <article className="container-site pb-section">
        <p className="text-fg-muted text-sm">Last updated: {doc.updated}</p>
        <div className="mt-12 max-w-3xl space-y-12">
          {doc.sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-medium">
                {i + 1}. {s.heading}
              </h2>
              {s.body.length > 1 ? (
                <ul className="text-fg-muted mt-4 list-disc space-y-2 pl-5">
                  {s.body.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-fg-muted mt-4">{s.body[0]}</p>
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
