import { cacheLife } from "next/cache";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/external-link";
import { nav, site } from "@/content/site";
import { BackToTop, LocalTime } from "./footer-client";

async function Year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const socials = [
  { label: "Facebook", href: site.socials.facebook },
  { label: "LinkedIn", href: site.socials.linkedin },
].filter((s): s is { label: string; href: string } => s.href !== null);

export function Footer() {
  const { address } = site;
  return (
    <footer className="border-line relative overflow-hidden border-t">
      <div className="container-site grid gap-12 py-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="micro-label">[ Let&apos;s talk ]</p>
          <a
            href={`mailto:${site.email}`}
            className="font-display text-title hover:text-accent mt-4 block break-all transition-colors"
          >
            {site.email}
          </a>
          <address className="text-fg-muted mt-6 not-italic">
            {address.street}, {address.locality}
            <br />
            {address.region} {address.postalCode}, Sri Lanka
          </address>
        </div>

        <nav aria-label="Footer" className="md:col-span-2 md:col-start-7">
          <p className="micro-label">Pages</p>
          <ul className="mt-4 space-y-2">
            {[{ label: "Home", href: "/" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-fg-muted hover:text-fg transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="micro-label">Hours</p>
          <dl className="text-fg-muted mt-4 space-y-2">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="text-fg">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-2">
          <p className="micro-label">Local time</p>
          <p className="text-fg mt-4">
            <LocalTime />
          </p>
          <p className="text-fg-muted">Nittambuwa, LK</p>
        </div>
      </div>

      <div className="container-site">
        {/* Decorative wordmark drawn via CSS content so it isn't read or contrast-checked as text. */}
        <div
          aria-hidden
          data-word="DayZ"
          className="font-display text-fg/5 text-[clamp(4rem,22vw,20rem)] leading-[0.8] font-semibold tracking-tighter select-none before:content-[attr(data-word)]"
        />
      </div>

      <div className="container-site border-line text-fg-muted flex flex-wrap items-center justify-between gap-4 border-t py-6 text-sm">
        <p>
          © <Year /> {site.name}. All rights reserved.
        </p>
        {socials.length > 0 && (
          <ul className="flex gap-6">
            {socials.map((s) => (
              <li key={s.label}>
                <ExternalLink href={s.href} arrow={false} className="hover:text-fg">
                  {s.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}
        <BackToTop />
      </div>
    </footer>
  );
}
