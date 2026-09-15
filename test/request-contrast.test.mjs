import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../assets/service-request.mjs", import.meta.url), "utf8");

test("request section gets high-contrast neon text treatment", () => {
  assert.match(source, /REQUEST_CONTRAST_STYLES/);
  assert.match(source, /\.request h2/);
  assert.match(source, /\.request-copy > p:not\(\.eyebrow\)/);
  assert.match(source, /\.request-call a/);
  assert.match(source, /text-shadow/);
  assert.match(source, /var\(--neon-text/);
  assert.match(source, /var\(--neon-lime/);
});
