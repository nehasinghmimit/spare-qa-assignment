import { expect, test } from "bun:test";
import { query } from "../support/client";
import { identity, list, object, string, success } from "../support/contracts";

async function posts(first: 1 | 2) {
  const data = success(
    await query(
      "query($first:Int!) { posts(first:$first) { nodes { id name slug } pageInfo { hasNextPage } } }",
      "environment",
      { first },
    ),
  );
  const connection = object(data.posts, "posts");
  expect(typeof object(connection.pageInfo, "pageInfo").hasNextPage).toBe(
    "boolean",
  );
  const nodes = list(connection.nodes, "posts.nodes");
  expect(nodes.length, "Prerequisite: public posts available").toBeGreaterThan(
    0,
  );
  expect(nodes.length).toBeLessThanOrEqual(first);
  return nodes.map(identity);
}

test("API-TEST-01 public collection provides bounded, usable identities", async () => {
  await posts(2);
});

test("API-TEST-02 detail agrees with independently discovered identity", async () => {
  const [sample] = await posts(1);
  if (!sample) throw new Error("No record to look up");
  const data = success(
    await query(
      "query($id:ID!) { post(id:$id) { id name slug } }",
      "environment",
      { id: sample.id },
    ),
  );
  const detail = identity(data.post);
  for (const key of ["id", "name", "slug"] as const) {
    expect(
      detail[key],
      `Collection/detail ${key} mismatch; investigate possible live update`,
    ).toBe(sample[key]);
  }
});

async function page(after: string | null) {
  const data = success(
    await query(
      `query($after:String) {
    posts(first:2, order:NEWEST, postedAfter:"2026-10-01T00:00:00Z", postedBefore:"2026-10-08T00:00:00Z", after:$after) {
      edges { cursor node { id } } pageInfo { startCursor endCursor hasNextPage }
    }
  }`,
      "environment",
      { after },
    ),
  );
  const connection = object(data.posts, "posts");
  const edges = list(connection.edges, "posts.edges");
  expect(
    edges.length,
    "Historical window prerequisite: expected a nonempty page",
  ).toBeGreaterThan(0);
  expect(edges.length).toBeLessThanOrEqual(2);
  const cursors = edges.map((value) => {
    const edge = object(value, "edge");
    string(object(edge.node, "edge.node").id, "edge.node.id");
    return string(edge.cursor, "edge.cursor");
  });
  const info = object(connection.pageInfo, "pageInfo");
  const end = string(info.endCursor, "pageInfo.endCursor");
  expect(
    string(info.startCursor, "pageInfo.startCursor") === cursors[0],
    "start cursor matches first edge",
  ).toBe(true);
  expect(end === cursors.at(-1), "end cursor matches last edge").toBe(true);
  expect(typeof info.hasNextPage).toBe("boolean");
  return { end, hasNextPage: info.hasNextPage };
}

test("API-TEST-03 historical cursor yields a coherent continuation", async () => {
  const first = await page(null);
  expect(
    first.hasNextPage,
    "Historical window prerequisite: a second page is required",
  ).toBe(true);
  const second = await page(first.end);
  expect(second.end !== first.end, "Continuation cursor must advance").toBe(
    true,
  );
});
