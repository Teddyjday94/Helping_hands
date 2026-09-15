export const SERVICE_ROUTE_MARKUP = `
<div class="services-route" aria-label="Helping Hands lawn care services">
  <article class="route-stop stop-mow">
    <div class="route-stop-top">
      <span class="route-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M4 15h10l-1.4-5H8.3L7 15"></path><circle cx="7" cy="17.4" r="2"></circle><circle cx="16" cy="17.4" r="2"></circle><path d="M13 9l3-3 4 5"></path></svg>
      </span>
      <span class="route-pill">Weekly / bi-weekly</span>
    </div>
    <h3>Routine mowing</h3>
    <p>Keep the grass tidy through the growing season without chasing your own schedule.</p>
    <a class="route-link" href="#request">Request mowing <span aria-hidden="true">→</span></a>
  </article>

  <article class="route-stop stop-edge">
    <div class="route-stop-top">
      <span class="route-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 18h14"></path><path d="M8 16l3.5-8"></path><path d="M11 8l6 6"></path><path d="M16 14l1.5 4"></path><path d="M4 20h7"></path></svg>
      </span>
      <span class="route-pill">Crisp finish</span>
    </div>
    <h3>Edge &amp; trim</h3>
    <p>Clean lines around sidewalks, driveways, beds, trees, and fence lines.</p>
    <a class="route-link" href="#request">Request trimming <span aria-hidden="true">→</span></a>
  </article>

  <article class="route-stop stop-cleanup">
    <div class="route-stop-top">
      <span class="route-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 4c3 2.5 5 4.6 5 7.4A5 5 0 0 1 7 11.4C7 8.6 9 6.5 12 4Z"></path><path d="M12 11v9"></path><path d="M8.5 15c2-.5 4.2-.1 6.5 1.3"></path></svg>
      </span>
      <span class="route-pill">One-time reset</span>
    </div>
    <h3>Yard cleanup</h3>
    <p>Clear leaves, debris, and overgrowth when the yard has gotten away from you.</p>
    <a class="route-link" href="#request">Request cleanup <span aria-hidden="true">→</span></a>
  </article>

  <article class="route-stop stop-recurring">
    <div class="route-stop-top">
      <span class="route-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4"></path><path d="M16 3v4"></path><path d="M4 10h16"></path><path d="M9 14h6"></path><path d="M12 12v6"></path></svg>
      </span>
      <span class="route-pill">Set schedule</span>
    </div>
    <h3>Recurring care</h3>
    <p>Choose a regular route and take lawn day off your list.</p>
    <a class="route-link" href="#request">Ask about a schedule <span aria-hidden="true">→</span></a>
  </article>
</div>`;

export const SERVICE_ROUTE_STYLES = `
.services-route {
  position:relative;
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:1.25rem;
  align-items:stretch;
  padding:1rem 0 .5rem;
}
.route-stop {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:.9rem;
  min-height:220px;
  padding:1.35rem 1.3rem 1.4rem;
  overflow:hidden;
  background:linear-gradient(145deg,rgba(18,56,36,.94),rgba(7,28,19,.97));
  border:1px solid rgba(217,255,87,.24);
  border-radius:1.7rem;
  box-shadow:0 0 0 1px rgba(85,246,189,.04),0 16px 40px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.025);
  transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease;
}
.route-stop::before {
  content:"";
  position:absolute;
  width:9rem;
  height:9rem;
  right:-4rem;
  bottom:-5rem;
  border-radius:50%;
  background:radial-gradient(circle,rgba(217,255,87,.13),transparent 68%);
  opacity:.72;
  transition:transform .35s ease,opacity .35s ease;
}
.route-stop:hover {
  transform:translateY(-7px);
  border-color:rgba(217,255,87,.58);
  box-shadow:0 0 0 1px rgba(217,255,87,.14),0 0 28px rgba(217,255,87,.12),0 22px 48px rgba(0,0,0,.34);
}
.route-stop:hover::before { transform:scale(1.22); opacity:1; }
.route-stop-top { display:flex; align-items:center; gap:.85rem; }
.route-icon {
  width:56px;
  height:56px;
  flex:0 0 56px;
  display:grid;
  place-items:center;
  border:1px solid rgba(217,255,87,.2);
  border-radius:1.05rem;
  background:rgba(217,255,87,.055);
  box-shadow:inset 0 0 18px rgba(217,255,87,.035),0 0 14px rgba(217,255,87,.055);
  transition:transform .28s ease,background .28s ease;
}
.route-stop:hover .route-icon { transform:translateY(-2px) rotate(-3deg); background:rgba(217,255,87,.09); }
.route-icon svg {
  width:28px;
  height:28px;
  fill:none;
  stroke:var(--neon-lime,#d9ff57);
  stroke-width:1.8;
  stroke-linecap:round;
  stroke-linejoin:round;
  filter:drop-shadow(0 0 6px rgba(217,255,87,.3));
}
.route-pill {
  display:inline-flex;
  align-items:center;
  margin-left:auto;
  padding:.38rem .62rem;
  border:1px solid rgba(85,246,189,.2);
  border-radius:999px;
  background:rgba(85,246,189,.055);
  color:var(--neon-mint,#55f6bd);
  font-size:.65rem;
  font-weight:800;
  letter-spacing:.075em;
  text-transform:uppercase;
}
.route-stop h3 {
  margin:.15rem 0 0;
  color:var(--neon-text,#f2f7f3);
  font-family:"Sora","DM Sans",sans-serif;
  font-size:clamp(1.35rem,2vw,1.65rem);
  letter-spacing:-.035em;
  line-height:1.08;
}
.route-stop p { margin:0; max-width:42ch; color:var(--neon-muted,#a7b7ad); font-size:.91rem; }
.route-link {
  display:inline-flex;
  align-items:center;
  gap:.45rem;
  width:max-content;
  margin-top:auto;
  color:var(--neon-lime,#d9ff57);
  font-size:.82rem;
  font-weight:800;
  text-decoration:none;
  text-shadow:0 0 12px rgba(217,255,87,.2);
}
.route-link span { transition:transform .2s ease; }
.route-link:hover span { transform:translateX(4px); }
@media (max-width:680px) {
  .services-route { grid-template-columns:1fr; gap:1rem; padding-top:.25rem; }
  .route-stop { min-height:0; padding:1.15rem 1.05rem 1.2rem; border-radius:1.35rem; }
  .route-icon { width:50px; height:50px; flex-basis:50px; }
  .route-pill { margin-left:0; }
  .route-stop-top { align-items:flex-start; flex-wrap:wrap; }
  .route-stop p { max-width:none; }
}
@media (prefers-reduced-motion:reduce) {
  .route-stop,.route-icon,.route-link span,.route-stop::before { transition:none; }
  .route-stop:hover { transform:none; }
}
`;

export function initServiceRoute(doc = document) {
  const currentGrid = doc.querySelector(".services-grid");
  if (!currentGrid || doc.querySelector(".services-route")) return false;

  const style = doc.createElement("style");
  style.id = "service-route-styles";
  style.textContent = SERVICE_ROUTE_STYLES;
  doc.head.append(style);
  currentGrid.outerHTML = SERVICE_ROUTE_MARKUP;
  return true;
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initServiceRoute(document), { once: true });
  } else {
    initServiceRoute(document);
  }
}
