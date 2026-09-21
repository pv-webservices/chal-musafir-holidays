# Chal Musafir Holidays

Marketing website for **Chal Musafir Holidays** (a unit of Shirdi Sai Travelease.com), a travel
agency operating from Moradabad, Uttar Pradesh since 2011.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript. Deploys to Netlify.

---

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Development server                     |
| `npm run build`     | Production build (61 pages)            |
| `npm run start`     | Serve the production build locally     |
| `npm run typecheck` | `tsc --noEmit`                         |

---

## Project layout

```
app/                      Routes (App Router)
  api/enquiry/route.ts    Contact + trip-planner submission endpoint
  sitemap.ts, robots.ts   Generated SEO files
components/
  home/                   Homepage hero and sections
  layout/                 Header, footer, mobile sticky CTA
  ui/                     Cards, buttons, reveal, rail, accordion…
  forms/                  Enquiry form, 7-step quote form
  gallery/                Filterable gallery with lightbox
data/                     All site content lives here — edit these, not the JSX
public/images/            Generated WebP imagery (see below)
public/brand/             Client logo (JPEG source + optimised WebP)
```

### Editing content

Everything the client is likely to change is centralised in `data/`:

| File                    | Contents                                                     |
| ----------------------- | ------------------------------------------------------------ |
| `data/site.ts`          | Address, phones, email, nav, social links, map query          |
| `data/services.ts`      | The 10 services from the brochure                             |
| `data/destinations.ts`  | 21 destinations (10 domestic, 11 international)               |
| `data/packages.ts`      | 9 package itineraries with day-by-day detail                  |
| `data/pilgrimage.ts`    | The 5 yatra routes                                            |
| `data/testimonials.ts`  | Verified reviews — **empty by design**, see below             |
| `data/faqs.ts`          | Homepage FAQ                                                  |

Adding a destination, service or package automatically creates its detail page,
adds it to the relevant listing pages, the gallery and `sitemap.xml`.

---

## Imagery

All 60 photographs are **locally hosted WebP** under `public/images/` — there are no
remote image dependencies and no placeholders anywhere on the site.

```
public/images/hero/          11 wide page heroes
public/images/banners/        6 promo / editorial banners
public/images/destinations/  21 portrait destination cards
public/images/services/      10 service images
public/images/yatra/          5 pilgrimage route images
public/images/packages/       7 package itinerary images
```

Images were generated at 1K and encoded to WebP at quality 82. `next/image` serves
responsive sizes on top of that.

### Social links

`socials` in `data/site.ts` is an empty array. The footer only renders channels that
actually resolve, so no dead social icons ship. Add real profile URLs there and the
icons appear automatically.

### Testimonials

`data/testimonials.ts` exports an empty array deliberately — inventing customer reviews
for a live business site is not acceptable. While it is empty, the homepage renders a
"What Working With Us Looks Like" service-promise section instead. Add real, permitted
reviews to that file and the section automatically switches to a testimonial layout.

---

## Enquiry delivery

`POST /api/enquiry` validates the submission and forwards it to
`TRAVEL_ENQUIRY_WEBHOOK_URL` (see `.env.example`).

- **Not configured + development** → accepted, logged to the console, flagged as dev mode.
- **Not configured + production** → rejected with a message telling the visitor to call
  or WhatsApp, so an enquiry is never silently dropped.

Set the variable in **Netlify → Site settings → Environment variables** before launch.

---

## Deploying to Netlify

`netlify.toml` is already configured:

- Build command `npm run build`, publish directory `.next`
- `@netlify/plugin-nextjs` handles App Router routing, the `/api/enquiry` route handler
  and `next/image` optimisation
- Security headers and long-lived caching for `/_next/static`, `/images` and `/brand`

Steps:

1. Push the repository to GitHub/GitLab and connect it in Netlify (settings are read from
   `netlify.toml`, so nothing needs to be entered by hand).
2. Add `TRAVEL_ENQUIRY_WEBHOOK_URL` (and optionally `TRAVEL_ENQUIRY_WEBHOOK_TOKEN`) under
   environment variables.
3. Point `chalmusafir.co.in` at the site and enable HTTPS.

If the domain ever changes, update `site.origin` in `data/site.ts` — canonical URLs,
Open Graph tags, `robots.txt` and `sitemap.xml` all derive from it.

---

## Accessibility & performance notes

- Skip-to-content link, semantic landmarks, labelled form fields and `aria-*` on all
  interactive controls.
- Every animation is wrapped by `prefers-reduced-motion: reduce`.
- Card hover effects have `:active` equivalents so touch devices get feedback too.
- `TravelAgency` / `LocalBusiness` JSON-LD in `app/layout.tsx`, including the full service
  catalogue.
