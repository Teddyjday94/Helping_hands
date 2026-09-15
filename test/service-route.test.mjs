import assert from "node:assert/strict";
import test from "node:test";
import {
  SERVICE_ROUTE_MARKUP,
  SERVICE_ROUTE_STYLES,
} from "../assets/service-route.mjs";

test("service section keeps four polished cards without route decoration", () => {
  assert.match(SERVICE_ROUTE_MARKUP, /class="services-route"/);
  assert.match(SERVICE_ROUTE_MARKUP, />Routine mowing</);
  assert.match(SERVICE_ROUTE_MARKUP, />Edge &amp; trim</);
  assert.match(SERVICE_ROUTE_MARKUP, />Yard cleanup</);
  assert.match(SERVICE_ROUTE_MARKUP, />Recurring care</);
  assert.doesNotMatch(SERVICE_ROUTE_MARKUP, /route-line|route-dash|route-contour/);
  assert.doesNotMatch(SERVICE_ROUTE_MARKUP, />0[1-4]</);
});

test("service cards use a clean two by two desktop grid with a single-column mobile fallback", () => {
  assert.match(SERVICE_ROUTE_STYLES, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(SERVICE_ROUTE_STYLES, /@media \(max-width:680px\)[\s\S]*grid-template-columns:1fr/);
  assert.doesNotMatch(SERVICE_ROUTE_STYLES, /stroke-dashoffset|stroke-dasharray|repeating-linear-gradient|repeat\(12/);
});
