export function requiredToken() {
  const token = process.env.PH_API_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "PH_API_TOKEN is required for authenticated API tests. Set it locally or in the CI secret environment.",
    );
  }
  return token;
}

export function apiUrl() {
  let url: URL;
  try {
    url = new URL(
      process.env.PH_API_URL ?? "https://api.producthunt.com/v2/api/graphql",
    );
  } catch {
    throw new Error("PH_API_URL must be an absolute HTTPS URL.");
  }
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("PH_API_URL must use HTTPS without embedded credentials.");
  }
  return url.href;
}
