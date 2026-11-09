import { ezearch } from "./products";

/** Add a category here (and its filter label below) before using it on a project. */
export type Category = "E-commerce" | "Product" | "Web app" | "Mobile app";
export type ProjectType = "Client project" | "Our product";
export type ProjectImage = { src: string; alt: string; device: "desktop" | "mobile" };

export type Project = {
  slug: string; // URL: /work/<slug>
  name: string;
  url?: string; // live site
  client?: string;
  country?: string;
  year?: number;
  category: Category;
  type: ProjectType;
  tagline: string; // one line: cards, page intro, meta description
  summary: string; // overview paragraph
  challenge: string; // empty string hides the section
  solution: string; // empty string hides the section
  features: string[];
  stack: string[];
  results?: string[]; // only real, confirmed outcomes
  images: { cover?: ProjectImage; gallery: ProjectImage[]; og?: string };
  featured: boolean; // also shown in the home page gallery
  order: number; // lower first (our products always come before client projects)
  // Optional extras
  services?: string[]; // slugs from content/services.ts
  logo?: { src: string; width: number; height: number }; // shown when there's no cover
  productHref?: string; // our own product page
  links?: { label: string; href: string }[]; // extra external links (e.g. a demo)
};

export const categoryLabels: Record<Category, string> = {
  "E-commerce": "E-commerce",
  Product: "Products",
  "Web app": "Web apps",
  "Mobile app": "Mobile apps",
};

/**
 * Standard screenshot set in /public/work/<slug>/: cover = desktop home,
 * gallery-1/2 = desktop category/product, gallery-3/4/5 = mobile home/category/product,
 * og.jpg = 1200×630 link-preview image.
 */
const screenshots = (slug: string, name: string): Project["images"] => {
  const img = (file: string, page: string, device: ProjectImage["device"]): ProjectImage => ({
    src: `/work/${slug}/${file}.webp`,
    alt: `${name} ${page} on ${device}`,
    device,
  });
  return {
    cover: img("cover", "homepage", "desktop"),
    gallery: [
      img("gallery-1", "category page", "desktop"),
      img("gallery-2", "product page", "desktop"),
      img("gallery-3", "homepage", "mobile"),
      img("gallery-4", "category page", "mobile"),
      img("gallery-5", "product page", "mobile"),
    ],
    og: `/work/${slug}/og.jpg`,
  };
};

