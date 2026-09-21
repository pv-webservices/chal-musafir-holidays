# Project Status

Last full pass: redesign against the supplied homepage reference UI, with services and
destination coverage corrected against the client's brochure and visiting card.

## Verified in this build

- `npm run build` succeeds — 61 pages (static + SSG)
- `npm run typecheck` clean
- Crawled all 107 internal URLs — every one returns HTTP 200
- No browser console errors
- Checked at 1440×900 desktop and 390×844 mobile

## Implemented

### Content corrected from client material
- Services expanded to the **10 on the brochure**: Air Tickets, Rail Tickets, Hotel Booking,
  Resort Booking, Holiday Packages, Group Packages, LTC / Luxury Train Tours, Cruise Holidays,
  Visa Assistance, Travel Insurance (Rail Tickets and Group Packages were previously missing)
- Destinations expanded to the **21 on the brochure** — domestic: Kerala, Rajasthan, Goa,
  Uttarakhand, Himachal Pradesh, Madhya Pradesh, Uttar Pradesh, South India, Eastern India,
  Maharashtra; international: Thailand, Dubai, Singapore, Malaysia, Indonesia, Sri Lanka,
  Mauritius, France, Europe, United Kingdom, Australia
- Pilgrimage section now lists the **5 named yatras**: Mata Vaishno Devi, Shirdi, Chardham,
  Amarnath Helicopter, Kailash Mansarovar
- "A Unit of Shirdi Sai Travelease.com · Since 2011" added to the header bar, footer and About
- Proprietors (Sunjay Gupta, Akash Gupta) and the "Make Your Travel Ease with Quality &
  Cheapest Rates" promise added to About / FAQ sections
- Packages grown from 4 to 9, each with real day-by-day itineraries, inclusions and exclusions

### Imagery
- 60 bespoke images generated and stored locally as optimised WebP — no placeholders,
  no remote image hosts, no stock URLs anywhere in the codebase
- Client logo trimmed of its white border and converted to WebP (1600×1600 JPEG → 720×355 WebP)

### UI / UX
- Hero rebuilt to match the reference (Explore / *Dream* / Discover, script overlay, trust chips)
- Flight/hotel/train search widget **removed** as requested (it implied live inventory that a
  Netlify static deployment cannot provide); replaced with a service-shortcut rail in the same
  visual position, linking to the real service pages
- Sticky header with dropdown navigation, utility bar, active-route indicator, mobile drawer
- Animated colour-shifting gradient buttons with a shine sweep (`.btn-primary`, `.btn-ocean`,
  `.btn-sun`, `.btn-ghost`, `.btn-on-dark`)
- Card hover/touch motion: lift, image zoom, animated gradient rim, icon tilt, `:active` states
- Scroll-reveal on every section, animated statistic counters, horizontal destination rail
  with arrow controls
- Gallery rewritten with tag-based filters (no duplicate images) and a lightbox that deep-links
  into the matching destination or yatra page
- Package listing filters by region, trip type and duration, with a real empty state
- Legal pages written in full (privacy policy, terms & conditions)
- `sitemap.xml`, `robots.txt`, canonical URLs and expanded JSON-LD

### Deployment
- `netlify.toml` with the Next.js runtime plugin, security headers and asset caching
- `.claude/launch.json` for local preview

## Requires client input before launch

- **`TRAVEL_ENQUIRY_WEBHOOK_URL`** — until this is set, production enquiry submissions are
  rejected with a "please call or WhatsApp" message rather than being silently lost
- **Real testimonials.** `data/testimonials.ts` is intentionally empty; the homepage shows a
  service-promise section instead of invented reviews. Drop real entries in and the
  testimonial layout switches on automatically
- **Social profile URLs.** `socials` in `data/site.ts` is empty so no dead icons ship
- **Client photography**, if they want their own trip photos in the gallery
- **Legal review** of the privacy policy and terms — they are complete and accurate to the
  business as described, but a solicitor should sign them off
- **Final pricing** per package — the site deliberately quotes no prices and routes every
  request to a written quotation
- **Google Business listing** — the contact map currently embeds an address search; swap in the
  exact listing embed once the profile is verified
