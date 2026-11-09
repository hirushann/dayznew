import {
  BarChart3,
  LifeBuoy,
  Pin,
  SlidersHorizontal,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ProductStat = {
  value: number;
  decimals?: number;
  suffix: string;
  /** Full label (product page). */
  label: string;
  /** Short label (home spotlight). */
  short: string;
  /** Show this text instead of a counting number. */
  display?: string;
};

export type Product = {
  slug: string;
  name: string;
  href: string;
  url: string;
  demoUrl: string;
  pricingUrl: string;
  tagline: string;
  badge: string;
  /** Light wordmark — made for dark backgrounds like ours. */
  logo: { src: string; width: number; height: number };
  problems: { title: string; body: string }[];
  stats: ProductStat[];
  features: { title: string; body: string; icon: LucideIcon }[];
  steps: { title: string; body: string }[];
};

// Copy supplied by DayZ for eZearch. Prices intentionally not copied — link to pricingUrl instead.
export const ezearch: Product = {
  slug: "ezearch",
  name: "eZearch",
  href: "/products/ezearch",
  url: "https://ezearch.com",
  demoUrl: "https://demo.ezearch.com",
  pricingUrl: "https://ezearch.com/pricing",
  tagline: "Lightning-fast, typo-tolerant search for WooCommerce stores.",
  badge: "Our product",
  logo: { src: "/products/ezearch/logo-light.png", width: 507, height: 120 },
  problems: [
    {
      title: "Typos return nothing",
      body: "Default WooCommerce search fails on typos. A shopper types “snekers” and gets zero results.",
    },
    {
      title: "SKUs and attributes are ignored",
      body: "Searching by SKU, brand or product attribute misses the exact item the shopper is looking for.",
    },
    {
      title: "Out-of-stock ranks first",
      body: "Unavailable products crowd the top of the results, pushing what you can actually sell out of sight.",
    },
  ],
  stats: [
    {
      value: 4.4,
      decimals: 1,
      suffix: " ms",
      label: "Median search time on a 12,000-product catalogue",
      short: "Median search",
    },
    { value: 100, suffix: "k+", label: "Products indexed", short: "Products indexed" },
    { value: 3, suffix: " min", label: "From install to live search", short: "To go live" },
    {
      value: 0,
      suffix: "",
      display: "Zero",
      label: "Downtime when re-indexing",
      short: "Re-index downtime",
    },
  ],
  features: [
    {
      title: "Instant, typo-tolerant results",
      body: "Results appear as shoppers type, even when they misspell what they want.",
      icon: Zap,
    },
    {
      title: "Adjustable relevance weights",
      body: "Decide how much title, SKU, brand, attributes and ACF/custom fields count.",
      icon: SlidersHorizontal,
    },
    {
      title: "Merchandising rules",
      body: "Pin, hide or redirect results for any search term.",
      icon: Pin,
    },
    {
      title: "AI semantic search",
      body: "Queries like “red shoes under 50” are understood as filters, not just keywords.",
      icon: Sparkles,
    },
    {
      title: "Search analytics",
      body: "See what shoppers search for, so you can improve results and stock.",
      icon: BarChart3,
    },
    {
      title: "Safe fallback",
      body: "If anything is unavailable, your store falls back to standard WordPress search.",
      icon: LifeBuoy,
    },
  ],
  steps: [
    { title: "Install the plugin", body: "Add eZearch to your WooCommerce store like any plugin." },
    {
      title: "Run the first sync",
      body: "eZearch indexes your products, SKUs, attributes and custom fields.",
    },
    {
      title: "Search is live",
      body: "Your existing search box gets instant results. No theme changes.",
    },
  ],
};

export const products: Product[] = [ezearch];
