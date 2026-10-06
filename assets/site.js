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
  document.querySelectorAll('.comparison-range').forEach(input=>{const stage=input.closest('.comparison-stage');const touch=()=>stage?.classList.add('is-touched');input.addEventListener('input',touch,{once:true});input.addEventListener('pointerdown',touch,{once:true});});
  const figures=[...document.querySelectorAll('.work-gallery figure')];
  if(figures.length&&typeof HTMLDialogElement==='function'){
    const box=document.createElement('dialog');box.className='lightbox';box.setAttribute('aria-label','Photo viewer');
    box.innerHTML='<figure><img alt=""><figcaption><strong></strong><span></span></figcaption></figure><button class="lightbox-btn lightbox-close" type="button" aria-label="Close photo">×</button><button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous photo">‹</button><button class="lightbox-btn lightbox-next" type="button" aria-label="Next photo">›</button>';
    document.body.append(box);
    const img=box.querySelector('img'),title=box.querySelector('figcaption strong'),count=box.querySelector('figcaption span');let index=0,opener=null;
    const show=i=>{index=(i+figures.length)%figures.length;const src=figures[index].querySelector('img');img.src=src.currentSrc||src.src;img.alt=src.alt;title.textContent=figures[index].querySelector('figcaption')?.textContent||'';count.textContent=`${index+1} / ${figures.length}`;};
    const open=i=>{opener=document.activeElement;show(i);box.showModal();};
    figures.forEach((fig,i)=>{fig.tabIndex=0;fig.setAttribute('role','button');fig.setAttribute('aria-label',`View larger: ${fig.querySelector('img')?.alt||'photo'}`);fig.addEventListener('click',()=>open(i));fig.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i);}});});
    box.querySelector('.lightbox-close').addEventListener('click',()=>box.close());
    box.querySelector('.lightbox-prev').addEventListener('click',()=>show(index-1));
    box.querySelector('.lightbox-next').addEventListener('click',()=>show(index+1));
    box.addEventListener('click',e=>{if(e.target===box)box.close();});
    box.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);});
    box.addEventListener('close',()=>opener?.focus?.());
    let startX=null;img.addEventListener('pointerdown',e=>{startX=e.clientX;});img.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;startX=null;if(Math.abs(dx)>40)show(index+(dx<0?1:-1));});
  }
  const reveals=[...document.querySelectorAll('.reveal')];
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){reveals.forEach(el=>el.classList.add('is-visible'));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(el=>io.observe(el));
});
