import { expect, test } from "bun:test";
import { query } from "../support/client";
import { object, rejection, string } from "../support/contracts";

async function expectOAuthRejection(auth: "omitted" | "invalid") {
  const reply = await query("{ posts(first:1) { nodes { id } } }", auth);
  const errors = rejection(reply, 401);
  expect(
    errors.some(
      (e) =>
        e.error === "invalid_oauth_token" &&
        typeof e.error_description === "string" &&
        e.error_description.trim().length > 0,
    ),
    "OAuth rejection code and description",
  ).toBe(true);
}

test("API-TEST-04 omitted credentials are rejected", async () => {
  await expectOAuthRejection("omitted");
});
test("API-TEST-05 deliberately invalid credentials are rejected", async () => {
  await expectOAuthRejection("invalid");
});

test("API-TEST-06 unknown Post field produces a GraphQL validation error", async () => {
  const errors = rejection(
    await query(
      "{ posts(first:1) { nodes { id qaNonexistentField } } }",
      "environment",
    ),
    200,
  );
  expect(
    errors.some((e) => {
      if (
        !e.extensions ||
        typeof e.extensions !== "object" ||
        Array.isArray(e.extensions) ||
        typeof e.message !== "string"
      )
        return false;
      const ext = object(e.extensions, "field error extensions");
      return (
        e.message.includes("qaNonexistentField") &&
        ext.code === "undefinedField" &&
        ext.typeName === "Post" &&
        ext.fieldName === "qaNonexistentField"
      );
    }),
    "Expected undefinedField for Post.qaNonexistentField",
  ).toBe(true);
});

test("API-TEST-07 an invalid Int variable is rejected before data access", async () => {
  const errors = rejection(
    await query(
      "query($count:Int!) { posts(first:$count) { nodes { id } } }",
      "environment",
      { count: "not-an-integer" },
    ),
    200,
  );
  expect(
    errors.some((e) => {
      const message = string(e.message, "variable error message");
      return (
        message.includes("$count") &&
        message.includes("Int!") &&
        /invalid|coerc/i.test(message)
      );
    }),
    "Expected invalid Int! value for $count",
  ).toBe(true);
});
