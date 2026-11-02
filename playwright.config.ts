import { defineConfig, devices } from "@playwright/test";

const value = process.env.PH_WEB_BASE_URL ?? "https://www.producthunt.com";
let baseURL: URL;
try {
  baseURL = new URL(value);
} catch {
  throw new Error("PH_WEB_BASE_URL must be an absolute HTTP(S) URL.");
}
if (
  !["http:", "https:"].includes(baseURL.protocol) ||
  baseURL.username ||
  baseURL.password
) {
  throw new Error(
    "PH_WEB_BASE_URL must use HTTP(S) without embedded credentials.",
  );
}

export default defineConfig({
  testDir: "./tests/e2e/specs",
  testMatch: "**/*.spec.ts",
  globalSetup: "./tests/e2e/support/access.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: Boolean(process.env.CI),
  timeout: 30000,
  globalTimeout: 300000,
  expect: { timeout: 10000 },
  reporter: "list",
  outputDir: "test-results",
  use: {
    baseURL: baseURL.href,
    headless: true,
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
