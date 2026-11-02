import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium, type FullConfig } from "@playwright/test";

export default async function checkAccess(config: FullConfig) {
  const project = config.projects[0];
  if (!project?.use.baseURL)
    throw new Error("Missing web base URL for access check");
  const use = project.use;
  const browser = await chromium.launch({
    ...use.launchOptions,
    headless: use.headless ?? true,
    ...(use.channel && { channel: use.channel }),
  });
  let status: number | null = null;
  let outcome = "navigation failed";
  try {
    // Match the single Desktop Chrome project, including its viewport and user agent.
    const page = await browser.newPage({
      ...use.contextOptions,
      ...(use.viewport !== undefined && { viewport: use.viewport }),
      ...(use.screen && { screen: use.screen }),
      ...(use.userAgent && { userAgent: use.userAgent }),
      ...(use.deviceScaleFactor !== undefined && {
        deviceScaleFactor: use.deviceScaleFactor,
      }),
      ...(use.isMobile !== undefined && { isMobile: use.isMobile }),
      ...(use.hasTouch !== undefined && { hasTouch: use.hasTouch }),
    });
    const response = await page.goto(project.use.baseURL, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    status = response?.status() ?? null;
    const challenge = /just a moment|access denied/i.test(await page.title());
    if (status === 403 || status === 429 || challenge)
      outcome = "access blocked";
    else if (!response?.ok()) outcome = "unexpected HTTP response";
    else return;
  } catch {
    outcome = "browser context or navigation failed";
  } finally {
    await browser.close();
  }
  const evidence = {
    timestamp: new Date().toISOString(),
    project: project.name,
    browser: browser.version(),
    origin: new URL(project.use.baseURL).origin,
    status,
    outcome,
  };
  await mkdir(project.outputDir, { recursive: true });
  await writeFile(
    join(project.outputDir, "access-preflight.json"),
    JSON.stringify(evidence, null, 2),
  );
  throw new Error(
    `Preflight: ${outcome} (HTTP ${status ?? "unavailable"}); scenarios did not start. See access-preflight.json.`,
  );
}
