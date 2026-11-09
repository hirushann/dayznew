import { SectionHeading } from "@/components/ui/section-heading";
import { ServicesGrid } from "./services-grid";

export function ServicesBento() {
  return (
    <section className="container-site py-section">
      <SectionHeading
        label="02 — Services"
        title="Leverage the power of a top product development company"
      />
      <ServicesGrid className="mt-16" />
    </section>
  );
}
