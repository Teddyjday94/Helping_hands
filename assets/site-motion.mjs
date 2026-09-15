export const SITE_MOTION_STYLES = `
/* Helping Hands motion layer: polished, lawn-themed, and intentionally restrained. */
.reveal {
  filter:blur(2px);
  transform:translate3d(0,26px,0) scale(.992);
  transition:opacity .7s cubic-bezier(.22,.75,.2,1),transform .7s cubic-bezier(.22,.75,.2,1),filter .62s ease;
}
.reveal.is-visible {
  filter:none;
  transform:translate3d(0,0,0) scale(1);
}
.motion-sweep {
  position:relative;
}
.motion-sweep::after {
  content:"";
  position:absolute;
  inset:0;
  z-index:4;
  pointer-events:none;
  border-radius:inherit;
  background:linear-gradient(108deg,transparent 26%,rgba(85,246,189,.03) 39%,rgba(217,255,87,.18) 50%,rgba(85,246,189,.06) 58%,transparent 72%);
  opacity:0;
  transform:translate3d(-125%,0,0) skewX(-12deg);
  mix-blend-mode:screen;
}
.motion-sweep.is-visible::after,
.motion-sweep.motion-visible::after {
  animation:fresh-cut-sweep .82s cubic-bezier(.2,.75,.22,1) .08s both;
}
@keyframes fresh-cut-sweep {
  0% { opacity:0; transform:translate3d(-125%,0,0) skewX(-12deg); }
  18% { opacity:.8; }
  100% { opacity:0; transform:translate3d(125%,0,0) skewX(-12deg); }
}

.motion-enter {
  opacity:0;
  filter:blur(2px);
  transform:translate3d(0,24px,0) scale(.985);
  transition:opacity .62s cubic-bezier(.22,.75,.2,1),transform .62s cubic-bezier(.22,.75,.2,1),filter .55s ease,border-color .28s ease,box-shadow .28s ease;
  transition-delay:calc(var(--motion-index,0) * 90ms);
}
.motion-enter.motion-visible {
  opacity:1;
  filter:none;
  transform:translate3d(0,0,0) scale(1);
}
.services-route .route-stop.motion-enter:hover {
  transform:translate3d(0,-7px,0) scale(1);
}

/* Lawn-tool micro interactions */
.route-stop:hover svg[data-service-icon="mower"] {
  animation:mower-icon-roll .62s cubic-bezier(.2,.75,.22,1) 1;
}
@keyframes mower-icon-roll {
  0%,100% { transform:translateX(0) rotate(0); }
  38% { transform:translateX(4px) rotate(1deg); }
  70% { transform:translateX(1px) rotate(-.5deg); }
}
.route-stop svg[data-service-icon="trimmer"] .trimmer-head {
  transform-box:fill-box;
  transform-origin:center;
}
.route-stop:hover svg[data-service-icon="trimmer"] .trimmer-head {
  animation:trimmer-head-spin .5s cubic-bezier(.3,.7,.2,1) 1;
}
@keyframes trimmer-head-spin {
  from { transform:rotate(0deg); }
  to { transform:rotate(360deg); }
}
.stop-cleanup:hover .route-icon svg {
  animation:cleanup-leaf-flutter .62s ease-in-out 1;
}
@keyframes cleanup-leaf-flutter {
  0%,100% { transform:rotate(0) translateY(0); }
  35% { transform:rotate(-7deg) translateY(-2px); }
  70% { transform:rotate(5deg) translateY(1px); }
}
.stop-recurring:hover .route-icon svg {
  animation:calendar-check-pulse .58s ease-out 1;
}
@keyframes calendar-check-pulse {
  0%,100% { transform:scale(1); }
  48% { transform:scale(1.09); filter:drop-shadow(0 0 10px rgba(217,255,87,.65)); }
}

/* One-time before/after demonstration when the section first arrives. */
.comparison-preview-active .comparison-divider {
  filter:drop-shadow(0 0 10px rgba(217,255,87,.42));
}
.comparison-preview-active .comparison-divider::after {
  animation:comparison-handle-pulse .9s ease-in-out 1;
}
@keyframes comparison-handle-pulse {
  0%,100% { transform:translate(-50%,-50%) scale(1); }
  45% { transform:translate(-50%,-50%) scale(1.13); box-shadow:0 0 26px rgba(217,255,87,.88); }
}

/* Conversion glow: the final request section brightens as it enters view. */
.request {
  transition:box-shadow .85s ease,background-color .85s ease;
}
.request .request-copy,
.request .form {
  transition:transform .72s cubic-bezier(.22,.75,.2,1),box-shadow .72s ease,border-color .72s ease;
}
.request.motion-cta-active {
  box-shadow:inset 0 42px 100px rgba(85,246,189,.035),inset 0 -35px 120px rgba(217,255,87,.04);
}
.request.motion-cta-active h2 {
  text-shadow:0 0 14px rgba(217,255,87,.4),0 0 38px rgba(85,246,189,.18);
}
.request.motion-cta-active .request-call a {
  text-shadow:0 0 10px rgba(217,255,87,.78),0 0 30px rgba(217,255,87,.38);
}
.request.motion-cta-active .form {
  border-color:rgba(217,255,87,.52);
  box-shadow:0 0 0 1px rgba(217,255,87,.14),0 0 34px rgba(217,255,87,.16),0 24px 58px rgba(0,0,0,.34);
  transform:translateY(-4px);
}

@media (max-width:680px) {
  .motion-enter { transition-delay:calc(var(--motion-index,0) * 65ms); }
  .request.motion-cta-active .form { transform:translateY(-2px); }
}
@media (prefers-reduced-motion:reduce) {
  .reveal,.motion-enter,.request,.request .request-copy,.request .form {
    filter:none !important;
    opacity:1 !important;
    transform:none !important;
    transition:none !important;
  }
  .motion-sweep::after { display:none !important; animation:none !important; }
  .route-stop:hover svg[data-service-icon="mower"],
  .route-stop:hover svg[data-service-icon="trimmer"] .trimmer-head,
  .stop-cleanup:hover .route-icon svg,
  .stop-recurring:hover .route-icon svg,
  .comparison-preview-active .comparison-divider::after {
    animation:none !important;
  }
}
`;

