// SEO / integrity audit for the built site.  Usage:  npm run build && npm run audit
//
// Starts `next start` on a spare port (or audits AUDIT_URL if set, e.g. the
// live domain), crawls every page reachable from "/" plus every sitemap URL,
// and checks each page. Exits 1 if anything fails.
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { parse } from 'node-html-parser';

const PRODUCTION_ORIGIN = 'https://chalmusafirholidays.com';
const PORT = Number(process.env.AUDIT_PORT || 3210);
const BASE = (process.env.AUDIT_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const NOINDEX_PATHS = new Set(['/thank-you/']);
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 170;

const issues = [];
const fail = (where, message) => issues.push(`${where}: ${message}`);

// ---------------------------------------------------------------------------
async function startServer() {
  if (process.env.AUDIT_URL) return null;
  const child = spawn(`npx next start -p ${PORT}`, { stdio: 'ignore', shell: true });
  for (let i = 0; i < 60; i += 1) {
    try {
      if ((await fetch(`${BASE}/robots.txt`)).ok) return child;
    } catch {
      // not up yet
    }
    await sleep(500);
  }
  child.kill();
  throw new Error(`next start did not come up on ${BASE}`);
}

function stopServer(child) {
  if (!child) return;
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  else child.kill();
}

const statusCache = new Map();
async function status(url) {
  if (!statusCache.has(url)) {
    statusCache.set(
      url,
      fetch(url, { redirect: 'manual' })
        .then((res) => ({ status: res.status, location: res.headers.get('location') }))
        .catch((error) => ({ status: 0, location: null, error: String(error) })),
    );
  }
  return statusCache.get(url);
}

const toLocal = (url) => url.replace(PRODUCTION_ORIGIN, BASE);
const pathOf = (url) => new URL(url, BASE).pathname;

// ---------------------------------------------------------------------------
async function checkRobotsAndSitemap() {
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  if (!/^Sitemap:\s*https:\/\/chalmusafirholidays\.com\/sitemap-index\.xml\s*$/m.test(robots)) fail('robots.txt', 'missing "Sitemap: https://chalmusafirholidays.com/sitemap-index.xml"');
  if (/^Disallow:\s*\S/m.test(robots)) fail('robots.txt', 'contains a Disallow rule — everything must stay crawlable');
  if (!/^Allow:\s*\/\s*$/m.test(robots)) fail('robots.txt', 'missing "Allow: /"');

  const index = await (await fetch(`${BASE}/sitemap-index.xml`)).text();
  const indexLocs = [...index.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (!indexLocs.includes(`${PRODUCTION_ORIGIN}/sitemap.xml`)) fail('sitemap-index.xml', 'does not reference /sitemap.xml');

  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const urls = [];
  for (const entry of entries) {
    const loc = entry.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!loc) continue;
    urls.push(loc);
    if (!/<lastmod>\d{4}-\d{2}-\d{2}/.test(entry)) fail(`sitemap ${loc}`, 'missing <lastmod>');
    if (!loc.startsWith(`${PRODUCTION_ORIGIN}/`)) fail(`sitemap ${loc}`, `not on ${PRODUCTION_ORIGIN}`);
  }
  if (new Set(urls).size !== urls.length) fail('sitemap.xml', 'contains duplicate URLs');
  return urls;
}

// ---------------------------------------------------------------------------
function checkUrlFormat(path) {
  if (path !== path.toLowerCase()) fail(path, 'URL is not lowercase');
  if (/[_\s%]/.test(path)) fail(path, 'URL should use hyphens only (no underscores, spaces or encoded characters)');
  if (!path.endsWith('/')) fail(path, 'URL has no trailing slash');
}

function headingIssues(root) {
  const problems = [];
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6').filter((el) => !el.closest('noscript'));
  const h1s = headings.filter((el) => el.tagName === 'H1');
  if (h1s.length !== 1) problems.push(`has ${h1s.length} <h1> elements (expected 1)`);
  let previous = 0;
  for (const heading of headings) {
    const level = Number(heading.tagName[1]);
    if (previous && level > previous + 1) problems.push(`heading level skips from h${previous} to h${level} ("${heading.text.trim().slice(0, 40)}")`);
    previous = level;
  }
  return problems;
}

async function checkPage(url, html, seen) {
  const path = pathOf(url);
  const root = parse(html);
  const head = root.querySelector('head');
  const meta = (selector) => head?.querySelector(selector)?.getAttribute('content') ?? null;
  const robots = meta('meta[name="robots"]') ?? '';
  const canonical = head?.querySelectorAll('link[rel="canonical"]') ?? [];
  const noindex = /noindex/.test(robots);

  checkUrlFormat(path);

  // Robots + canonical
  if (NOINDEX_PATHS.has(path)) {
    if (!noindex) fail(path, 'utility page must be noindex');
  }
  if (noindex) {
    if (!/noindex,\s*follow/.test(robots)) fail(path, `robots should be "noindex, follow" (found "${robots}")`);
    if (canonical.length) fail(path, 'noindex page must not have a canonical tag');
  } else {
    if (!/index,\s*follow/.test(robots) || !/max-image-preview:large/.test(robots)) fail(path, `robots should be "index, follow, max-image-preview:large" (found "${robots}")`);
    if (canonical.length !== 1) fail(path, `expected 1 canonical, found ${canonical.length}`);
    else if (canonical[0].getAttribute('href') !== `${PRODUCTION_ORIGIN}${path}`) fail(path, `canonical is ${canonical[0].getAttribute('href')}, expected ${PRODUCTION_ORIGIN}${path}`);
  }

  // Title + description
  const titles = head?.querySelectorAll('title') ?? [];
  const title = titles[0]?.text.trim() ?? '';
  if (titles.length !== 1) fail(path, `expected 1 <title>, found ${titles.length}`);
  if (!title) fail(path, 'missing <title>');
  else if (title.length > TITLE_MAX) fail(path, `title is ${title.length} chars (max ${TITLE_MAX}): "${title}"`);
  const description = meta('meta[name="description"]') ?? '';
  if (!description) fail(path, 'missing meta description');
  else if (description.length < DESC_MIN || description.length > DESC_MAX) fail(path, `description is ${description.length} chars (want ${DESC_MIN}–${DESC_MAX})`);
  if (!noindex) {
    seen.titles.set(title, [...(seen.titles.get(title) ?? []), path]);
    seen.descriptions.set(description, [...(seen.descriptions.get(description) ?? []), path]);
  }

  // Headings
  for (const problem of headingIssues(root)) fail(path, problem);

  // Images
  for (const img of root.querySelectorAll('img')) {
    if (img.closest('noscript')) continue;
    if (!img.hasAttribute('alt')) fail(path, `<img src="${img.getAttribute('src')}"> has no alt attribute`);
    if (!img.getAttribute('width') && !/position:\s*absolute/.test(img.getAttribute('style') ?? '')) fail(path, `<img src="${img.getAttribute('src')}"> has no width/height and is not a sized fill image`);
    const src = img.getAttribute('src');
    if (src) seen.assets.add(new URL(toLocal(src), `${BASE}${path}`).href);
  }

  // Social tags (indexable pages)
  if (!noindex) {
    for (const property of ['og:title', 'og:description', 'og:url', 'og:type', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt']) {
      if (!meta(`meta[property="${property}"]`)) fail(path, `missing ${property}`);
    }
    if (meta('meta[property="og:url"]') && meta('meta[property="og:url"]') !== `${PRODUCTION_ORIGIN}${path}`) fail(path, 'og:url does not match the canonical URL');
    if (meta('meta[property="og:image:width"]') !== '1200' || meta('meta[property="og:image:height"]') !== '630') fail(path, 'og:image must be 1200×630');
    const ogImage = meta('meta[property="og:image"]');
    if (ogImage) seen.assets.add(toLocal(ogImage));
    for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
      if (!meta(`meta[name="${name}"]`)) fail(path, `missing ${name}`);
    }
  }

  // Icons + manifest (every page, including the homepage)
  for (const selector of ['link[rel="icon"][href="/favicon.ico"]', 'link[rel="icon"][href="/favicon.svg"]', 'link[rel="apple-touch-icon"]', 'link[rel="manifest"]']) {
    const link = head?.querySelector(selector);
    if (!link) fail(path, `missing ${selector}`);
    else seen.assets.add(new URL(link.getAttribute('href'), BASE).href);
  }

  // Structured data
  const types = new Set();
  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    const raw = script.rawText;
    if (raw.includes('<')) fail(path, 'JSON-LD contains an unescaped "<"');
    try {
      const data = JSON.parse(raw);
      const nodes = data['@graph'] ?? [data];
      for (const node of nodes) [node['@type']].flat().forEach((type) => types.add(type));
    } catch {
      fail(path, 'JSON-LD is not valid JSON');
    }
  }
  for (const type of ['TravelAgency', 'WebSite', 'Person']) if (!types.has(type)) fail(path, `JSON-LD missing ${type}`);
  if (path !== '/' && !noindex && !types.has('BreadcrumbList')) fail(path, 'inner page has no BreadcrumbList JSON-LD');
  if (root.querySelector('[data-faq]') && !types.has('FAQPage')) fail(path, 'page has FAQs but no FAQPage JSON-LD');

  // Links
  const links = [];
  for (const anchor of root.querySelectorAll('a[href]')) {
    if (anchor.closest('noscript')) continue;
    const href = anchor.getAttribute('href');
    if (/^(mailto:|tel:|#|https:\/\/wa\.me|javascript:)/.test(href)) continue;
    const absolute = new URL(toLocal(href), `${BASE}${path}`);
    if (absolute.origin !== new URL(BASE).origin) continue;
    absolute.hash = '';
    links.push(absolute.href);
  }
  return { noindex, links };
}

// ---------------------------------------------------------------------------
async function main() {
  const server = await startServer();
  try {
    const sitemapUrls = await checkRobotsAndSitemap();
    const seen = { titles: new Map(), descriptions: new Map(), assets: new Set() };
    const queue = ['/', ...sitemapUrls.map((url) => pathOf(url)), ...NOINDEX_PATHS];
    const visited = new Set();
    const indexable = new Set();
    const linkSources = new Map();

    while (queue.length) {
      const path = queue.shift();
      const key = path.split('?')[0];
      if (visited.has(key)) continue;
      visited.add(key);
      const url = `${BASE}${path}`;
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status !== 200) {
        fail(path, `returned HTTP ${res.status}${res.headers.get('location') ? ` → ${res.headers.get('location')}` : ''} (linked from ${[...(linkSources.get(key) ?? ['sitemap'])].slice(0, 3).join(', ')})`);
        continue;
      }
      if (!(res.headers.get('content-type') ?? '').includes('text/html')) continue;
      const { noindex, links } = await checkPage(url, await res.text(), seen);
      if (!noindex) indexable.add(key);
      for (const link of links) {
        const linkPath = new URL(link).pathname + new URL(link).search;
        const linkKey = new URL(link).pathname;
        if (!linkSources.has(linkKey)) linkSources.set(linkKey, new Set());
        linkSources.get(linkKey).add(key);
        if (/\.[a-z0-9]+$/i.test(linkKey)) seen.assets.add(link);
        else if (!visited.has(linkKey)) queue.push(linkPath);
      }
    }

    // Duplicates
    for (const [title, paths] of seen.titles) if (paths.length > 1) fail('duplicate title', `"${title}" on ${paths.join(', ')}`);
    for (const [description, paths] of seen.descriptions) if (paths.length > 1) fail('duplicate description', `"${description.slice(0, 60)}…" on ${paths.join(', ')}`);

    // Sitemap must equal the indexable pages
    const sitemapPaths = new Set(sitemapUrls.map((url) => pathOf(url)));
    for (const path of indexable) if (!sitemapPaths.has(path)) fail('sitemap.xml', `indexable page ${path} is missing`);
    for (const path of sitemapPaths) if (!indexable.has(path)) fail('sitemap.xml', `lists ${path}, which is not an indexable 200 page`);

    // Assets (images, icons, og images) must load
    const assetResults = await Promise.all([...seen.assets].map(async (asset) => [asset, await status(asset)]));
    for (const [asset, result] of assetResults) if (result.status !== 200) fail('asset', `${asset.replace(BASE, '')} returned HTTP ${result.status}`);

    // 404 page
    const missing = await fetch(`${BASE}/this-page-does-not-exist-audit/`, { redirect: 'manual' });
    const missingHtml = parse(await missing.text());
    if (missing.status !== 404) fail('404 page', `returned HTTP ${missing.status}, expected 404`);
    if (!/noindex/.test(missingHtml.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '')) fail('404 page', 'missing noindex');
    if (missingHtml.querySelector('link[rel="canonical"]')) fail('404 page', 'must not have a canonical tag');
    if (missingHtml.querySelectorAll('h1').length !== 1) fail('404 page', 'expected exactly one <h1>');

    // Redirects
    const indexHtml = await status(`${BASE}/index.html`);
    if (![301, 308].includes(indexHtml.status) || !/\/$/.test(indexHtml.location ?? '')) fail('/index.html', `should redirect to / (got ${indexHtml.status})`);
    const noSlash = await status(`${BASE}/about`);
    if (![301, 308].includes(noSlash.status) || !(noSlash.location ?? '').endsWith('/about/')) fail('/about', `should redirect to /about/ (got ${noSlash.status})`);

    console.log(`Audited ${visited.size} URLs (${indexable.size} indexable, ${sitemapPaths.size} in sitemap) and ${seen.assets.size} assets on ${BASE}`);
    if (issues.length) {
      console.error(`\n${issues.length} issue(s):`);
      for (const issue of issues) console.error(`  ✗ ${issue}`);
      process.exitCode = 1;
    } else {
      console.log('✓ No issues found');
    }
  } finally {
    stopServer(server);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
