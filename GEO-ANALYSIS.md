# GEO Analysis: DayZ Solutions

**Audited:** local production build of this repo (`npm run build && npm start`), 9 Nov 2026.
**Correction (same day):** the original version of this report said the new site wasn't live. It is: dayzsolutions.com already serves this Next.js site (the pushed version without Businesslabels/Bouwbeslag). The old WordPress URLs were recovered from its archived `wp-sitemap` and redirected (see §8, item 1).

**Update:** quick wins 1, 5 and the home definition sentence are done; see the checklist at the end.

> **How to read this:** Google's own guidance (AI optimization guide, Search Central, 2026) says optimizing for AI Overviews and AI Mode _"is still SEO"_. They use the same index, ranking and snippet eligibility as classic Search. The findings below are SEO fundamentals applied to AI-search surfaces. The scores are heuristics from this audit, not Google signals.

---

## 1. GEO Readiness Score: **48 / 100**

| Area                    | Weight | Score  | Why                                                                                                                                                                                           |
| ----------------------- | ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Citability              | 25     | **10** | No self-contained passage over 43 words. Service copy is generic ("Leverage the power of a top product development company"). The case studies are the only content specific to DayZ.         |
| Structural readability  | 20     | **12** | Clean H1→H2→H3 on every page, with lists and cards. But there are no question-style headings, no FAQ and no tables.                                                                           |
| Multi-modal             | 15     | **7**  | Real screenshots on 2 case studies plus the eZearch demo. No video, diagrams or data visuals.                                                                                                 |
| Authority & brand       | 20     | **4**  | No people, bylines or dates. No testimonials. No `sameAs` links (socials are `null`). No third-party brand mentions found.                                                                    |
| Technical accessibility | 20     | **15** | All content is server-rendered and crawlers are allowed. Sitemap and Organization/LocalBusiness schema are in place. **No canonical tags**, and the move from the old site isn't planned yet. |

## 2. Platform breakdown (heuristic)

| Platform                | Score | Main limiter                                                                                                                    |
| ----------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Google AI Overviews** | 50    | Draws from pages that already rank. A new domain at launch with thin service pages and no canonicals will rank weakly at first. |
| **Google AI Mode**      | 45    | Draws from a broader pool and weights entity authority and freshness. DayZ has no entity footprint and no dates.                |
| **ChatGPT search**      | 30    | Cites Wikipedia/Wikidata and well-known entities heavily. DayZ isn't findable as an entity yet.                                 |
| **Perplexity**          | 25    | Cites Reddit and community sources heavily. There are no community mentions of DayZ.                                            |

## 3. AI crawler access

`/robots.txt` (from `app/robots.ts`):

```
User-Agent: *
Allow: /
Disallow: /api/
Sitemap: https://dayzsolutions.com/sitemap.xml
```

| Crawler                                                                | Status                                                               |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Googlebot, Bingbot                                                     | ✅ allowed                                                           |
| GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot                        | ✅ allowed (wildcard)                                                |
| Google-Extended, CCBot, anthropic-ai, Bytespider, cohere-ai (training) | ✅ allowed (wildcard)                                                |
| ChatGPT-User, Google-Agent, Google-NotebookLM                          | n/a: these fetch on a user's request and ignore robots.txt by design |

**Verdict:** correct for maximum AI-search visibility. Blocking training-only crawlers (`Google-Extended`, `CCBot`) is a business choice, not an SEO fix. Blocking `Google-Extended` does **not** remove the site from AI Overviews.

## 4. llms.txt status

**Missing** (`/llms.txt` → 404). This is fine:

- Google says `llms.txt` is not needed and doesn't affect visibility.
- Server-log and large-domain studies show no measurable citation lift from it.

It's optional; add it only for non-Google tools. A ready-made template is in §10.

## 5. Brand mention analysis

One web search for "DayZ Solutions" + Sri Lanka + Nittambuwa returned **no matches at all**: no LinkedIn, Clutch, directory, Reddit or YouTube result. This was a single search, not an exhaustive check, but it means AI systems currently have **no external evidence that the entity exists**.

| Surface                                      | Found                                       | Matters most for                                                                                          |
| -------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Wikipedia / Wikidata                         | ❌                                          | ChatGPT, AI Mode                                                                                          |
| LinkedIn company page                        | ❌ not found                                | ChatGPT, entity resolution                                                                                |
| Facebook                                     | unknown (`site.socials.facebook` is `null`) | entity resolution                                                                                         |
| Clutch / GoodFirms / Google Business Profile | ❌                                          | local and B2B queries ("software company Sri Lanka")                                                      |
| Reddit / YouTube                             | ❌                                          | Perplexity, ChatGPT (YouTube mentions correlate most strongly with AI citations in the Ahrefs 2025 study) |

