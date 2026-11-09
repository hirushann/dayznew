# DayZ Solutions — website

Marketing site for [DayZ Solutions](https://dayzsolutions.com): a dark, motion-rich Next.js site. All copy lives in typed files under `content/`, so most edits never touch a component.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Motion · Lenis · React Hook Form + Zod · Resend (via its REST API).

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # only needed for the contact form
npm run dev                  # http://localhost:3000
```

| Script                 | What it does                               |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Local dev server                           |
| `npm run build`        | Production build (also type-checks)        |
| `npm start`            | Serve the production build                 |
| `npm run lint`         | ESLint                                     |
| `npm run format`       | Prettier: format everything                |
| `npm run format:check` | Prettier: check only (use in CI)           |

## Project structure

```
app/                  Routes: home, services, work, about, contact, 404, api/contact,
                      sitemap.ts, robots.ts, opengraph-image.tsx, template.tsx (page transition)
components/
  layout/             Navbar, footer
  sections/           Home page sections (hero, services, industries, process, work, stats, …)
  motion/             Reusable motion: Reveal, SplitText, Magnetic, Marquee, Counter,
                      Parallax, SpotlightCard, TextScrub
  ui/                 Buttons, logo, cursor, preloader, page header, contact form, project card
  seo/                JSON-LD (Organization + LocalBusiness)
content/              ← edit copy here
lib/                  motion.ts (shared easing/variants), contact.ts (form schema), utils
proxy.ts              Returns a real 404 for unknown /services/* and /work/* slugs
public/brand/         Logo
```

## Editing content

Everything below is plain TypeScript data. Save the file and the dev server updates. The build fails on a typo in a field name, so mistakes can't ship.

| File                  | What's in it                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `content/site.ts`     | Company name, tagline, email, phone, address, opening hours, socials, nav links, tech marquee |
| `content/services.ts` | Services: card summary, detail-page intro, offerings, tools. Each becomes `/services/<slug>`  |
| `content/work.ts`     | Projects and case studies. Each becomes `/work/<slug>`                                         |
| `content/products.ts` | Our own products (eZearch): links, problems, stats, features, steps. Page at `/products/ezearch` |
| `content/company.ts`  | Industries, process steps, stats, testimonials, About page story and values                    |

Some sections switch themselves on and off:

- **Stats** and **Testimonials** stay hidden while their arrays in `content/company.ts` are empty. Add real entries and they appear on the home and About pages.
- **Phone** (contact page and structured data) and **Facebook/LinkedIn** links (footer) appear once their value in `content/site.ts` is set instead of `null`.

Search the codebase for `TODO: confirm` to find every placeholder that still needs real information (see [Open items](#open-items)).

### Add a case study

1. Put the images in `public/work/<slug>/`, e.g. `public/work/acme/cover.jpg`. A 16:10 cover works best; `next/image` handles resizing and AVIF/WebP.
2. Add an entry to `projects` in `content/work.ts`:

   ```ts
   {
     slug: "acme",                       // URL: /work/acme
     title: "Acme Portal",
     category: "Web app",
     summary: "One line shown on cards and as the page intro.",
     tags: ["Dashboard", "Payments"],
     cover: { src: "/work/acme/cover.jpg", alt: "Acme Portal dashboard on a laptop" },
     services: ["web-development", "ui-ux-design"], // slugs from content/services.ts
     platform: "Web",
     year: 2025,                         // or null to hide
     client: "Acme Ltd",                 // or null to hide
     links: [{ label: "Visit site", href: "https://acme.example" }],
     sections: [
       { title: "The challenge", body: "…" },
       { title: "What we built", body: "…" },
       { title: "The result", body: "…" },
     ],
   },
   ```

3. Done. The page, the work listing, the home page's horizontal gallery and `sitemap.xml` all pick it up. Projects without a `cover` show branded placeholder art.

### Add a service

Add an entry to `services` in `content/services.ts`. Pick an icon from [lucide.dev](https://lucide.dev/icons) and import it at the top of the file. The card, the detail page at `/services/<slug>`, the contact-form dropdown and the sitemap update automatically.

### Swap the logo

The logo is `public/brand/brand-logo.png`. The full-colour version only reads well on light backgrounds, so the navbar shows it on a light pill. Once a white version exists, add it next to the original and point `components/ui/logo.tsx` at it, then drop the pill background classes.

## Contact form

The form (`components/ui/contact-form.tsx`) posts to `app/api/contact/route.ts`. Both validate with the same Zod schema in `lib/contact.ts`. The route then sends a plain-text email through [Resend](https://resend.com), with the visitor's address as reply-to.

### Environment variables

| Variable             | Example                                        | Notes                                     |
| -------------------- | ---------------------------------------------- | ----------------------------------------- |
| `RESEND_API_KEY`     | `re_…`                                         | Resend dashboard → API Keys               |
| `CONTACT_TO_EMAIL`   | `info@dayzsolutions.com`                       | Inbox that receives enquiries             |
| `CONTACT_FROM_EMAIL` | `DayZ Solutions <website@dayzsolutions.com>`   | Must be on a domain verified in Resend    |

Locally, put them in `.env.local` (git-ignored; `.env.example` is the template). If any are missing, the form shows an error and offers the email address instead, and it never pretends to have sent.

Spam protection is a hidden honeypot field. There is no rate limiting yet. If spam gets through, add Vercel Firewall rules or a rate limiter in the route (see the `shortcut:` comment there).

## Deploy to Vercel

1. Push the repo to GitHub, GitLab or Bitbucket.
2. On [vercel.com/new](https://vercel.com/new), import the repo. The defaults (framework Next.js, `npm run build`) are correct.
3. Under **Settings → Environment Variables**, add the three variables above for Production (and Preview if you want the form working on preview URLs).
4. Deploy. Then under **Settings → Domains**, add `dayzsolutions.com` and follow the DNS instructions.
5. If the final domain differs from `https://dayzsolutions.com`, update `url` in `content/site.ts`. Absolute URLs in Open Graph tags, `sitemap.xml`, `robots.txt` and the structured data all derive from it.
6. Verify the domain in [Resend](https://resend.com/domains) so the `from` address can send, then submit a test message from the live `/contact` page.

After launch, submit `https://<domain>/sitemap.xml` in Google Search Console.

## Motion and accessibility notes

- Shared easings, durations and variants live in `lib/motion.ts`. Use them for any new animation so motion stays consistent.
- **Reduced motion:** when the visitor's OS asks for it, Lenis smooth scroll, the custom cursor, tilt, magnetic pull and parallax are off, and reveals fall back to simple fades (`MotionConfig reducedMotion="user"` in `components/providers/providers.tsx`).
- **Custom cursor:** add `data-cursor="Label"` to any element to show a label in the cursor when hovering it.
- **Preloader:** plays once per browser session (`sessionStorage` key `dz-intro`). Page-title reveals wait for it on first visit; see the `--intro-delay` variable in `app/globals.css`.
- **Page transitions** (`app/template.tsx`) are enter-only. The App Router unmounts the old page immediately, so exit animations would need custom link handling.
- Design tokens (colours, type scale, spacing, radii) are CSS variables at the top of `app/globals.css`. The lime accent is sampled from the logo and passes WCAG AA on the dark background; the logo navy is for light sections only.

## Open items

Placeholders marked `TODO: confirm` in the code, waiting on real information:

- White/light logo for dark backgrounds (`components/ui/logo.tsx`)
- Production domain (`content/site.ts`), phone number, Facebook and LinkedIn URLs
- E-core: screenshots/cover, year, client, platform, services used, Google Play link, real case-study copy (`content/work.ts`)
- Stats (the current site's numbers conflict) and real client testimonials (`content/company.ts`)
- Industries list: the brief's 6 vs the current site's 16 (`content/company.ts`)
- Fuller copy for UI/UX, AI and ERP/CRM/HRM; IT consultancy and digital marketing have no copy yet (`content/services.ts`)
- About: founder/team story and a team section with photos (`content/company.ts`, `app/about/page.tsx`)
