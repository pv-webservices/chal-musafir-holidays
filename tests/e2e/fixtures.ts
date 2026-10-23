import { test as base, expect, type Page, type Request, type Route } from '@playwright/test';

/**
 * Every test gets a page where requests to FormSubmit never leave the machine.
 * By default they are aborted; tests that need a response install their own
 * `page.route` handler (later routes take precedence). Any FormSubmit request
 * that reaches the default handler is recorded so tests can assert on it.
 */
export const test = base.extend<{ formsubmitRequests: Request[] }>({
  formsubmitRequests: [
    async ({ context }, use) => {
      const requests: Request[] = [];
      await context.route(/formsubmit\.co/, (route) => {
        requests.push(route.request());
        return route.abort('blockedbyclient');
      });
      // Keep tests offline from third parties too (Google Maps embed, WhatsApp).
      await context.route(/(google\.com\/maps|wa\.me|api\.whatsapp\.com)/, (route) => route.abort('blockedbyclient'));
      await use(requests);
    },
    { auto: true },
  ],
});

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

/**
 * Intercepts FormSubmit's AJAX endpoint with a local fake. Answers the CORS
 * preflight itself and hands every POST to `respond`. Returns the captured POST bodies.
 */
export async function mockFormSubmit(page: Page, respond: (route: Route) => Promise<void> | void) {
  const bodies: Record<string, string>[] = [];
  await page.route(/formsubmit\.co\/ajax\//, async (route) => {
    if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    bodies.push(route.request().postDataJSON());
    return respond(route);
  });
  return bodies;
}

export const fulfillJson = (route: Route, body: unknown, status = 200) =>
  route.fulfill({ status, headers: CORS, contentType: 'application/json', body: JSON.stringify(body) });

export { expect };

export const VALID = {
  name: 'Test Visitor',
  email: 'visitor@example.com',
  phone: '98765 43210',
  message: 'Looking for a 6-day Kerala family trip in December.',
};

/** Fills the contact form on /contact/ with valid data (consent ticked). */
export async function fillContactForm(page: Page, overrides: Partial<typeof VALID> = {}) {
  const data = { ...VALID, ...overrides };
  const form = page.locator('main form').first();
  await form.getByLabel('Name').fill(data.name);
  await form.getByLabel('Phone').fill(data.phone);
  await form.getByLabel('Email').fill(data.email);
  await form.getByLabel('Message').fill(data.message);
  // Blur first: on-blur validation may insert an error message and shift the layout.
  await form.getByLabel('Message').blur();
  await form.getByRole('checkbox').check();
  return form;
}

/** Collects console errors and failed same-origin requests for a page. */
export function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' && !/blockedbyclient|ERR_BLOCKED_BY_CLIENT|ERR_FAILED/.test(message.text())) errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    const url = new URL(response.url());
    if (url.hostname === 'localhost' && response.status() >= 400) errors.push(`${response.status()} ${url.pathname}`);
  });
  return errors;
}

/** Every URL listed in the sitemap, as a local path. */
export async function sitemapPaths(page: Page): Promise<string[]> {
  const xml = await (await page.request.get('/sitemap.xml')).text();
  return [...xml.matchAll(/<loc>https:\/\/chalmusafirholidays\.com(.*?)<\/loc>/g)].map((match) => match[1]);
}
