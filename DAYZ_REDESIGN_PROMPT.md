# DayZ Solutions — Premium Website Redesign (Master Prompt for Claude Code)

You are a senior design engineer. Rebuild the DayZ Solutions marketing website (current version: https://dayzsolutions.com/newdayz/) inside this existing Next.js project as a premium, award-level site with rich, tasteful motion. Think the polish of Linear, Vercel, Stripe and top Awwwards agency sites, but with its own identity, not a copy of any of them.

Work in the phases at the bottom. After each phase, run the build, fix all errors and type issues, and give me a short summary before continuing.

---

## 1. About the company (source of truth for copy)

- **Name:** DayZ Solutions
- **Tagline idea:** "Day to day solutions from A to Z." / "We code, we design, we create, we promote."
- **Location:** Nittambuwa, Western Province, Sri Lanka. Founded 2019.
- **Email:** info@dayzsolutions.com
- **Services:** Custom software development, web development, mobile app development (cross-platform), UI/UX design (Figma), WordPress sites, software testing / QA, IT consultancy, page-speed optimization, digital marketing / promotion.
- **Industries served:** Government (local and central), financial services (insurance, banking, clearing house), telecommunications, energy and utilities, healthcare, education.
- **Product to showcase:** E-core — an inventory, barcode and repair-tracking app (on Google Play).
- **Approach:** Agile delivery, scalable architecture, data security, cross-platform.

**Copy rule:** Before writing any copy, ask me to paste the text from the current site (or put it in `/content/source.md`). Use the real wording, phone numbers, client names, testimonials and stats from that. Where something is missing, write strong placeholder copy and mark it with `// TODO: confirm` so nothing invented ships by accident. Never invent client logos, testimonials or numbers as if real.

## 2. Logo and brand

- The logo file will be at `/public/brand/logo.svg` (and/or `.png`). Use it exactly as provided — no redrawing, recoloring or distorting.
- Sample the logo's main colors and build the palette around them: one primary brand accent taken from the logo, plus neutrals. If the logo only works on light backgrounds, ask me for a light/white version for dark sections.
- Create a monochrome/white variant usage rule for dark backgrounds only if I supply that file.

## 3. Design direction

**Mood:** Dark, confident, premium, engineered. Lots of negative space, big type, precise grids, subtle depth.

- **Theme:** Dark-first (near-black, e.g. `#0A0A0B`) with off-white text (`#EDEDED`), layered surfaces (`#111113`, `#17171A`), hairline borders (`rgba(255,255,255,0.08)`). One brand accent from the logo, used sparingly for highlights, glows and CTAs. Include a few light "paper" sections for rhythm if it suits the logo.
- **Typography:** A characterful display face for headings (e.g. "Clash Display", "General Sans", "Satoshi" via local font, or "Instrument Serif" for italic accents) and a clean sans for body (e.g. "Inter" or "Geist"). Load with `next/font`. Fluid type with `clamp()`; hero headline roughly 64–140px.
- **Details that make it feel premium:** subtle grain/noise overlay, soft radial accent glows, gradient-masked borders, glassy cards with backdrop blur, fine grid lines in the background, mono-font micro-labels (e.g. `[ 01 — SERVICES ]`).
- **Layout:** 12-column grid, max width ~1440px, generous section padding (120–200px on desktop). Fully responsive down to 360px.
- Avoid generic template looks: no stock-photo heroes, no rainbow gradients, no clip-art icons. Use custom SVG/line icons (Lucide is fine as a base).

## 4. Tech stack

Check the versions already installed in `package.json` and use them; add only what's missing.

- Next.js (App Router), TypeScript (strict), React Server Components by default; `"use client"` only where motion/interaction needs it.
- Tailwind CSS with design tokens as CSS variables (colors, radii, spacing, easing).
- **Motion** (`motion` package, import from `motion/react`; Framer Motion is the same library) for all animations.
- **Lenis** for smooth scrolling, integrated with Motion's `useScroll`.
- `clsx` + `tailwind-merge` (`cn()` helper). shadcn/ui is allowed for form primitives only.
- Contact form: React Hook Form + Zod, submitted via a Next.js Route Handler or Server Action (email provider: Resend — leave env var placeholders).
- No jQuery, no GSAP unless a specific effect truly needs it (ask first).

## 5. Site map

1. **Home** (`/`)
2. **Services** (`/services`) + optional detail pages (`/services/[slug]`)
3. **Work** (`/work`) + case study template (`/work/[slug]`) — start with E-core
4. **About** (`/about`) — story, values, process, team
5. **Contact** (`/contact`)
6. `not-found` page with a playful animated 404

All page content lives in typed data files under `/content` (e.g. `services.ts`, `work.ts`, `site.ts`) so I can edit copy without touching components.

## 6. Home page sections (in order)

1. **Preloader** — logo fades/scales in, a thin progress line fills, then a curtain wipe reveals the page. Max ~1.8s, shown only on first visit per session.
2. **Navbar** — transparent over hero, becomes a floating blurred pill on scroll; hides on scroll down, shows on scroll up. Mobile: full-screen menu with staggered link reveal.
3. **Hero** — huge headline revealed word-by-word (masked slide-up), a short subline, two CTAs ("Start a project" / "See our work"). Background: animated accent glow that follows the cursor subtly + fine grid + grain. Scroll indicator.
4. **Trust marquee** — infinite logo/tech marquee (clients if real, otherwise tech stack: React, Next.js, Flutter, Node, Laravel, WordPress, Figma…), pauses on hover, fades at edges.
5. **Intro statement** — large paragraph where words light up from dim to full white as you scroll (scroll-linked opacity per word).
6. **Services** — bento grid of cards. Each card: icon, title, short line, hover spotlight that follows the cursor, slight 3D tilt, border glow.
7. **Industries** — horizontal list/accordion of the six sectors with hover image/illustration reveal.
8. **Process** — sticky section: left side pinned title, right side steps (Discover → Design → Build → Test → Launch → Support) with a vertical progress line that fills on scroll.
9. **Featured work** — horizontal-scroll gallery pinned on desktop (vertical scroll drives horizontal movement), stacked on mobile. Cards with parallax images and "View case study" cursor label.
10. **Stats** — animated count-up numbers when in view (use real numbers only).
11. **Testimonials** — draggable carousel or stacked cards (only real quotes).
12. **Big CTA** — giant "Let's build something" text with magnetic button and accent glow.
13. **Footer** — oversized wordmark/logo, links, contact, socials (Facebook, LinkedIn), back-to-top, local time in Sri Lanka, copyright.

## 7. Motion system

Create `/lib/motion.ts` with shared variants and easings, and reuse them everywhere so motion feels consistent.

- **Easing:** primary `[0.22, 1, 0.36, 1]` (expo-out feel). Durations 0.6–1.2s for reveals, 0.2–0.35s for hovers.
- **Reusable components:** `<Reveal>` (fade + slide up on enter), `<SplitText>` (word/line masked reveal), `<Magnetic>` (button pulls toward cursor), `<Marquee>`, `<Counter>`, `<Parallax>`, `<SpotlightCard>`, `<TextScrub>` (scroll-linked word highlight), `<PageTransition>`.
- **Custom cursor** (desktop pointer devices only): small dot + lagging ring, grows and shows labels ("View", "Drag") over interactive elements. Hide on touch devices.
- **Page transitions:** curtain/overlay transition between routes using `AnimatePresence` in a template.
- **Scroll:** Lenis smooth scroll; scroll progress bar at top.
- **Rules:**
  - Animate only `transform` and `opacity` (and `filter` sparingly). No layout-thrashing animations.
  - `viewport={{ once: true, margin: "-10%" }}` for reveals.
  - Respect `prefers-reduced-motion`: disable smooth scroll, parallax, cursor and large movements; keep simple fades.
  - Motion should feel intentional, never slow the user down. Content must be readable without waiting for animations.

## 8. Performance, SEO and accessibility

- Lighthouse targets: Performance ≥ 90 (mobile), Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
- `next/image` for all images (AVIF/WebP, correct `sizes`), lazy-load below the fold, preload the hero font.
- Code-split heavy client components with `dynamic()`; keep the hero LCP element server-rendered.
- Metadata API per page, Open Graph images, `sitemap.ts`, `robots.ts`, JSON-LD `Organization` + `LocalBusiness` schema with the Sri Lanka address.
- Semantic HTML, visible focus states, keyboard-accessible menu/carousel, alt text, WCAG AA contrast (check the accent color on dark).

## 9. Code quality

- Folder structure: `app/`, `components/ui`, `components/sections`, `components/motion`, `content/`, `lib/`, `public/brand`.
- Small, typed, reusable components. No magic numbers — use tokens.
- ESLint + Prettier clean. No `any`.
- Comment only where the motion logic isn't obvious.

## 10. Build phases

1. **Setup:** inspect the project, install missing deps, set up fonts, Tailwind tokens, `cn()`, Lenis provider, motion lib, folder structure. Ask me for the logo file and current site copy.
2. **Foundation:** layout, navbar, footer, custom cursor, preloader, page transitions, reusable motion components.
3. **Home page:** build all sections from section 6, one at a time.
4. **Inner pages:** Services, Work (+ E-core case study), About, Contact (with working form validation and Route Handler), 404.
5. **Polish:** responsive pass at 360 / 768 / 1024 / 1440 / 1920px, reduced-motion pass, accessibility pass, Lighthouse pass, SEO/metadata.
6. **Handover:** README with how to edit content, add a case study, set env vars, and deploy to Vercel.

Before starting phase 1, briefly restate the plan and list anything you need from me.