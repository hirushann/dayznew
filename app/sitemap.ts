import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { projects } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
    ...products.map((p) => p.href),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