Google warns against _inauthentic_ mention-building. The goal is real profiles and real participation, not seeding links.

## 6. Passage-level citability

AI answers quote self-contained passages. In third-party studies the most-cited passages run ~134–167 words, and ~44% of citations come from the first 30% of a page. Measured here, with JS disabled and duplicate screen-reader text removed:

| Page                        | Words  | Longest passage | Self-contained 100+ word blocks | Question headings |
| --------------------------- | ------ | --------------- | ------------------------------- | ----------------- |
| `/`                         | 489    | 28              | 0                               | 0                 |
| `/services`                 | 307    | 28              | 0                               | 0                 |
| `/services/web-development` | 302    | 43              | 0                               | 0                 |
| `/work`                     | 106    | 21              | 0                               | 0                 |
| `/work/businesslabels`      | 251    | 34              | 0                               | 0                 |
| `/products/ezearch`         | 264    | 20              | 0                               | 0                 |
| `/about`                    | 355    | 38              | 0                               | 0                 |
| `/contact`                  | **67** | 19              | 0                               | 0                 |

**Strongest citable assets today:**

- `/work/businesslabels`: specific first-hand facts (12,000+ business customers, 2,000+ products, printer-model finder, B2B excl.-VAT pricing).
- `/products/ezearch`: specific numbers (4.4 ms median on a 12,000-product catalogue, live in 3 minutes).

This is the "non-commodity" content Google says to prioritise.

**Weakest:**

- Service pages: short, generic copy any agency could publish.
- Home first 60 words: a slogan and a list of tech names, with no "DayZ Solutions is…" sentence. That definition only exists in the meta description, which AI answers don't quote.

## 7. Server-side rendering check

✅ **Pass.** Every audited page delivers its full text in the initial HTML with JavaScript disabled: headings, copy, counters (final values), case-study facts and JSON-LD. AI crawlers that don't run JavaScript see everything.

Minor note: scroll-reveal elements are sent with inline `opacity: 0`. Crawlers still read the text, but a human with JavaScript disabled sees blank sections. This is low priority and doesn't affect search.

## 8. Top 5 highest-impact changes

1. **Canonicals and a redirect map for launch (technical, about 1 hour).**
   - No page sets a canonical URL. Add `alternates: { canonical: "/…" }` to each page's metadata, plus `/work/[slug]` and `/services/[slug]`.
   - Before switching the domain, crawl the old site (including `/newdayz/` and the old service URLs such as the custom-development, web, QA and mobile pages) and add 301 redirects in `next.config.ts`. That keeps any existing rankings and stops old links breaking.
2. **Build the entity (off-site, ongoing; biggest lever for ChatGPT and Perplexity).**
   - Create or complete LinkedIn company, Facebook, Google Business Profile (the Nittambuwa address and hours already match the site) and a Clutch or GoodFirms profile.
   - Put the URLs in `content/site.ts` → `socials`. The JSON-LD then emits `sameAs` automatically.
   - Encourage real client reviews on those platforms, not on the site.
3. **Answer-first, citable passages on the money pages (content).**
   - Add a visible definition sentence to the home hero and the About page.
   - Give each service page and eZearch one first-hand block of about 134–167 words: who it's for, how DayZ does it, and which project proves it. Link it to the relevant case study.
   - Drafts are in §10.
4. **Make the case studies the authority engine (content and data).**
   - Fill in the `TODO: confirm` facts (year, stack, results).
   - Add a visible "Last updated" date and refresh it when a project changes. Content under 3 months old is cited far more, but only make the date change when the content really changes.
   - For eZearch, publish the benchmark method behind "4.4 ms on 12,000 products" (catalogue, hardware, how you measured). Original, checkable data is what earns citations from other articles.
5. **Fill the schema gaps (technical, about 1 hour).**
   - Add `WebSite`, `Service` (one per service page), `BreadcrumbList` and `CreativeWork` (case studies) as in §9.
   - This isn't a direct AI-ranking lever (Google says not to over-invest in AI-specific markup), but it removes ambiguity about what each page is and who made it.

## 9. Schema recommendations

Current: `Organization` + `LocalBusiness` on every page; `SoftwareApplication` on `/products/ezearch`.

