import Image from "next/image";
import type { ProjectImage } from "@/content/work";
import { cn } from "@/lib/utils";

/** Desktop screenshot (1440×900) in a minimal browser window. */
export function BrowserFrame({
  image,
  url,
  sizes,
  eager,
  className,
}: {
  image: ProjectImage;
  url?: string;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-line-strong bg-surface-2 overflow-hidden rounded-xl border shadow-2xl shadow-black/50",
        className,
      )}
    >
      <div className="border-line flex items-center gap-3 border-b px-3 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="bg-fg/15 size-2.5 rounded-full" />
          ))}
        </span>
        {url && (
          <span className="bg-bg/60 text-fg-muted mx-auto max-w-[60%] truncate rounded-md px-3 py-1 font-mono text-[0.6875rem]">
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={1440}
        height={900}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="block h-auto w-full"
      />
    </div>
  );
}

/** Mobile screenshot (390×844) in a phone body. */
export function PhoneFrame({
  image,
  sizes,
  className,
}: {
  image: ProjectImage;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-line-strong bg-surface-2 rounded-[2.25rem] border p-1.5 shadow-2xl shadow-black/50 md:p-2",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.9rem]">
        <Image
          src={image.src}
          alt={image.alt}
          width={390}
          height={844}
          sizes={sizes}
          className="block h-auto w-full"
        />
        <span
          aria-hidden
          className="absolute top-1.5 left-1/2 h-[3%] w-1/4 -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  );
}
