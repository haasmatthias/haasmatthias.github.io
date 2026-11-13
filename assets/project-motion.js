(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduce.matches;
 const toggle=document.querySelector('.motion-toggle');
 function sync(){document.documentElement.classList.toggle('projects-paused',paused);if(toggle){toggle.textContent=paused?'Play project animations':'Pause project animations';toggle.setAttribute('aria-pressed',String(!paused));}}
 if(toggle)toggle.addEventListener('click',()=>{paused=!paused;sync();});reduce.addEventListener('change',()=>{paused=reduce.matches;sync();});sync();
 const demos=[...document.querySelectorAll('.jarvis-demo')].map(el=>({el,step:0,mode:'read',visible:false}));
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{e.target.classList.toggle('motion-visible',e.isIntersecting);const demo=demos.find(d=>d.el===e.target);if(demo)demo.visible=e.isIntersecting;}),{threshold:.2});
 document.querySelectorAll('.visual,.jarvis-demo').forEach(el=>observer.observe(el));
 function show(d){
  const texts=d.mode==='read'?['You ask: “Read this file.”','The request goes to the file helper.','Permission is checked before the tool runs.','If reading is permitted, the helper returns the contents.']:['You ask: “Delete this folder.”','The request goes to the file helper.','Deleting is outside this helper’s permissions.','Blocked. The folder is not deleted.'];
  d.el.querySelectorAll('.j-step').forEach((n,i)=>n.classList.toggle('current',i===d.step));d.el.querySelector('.j-status').textContent=texts[d.step];d.el.classList.toggle('is-blocked',d.mode==='delete'&&d.step>=2);
 }
 demos.forEach(d=>{show(d);d.el.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>{d.mode=b.dataset.demo;d.step=0;d.el.querySelectorAll('[data-demo]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));show(d);}));d.el.querySelector('.j-next').addEventListener('click',()=>{d.step=(d.step+1)%4;show(d);});});
 setInterval(()=>{if(paused||document.hidden)return;demos.forEach(d=>{if(d.visible){d.step=(d.step+1)%4;show(d);}});},2400);
})();