const data: Project[] = [
  {
    slug: ezearch.slug,
    name: ezearch.name,
    url: ezearch.url,
    client: "DayZ Solutions (own product)",
    category: "Product",
    type: "Our product",
    tagline: ezearch.tagline,
    summary:
      "eZearch is our own WooCommerce plugin. It replaces default store search with instant, typo-tolerant results that shoppers can actually rely on.",
    challenge:
      "Default WooCommerce search fails on typos — “snekers” returns nothing. It ignores SKUs and attributes, and ranks out-of-stock products first, so shoppers who can't find a product simply leave.",
    solution:
      "A plugin that indexes the whole catalogue and answers as shoppers type, with merchant controls for relevance and merchandising, AI that understands natural-language queries, and a safe fallback to WordPress search.",
    features: ezearch.features.map((f) => f.title),
    stack: ["WordPress", "WooCommerce"], // TODO: confirm — add the rest of the eZearch stack
    results: [
      "4.4 ms median search on a 12,000-product catalogue",
      "100,000+ products indexed",
      "Live in about 3 minutes",
      "Zero downtime when re-indexing",
    ],
    images: { gallery: [] }, // TODO: confirm — add eZearch screenshots if wanted
    featured: true,
    order: 0,
    services: ["wordpress-woocommerce", "ai-development", "web-development"], // TODO: confirm
    logo: ezearch.logo,
    productHref: ezearch.href,
    links: [{ label: "Try the live demo", href: ezearch.demoUrl }],
  },
  {
    slug: "businesslabels",
    name: "Businesslabels",
    url: "https://businesslabels.nl",
    client: "Businesslabels (part of Smart2B BV), Wekerom",
    country: "Netherlands",
    // year: TODO: confirm
    category: "E-commerce",
    type: "Client project",
    tagline: "A specialist B2B webshop for colour and thermal label printers, labels and supplies.",
    summary:
      "Dutch webshop for Epson ColorWorks colour label printers, thermal printers, compatible labels, ink and accessories, serving 12,000+ business customers. An Epson Diamond Partner, selling its own “Diamondlabels” materials brand.",
    challenge:
      "A large technical catalogue — 2,000+ products in stock — where customers need to find labels that match their exact printer model, with B2B pricing and expert support built into the buying journey.",
    solution:
      "A Next.js storefront built around how customers actually buy: start from the printer model, land on compatible labels, and order at B2B prices with expert help, custom orders and print samples close at hand.",
    features: [
      "Smart product finder: select your printer model to get compatible labels",
      "Product Finder for printers, plus category browsing for label printers, labels & tickets, ink cartridges, accessories and specials",
      "Materials and brands pages",
      "B2B pricing shown excl. VAT, variant selection and live dispatch messages (“order now, ships today”)",
      "Customer accounts with order history, favourites and fast re-ordering",
      "Custom-order (maatwerk) form, print-sample requests, support and knowledge base",
      "Google Reviews integration",
      "Dutch-language storefront, optimised for SEO",
    ],
    // TODO: confirm — backend/CMS, payments and hosting
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: screenshots("businesslabels", "Businesslabels"),
    featured: true,
    order: 10,
    services: ["web-development", "ui-ux-design"], // TODO: confirm
  },
  {
    slug: "bouwbeslag",
    name: "Bouwbeslag",
    url: "https://bouwbeslag.nl",
    // client: TODO: confirm — client / company name
    country: "Netherlands", // TODO: confirm
    category: "E-commerce",
    type: "Client project",
    // TODO: confirm — tagline and summary are neutral placeholders; replace with what they sell
    tagline: "A Dutch e-commerce webshop, built with Next.js.",
    summary: "An e-commerce storefront for bouwbeslag.nl, designed and built by DayZ with Next.js.",
    challenge: "", // TODO: confirm — hidden until filled in
    solution: "", // TODO: confirm — hidden until filled in
    features: [], // TODO: confirm — key features we built (hidden while empty)
    stack: ["Next.js"], // TODO: confirm — rest of the stack
    images: screenshots("bouwbeslag", "Bouwbeslag"),
    featured: false, // TODO: confirm — keep false until the copy above is real
    order: 20,
  },
  {
    slug: "e-core",
    name: "E-core",
    category: "Mobile app",
    type: "Client project", // TODO: confirm — client project or in-house?
    tagline: "An inventory, barcode and repair-tracking app, published on Google Play.",
    summary:
      "A mobile app for tracking inventory, scanning barcodes and following each repair from intake to hand-back.",
    // TODO: confirm — placeholder copy. Replace with the real brief and build.
    challenge:
      "Repair shops and small retailers juggle stock, barcodes and repair jobs across paper and spreadsheets. E-core set out to bring all three into one app that works from the shop floor.",
    solution:
      "A mobile app for tracking inventory, scanning barcodes and following each repair from intake to hand-back — designed for quick, everyday use on a phone.",
    features: ["Inventory tracking", "Barcode scanning", "Repair tracking"],
    stack: ["Android"], // TODO: confirm
    images: { gallery: [] }, // TODO: confirm — add screenshots and a Google Play link (url)
    featured: true,
    order: 30,
    services: ["mobile-app-development", "ui-ux-design", "software-testing-qa"], // TODO: confirm
  },
];

const rank = (p: Project) => (p.type === "Our product" ? 0 : 1);

/** Our products first, then client projects by `order`. */
export const projects = [...data].sort((a, b) => rank(a) - rank(b) || a.order - b.order);

export const featuredProjects = projects.filter((p) => p.featured);

/** Categories that actually have projects, in display order. */
export const categories = [...new Set(projects.map((p) => p.category))];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
