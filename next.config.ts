import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Old WordPress site URLs (from its archived wp-sitemap) → closest new page.
  // Cart/checkout/account and WP placeholder pages have no equivalent and are left to 404.
  async redirects() {
    return [
      { source: "/method", destination: "/about", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/order", destination: "/contact", permanent: true },
      { source: "/shop", destination: "/contact", permanent: true },
      { source: "/product/logo-order-formulier", destination: "/contact", permanent: true },
      // Former preview location of this redesign.
      { source: "/newdayz/:path*", destination: "/", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
