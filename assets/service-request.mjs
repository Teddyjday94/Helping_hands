export { SERVICE_ROUTE_MARKUP, SERVICE_ROUTE_STYLES, initServiceRoute } from "./service-route.mjs";
import "./service-route.mjs";

export const FORM_ENDPOINT = "https://formsubmit.co/ajax/thomasdbiz26@gmail.com";

export const REQUEST_CONTRAST_STYLES = `
.request .eyebrow {
  color:var(--neon-lime,#d9ff57);
  text-shadow:0 0 8px rgba(217,255,87,.45),0 0 20px rgba(217,255,87,.24);
}
.request .eyebrow::before {
  background:var(--neon-lime,#d9ff57);
  box-shadow:0 0 7px rgba(217,255,87,.85),0 0 18px rgba(217,255,87,.46);
}
.request h2 {
  color:var(--neon-text,#f6f9ed);
  text-shadow:0 0 12px rgba(217,255,87,.3),0 0 30px rgba(85,246,189,.15);
}
.request-copy > p:not(.eyebrow) {
  color:#e3eee7;
  text-shadow:0 0 12px rgba(85,246,189,.12);
}
.request-call {
  border-color:rgba(217,255,87,.3);
}
.request-call small {
  color:var(--neon-text,#f6f9ed);
  text-shadow:0 0 10px rgba(217,255,87,.16);
}
.request-call a {
  color:var(--neon-lime,#d9ff57);
  text-shadow:0 0 8px rgba(217,255,87,.6),0 0 22px rgba(217,255,87,.3);
}
.request .form-message {
  color:var(--neon-mint,#55f6bd);
  text-shadow:0 0 10px rgba(85,246,189,.28);
}
`;

export function applyRequestContrast(doc = document) {
  if (!doc?.head || doc.getElementById?.("request-contrast-styles")) return;
  const style = doc.createElement("style");
  style.id = "request-contrast-styles";
  style.textContent = REQUEST_CONTRAST_STYLES;
  doc.head.append(style);
}

function applyComparisonTitleContrast(doc = document) {
  doc.querySelectorAll(".comparison-copy h3").forEach((heading) => {
    heading.style.setProperty("color", "var(--ink, #09251a)", "important");
  });
}

function applyPageContrastFixes(doc = document) {
  applyComparisonTitleContrast(doc);
  applyRequestContrast(doc);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyPageContrastFixes(document), { once: true });
  } else {
    applyPageContrastFixes(document);
  }
}

export function buildServicePayload(values) {
  return {
    _subject: "New Helping Hands service request",
    _template: "table",
    name: values.name,
    phone: values.phone,
    address: values.address,
    service: values.service,
    notes: values.notes,
    _honey: values._honey,
  };
}

export async function submitServiceRequest(values, fetchImpl = fetch) {
  if (values._honey) return { success: true };

  const response = await fetchImpl(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildServicePayload(values)),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false || result.success === "false") {
    throw new Error("We could not send your request. Please try again.");
  }

  return result;
}

export function initServiceRequestForm(form) {
  if (!form) return;

  const message = form.querySelector("#form-message");
  const button = form.querySelector('button[type="submit"]');
  const defaultLabel = button?.textContent ?? "Send my request";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    button.textContent = "Sending…";
    message.classList.remove("is-error");
    message.textContent = "Sending your request…";

    try {
      await submitServiceRequest(values);
      form.reset();
      message.textContent = "Thanks! Your request was sent. Helping Hands will follow up soon.";
    } catch (error) {
      message.classList.add("is-error");
      message.textContent = error instanceof Error
        ? error.message
        : "We could not send your request. Please try again.";
    } finally {
      button.disabled = false;
      button.textContent = defaultLabel;
    }
  });
}
