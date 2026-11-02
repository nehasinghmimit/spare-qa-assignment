import { apiUrl, requiredToken } from "./config";

type Auth = "environment" | "omitted" | "invalid";
export type Reply = { status: number; body: unknown };

export async function query(
  queryText: string,
  auth: Auth,
  variables: Record<string, unknown> = {},
): Promise<Reply> {
  const url = apiUrl();
  const headers = new Headers({ "Content-Type": "application/json" });
  if (auth !== "omitted") {
    const token =
      auth === "environment"
        ? requiredToken()
        : "intentionally-invalid-qa-token";
    headers.set("Authorization", `Bearer ${token}`);
  }
  const signal = AbortSignal.timeout(6000);
  let status: number;
  let raw: string;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      signal,
      redirect: "error",
      body: JSON.stringify({ query: queryText, variables }),
    });
    status = response.status;
    raw = await response.text();
  } catch {
    throw new Error(
      signal.aborted
        ? "API request timed out (6 seconds)."
        : "API transport failed before a complete response.",
    );
  }
  try {
    return { status, body: JSON.parse(raw) };
  } catch {
    throw new Error(`HTTP ${status}: expected JSON from the API.`);
  }
}
