export const FORM_ENDPOINT = "https://formsubmit.co/ajax/thomasdbiz26@gmail.com";

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
