import { expect, type Page } from "@playwright/test";

export async function listedProducts(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", {
      name: "Top Products Launching Today",
      exact: true,
    }),
  ).toBeVisible();
  const links = page
    .getByRole("link", { name: /^\d+\.\s+\S/ })
    .and(page.locator('a[href^="/products/"]'));
  await expect(links.first()).toBeVisible();
  return links;
}

export async function listing(page: Page) {
  const link = (await listedProducts(page)).first();
  await expect(link).toBeVisible();
  const href = await link.getAttribute("href");
  if (!href || !/^\/products\/[^/?#]+/.test(href))
    throw new Error("Listing needs a usable public product link");
  const name = ((await link.textContent()) ?? "")
    .replace(/^\s*\d+\.\s*/, "")
    .trim();
  expect(name.length).toBeGreaterThan(0);
  return { link, name, path: new URL(href, page.url()).pathname };
}

export async function productDetail(page: Page) {
  const product = await listing(page);
  await product.link.click();
  await expect(page).toHaveURL((url) => url.pathname === product.path);
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();
  const name = ((await heading.textContent()) ?? "").trim();
  expect(name.length).toBeGreaterThan(0);
  return { product, name };
}