function addMotionStyles(doc) {
  if (!doc?.head || doc.getElementById?.("site-motion-styles")) return;
  const style = doc.createElement("style");
  style.id = "site-motion-styles";
  style.textContent = SITE_MOTION_STYLES;
  doc.head.append(style);
}

function setRangeValue(input, value) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  input.value = String(clamped);
  input.dispatchEvent(new Event("input", { bubbles:true }));
}

export function previewComparison(stage, win = window) {
  const input = stage?.querySelector?.(".comparison-range");
  if (!input || stage.dataset.motionPreviewed === "true") return false;
  stage.dataset.motionPreviewed = "true";

  const card = stage.closest?.(".comparison");
  const finish = Number(input.value) || 58;
  const start = Math.min(36, Math.max(28, finish - 22));
  const duration = 920;
  let startedAt = null;

  setRangeValue(input, start);
  card?.classList.add("comparison-preview-active");

  const render = (now) => {
    if (startedAt === null) startedAt = now;
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    setRangeValue(input, start + (finish - start) * eased);
    if (progress < 1) {
      win.requestAnimationFrame(render);
    } else {
      win.setTimeout?.(() => card?.classList.remove("comparison-preview-active"), 260);
    }
  };

  win.requestAnimationFrame(render);
  return true;
}

export function initSiteMotion(doc = document, win = window) {
  if (!doc?.querySelectorAll || !doc?.head) return false;
  addMotionStyles(doc);

  const reducedMotion = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sweepTargets = doc.querySelectorAll(".section-intro.reveal,.request-copy.reveal");
  sweepTargets.forEach((item) => item.classList.add("motion-sweep"));

  const serviceCards = [...doc.querySelectorAll(".services-route .route-stop")];
  serviceCards.forEach((card, index) => {
    card.classList.add("motion-enter", "motion-sweep");
    card.style.setProperty("--motion-index", String(index));
  });

  if (reducedMotion || !("IntersectionObserver" in win)) {
    serviceCards.forEach((card) => card.classList.add("motion-visible"));
    return true;
  }

  if (serviceCards.length) {
    const cardObserver = new win.IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("motion-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold:.16, rootMargin:"0px 0px -5% 0px" });
    serviceCards.forEach((card) => cardObserver.observe(card));
  }

  const transformations = doc.querySelector(".transformations");
  if (transformations) {
    const comparisonObserver = new win.IntersectionObserver((entries, observer) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      doc.querySelectorAll(".comparison-stage").forEach((stage, index) => {
        win.setTimeout(() => previewComparison(stage, win), index * 160);
      });
      observer.disconnect();
    }, { threshold:.3 });
    comparisonObserver.observe(transformations);
  }

  const request = doc.querySelector(".request");
  if (request) {
    const requestObserver = new win.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        request.classList.toggle("motion-cta-active", entry.isIntersecting && entry.intersectionRatio >= .16);
      });
    }, { threshold:[.16,.3,.55] });
    requestObserver.observe(request);
  }

  return true;
}

function bootSiteMotion() {
  initSiteMotion(document, window);
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootSiteMotion, { once:true });
  } else {
    bootSiteMotion();
  }
}
