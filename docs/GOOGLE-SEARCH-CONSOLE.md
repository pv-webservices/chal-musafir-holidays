# Google Search Console — launch & indexing guide

Site: **https://chalmusafirholidays.com** (canonical: HTTPS, no `www`, trailing slash on every URL)
Hosting: Netlify (Git deploy) · DNS: **GoDaddy** (nameservers `ns55.domaincontrol.com`, `ns56.domaincontrol.com`)
Sitemap to submit: **`sitemap-index.xml`**
Indexable URLs: **56**

---

## 1. Pre-launch checklist (on the live domain, after deploying)

Run these after every deploy that changes SEO-relevant code. `AUDIT_URL=https://chalmusafirholidays.com npm run audit`
does most of them automatically.

| Check | How | Expected |
| --- | --- | --- |
| HTTPS | Open `http://chalmusafirholidays.com/` | 301 → `https://chalmusafirholidays.com/` |
| www → apex | Open `https://www.chalmusafirholidays.com/about/` | 301 → `https://chalmusafirholidays.com/about/` |
| Trailing slash | Open `https://chalmusafirholidays.com/about` | 308 → `/about/` |
| `/index.html` | Open `https://chalmusafirholidays.com/index.html` | 308 → `/` |
| robots.txt | `https://chalmusafirholidays.com/robots.txt` | `Allow: /` and `Sitemap: https://chalmusafirholidays.com/sitemap-index.xml`, no `Disallow` |
| Sitemap | `https://chalmusafirholidays.com/sitemap-index.xml` and `/sitemap.xml` | 200; 56 `<url>` entries, all `https://chalmusafirholidays.com/…/` |
| 404 | `https://chalmusafirholidays.com/any-made-up-page/` | HTTP **404** status (check in browser DevTools → Network), branded page |
| Canonical | View source of any page | `<link rel="canonical" href="https://chalmusafirholidays.com/…/">` — **not** `chalmusafir.co.in` |
| Favicon | `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`, `/site.webmanifest` | all 200 |
| Form | One approved live test (see section 7) | Email arrives in `chalmusafirholidays@gmail.com` inbox; visitor lands on `/thank-you/` |

> Before this release, the live site's canonical tags, robots.txt and sitemap all pointed at
> `www.chalmusafir.co.in`. That is fixed in this release — confirm it after deploying, because
> Google will not index `chalmusafirholidays.com` properly until it is.

---

## 2. Add a Domain property (DNS TXT verification at GoDaddy)

A **Domain property** covers `https://`, `http://`, `www.` and the bare domain in one place.

