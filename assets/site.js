const ready=(fn)=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
ready(()=>{
  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  toggle?.addEventListener('click',()=>{const open=links?.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(!!open));});
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}));
  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('is-active');});
  document.querySelectorAll('.comparison-range').forEach(input=>{const stage=input.closest('.comparison-stage');const sync=()=>{const value=Number(input.value);stage?.style.setProperty('--reveal',`${value}%`);input.setAttribute('aria-valuetext',`${value} percent after`)};input.addEventListener('input',sync);sync();});
  const reveals=[...document.querySelectorAll('.reveal')];
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){reveals.forEach(el=>el.classList.add('is-visible'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(el=>io.observe(el));
});
