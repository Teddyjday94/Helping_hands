const ready=(fn)=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
ready(()=>{
  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  toggle?.addEventListener('click',()=>{const open=links?.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(!!open));});
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}));
  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('is-active');});
  document.querySelectorAll('.comparison-range').forEach(input=>{const stage=input.closest('.comparison-stage');const sync=()=>{const value=Number(input.value);stage?.style.setProperty('--reveal',`${value}%`);input.setAttribute('aria-valuetext',`${value} percent after`)};input.addEventListener('input',sync);sync();});
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=String(new Date().getFullYear())});
  const reels=[...document.querySelectorAll('video[data-reel]')];
  if(reels.length&&'IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const rio=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.dataset.userPaused)v.play().catch(()=>{});}else if(!v.paused){v.dataset.autoPaused='1';v.pause();}}),{threshold:.6});reels.forEach(v=>{v.addEventListener('pause',()=>{if(v.dataset.autoPaused)delete v.dataset.autoPaused;else v.dataset.userPaused='1';});v.addEventListener('play',()=>{delete v.dataset.userPaused;});rio.observe(v);});}
  const reveals=[...document.querySelectorAll('.reveal')];
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){reveals.forEach(el=>el.classList.add('is-visible'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(el=>io.observe(el));
});
