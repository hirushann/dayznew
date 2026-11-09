import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/content/services";
import { projects } from "@/content/work";

const known = {
  services: new Set(services.map((s) => s.slug)),
  work: new Set(projects.map((p) => p.slug)),
};

/**
 * Unknown slugs would otherwise stream the not-found UI with a 200 (status is sent before
 * notFound() runs). Rewriting to an unmatched path makes Next serve the 404 page with a 404 status.
 */
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (!known[section as keyof typeof known]?.has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
}

export const config = { matcher: ["/services/:slug", "/work/:slug"] };
