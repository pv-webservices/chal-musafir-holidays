import AxeBuilder from '@axe-core/playwright';
import { expect, sitemapPaths, test, watchErrors } from './fixtures';

const UTILITY_PAGES = ['/thank-you/'];
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/** Scrolls through the page so lazy images load and reveal animations finish before checks run. */
async function settle(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += Math.round(window.innerHeight * 0.8)) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
}

test.describe('every page', () => {
  test.use({ reducedMotion: 'reduce' });

  test('axe WCAG 2.1 AA: zero violations, no console errors, no broken images', async ({ page }) => {
    test.setTimeout(600_000);
    const paths = [...(await sitemapPaths(page)), ...UTILITY_PAGES];
    expect(paths.length).toBeGreaterThan(50);
    const report: string[] = [];

    for (const path of paths) {
      const errors = watchErrors(page);
      await page.goto(path);
      await settle(page);

      const broken = await page.evaluate(() =>
        [...document.images].filter((img) => img.complete && img.naturalWidth === 0 && img.currentSrc).map((img) => img.currentSrc),
      );
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).exclude('iframe').analyze();

      for (const violation of results.violations)
        report.push(`${path} — ${violation.id}: ${violation.help} (${violation.nodes.map((node) => node.target.join(' ')).slice(0, 3).join(' | ')})`);
      for (const src of broken) report.push(`${path} — broken image ${src}`);
      for (const error of errors) report.push(`${path} — console/network error: ${error}`);
      page.removeAllListeners('console');
      page.removeAllListeners('pageerror');
      page.removeAllListeners('response');
    }

    console.log(`Checked ${paths.length} pages with axe (${WCAG_TAGS.join(', ')})`);
    expect(report, report.join('\n')).toEqual([]);
  });

  test('404 page: real status, noindex, helpful links, axe clean', async ({ page }) => {
    const response = await page.goto('/no-such-page/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    for (const name of ['Back to Home', 'Holiday Packages', 'All Destinations', 'Contact Us', /Or call us/]) {
      await expect(page.getByRole('main').getByRole('link', { name })).toBeVisible();
    }
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});

test.describe('responsive layout', () => {
  const pages = ['/', '/contact/', '/quote/', '/packages/', '/destinations/kerala/', '/services/visa-assistance/', '/gallery/', '/thank-you/'];

  for (const width of [320, 375, 768, 1024, 1440]) {
    test(`no horizontal scroll and adequate tap targets at ${width}px`, async ({ page }) => {
      test.setTimeout(180_000);
      await page.setViewportSize({ width, height: 900 });
      const problems: string[] = [];
      for (const path of pages) {
        await page.goto(path);
        await settle(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (overflow > 0) problems.push(`${path}: page is ${overflow}px wider than the ${width}px viewport`);

        // WCAG 2.2 target size (minimum): 24×24 CSS px, unless it is an inline link inside a sentence.
        const small = await page.evaluate(() =>
          [...document.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea')]
            .filter((el) => {
              const style = getComputedStyle(el);
              if (style.visibility === 'hidden' || style.display === 'none' || el.closest('[aria-hidden="true"]')) return false;
              if (el.classList.contains('sr-only') || el.closest('.sr-only')) return false;
              const rect = el.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) return false;
              const inline = style.display === 'inline' && el.parentElement && /[a-z]/i.test(el.parentElement.textContent?.replace(el.textContent ?? '', '') ?? '');
              return !inline && (rect.width < 23.5 || rect.height < 23.5); // half-pixel tolerance for sub-pixel layout
            })
            .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)}`),
        );
        for (const item of small) problems.push(`${path}: small tap target ${item}`);
      }
      expect(problems, problems.join('\n')).toEqual([]);
    });
  }
});

test.describe('header and contact widgets', () => {
  test('Destinations and Packages menu labels are as bold as the other links', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    const weight = (locator: import('@playwright/test').Locator) => locator.evaluate((el) => getComputedStyle(el).fontWeight);
    const size = (locator: import('@playwright/test').Locator) => locator.evaluate((el) => getComputedStyle(el).fontSize);
    const home = nav.getByRole('link', { name: 'Home' });
    for (const label of ['Destinations', 'Packages']) {
      const button = nav.getByRole('button', { name: label });
      expect(await weight(button)).toBe(await weight(home));
      expect(await size(button)).toBe(await size(home));
      expect(Number(await weight(button))).toBeGreaterThanOrEqual(700);
    }
  });

  test('desktop: floating WhatsApp button sits bottom-right', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const float = page.getByRole('link', { name: 'Chat on WhatsApp (opens in a new tab)' }).last();
    await expect(float).toBeVisible();
    const box = (await float.boundingBox())!;
    expect(1440 - (box.x + box.width)).toBeGreaterThanOrEqual(24);
    expect(1440 - (box.x + box.width)).toBeLessThanOrEqual(40);
    expect(900 - (box.y + box.height)).toBeGreaterThanOrEqual(24);
    expect(900 - (box.y + box.height)).toBeLessThanOrEqual(40);
    expect(await float.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/918909286000/);
  });

  test('mobile: WhatsApp is the highlighted action in the bottom bar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    const bar = page.locator('div.fixed.bottom-0');
    const whatsapp = bar.getByRole('link', { name: 'Chat on WhatsApp (opens in a new tab)' });
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp.locator('svg')).toHaveCount(1);
    expect(await whatsapp.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(37, 211, 102)');
    const quote = bar.getByRole('link', { name: 'Get Quote' });
    expect(await quote.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe('rgb(37, 211, 102)');
    // The desktop float is hidden on phones.
    await expect(page.locator('a.fixed.bottom-6')).toBeHidden();
  });
});

test.describe('keyboard and motion', () => {
  test('skip link is the first tab stop and moves focus to main', async ({ page }) => {
    await page.goto('/about/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('main#main')).toBeFocused();
  });

  test('focus is visible on interactive elements', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    for (let i = 0; i < 6; i += 1) await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const style = getComputedStyle(el);
      return { tag: el.tagName, outline: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    expect(outline.outline).not.toBe('none');
    expect(outline.width).toBeGreaterThan(0);
  });

  test('desktop dropdown opens with the keyboard and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const button = page.getByRole('navigation', { name: 'Primary' }).getByRole('button', { name: 'Destinations' });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: /Domestic Holidays/ }).first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('reduced motion turns animations off', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const duration = await page.locator('.btn').first().evaluate((el) => getComputedStyle(el, '::before').animationDuration);
    expect(parseFloat(duration)).toBeLessThan(0.01);
    await expect(page.locator('.reveal').first()).toHaveCSS('opacity', '1');
  });
});

test('favicons, manifest, robots and sitemap are served', async ({ request }) => {
  for (const path of ['/favicon.ico', '/favicon.svg', '/favicon-48x48.png', '/favicon-96x96.png', '/apple-touch-icon.png', '/icons/icon-192x192.png', '/icons/icon-512x512.png', '/site.webmanifest', '/robots.txt', '/sitemap.xml', '/sitemap-index.xml', '/images/og/default.jpg']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  const manifest = await (await request.get('/site.webmanifest')).json();
  expect(manifest).toMatchObject({ name: 'Chal Musafir Holidays', short_name: 'Chal Musafir', theme_color: '#062846', background_color: '#ffffff' });
});

test('security headers are sent on pages', async ({ request }) => {
  const response = await request.get('/');
  const headers = response.headers();
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('SAMEORIGIN');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
});
