const {chromium}=require('C:/Projetos/fisio-jessica-redesign/node_modules/playwright');
(async()=>{let b;for(const ch of ['msedge','chrome']){try{b=await chromium.launch({channel:ch});break}catch(e){}}
const pages=['/','/sobre-mim/','/atuacao/','/psicologia-infantil/','/fotos/','/entrevista/','/blog/','/contato/','/single-post/terapia-aba-em-fortaleza/','/single-post/10-formas-para-diminuir-a-ansiedade/'];
const out={contrast:{},targets:{},headings:[],misc:[]};
for(const w of [1440,390]){
 const ctx=await b.newContext({viewport:{width:w,height:900}});
 for(const u of pages){
  const pg=await ctx.newPage();await pg.goto('http://localhost:4791'+u,{waitUntil:'load'});
  await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}});await pg.waitForTimeout(700);
  await pg.addStyleTag({content:'.js .cai{opacity:1!important;transition:none!important}'});
  const r=await pg.evaluate(()=>{
   const parse=c=>{const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return null;const p=m[1].split(/[ ,\/]+/).map(Number);return {r:p[0],g:p[1],b:p[2],a:p[3]===undefined?1:p[3]}};
   const lum=({r,g,b})=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(r)+.7152*f(g)+.0722*f(b)};
   const bgOf=el=>{let layers=[];for(let e=el;e;e=e.parentElement){const c=parse(getComputedStyle(e).backgroundColor);if(c&&c.a>0){layers.push(c);if(c.a>=1)break}}
     let base={r:255,g:255,b:255,a:1};for(let i=layers.length-1;i>=0;i--){const c=layers[i];base={r:c.r*c.a+base.r*(1-c.a),g:c.g*c.a+base.g*(1-c.a),b:c.b*c.a+base.b*(1-c.a),a:1}}return base};
   const issues=[];const seen=new Set();
   const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
   while(walker.nextNode()){const n=walker.currentNode;if(!n.textContent.trim())continue;const el=n.parentElement;if(!el||seen.has(el))continue;seen.add(el);
    const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none'||el.closest('[aria-hidden="true"],script,style,.sr-only'))continue;
    const rect=el.getBoundingClientRect();if(rect.width===0||rect.height===0)continue;
    const fg=parse(cs.color);const bg=bgOf(el);if(!fg)continue;
    const op=parseFloat(cs.opacity);const f2={r:fg.r*fg.a*op+bg.r*(1-fg.a*op),g:fg.g*fg.a*op+bg.g*(1-fg.a*op),b:fg.b*fg.a*op+bg.b*(1-fg.a*op)};
    const L1=lum(f2),L2=lum(bg);const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
    const size=parseFloat(cs.fontSize),bold=parseInt(cs.fontWeight)>=700;const large=size>=24||(size>=18.66&&bold);
    const need=large?3:4.5;if(ratio<need)issues.push([el.tagName.toLowerCase()+'.'+(el.className||'').toString().split(' ')[0],n.textContent.trim().slice(0,30),ratio.toFixed(2),need]);}
   const targets=[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&getComputedStyle(e).visibility!=='hidden'}).map(e=>{const r=e.getBoundingClientRect();const inline=!!e.closest('p,li,address,dd')&&e.tagName==='A'&&!e.classList.contains('btn');return {t:e.tagName+':'+(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,24),w:Math.round(r.width),h:Math.round(r.height),inline}}).filter(x=>(x.w<44||x.h<44)&&!x.inline);
   const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);let skip=null;for(let i=1;i<hs.length;i++)if(hs[i]-hs[i-1]>1)skip=hs.slice(Math.max(0,i-1),i+1).join('>');
   const landmarks={main:document.querySelectorAll('main').length,header:document.querySelectorAll('header').length,footer:document.querySelectorAll('footer').length,nav:document.querySelectorAll('nav').length};
   const lowLabel=[...document.querySelectorAll('input,select,textarea')].filter(i=>!i.id||!document.querySelector('label[for="'+i.id+'"]')).length;
   return {issues,targets,skip,landmarks,lowLabel,h1:document.querySelectorAll('h1').length}});
  const key=w+' '+u;
  if(r.issues.length)out.contrast[key]=r.issues;
  if(r.targets.length)out.targets[key]=r.targets;
  if(r.skip)out.headings.push(key+' pulo '+r.skip);
  if(r.lowLabel)out.misc.push(key+' campos sem label '+r.lowLabel);
  await pg.close();
 }
 await ctx.close();
}
// zoom 200% (viewport 720 ~ 1440/2) overflow + foco por teclado
const c2=await b.newContext({viewport:{width:720,height:450}});const p=await c2.newPage();
for(const u of pages){await p.goto('http://localhost:4791'+u);const o=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);if(o[0]>o[1])out.misc.push('zoom200 overflow '+u+' '+o.join('>'))}
// foco visível: tab pelos primeiros 12 elementos na home e medir outline
const c3=await b.newContext({viewport:{width:1440,height:900}});const q=await c3.newPage();await q.goto('http://localhost:4791/');
const foc=[];for(let i=0;i<14;i++){await q.keyboard.press('Tab');foc.push(await q.evaluate(()=>{const e=document.activeElement;const cs=getComputedStyle(e);return (e.textContent||e.getAttribute('aria-label')||e.tagName).trim().slice(0,22)+' | outline '+cs.outlineStyle+' '+cs.outlineWidth})) }
out.focus=foc;
console.log(JSON.stringify(out,null,1));await b.close()})();
