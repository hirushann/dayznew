import type { ComponentProps } from "react";

/** Every external link: new tab, no opener/referrer leak, and announced to screen readers. */
export function ExternalLink({
  children,
  arrow = true,
  ...props
}: Omit<ComponentProps<"a">, "target" | "rel"> & { arrow?: boolean }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      {arrow && <span aria-hidden> ↗</span>}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
