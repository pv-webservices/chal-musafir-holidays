# Chal Musafir Holidays

Marketing website for **Chal Musafir Holidays** (a unit of Shirdi Sai Travelease.com), a travel
agency in Moradabad, Uttar Pradesh. Live at **https://chalmusafirholidays.com**.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · hosted on **Netlify** (Git deploy).
Enquiry forms are delivered by **FormSubmit** to `chalmusafirholidays@gmail.com` — there is no
mail server, SMTP account or password anywhere in this project.

---

## Commands

| Command              | What it does                                                                   |
| -------------------- | ------------------------------------------------------------------------------ |
| `npm install`        | Install dependencies                                                           |
| `npm run dev`        | Development server on http://localhost:3000                                    |
| `npm run build`      | Production build (62 routes)                                                   |
| `npm run start`      | Serve the production build locally                                             |
| `npm run typecheck`  | TypeScript check (`tsc --noEmit`)                                              |
| `npm test`           | Unit tests (Vitest) — form validation, FormSubmit payloads, SEO helpers       |
| `npm run audit`      | SEO/integrity audit of the **built** site (run `npm run build` first)          |
| `npm run test:e2e`   | Browser tests (Playwright + axe) against the build; FormSubmit is intercepted |
| `npm run verify`     | All of the above in order                                                      |
| `npm run og`         | Regenerate the 1200×630 Open Graph images after changing imagery              |

The browser tests use the locally installed Google Chrome. Without it, run
`npx playwright install chromium` and set `PW_CHANNEL=chromium`.

`npm run audit` can also check the live site: `AUDIT_URL=https://chalmusafirholidays.com npm run audit`.

---

## Folder structure

```
app/                         Routes (App Router)
  layout.tsx                 <head> defaults, favicons, Organization/WebSite/Person JSON-LD
  not-found.tsx              Branded 404 (real 404 status, noindex, no canonical)
  thank-you/                 Form success page (noindex, not in the sitemap)
  sitemap.ts                 /sitemap.xml — indexable pages only
  sitemap-index.xml/         /sitemap-index.xml — submit this one to Search Console
  robots.ts                  /robots.txt — allows everything, points at the sitemap index
components/
  forms/                     EnquiryForm, QuoteForm (trip planner), shared FormParts
  home/  layout/  ui/  gallery/  packages/
data/                        All site content — edit these, not the JSX
  site.ts                    Name, phones, email, address, canonical origin, nav
lib/
  enquiry.ts                 Form validation + FormSubmit delivery (AJAX, 20 s timeout)
  seo.ts                     pageMetadata(), canonical/OG helpers, JSON-LD escaping
public/
  images/brand/              Logo (WebP, served)
  images/hero|banners|destinations|packages|services|yatra/   Site photography (WebP)
  images/og/                 Generated 1200×630 share images (npm run og)
  icons/                     192/512 PNG app icons
  favicon.ico, favicon.svg, favicon-48x48.png, favicon-96x96.png, apple-touch-icon.png
  site.webmanifest
source-files/                Full-resolution masters — NOT deployed (outside public/)
  brand/                     Original 1600×1600 logo JPEG, 512px favicon master
scripts/
  seo-audit.mjs              The `npm run audit` crawler
  generate-og-images.mjs     The `npm run og` generator
tests/
  unit/                      Vitest
  e2e/                       Playwright: forms, axe, layout, header, keyboard
docs/
  GOOGLE-SEARCH-CONSOLE.md   Indexing guide
  PROJECT_STATUS.md          History of earlier work
  client-reference/          Reference material supplied by the client
```

### Editing content

Everything the client is likely to change lives in `data/`. Adding a destination, service or
package automatically creates its page, adds it to listings, the gallery and the sitemap.
After a content change, bump `contentUpdated` in `data/site.ts` (used as the sitemap `<lastmod>`).

### URL conventions

- Canonical host is `https://chalmusafirholidays.com` (no `www`), set in `data/site.ts`.
- Every URL ends in `/` (`trailingSlash: true`); `/about` 308-redirects to `/about/`.
- `/index.html` redirects to `/`.

---

## Enquiry forms (FormSubmit)

`components/forms/EnquiryForm.tsx` (contact page, service pages) and `QuoteForm.tsx`
(`/quote/`) send to FormSubmit, configured in `lib/enquiry.ts`.

- **With JavaScript:** inline validation, then a background `fetch` to
  `https://formsubmit.co/ajax/<id>` with a 20-second timeout, then `/thank-you/`.
- **Without JavaScript:** the contact form is a normal `<form method="POST">` to
  `https://formsubmit.co/<id>`; FormSubmit redirects to `/thank-you/` via the `_next` field.
- Spam: FormSubmit honeypot (`_honey`), a 3-second bot timer, client-side validation.
- Typed data is kept in `sessionStorage` until it is sent, so nothing is lost on errors.

**After the one-time activation** (see `docs/GOOGLE-SEARCH-CONSOLE.md` → pre-launch), FormSubmit
offers a random alias for the form. Put it in `FORMSUBMIT_ID` in `lib/enquiry.ts` so the Gmail
address no longer appears in the page source, then redeploy.

---

## Deploying (Netlify, Git deploy)

`netlify.toml` holds the build settings (`npm run build`, publish `.next`, `@netlify/plugin-nextjs`),
the www → apex redirects and static-file headers. Page security headers come from `next.config.ts`.

1. Run `npm run verify` locally — everything must pass.
2. Commit and push to the branch Netlify deploys from (`main`). Netlify builds automatically.
3. Check the deploy log in Netlify, then re-check the live site:
   `AUDIT_URL=https://chalmusafirholidays.com npm run audit`.

No environment variables are required.

---

## Notes

- `data/testimonials.ts` is empty on purpose — no invented reviews. Add real, permitted ones.
- `socials` in `data/site.ts` is empty, so no dead social icons render.
- Every animation respects `prefers-reduced-motion`; content never depends on JavaScript to be visible.
