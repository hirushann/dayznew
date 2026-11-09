import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

// TODO: confirm — swap to a white/light logo for dark backgrounds once supplied.
// Until then the full-colour logo sits on a paper chip so the navy "SOLUTIONS" stays legible.
export function Logo({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <span className={cn("rounded-pill bg-paper inline-flex h-10 px-3 py-1.5", className)}>
      <Image
        src="/brand/brand-logo.png"
        alt={site.name}
        width={1737}
        height={715}
        sizes="120px"
        loading={eager ? "eager" : "lazy"}
        className="h-full w-auto"
      />
    </span>
  );
}
