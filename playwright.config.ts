import { defineConfig, devices } from '@playwright/test';

// Browser tests run against the production build (`npm run build` first).
// FormSubmit is always intercepted — see tests/e2e/fixtures.ts — so no real
// email is ever sent from a test run.
const PORT = Number(process.env.E2E_PORT || 3300);

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  workers: 2,
  timeout: 60_000,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Uses the locally installed Chrome; run `npx playwright install chromium` if it is missing.
    channel: process.env.PW_CHANNEL ?? 'chrome',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chrome', use: { ...devices['Desktop Chrome'], channel: process.env.PW_CHANNEL ?? 'chrome' } }],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/robots.txt`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
