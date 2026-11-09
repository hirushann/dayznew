import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/contact-form";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: `Start a project with ${site.name}. Email ${site.email} or send us a message.`,
};

export default function ContactPage() {
  const { address } = site;
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's talk about your project"
        accent="project"
        intro="Tell us what you're building and we'll set up an initial consultation to understand your vision, requirements and challenges."
      />

      <section className="container-site pb-section grid gap-16 lg:grid-cols-12">
        <aside className="space-y-10 lg:col-span-4">
          <div>
            <p className="micro-label">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="font-display hover:text-accent mt-3 block text-2xl break-all transition-colors"
            >
              {site.email}
            </a>
          </div>
          {site.phone && (
            <div>
              <p className="micro-label">Phone</p>
              <a href={`tel:${site.phone}`} className="mt-3 block text-lg">
                {site.phone}
              </a>
            </div>
          )}
          <div>
            <p className="micro-label">Studio</p>
            <address className="text-fg-muted mt-3 not-italic">
              {address.street}
              <br />
              {address.locality}, {address.region} {address.postalCode}
              <br />
              Sri Lanka
            </address>
          </div>
          <div>
            <p className="micro-label">Hours (Sri Lanka time)</p>
            <dl className="text-fg-muted mt-3 space-y-1">
              {site.hours.map((h) => (
                <div key={h.days} className="flex gap-3">
                  <dt>{h.days}:</dt>
                  <dd className="text-fg">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
