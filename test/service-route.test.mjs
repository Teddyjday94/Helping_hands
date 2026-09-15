import assert from "node:assert/strict";
import test from "node:test";
import {
  SERVICE_ROUTE_MARKUP,
  SERVICE_ROUTE_STYLES,
} from "../assets/service-request.mjs";

test("service route replaces numbered cards with four lawn-care stops", () => {
  assert.match(SERVICE_ROUTE_MARKUP, /class="services-route"/);
  assert.match(SERVICE_ROUTE_MARKUP, />Routine mowing</);
  assert.match(SERVICE_ROUTE_MARKUP, />Edge &amp; trim</);
  assert.match(SERVICE_ROUTE_MARKUP, />Yard cleanup</);
  assert.match(SERVICE_ROUTE_MARKUP, />Recurring care</);
  assert.doesNotMatch(SERVICE_ROUTE_MARKUP, />0[1-4]</);
  assert.doesNotMatch(SERVICE_ROUTE_MARKUP, /route-stop[^\"]*reveal/);
});

test("service route includes an organic path and motion-safe responsive styling", () => {
  assert.match(SERVICE_ROUTE_MARKUP, /route-line/);
  assert.match(SERVICE_ROUTE_MARKUP, /route-dash/);
  assert.match(SERVICE_ROUTE_STYLES, /stroke-dashoffset/);
  assert.match(SERVICE_ROUTE_STYLES, /prefers-reduced-motion/);
  assert.match(SERVICE_ROUTE_STYLES, /@media \(max-width:680px\)/);
  assert.match(SERVICE_ROUTE_STYLES, /radial-gradient/);
});
