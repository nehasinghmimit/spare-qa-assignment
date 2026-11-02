import { expect, type Page, test } from "@playwright/test";
import { productDetail } from "../support/listing";

async function openSearch(page: Page) {
  // The keyboard shortcut appears in the placeholder once the entry point is interactive.
  await page.getByPlaceholder(/^Search \(/).click();
  const panel = page.locator('[data-test="spotlight-search"]');
  const input = panel.getByPlaceholder(
    /Search for products, launches, or people/,
  );
  await expect(input).toBeVisible();
  return { input, panel };
}

async function emptySearch(search: Awaited<ReturnType<typeof openSearch>>) {
  const query = `qa-no-match-${crypto.randomUUID()}`;
  await search.input.fill(query);
  const message = search.panel.getByText(`No results found for "${query}"`, {
    exact: true,
  });
  await expect(message).toBeVisible();
  await expect(search.panel.locator('a[href^="/products/"]')).toHaveCount(0);
  return message;
}

async function matchingResult(
  search: Awaited<ReturnType<typeof openSearch>>,
  name: string,
  path: string,
) {
  await search.input.fill(name);
  // Search links may include a launch query on the product's detail path.
  const hrefs = [path, new URL(path, search.panel.page().url()).href];
  const destinations = hrefs.flatMap((href) => [
    `a[href=${JSON.stringify(href)}]`,
    `a[href^=${JSON.stringify(`${href}?`)}]`,
    `a[href^=${JSON.stringify(`${href}#`)}]`,
  ]);
  const link = search.panel
    .getByRole("link", { name, exact: true })
    .and(search.panel.locator(destinations.join(", ")));
  await expect(
    link,
    "Expected one result with this name and product path",
  ).toHaveCount(1);
  await expect(link).toBeVisible();
  return link;
}

test("E2E-04 matching search result opens the discovered product", async ({
  page,
}) => {
  const { product, name } = await productDetail(page);
  await page.goto("/");
  const search = await openSearch(page);
  const result = await matchingResult(search, name, product.path);
  const href = await result.getAttribute("href");
  if (!href) throw new Error("Search result needs a destination");
  const destination = new URL(href, page.url()).href;
  await result.click();
  await expect(page).toHaveURL(destination);
  await expect(
    page.getByRole("heading", { level: 1, name, exact: true }),
  ).toBeVisible();
});

test("E2E-05 absent query displays an explicit empty state", async ({
  page,
}) => {
  await page.goto("/");
  await emptySearch(await openSearch(page));
});

test("E2E-06 search recovers when a matching query replaces an absent one", async ({
  page,
}) => {
  const { product, name } = await productDetail(page);
  await page.goto("/");
  const search = await openSearch(page);
  const message = await emptySearch(search);
  await matchingResult(search, name, product.path);
  await expect(message).toBeHidden();
});
