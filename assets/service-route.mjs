export const SERVICE_ROUTE_MARKUP = `
<div class="services-route" aria-label="Helping Hands lawn care services">
  <svg class="route-line" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
    <path class="route-bed" d="M70 185 C 235 70, 390 78, 520 180 S 825 442, 1125 286"></path>
    <path class="route-dash" d="M70 185 C 235 70, 390 78, 520 180 S 825 442, 1125 286"></path>
  </svg>
  <span class="route-contour contour-a" aria-hidden="true"></span>
  <span class="route-contour contour-b" aria-hidden="true"></span>

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
  grid-template-columns:repeat(12,minmax(0,1fr));
  grid-template-rows:repeat(2,minmax(220px,auto));
  gap:1.25rem;
  align-items:stretch;
  isolation:isolate;
  min-height:520px;
  padding:1.25rem 0 .75rem;
}
.services-route::before {
  content:"";
  position:absolute;
  inset:2% -4% 3%;
  z-index:-2;
  pointer-events:none;
  background:
    radial-gradient(ellipse at 14% 34%,rgba(85,246,189,.07),transparent 34%),
    radial-gradient(ellipse at 78% 72%,rgba(217,255,87,.08),transparent 34%),
    repeating-linear-gradient(112deg,rgba(217,255,87,.018) 0 2px,transparent 2px 18px);
  border-radius:42% 58% 44% 56% / 34% 43% 57% 66%;
}
.route-line { position:absolute; inset:0; width:100%; height:100%; z-index:-1; pointer-events:none; overflow:visible; }
.route-bed { fill:none; stroke:rgba(85,246,189,.09); stroke-width:30; stroke-linecap:round; stroke-linejoin:round; filter:drop-shadow(0 0 15px rgba(85,246,189,.08)); }
.route-dash { fill:none; stroke:rgba(217,255,87,.66); stroke-width:3.2; stroke-linecap:round; stroke-dasharray:11 17; animation:service-route-flow 11s linear infinite; filter:drop-shadow(0 0 8px rgba(217,255,87,.34)); }
.route-contour { position:absolute; z-index:-1; pointer-events:none; border:1px solid rgba(85,246,189,.11); border-radius:50%; filter:blur(.2px); }
.contour-a { width:18rem; height:8rem; left:4%; bottom:5%; transform:rotate(-9deg); }
.contour-b { width:21rem; height:9rem; right:2%; top:5%; transform:rotate(8deg); border-color:rgba(217,255,87,.09); }
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
.route-stop::after {
  content:"";
  position:absolute;
  width:16px;
  height:16px;
  border-radius:50%;
  background:var(--neon-lime,#d9ff57);
  border:4px solid var(--night-soft,#071a12);
  box-shadow:0 0 0 4px rgba(217,255,87,.11),0 0 18px rgba(217,255,87,.38);
}
.route-stop:hover { transform:translateY(-7px); border-color:rgba(217,255,87,.58); box-shadow:0 0 0 1px rgba(217,255,87,.14),0 0 28px rgba(217,255,87,.12),0 22px 48px rgba(0,0,0,.34); }
.route-stop:hover::before { transform:scale(1.22); opacity:1; }
.stop-mow { grid-column:1 / span 5; grid-row:1; transform:rotate(-.45deg); }
.stop-edge { grid-column:8 / span 5; grid-row:1; transform:translateY(1.2rem) rotate(.5deg); }
.stop-cleanup { grid-column:2 / span 5; grid-row:2; transform:translateY(-.4rem) rotate(.45deg); }
.stop-recurring { grid-column:7 / span 5; grid-row:2; transform:translateY(1rem) rotate(-.45deg); }
.stop-mow:hover,.stop-edge:hover,.stop-cleanup:hover,.stop-recurring:hover { transform:translateY(-7px) rotate(0deg); }
.stop-mow::after { right:-10px; top:47%; }
.stop-edge::after { left:-10px; top:61%; }
.stop-cleanup::after { right:-10px; top:30%; }
.stop-recurring::after { left:-10px; top:38%; }
.route-stop-top { display:flex; align-items:center; gap:.85rem; }
.route-icon { width:56px; height:56px; flex:0 0 56px; display:grid; place-items:center; border:1px solid rgba(217,255,87,.2); border-radius:1.05rem; background:rgba(217,255,87,.055); box-shadow:inset 0 0 18px rgba(217,255,87,.035),0 0 14px rgba(217,255,87,.055); transition:transform .28s ease,background .28s ease; }
.route-stop:hover .route-icon { transform:translateY(-2px) rotate(-3deg); background:rgba(217,255,87,.09); }
.route-icon svg { width:28px; height:28px; fill:none; stroke:var(--neon-lime,#d9ff57); stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; filter:drop-shadow(0 0 6px rgba(217,255,87,.3)); }
.route-pill { display:inline-flex; align-items:center; margin-left:auto; padding:.38rem .62rem; border:1px solid rgba(85,246,189,.2); border-radius:999px; background:rgba(85,246,189,.055); color:var(--neon-mint,#55f6bd); font-size:.65rem; font-weight:800; letter-spacing:.075em; text-transform:uppercase; }
.route-stop h3 { margin:.15rem 0 0; color:var(--neon-text,#f2f7f3); font-family:"Sora","DM Sans",sans-serif; font-size:clamp(1.35rem,2vw,1.65rem); letter-spacing:-.035em; line-height:1.08; }
.route-stop p { margin:0; max-width:31ch; color:var(--neon-muted,#a7b7ad); font-size:.91rem; }
.route-link { display:inline-flex; align-items:center; gap:.45rem; width:max-content; margin-top:auto; color:var(--neon-lime,#d9ff57); font-size:.82rem; font-weight:800; text-decoration:none; text-shadow:0 0 12px rgba(217,255,87,.2); }
.route-link span { transition:transform .2s ease; }
.route-link:hover span { transform:translateX(4px); }
@keyframes service-route-flow { to { stroke-dashoffset:-112; } }
@media (max-width:980px) {
  .services-route { grid-template-columns:repeat(2,minmax(0,1fr)); grid-template-rows:auto; min-height:0; gap:1rem; }
  .route-line { display:none; }
  .route-contour { opacity:.48; }
  .stop-mow,.stop-edge,.stop-cleanup,.stop-recurring { grid-column:auto; grid-row:auto; transform:none; }
  .route-stop::after { display:none; }
}
@media (max-width:680px) {
  .services-route { grid-template-columns:1fr; padding-top:.25rem; }
  .services-route::before { inset:-1rem -2rem; border-radius:2.5rem; }
  .route-stop { min-height:0; padding:1.15rem 1.05rem 1.2rem; border-radius:1.35rem; }
  .route-icon { width:50px; height:50px; flex-basis:50px; }
  .route-pill { margin-left:0; }
  .route-stop-top { align-items:flex-start; flex-wrap:wrap; }
  .route-stop p { max-width:none; }
  .contour-a { left:-8rem; }
  .contour-b { right:-10rem; }
}
@media (prefers-reduced-motion:reduce) {
  .route-dash { animation:none; }
  .route-stop,.route-icon,.route-link span,.route-stop::before { transition:none; }
  .route-stop:hover,.stop-mow:hover,.stop-edge:hover,.stop-cleanup:hover,.stop-recurring:hover { transform:none; }
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