| Add                          | Where                                   | Key properties                                                                                                                                  |
| ---------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `WebSite`                    | layout (with the existing graph)        | `url`, `name`, `publisher: {"@id": "#organization"}`                                                                                            |
| `sameAs`                     | `Organization`                          | LinkedIn, Facebook, Clutch, GBP URLs (automatic once `site.socials` is filled)                                                                  |
| `Service`                    | `/services/[slug]`                      | `name`, `description`, `provider: {"@id": org}`, `areaServed` (confirm markets), `serviceType`                                                  |
| `BreadcrumbList`             | services, work and product detail pages | Home › Services › Web Development, etc.                                                                                                         |
| `CreativeWork`               | `/work/[slug]`                          | `name`, `about`, `creator: {"@id": org}`, `dateCreated` (from `year`), `url` (live site), `image` (cover)                                       |
| `SoftwareApplication.offers` | eZearch                                 | Only if you're willing to publish the free plan as `price: "0"` with a currency; Google needs `offers` (plus ratings) for software rich results |
| `Person`                     | About (when a team section exists)      | founders/leads with `jobTitle`, `sameAs` LinkedIn; this is the "Who" in Google's Who/How/Why test                                               |

Skip `FAQPage` markup on this commercial site, because Google limits FAQ rich results to authoritative government and health sites. Keep FAQs as **visible content**.

## 10. Content reformatting suggestions

These drafts use only facts already in the repo; `[brackets]` are facts you must supply.

**Home hero subline.** Replace the current subline with a crawlable definition in the first 60 words:

> DayZ Solutions is a software development studio in Nittambuwa, Sri Lanka, founded in 2019. We build custom software, websites, web shops and mobile apps, with UI/UX design and QA, for businesses in [Sri Lanka and Europe].

**Home services H2.** "Leverage the power of a top product development company" → **"Custom software, web and mobile development from Sri Lanka"**. The current line is generic marketing copy; the new one matches how people search.

**Service pages.** Add one question heading and a 134–167 word answer block under the intro, e.g. on `/services/web-development`:

> ### What does a web development project with DayZ include?
>
> [150 words: who it's for → the stack you actually use (Next.js, TypeScript, Tailwind, Laravel, WordPress) → how the 6-step process applies → a concrete example: "For Businesslabels, a Dutch B2B label-printer webshop, we built a printer-model product finder…" → typical timeline [confirm] → link to the case study]

**`/products/ezearch`.** Lead with a definition, then use question headings for the problems section:

> ### What is eZearch?
>
> eZearch is a WooCommerce plugin by DayZ Solutions that replaces default store search with instant, typo-tolerant results. It indexes titles, SKUs, brands, attributes and custom fields, returns a 4.4 ms median search on a 12,000-product catalogue, and goes live in about three minutes without theme changes. [+ who uses it, the free plan, and fallback behaviour, to reach ~140 words]
>
> ### Why does WooCommerce search miss typos? · ### Can eZearch search by SKU? · ### What happens if eZearch is unavailable?

**`/contact` (67 words, the thinnest page).** Add what happens after someone sends a message (the 6-step journey's first two steps already describe it), what to include in a brief, time-zone overlap (GMT+5:30 vs. EU hours), and the opening hours, already in `content/site.ts`.

**`/work` (106 words).** Add a 2–3 sentence intro naming the types of work and markets: "E-commerce for Dutch B2B and retail brands, our own WooCommerce product eZearch, and mobile apps."

**Optional `/llms.txt`** (no Google effect; may help other tools):

```
# DayZ Solutions
> Software development studio in Nittambuwa, Sri Lanka (est. 2019): custom software, web and mobile apps, UI/UX, QA, WordPress/WooCommerce. Maker of eZearch.

## Key pages
- [Services](https://dayzsolutions.com/services): what we build
- [Work](https://dayzsolutions.com/work): case studies (Businesslabels, Bouwbeslag, E-core)
- [eZearch](https://dayzsolutions.com/products/ezearch): typo-tolerant WooCommerce search
- [Contact](https://dayzsolutions.com/contact): info@dayzsolutions.com
```

---

### Quick-win checklist

- [x] Canonical URLs on every page
- [x] 301 redirects from the old WordPress URLs (`/method`, `/portfolio`, `/contact-us`, `/order`, `/shop`, the logo-order product, `/newdayz/*`) in `next.config.ts`; cart/checkout/account/placeholder pages left to 404
- [x] Definition sentence in the home hero (About already opened with one)
- [ ] Fill `site.socials`, which emits `sameAs`
- [ ] One 134–167 word answer block plus a question heading per service page and eZearch
- [ ] Visible "last updated" dates on case studies
- [x] `WebSite`, `Service`, `BreadcrumbList`, `CreativeWork` schema
- [ ] Search Console + Bing Webmaster Tools: submit `sitemap.xml` (the site is already live)

### Sources

- Google Search Central, AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, Creating helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Brand-mention check: web search for "DayZ Solutions" Sri Lanka software Nittambuwa (no matching entity in results; e.g. https://clutch.co/profile/mbiz-software was the only Nittambuwa software listing returned)
- Citation-pattern statistics (passage length, first-30% share, recency, brand-mention correlation): Ahrefs and SE Ranking studies as summarised in the claude-seo GEO skill. These are third-party, not Google.
