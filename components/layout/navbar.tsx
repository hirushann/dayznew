"use client";

import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { nav, site } from "@/content/site";
import { MobileProductsGroup, ProductsMenu } from "./products-menu";
import { ease, maskedLine, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SCROLLED_AT = 40;
const HIDE_AFTER = 160;
const isProducts = (href: string) => href.startsWith("/products");

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > SCROLLED_AT);
    setHidden(y > (scrollY.getPrevious() ?? 0) && y > HIDE_AFTER);
  });

  // Lock scroll and listen for Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    lenis?.stop();
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-120%" : "0%" }}
        transition={{ duration: 0.35, ease: ease.out }}
      >
        <div
          className={cn(
            "container-site ease-out-expo transition-[padding] duration-500",
            scrolled ? "pt-3" : "pt-6",
          )}
        >
          <nav
            aria-label="Main"
            className={cn(
              "rounded-pill flex items-center justify-between border py-2 pr-2 pl-2 transition-colors duration-500",
              scrolled || open
                ? "border-line bg-surface-1/70 backdrop-blur-xl"
                : "border-transparent",
            )}
          >
            <Link href="/" onClick={close} aria-label={`${site.name} home`}>
              <Logo eager />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  {isProducts(item.href) ? (
                    <ProductsMenu label={item.label} active={pathname.startsWith("/products")} />
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="rounded-pill text-fg-muted hover:text-fg aria-[current=page]:text-fg px-4 py-2 text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <Link href="/contact" className={buttonClass("primary", "hidden md:inline-flex")}>
              Start a project
            </Link>

            <button
              type="button"
              className="rounded-pill border-line-strong grid size-11 place-items-center border md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="bg-bg fixed inset-0 z-40 flex flex-col justify-between gap-10 overflow-y-auto px-6 pt-32 pb-10 md:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: ease.inOut }}
          >
            <motion.ul
              className="space-y-2"
              variants={stagger(0.07, 0.25)}
              initial="hidden"
              animate="visible"
            >
              {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                <li key={item.href} className="overflow-hidden">
                  {isProducts(item.href) ? (
                    <MobileProductsGroup label={item.label} onNavigate={close} />
                  ) : (
                    <motion.div variants={maskedLine}>
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="font-display text-display aria-[current=page]:text-accent block font-semibold tracking-tight"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )}
                </li>
              ))}
            </motion.ul>
            <a href={`mailto:${site.email}`} className="text-fg-muted">
              {site.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
