"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/ui/external-link";
import { ProductLogo } from "@/components/ui/product-logo";
import { ezearch } from "@/content/products";
import { duration, ease, fadeUpSmall, maskedLine, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HOVER_CLOSE_DELAY = 120; // ms — lets the pointer cross the gap between trigger and panel

/** Desktop "Products" dropdown: hover (mouse) or click/Enter; Escape, outside click and route change close it. */
export function ProductsMenu({ label, active }: { label: string; active: boolean }) {
  const pathname = usePathname();
  // Remember which route the menu was opened on: navigating away closes it with no effect needed.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpenOn(pathname);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    setOpenOn(null);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: globalThis.PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) hide();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      hide();
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onPointerEnter = (e: PointerEvent) => e.pointerType === "mouse" && show();
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(hide, HOVER_CLOSE_DELAY);
  };
  // Tabbing out of the menu closes it.
  const onBlur = (e: FocusEvent) => {
    if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) hide();
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="products-menu"
        onClick={() => (open ? hide() : show())}
        className={cn(
          "rounded-pill text-fg-muted hover:text-fg inline-flex items-center gap-1 px-4 py-2 text-sm transition-colors",
          (open || active) && "text-fg",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="products-menu"
            className="absolute top-full left-1/2 z-10 w-[26rem] origin-top -translate-x-1/2 pt-3"
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: duration.hover, ease: ease.out }}
          >
            <motion.ul
              variants={stagger(0.05, 0.05)}
              initial="hidden"
              animate="visible"
              className="rounded-card border-line bg-surface-1/95 space-y-1 border p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
            >
              <motion.li
                variants={fadeUpSmall}
                className="hover:bg-surface-2 relative rounded-xl p-4 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <ProductLogo product={ezearch} className="h-6" />
                  <Badge>{ezearch.badge}</Badge>
                </div>
                <p className="text-fg-muted mt-3 text-sm">{ezearch.tagline}</p>
                <div className="mt-3 flex items-center gap-5 text-sm">
                  {/* Stretched link: the whole card opens the product page. */}
                  <Link
                    href={ezearch.href}
                    className="hover:text-accent font-medium transition-colors after:absolute after:inset-0 after:rounded-xl"
                  >
                    Explore {ezearch.name}
                  </Link>
                  <ExternalLink
                    href={ezearch.url}
                    className="text-fg-muted hover:text-accent relative z-10 transition-colors"
                  >
                    Visit ezearch.com
                  </ExternalLink>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Products as an expandable group inside the full-screen mobile menu. */
export function MobileProductsGroup({
  label,
  onNavigate,
}: {
  label: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const item = "font-display block text-2xl font-medium";

  return (
    <>
      <motion.div variants={maskedLine}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-products"
          onClick={() => setOpen((o) => !o)}
          className="font-display text-display flex items-center gap-3 font-semibold tracking-tight"
        >
          {label}
          <ChevronDown
            aria-hidden
            className={cn("size-8 transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      </motion.div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id="mobile-products"
            variants={stagger(0.06)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-3 pt-3 pb-2 pl-1"
          >
            <li className="overflow-hidden">
              <motion.div variants={maskedLine} className="flex items-center gap-3">
                <Link href={ezearch.href} onClick={onNavigate} className={item}>
                  {ezearch.name}
                </Link>
                <Badge>{ezearch.badge}</Badge>
              </motion.div>
            </li>
            <li className="overflow-hidden">
              <motion.div variants={maskedLine}>
                <ExternalLink href={ezearch.url} className="text-fg-muted block text-lg">
                  Visit ezearch.com
                </ExternalLink>
              </motion.div>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
