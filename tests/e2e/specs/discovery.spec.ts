import { errors, expect, test } from "@playwright/test";
import { listedProducts, listing, productDetail } from "../support/listing";

test("E2E-01 homepage lists a usable public product", async ({ page }) => {
  await listing(page);
});

test("E2E-02 listing opens the corresponding product detail", async ({
  page,
}) => {
  const { product, name } = await productDetail(page);
  expect(
    name,
    "Detail H1 should match the selected listing label; investigate launch/product naming if different",
  ).toBe(product.name);
  await expect(
    page.getByRole("link", { name: "Visit website", exact: true }),
  ).toBeVisible();
});

test("E2E-03 category directory leads to a named collection of products", async ({
  page,
}) => {
  await page.goto("/categories?ref=header_nav");
  await expect(
    page.getByRole("heading", { level: 1, name: "Product Categories" }),
  ).toBeVisible();
  const main = page.getByRole("main");
  const category = main
    .getByRole("link", { name: /\S/ })
    .and(page.locator('a[href^="/categories/"]'))
    .first();
  await expect(category).toBeVisible();
  const name = ((await category.textContent()) ?? "").trim();
  expect(name.length).toBeGreaterThan(0);
  const path = await category.getAttribute("href");
  if (!path) throw new Error("Category needs a destination");
  await category.click();
  await expect(page).toHaveURL(
    (url) => url.pathname === new URL(path, url).pathname,
  );
  await expect(main.getByRole("heading", { level: 1 })).toContainText(name);
  await expect(
    main.getByRole("heading", { name: /top reviewed.+products/i }),
  ).toBeVisible();
  await expect(
    main
      .getByRole("link", { name: /\S/ })
      .and(page.locator('a[href^="/products/"]'))
      .first(),
  ).toBeVisible();
});

test("E2E-07 logged-out comment action opens the sign-up gate", async ({
  page,
}) => {
  const links = await listedProducts(page);
  const paths = new Set<string>();
  const limit = Math.min(3, await links.count());
  for (let index = 0; index < limit; index++) {
    const href = await links.nth(index).getAttribute("href");
    if (!href || !/^\/products\/[^/?#]+/.test(href))
      throw new Error("Invalid candidate product link");
    paths.add(href);
  }
  const login = page.getByRole("button", {
    name: "Login to comment",
    exact: true,
  });
  let eligible = false;
  for (const path of paths) {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    if (
      !response?.ok() ||
      /just a moment|access denied/i.test(await page.title())
    )
      throw new Error(
        `Candidate navigation failed or was challenged (HTTP ${response?.status() ?? "unknown"})`,
      );
    await expect(page).toHaveURL(
      (url) => url.pathname === new URL(path, url).pathname,
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    try {
      await login.waitFor({ state: "visible", timeout: 2500 });
      eligible = true;
      break;
    } catch (error) {
      if (!(error instanceof errors.TimeoutError)) throw error;
    }
  }
  expect(
    eligible,
    `Eligibility prerequisite: no visible comment action on ${paths.size} sampled detail pages within 2.5 seconds each`,
  ).toBe(true);
  await login.click();
  await expect(
    page.getByRole("heading", { name: "Sign up to comment", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /sign in with github/i }),
  ).toBeVisible();
});
