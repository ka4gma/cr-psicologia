const {chromium}=require('C:/Projetos/fisio-jessica-redesign/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
 const urls=[...sitemap.matchAll(/<loc>https:\/\/www\.carolinaramospsi\.com([^<]*)<\/loc>/g)].map(m=>m[1]);
 let b;for(const ch of ['msedge','chrome']){try{b=await chromium.launch({channel:ch});break}catch(e){}}
 fs.mkdirSync('_audit/qa',{recursive:true});
 const widths=(process.argv[2]||'1440,390').split(',').map(Number);
 const only=process.argv[3];
 let bad=0;
 for(const w of widths){
  const ctx=await b.newContext({viewport:{width:w,height:w>800?900:844}});
  for(const u of urls){
   if(only&&!u.includes(only))continue;
   const pg=await ctx.newPage();const errs=[];
   pg.on('pageerror',e=>errs.push(String(e)));pg.on('console',m=>{if(m.type()==='error'&&!/maps|google/i.test(m.text()))errs.push(m.text())});
   await pg.goto('http://localhost:4791'+u,{waitUntil:'load'});
   await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,70))}});
   await pg.waitForTimeout(900);
   await pg.evaluate(()=>{const t=document.getElementById('trama-tres');if(t)t.style.setProperty('--corte','0%');scrollTo(0,0)});
   await pg.addStyleTag({content:'.header{position:static!important}#trama-tres{clip-path:none!important}'});
   const o=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.src&&!i.src.startsWith('data:')).map(i=>i.src.slice(-40))}));
   const flag=(o.sw>o.cw||o.broken.length||errs.length);if(flag)bad++;
   console.log(w,u,flag?'PROBLEMA':'ok',o.sw>o.cw?`overflow ${o.sw}>${o.cw}`:'',o.broken.join(','),errs.slice(0,2).join(' | '));
   const slug=(u==='/'?'home':u.replace(/^\/|\/$/g,'').replace(/\//g,'_'));
   await pg.screenshot({path:`_audit/qa/${slug}-${w}.png`,fullPage:true});
   await pg.close();
  }
  await ctx.close();
 }
 await b.close();console.log(bad?'FALHAS: '+bad:'tudo ok');
})();
