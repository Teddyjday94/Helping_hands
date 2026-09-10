import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

import {
  FORM_ENDPOINT,
  buildServicePayload,
  submitServiceRequest,
} from "../assets/service-request.mjs";

const request = {
  name: "Test Customer",
  phone: "555-0110",
  address: "123 Test Lane",
  service: "Routine mowing",
  notes: "Automated test request",
  _honey: "",
};

test("buildServicePayload maps every service detail and delivery metadata", () => {
  assert.deepEqual(buildServicePayload(request), {
    _subject: "New Helping Hands service request",
    _template: "table",
    name: "Test Customer",
    phone: "555-0110",
    address: "123 Test Lane",
    service: "Routine mowing",
    notes: "Automated test request",
    _honey: "",
  });
});

test("submitServiceRequest posts JSON to the configured FormSubmit inbox", async () => {
  let sent;
  const fetchImpl = async (url, options) => {
    sent = { url, options };
    return { ok: true, json: async () => ({ success: true }) };
  };

  await submitServiceRequest(request, fetchImpl);

  assert.equal(sent.url, FORM_ENDPOINT);
  assert.equal(sent.options.method, "POST");
  assert.equal(sent.options.headers.Accept, "application/json");
  assert.equal(sent.options.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(sent.options.body), buildServicePayload(request));
});

test("submitServiceRequest reports delivery failures", async () => {
  await assert.rejects(
    submitServiceRequest(request, async () => ({ ok: false, json: async () => ({ success: false }) })),
    /could not send/i,
  );
});

test("honeypot submissions do not make a network request", async () => {
  let called = false;
  await submitServiceRequest({ ...request, _honey: "bot" }, async () => {
    called = true;
  });
  assert.equal(called, false);
});

test("the page connects the service form to live delivery", async () => {
  const page = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(page, /action="https:\/\/formsubmit\.co\/thomasdbiz26@gmail\.com"/);
  assert.match(page, /method="POST"/);
  assert.match(page, /name="_honey"/);
  assert.match(page, /initServiceRequestForm/);
  assert.doesNotMatch(page, /Your request is ready to discuss/);
});
