import { VALID, expect, fillContactForm, fulfillJson, mockFormSubmit, test } from './fixtures';

// All FormSubmit traffic is intercepted (fixtures.ts) — nothing here sends a real email.

test.describe.configure({ timeout: 90_000 });

test.describe('contact form (JavaScript on)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact/', { waitUntil: 'domcontentloaded' });
    // Hydrated: the form switches from native validation to its own.
    await expect(page.locator('main form').first()).toHaveAttribute('novalidate', '', { timeout: 30_000 });
  });

  test('shows field errors, a summary, and focuses the first invalid field', async ({ page, formsubmitRequests }) => {
    const form = page.locator('main form').first();
    await form.getByRole('button', { name: 'Send Enquiry' }).click();

    const summary = form.getByRole('alert').filter({ hasText: 'Please fix' });
    await expect(summary).toContainText('these 5 problems');
    const name = form.getByLabel('Name');
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    const describedBy = await name.getAttribute('aria-describedby');
    await expect(page.locator(`[id="${describedBy}"]`)).toHaveText('Please enter your name.');
    await expect(form.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    expect(formsubmitRequests).toHaveLength(0);
  });

  test('validates email, phone, minimum lengths and past dates', async ({ page }) => {
    const form = await fillContactForm(page, { name: 'A', email: 'not-an-email', phone: '12345', message: 'Too short' });
    await form.getByLabel('Travel date').fill('2020-01-01');
    await form.getByRole('button', { name: 'Send Enquiry' }).click();

    await expect(form.getByText('Name must be at least 2 characters.').first()).toBeVisible();
    await expect(form.getByText('Please enter a valid email address, like name@example.com.').first()).toBeVisible();
    await expect(form.getByText('Please enter a phone number with 10–15 digits.').first()).toBeVisible();
    await expect(form.getByText('Message must be at least 10 characters.').first()).toBeVisible();
    await expect(form.getByText('Travel date cannot be in the past.').first()).toBeVisible();
  });

  test('requires consent', async ({ page, formsubmitRequests }) => {
    const form = await fillContactForm(page);
    await form.getByRole('checkbox').uncheck();
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(form.getByRole('checkbox')).toBeFocused();
    await expect(form.getByText('Please agree to the privacy policy so we can reply to you.').first()).toBeVisible();
    await expect(form.getByRole('link', { name: 'privacy policy' })).toHaveAttribute('href', '/privacy/');
    expect(formsubmitRequests).toHaveLength(0);
  });

  test('sends in the background and lands on /thank-you/', async ({ page }) => {
    const bodies = await mockFormSubmit(page, (route) => fulfillJson(route, { success: 'true', message: 'The form was submitted successfully.' }));
    const form = await fillContactForm(page);
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await form.getByRole('button', { name: 'Send Enquiry' }).click();

    await expect(page).toHaveURL(/\/thank-you\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Thank you');
    expect(bodies).toHaveLength(1);
    expect(bodies[0]).toMatchObject({
      name: VALID.name,
      email: VALID.email,
      phone: VALID.phone,
      message: VALID.message,
      'Form type': 'Contact form',
      _subject: `New enquiry from ${VALID.name}: Contact form`,
      _replyto: VALID.email,
      _captcha: 'false',
      _template: 'table',
      _honey: '',
    });
    expect(bodies[0]['Source page']).toMatch(/\/contact\/$/);
    expect(bodies[0]['Submitted at']).toBeTruthy();
  });

  test('disables the button while sending', async ({ page }) => {
    let release: () => void = () => {};
    const held = new Promise<void>((resolve) => (release = resolve));
    await mockFormSubmit(page, async (route) => {
      await held;
      await fulfillJson(route, { success: 'true' });
    });
    const form = await fillContactForm(page);
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(form.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    release();
    await expect(page).toHaveURL(/\/thank-you\/$/);
  });

  test('honeypot: a filled hidden field is never sent', async ({ page, formsubmitRequests }) => {
    const bodies = await mockFormSubmit(page, (route) => fulfillJson(route, { success: 'true' }));
    const form = await fillContactForm(page);
    // Real visitors cannot see or tab to this field.
    const honeypot = form.locator('input[name="_honey"]');
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
    await honeypot.fill('bot was here', { force: true });
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(page).toHaveURL(/\/thank-you\/$/);
    expect(bodies).toHaveLength(0);
    expect(formsubmitRequests).toHaveLength(0);
  });

  test('bot timer: an instant submission is held back, not sent', async ({ page }) => {
    // Freeze Date.now so "time since the form appeared" is 0 however slow the machine is.
    await page.addInitScript(() => {
      Date.now = () => 1_700_000_000_000;
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('main form').first()).toHaveAttribute('novalidate', '', { timeout: 30_000 });
    const bodies = await mockFormSubmit(page, (route) => fulfillJson(route, { success: 'true' }));
    const form = await fillContactForm(page);
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(form.getByText('That was very quick')).toBeVisible();
    expect(bodies).toHaveLength(0);
  });

  test('network failure keeps the data and offers phone/WhatsApp/email', async ({ page }) => {
    await mockFormSubmit(page, (route) => route.abort('failed'));
    const form = await fillContactForm(page);
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await form.getByRole('button', { name: 'Send Enquiry' }).click();

    const alert = form.getByRole('alert');
    await expect(alert).toContainText('could not reach the enquiry service');
    await expect(alert.getByRole('link', { name: /Call \+91 8909286000/ })).toHaveAttribute('href', 'tel:+918909286000');
    await expect(alert.getByRole('link', { name: /chalmusafirholidays@gmail.com/ })).toHaveAttribute('href', 'mailto:chalmusafirholidays@gmail.com');
    await expect(form.getByLabel('Name')).toHaveValue(VALID.name);
    await expect(form.getByLabel('Message')).toHaveValue(VALID.message);
    await expect(form.getByRole('button', { name: 'Send Enquiry' })).toBeEnabled();
  });

  test('delivery failure (e.g. form not activated) offers alternatives', async ({ page }) => {
    await mockFormSubmit(page, (route) => fulfillJson(route, { success: 'false', message: 'This form needs Activation.' }));
    const form = await fillContactForm(page);
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(form.getByRole('alert')).toContainText('could not be delivered');
    await expect(form.getByLabel('Email')).toHaveValue(VALID.email);
  });

  test('times out after 20 seconds', async ({ page }) => {
    await mockFormSubmit(page, () => new Promise(() => {})); // never answers
    const form = await fillContactForm(page);
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(form.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    // Real 20-second timeout in lib/enquiry.ts.
    await expect(form.getByRole('alert')).toContainText('took too long', { timeout: 30_000 });
    await expect(form.getByLabel('Name')).toHaveValue(VALID.name);
  });

  test('offline message', async ({ page, context }) => {
    const form = await fillContactForm(page);
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await context.setOffline(true);
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(form.getByRole('alert')).toContainText('You appear to be offline');
    await context.setOffline(false);
  });

  test('keeps a draft across a reload', async ({ page }) => {
    const form = await fillContactForm(page);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(form.getByLabel('Name')).toHaveValue(VALID.name);
    await expect(form.getByLabel('Message')).toHaveValue(VALID.message);
  });

  test('"Send via WhatsApp" opens WhatsApp with the message pre-filled', async ({ page }) => {
    const form = await fillContactForm(page);
    const href = await form.getByRole('link', { name: 'Send via WhatsApp' }).getAttribute('href');
    expect(href).toMatch(/^https:\/\/wa\.me\/918909286000\?text=/);
    const text = decodeURIComponent(href!.split('text=')[1]);
    expect(text).toContain(`Name: ${VALID.name}`);
    expect(text).toContain(`Message: ${VALID.message}`);
  });

  test('re-enables the form after Back from /thank-you/', async ({ page }) => {
    await mockFormSubmit(page, (route) => fulfillJson(route, { success: 'true' }));
    const form = await fillContactForm(page);
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(page).toHaveURL(/\/thank-you\/$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/contact\/$/);
    await expect(page.locator('main form').first().getByRole('button', { name: 'Send Enquiry' })).toBeEnabled();
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('contact form posts to FormSubmit and returns to /thank-you/', async ({ page }) => {
    let posted = '';
    await page.route(/formsubmit\.co\/chalmusafirholidays@gmail\.com/, async (route) => {
      posted = route.request().postData() ?? '';
      // Simulate FormSubmit's redirect to the _next URL, but keep it local.
      await route.fulfill({ status: 303, headers: { Location: 'http://localhost:3300/thank-you/' } });
    });
    await page.goto('/contact/');
    const form = page.locator('main form').first();
    await expect(form).toBeVisible(); // reveal animations must not hide content without JS
    await expect(form).toHaveAttribute('action', 'https://formsubmit.co/chalmusafirholidays@gmail.com');
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form.locator('input[name="_next"]')).toHaveValue('https://chalmusafirholidays.com/thank-you/');
    await expect(form.locator('input[name="_captcha"]')).toHaveValue('false');
    await expect(form.locator('input[name="_subject"]')).toHaveValue(/New enquiry from/);
    await expect(form.locator('input[name="_honey"]')).toHaveCount(1);

    await fillContactForm(page);
    await form.getByRole('button', { name: 'Send Enquiry' }).click();
    await expect(page).toHaveURL(/\/thank-you\/$/);
    const params = new URLSearchParams(posted);
    expect(params.get('name')).toBe(VALID.name);
    expect(params.get('email')).toBe(VALID.email);
    expect(params.get('consent')).toMatch(/Yes/);
    expect(params.get('Form type')).toBe('Contact form');
  });

  test('quote page offers the plain form instead of the step planner', async ({ page }) => {
    await page.goto('/quote/');
    const form = page.locator('main form').first();
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute('action', 'https://formsubmit.co/chalmusafirholidays@gmail.com');
    await expect(page.getByText('Loading trip planner…')).toBeHidden();
  });
});

test.describe('trip planner', () => {
  test('validates each step and submits through FormSubmit', async ({ page }) => {
    const bodies = await mockFormSubmit(page, (route) => fulfillJson(route, { success: 'true' }));
    await page.goto('/quote/?destination=Kerala', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('Step 1 of 7')).toBeVisible({ timeout: 30_000 }); // hydrated
    const next = page.getByRole('button', { name: 'Continue' });

    await page.getByRole('button', { name: 'Family' }).click();
    await next.click();
    await expect(page.getByLabel('Destination')).toHaveValue('Kerala');
    await page.getByLabel('Destination').fill('');
    await next.click();
    await expect(page.getByText('Please tell us where you would like to go.')).toBeVisible();
    await page.getByLabel('Destination').fill('Kerala');
    await next.click();

    await page.getByLabel('Start date').fill('2020-01-01');
    await next.click();
    await expect(page.getByText('Travel date cannot be in the past.')).toBeVisible();
    await page.getByLabel('Start date').fill('2099-12-20');
    await page.getByLabel('End date').fill('2099-12-26');
    await next.click();

    await page.getByLabel('Adults').fill('0');
    await next.click();
    await expect(page.getByText('At least one adult must be travelling.')).toBeVisible();
    await page.getByLabel('Adults').fill('2');
    await next.click();

    await page.getByRole('button', { name: '₹50,000 – ₹1,00,000' }).click();
    await next.click();

    await next.click();
    await expect(page.getByText('Please tell us a little about your trip.')).toBeVisible();
    await page.getByLabel('Trip details').fill('Houseboat night and a hill station, vegetarian food.');
    await next.click();

    await page.getByLabel('Name').fill(VALID.name);
    await page.getByLabel('Phone').fill(VALID.phone);
    await page.getByLabel('Email').fill(VALID.email);
    await page.getByRole('button', { name: 'Submit Request' }).click();
    await expect(page.getByText('Please agree to the privacy policy so we can reply to you.').first()).toBeVisible();
    await page.getByRole('checkbox').check();
    await page.waitForTimeout(3200); // past the 3-second bot timer
    await page.getByRole('button', { name: 'Submit Request' }).click();

    await expect(page).toHaveURL(/\/thank-you\/$/);
    expect(bodies).toHaveLength(1);
    expect(bodies[0]).toMatchObject({
      'Form type': 'Trip planner',
      'Trip type': 'Family',
      destination: 'Kerala',
      'Start date': '2099-12-20',
      'End date': '2099-12-26',
      _subject: `New enquiry from ${VALID.name}: Family trip to Kerala`,
      _replyto: VALID.email,
    });
  });
});
