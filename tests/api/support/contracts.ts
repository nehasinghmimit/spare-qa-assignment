import { expect } from "bun:test";
import type { Reply } from "./client";

export function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label}: expected object`);
  return Object.fromEntries(Object.entries(value));
}

export function list(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${label}: expected array`);
  return value;
}

export function string(value: unknown, label: string): string {
  if (typeof value !== "string" || !value.trim())
    throw new Error(`${label}: expected nonempty string`);
  return value;
}

export function success(reply: Reply) {
  expect(reply.status).toBe(200);
  const envelope = object(reply.body, "response");
  if (envelope.errors !== undefined)
    expect(list(envelope.errors, "errors").length).toBe(0);
  return object(envelope.data, "data");
}

export function rejection(reply: Reply, status: 200 | 401) {
  expect(reply.status).toBe(status);
  const envelope = object(reply.body, "response");
  expect(status === 401 ? envelope.data === null : envelope.data == null).toBe(
    true,
  );
  const errors = list(envelope.errors, "errors");
  expect(errors.length).toBeGreaterThan(0);
  return errors.map((e) => object(e, "error entry"));
}

export function identity(value: unknown) {
  const post = object(value, "post");
  return {
    id: string(post.id, "post.id"),
    name: string(post.name, "post.name"),
    slug: string(post.slug, "post.slug"),
  };
}