1. Go to <https://search.google.com/search-console> and sign in with the Google account that should own
   the property (ideally the client's, `chalmusafirholidays@gmail.com`).
2. **Add property** → choose **Domain** (left box) → enter `chalmusafirholidays.com` (no `https://`, no `www`) → **Continue**.
3. Google shows a TXT record like `google-site-verification=AbC123…`. Click **Copy**. Leave this tab open.
4. In a new tab, sign in at <https://dcc.godaddy.com/> → **Domains** → `chalmusafirholidays.com` → **DNS** (Manage DNS).
5. **Add New Record**:
   - Type: **TXT**
   - Name / Host: **@**
   - Value: paste the full `google-site-verification=…` string
   - TTL: **1 Hour** (default is fine)
   → **Save**. Do **not** edit or delete the existing A/CNAME records that point the domain at Netlify.
6. Back in Search Console, click **Verify**. If it fails, wait 15–60 minutes and try again (GoDaddy
   changes usually appear within an hour; occasionally up to 48 hours).
7. Leave the TXT record in place permanently — removing it un-verifies the property.

---

## 3. Submit the sitemap

1. In the property, open **Indexing → Sitemaps**.
2. Under *Add a new sitemap* type **`sitemap-index.xml`** (the box already shows the domain) → **Submit**.

What to expect:

- `sitemap-index.xml` points to `sitemap.xml`, which lists **every indexable page (56)**. You only
  submit the index once; new pages added later are picked up automatically.
- Status **"Couldn't fetch"** or **"Pending"** for up to ~24 hours is normal for a new submission.
  Re-check the next day before doing anything. If it still fails after 48 hours, open the sitemap URL in
  a browser to confirm it returns 200.
- Opening the XML in a browser shows *"This XML file does not appear to have any style information
  associated with it"*. That is normal — sitemaps are for crawlers, not people.

---

## 4. The 56 indexable URLs

All are `https://chalmusafirholidays.com` + the path below.

### Core pages (16)
```
/
/about/
/destinations/
/domestic/
/international/
/packages/
/services/
/honeymoon-packages/
/family-packages/
/group-tours/
/pilgrimage-packages/
/gallery/
/contact/
/quote/
/privacy/
/terms/
```

### Destinations (21)
```
/destinations/kerala/
/destinations/rajasthan/
/destinations/goa/
/destinations/uttarakhand/
/destinations/himachal-pradesh/
/destinations/madhya-pradesh/
/destinations/uttar-pradesh/
/destinations/south-india/
/destinations/eastern-india/
/destinations/maharashtra/
/destinations/thailand/
/destinations/dubai/
/destinations/singapore/
/destinations/malaysia/
/destinations/indonesia/
/destinations/sri-lanka/
/destinations/mauritius/
/destinations/france/
/destinations/europe/
/destinations/united-kingdom/
/destinations/australia/
```

### Packages (9)
```
/packages/kerala-backwaters-and-hills/
/packages/royal-rajasthan-circuit/
/packages/himachal-snow-escape/
/packages/chardham-yatra/
/packages/dubai-city-and-desert/
/packages/thailand-island-and-city/
/packages/bali-honeymoon-escape/
/packages/singapore-malaysia-family/
/packages/europe-highlights-circuit/
```

### Services (10)
```
/services/air-tickets/
/services/rail-tickets/
/services/hotel-booking/
/services/resort-booking/
/services/holiday-packages/
/services/group-packages/
/services/luxury-train-tours/
/services/cruise-holidays/
/services/visa-assistance/
/services/travel-insurance/
```

### Manual "Request indexing" — priority batches (~10 per day)

Use **URL inspection** (search bar at the top) → paste the full URL → **Request indexing**. Google
limits how many requests you can make per day, so spread them out. The sitemap covers everything
else; these just speed up the most important pages.

| Day | URLs |
| --- | --- |
| **Day 1** | `/`, `/packages/`, `/destinations/`, `/services/`, `/contact/`, `/quote/`, `/domestic/`, `/international/`, `/pilgrimage-packages/`, `/about/` |
| **Day 2** | `/honeymoon-packages/`, `/family-packages/`, `/group-tours/`, `/packages/chardham-yatra/`, `/packages/kerala-backwaters-and-hills/`, `/packages/royal-rajasthan-circuit/`, `/packages/dubai-city-and-desert/`, `/packages/thailand-island-and-city/`, `/packages/bali-honeymoon-escape/`, `/packages/singapore-malaysia-family/` |
| **Day 3** | `/packages/himachal-snow-escape/`, `/packages/europe-highlights-circuit/`, `/services/air-tickets/`, `/services/rail-tickets/`, `/services/hotel-booking/`, `/services/holiday-packages/`, `/services/visa-assistance/`, `/services/group-packages/`, `/destinations/kerala/`, `/destinations/rajasthan/` |
| **Day 4** | `/destinations/goa/`, `/destinations/uttarakhand/`, `/destinations/himachal-pradesh/`, `/destinations/dubai/`, `/destinations/thailand/`, `/destinations/singapore/`, `/destinations/indonesia/`, `/destinations/europe/`, `/destinations/malaysia/`, `/destinations/mauritius/` |
| Optional | The remaining destinations, services and `/gallery/`, `/privacy/`, `/terms/` — the sitemap will get them indexed without manual requests. |

Request the **homepage first** — it also speeds up Google picking up the new favicon.

---

## 5. Pages that must NOT be submitted

| URL | Why |
| --- | --- |
| `/thank-you/` | Form success page. `noindex, follow`, no canonical, excluded from the sitemap. Indexing it would only bring people to a page that says "your enquiry has been sent". |
| Any 404 URL (e.g. `/old-page/`) | Returns a real 404 with `noindex`. |
| `/about` (no slash), `/index.html`, `http://…`, `www.…` | Redirects. Always submit the final `https://chalmusafirholidays.com/…/` URL. |
| Anything on `chalmusafir.co.in` | Old domain referenced by the previous build; not this property. |

If the Pages report later lists `/thank-you/` under **"Excluded by 'noindex' tag"**, that is correct —
no action needed.

---

## 6. Weeks 1–4 follow-up

**Week 1**
- **Indexing → Pages**: watch *Indexed* grow. "Discovered – currently not indexed" and "Crawled – currently
  not indexed" are normal at first for a new domain.
- Check **Sitemaps** shows *Success* with 56 discovered URLs.
- Confirm no URLs on `chalmusafir.co.in` appear (they would mean an old canonical is still cached — request
  indexing of that page again).

**Week 2**
- **Enhancements / Shopping & Experience** in the left menu: check **Breadcrumbs** (all inner pages),
  **FAQ** (home, services, destination pages) and the **Organization**/**Local business** details detected
  from structured data. Fix anything marked *Invalid*; *Valid with warnings* is acceptable.
- Run <https://pagespeed.web.dev/> on the homepage and one inner page (mobile). Note the Core Web Vitals.

**Week 3**
- **Google Business Profile** (<https://business.google.com/>): claim or create the listing for
  *Chal Musafir Holidays*, A-49 Lajpat Nagar, Behind Bank of Baroda, Moradabad. Use exactly the same
  name, address and phone (+91 89092 86000) as the website, and set the website to
  `https://chalmusafirholidays.com/`. Verification is by postcard/phone/video and can take a few days.
- After verification, send us the listing's map embed so the contact page can use the exact pin.

**Week 4**
- **Bing Webmaster Tools** (<https://www.bing.com/webmasters>): *Import from Google Search Console* —
  this copies the verified property and sitemap in one step. Bing also feeds DuckDuckGo and Yahoo.
- **Performance** report in Search Console: first queries and clicks appear. Review which pages earn
  impressions and expand those pages' content.
- **Core Web Vitals** report: needs enough real-user traffic, so it may still say "Not enough data".

### Favicon in search results

The favicon is generated from the logo emblem and linked on every page (including the homepage, which is
what Google reads). Google can take **several days to a few weeks** to show it in results. Requesting
indexing of the homepage (Day 1 above) speeds this up. Nothing else needs doing unless it still hasn't
changed after ~4 weeks.

---

## 7. FormSubmit activation and the one live test

FormSubmit must be activated once before it forwards anything. **Do this only when you are ready to
send one real test.**

1. Deploy this release.
2. Open `https://chalmusafirholidays.com/contact/` and send **one** enquiry with your own details.
   The site will show a "could not be delivered" message (the form is not activated yet) — that is expected.
3. In `chalmusafirholidays@gmail.com`, find the email from FormSubmit titled *"Action Required: Activate
   FormSubmit"* (check **Spam** and **Promotions** too) and click **Activate Form**.
4. FormSubmit then shows (and emails) a random form alias. Optionally put it in `FORMSUBMIT_ID` in
   `lib/enquiry.ts` and redeploy, so the Gmail address is no longer in the page source.
5. Send one more test enquiry. Confirm:
   - it arrives in **Inbox** (if it lands in Spam, open it and click *Report not spam*, and add
     `submissions@formsubmit.co` to contacts);
   - subject is `New enquiry from <Name>: Contact form` and the table shows every field, the source page and time;
   - pressing **Reply** in Gmail addresses the visitor's email, not FormSubmit;
   - the browser ended on `https://chalmusafirholidays.com/thank-you/`.
