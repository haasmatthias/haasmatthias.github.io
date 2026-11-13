(()=>{
 const root=document.documentElement,select=document.querySelector('[aria-label="Color theme"]');let theme='system';
 try{theme=localStorage.getItem('matthias-haas-theme')||'system';}catch{}
 function apply(){if(theme==='system')root.removeAttribute('data-theme');else root.dataset.theme=theme;select.value=theme;}
 apply();select.addEventListener('change',()=>{theme=select.value;apply();try{localStorage.setItem('matthias-haas-theme',theme);}catch{}});
 const scenarios={base:'The plan compares expected income with costs and loan payments, showing what money would remain.',cost:'Higher costs leave less money available for loan payments and investors. The model connects that change to the rest of the plan.',income:'Lower income leaves less cash to cover the same commitments. The model helps a reviewer see where the plan comes under pressure.'};
 document.querySelectorAll('[data-scenario]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.getElementById('scenario-output').textContent=scenarios[button.dataset.scenario];}));
})();
