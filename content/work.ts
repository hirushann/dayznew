import { ezearch } from "./products";

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  /** Small pill on cards, e.g. "Our product". */
  badge?: string;
  /** Shown on the placeholder art when there is no cover. */
  logo?: { src: string; width: number; height: number };
  /** Internal product page, if this project is one of our products. */
  productHref?: string;
  /** Image in /public, e.g. "/work/e-core/cover.jpg" (16:10 works best). Placeholder art if omitted. */
  cover?: { src: string; alt: string };
  /** Service slugs from content/services.ts */
  services: string[];
  platform: string;
  year: number | null;
  client: string | null;
  links: { label: string; href: string }[];
  /** Case study body, rendered in order. */
  sections: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: ezearch.slug,
    title: ezearch.name,
    category: "WooCommerce plugin",
    badge: ezearch.badge,
    summary: ezearch.tagline,
    tags: ["Search", "WooCommerce", "AI"],
    logo: ezearch.logo,
    productHref: ezearch.href,
    services: ["wordpress-woocommerce", "ai-development", "web-development"], // TODO: confirm
    platform: "WordPress / WooCommerce",
    year: null, // TODO: confirm — launch year
    client: "DayZ Solutions (own product)",
    links: [
      { label: "Visit ezearch.com", href: ezearch.url },
      { label: "Try the live demo", href: ezearch.demoUrl },
    ],
    sections: [
      {
        title: "The challenge",
        body: "Default WooCommerce search fails on typos — “snekers” returns nothing. It ignores SKUs and attributes, and ranks out-of-stock products first, so shoppers who can't find a product simply leave.",
      },
      {
        title: "What we built",
        body: "eZearch, our own WooCommerce plugin: instant, typo-tolerant results; adjustable relevance weights across titles, SKUs, brands, attributes and custom fields; merchandising rules to pin, hide or redirect; AI semantic search that turns “red shoes under 50” into filters; search analytics; and a safe fallback to WordPress search.",
      },
      {
        title: "The result",
        body: "A 4.4 ms median search on a 12,000-product catalogue, more than 100,000 products indexed, live in about three minutes, and zero downtime when re-indexing.",
      },
    ],
  },
  {
    slug: "e-core",
    title: "E-core",
    category: "Mobile app",
    summary: "An inventory, barcode and repair-tracking app, published on Google Play.",
    tags: ["Inventory", "Barcode scanning", "Repair tracking"],
    // TODO: confirm — add cover: { src: "/work/e-core/cover.jpg", alt: "…" } once screenshots are supplied.
    services: ["mobile-app-development", "ui-ux-design", "software-testing-qa"], // TODO: confirm
    platform: "Android", // TODO: confirm
    year: null, // TODO: confirm
    client: null, // TODO: confirm — in-house product or client work?
    links: [], // TODO: confirm — add { label: "Google Play", href: "<store url>" }
    // TODO: confirm — placeholder copy. Replace with the real brief, build and outcome; no numbers until real.
    sections: [
      {
        title: "The challenge",
        body: "Repair shops and small retailers juggle stock, barcodes and repair jobs across paper and spreadsheets. E-core set out to bring all three into one app that works from the shop floor.",
      },
      {
        title: "What we built",
        body: "A mobile app for tracking inventory, scanning barcodes and following each repair from intake to hand-back — designed for quick, everyday use on a phone.",
      },
      {
        title: "The result",
        body: "E-core is live on Google Play, giving teams one place to manage stock and repairs.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
