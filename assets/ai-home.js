if(document.querySelector('#replay-brief')){let replayTimers=[];const replayButton=document.querySelector('#replay-brief');const statusLine=document.querySelector('#replay-status');function stopReplay(){replayTimers.forEach(clearTimeout);replayTimers=[];document.querySelectorAll('[data-source]').forEach(el=>el.classList.remove('reading'));replayButton.disabled=false;}replayButton.addEventListener('click',()=>{stopReplay();if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('projects-paused')){statusLine.textContent='Recorded analysis complete. Findings shown below.';return;}replayButton.disabled=true;['Reading the example workbook.','Tracing external links and formula dependencies.','Checking saved results and recording cell references.','Analysis complete. The workbook was not changed.'].forEach((text,i)=>replayTimers.push(setTimeout(()=>{statusLine.textContent=text;document.querySelectorAll('[data-source]').forEach((el,n)=>el.classList.toggle('reading',n===i));if(i===3)replayButton.disabled=false;},i*1050)));});document.querySelector('.motion-toggle').addEventListener('click',()=>{stopReplay();statusLine.textContent='Animation paused. Recorded findings remain visible.';});}
const introDialog=document.querySelector('.intro-dialog');const introVideo=introDialog.querySelector('video');document.querySelectorAll('.intro-open').forEach(b=>b.addEventListener('click',()=>{introDialog.showModal();introVideo.play().catch(()=>{});}));introDialog.querySelector('.intro-close').addEventListener('click',()=>introDialog.close());introDialog.addEventListener('close',()=>introVideo.pause());introDialog.addEventListener('click',e=>{if(e.target===introDialog)introDialog.close();});

(()=>{const root=document.querySelector('.team-motion');if(!root)return;
const D=[
{ask:'Can this project carry its debt?',steps:['Project assumptions: costs, prices, financing','One linked model set: debt service, DSCR tests, four scenarios','A case lenders and investors can follow'],out:'Change one assumption and see what is left for lenders and investors, with every figure linked to its source.',proof:'Atremeta financial model',href:'atremeta.html'},
{ask:'Is this budget model safe to present?',steps:['Your budget workbook','AI traces links, formula loops and missing results','The exact cells to review'],out:'Before the management meeting, a short list of what to check. A person still signs off.',proof:'JARVIS',href:'jarvis.html'},
{ask:'Which investors actually fit this round?',steps:['Your criteria: ticket size, mandate, stage','AI screens candidates, every fact with a source','A shortlist you can defend'],out:'Reasons for and against every name, plus what is still unknown, before anyone reaches out.',proof:'Investor Finder',href:'investor-screening.html'}];
const tabs=[...root.querySelectorAll('[data-tm]')],ask=root.querySelector('.tm-asktext'),stepEls=[...root.querySelectorAll('.tm-step')],res=root.querySelector('.tm-result'),out=root.querySelector('.tm-out'),proof=root.querySelector('.tm-proof'),proofName=proof.querySelector('b'),dot=root.querySelector('.tm-dot'),bar=root.querySelector('.tm-progress i');
let cur=0,timers=[],anims=[],auto=true,visible=false;
const paused=()=>document.documentElement.classList.contains('projects-paused');
const at=(ms,fn)=>timers.push(setTimeout(fn,ms));
function clear(){timers.forEach(clearTimeout);timers=[];anims.forEach(a=>a.cancel());anims=[];dot.style.opacity=0;}
function show(i,animate){clear();cur=i;const d=D[i];
tabs.forEach((t,n)=>{t.setAttribute('aria-selected',String(n===i));t.tabIndex=n===i?0:-1;});
stepEls.forEach((s,n)=>s.querySelector('strong').textContent=d.steps[n]);out.textContent=d.out;proofName.textContent=d.proof;proof.href=d.href;
if(!animate){ask.textContent=d.ask;stepEls.forEach(s=>s.classList.add('on'));res.classList.add('on');return;}
stepEls.forEach(s=>s.classList.remove('on'));res.classList.remove('on');
const v=matchMedia('(max-width:760px)').matches,chars=[...d.ask];
if(v){ask.textContent=d.ask;}else{ask.textContent='';chars.forEach((c,n)=>at(n*30,()=>{ask.textContent+=c;}));}
const t0=(v?0:chars.length*30)+250;
at(t0,()=>{dot.style.opacity=1;});
anims.push(dot.animate(v?[{top:'0%'},{top:'calc(100% - 12px)'}]:[{left:'0%'},{left:'calc(100% - 12px)'}],{duration:2300,delay:t0,fill:'both',easing:'cubic-bezier(.5,0,.3,1)'}));
stepEls.forEach((s,n)=>at(t0+n*1000,()=>s.classList.add('on')));
at(t0+2800,()=>{res.classList.add('on');dot.style.opacity=0;});
if(auto){const total=t0+7200;anims.push(bar.animate([{width:'0%'},{width:'100%'}],{duration:total,fill:'forwards'}));at(total,()=>{if(auto&&visible&&!paused())show((cur+1)%D.length,true);});}}
tabs.forEach((t,n)=>{t.addEventListener('click',()=>{auto=false;show(n,!paused());});
t.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(!k)return;e.preventDefault();const m=(n+k+tabs.length)%tabs.length;tabs[m].focus();auto=false;show(m,!paused());});});
new IntersectionObserver(es=>es.forEach(e=>{const was=visible;visible=e.isIntersecting;if(visible&&!was&&!paused())show(cur,true);if(!visible&&was)show(cur,false);}),{threshold:.35}).observe(root);
new MutationObserver(()=>{if(paused())show(cur,false);else if(visible)show(cur,true);}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
show(0,false);})();
