import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const motionUrl = new URL("../assets/site-motion.mjs", import.meta.url);
const requestUrl = new URL("../assets/service-request.mjs", import.meta.url);
const motionSource = existsSync(motionUrl) ? readFileSync(motionUrl, "utf8") : "";
const requestSource = readFileSync(requestUrl, "utf8");

test("site motion module wires into the existing service bootstrap", () => {
  assert.match(requestSource, /site-motion\.mjs/);
  assert.match(motionSource, /export const SITE_MOTION_STYLES/);
  assert.match(motionSource, /export function initSiteMotion/);
});

test("motion system includes fresh-cut reveals and staggered service cards", () => {
  assert.match(motionSource, /fresh-cut-sweep/);
  assert.match(motionSource, /\.motion-enter/);
  assert.match(motionSource, /--motion-index/);
  assert.match(motionSource, /\.services-route \.route-stop/);
});

test("service icons get lawn-tool micro animations", () => {
  assert.match(motionSource, /data-service-icon="mower"/);
  assert.match(motionSource, /data-service-icon="trimmer"/);
  assert.match(motionSource, /mower-icon-roll/);
  assert.match(motionSource, /trimmer-head-spin/);
});

test("before-after preview and request glow activate on scroll", () => {
  assert.match(motionSource, /comparison-preview-active/);
  assert.match(motionSource, /dispatchEvent\(new Event\("input"/);
  assert.match(motionSource, /motion-cta-active/);
  assert.match(motionSource, /\.request\.motion-cta-active/);
});

test("motion package respects reduced-motion preferences", () => {
  assert.match(motionSource, /prefers-reduced-motion:reduce/);
  assert.match(motionSource, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
});
