const {chromium}=require('C:/Projetos/fisio-jessica-redesign/node_modules/playwright');
(async()=>{let b;for(const ch of ['msedge','chrome']){try{b=await chromium.launch({channel:ch});break}catch(e){}}
const base='http://localhost:4791';const res=[];const ok=(n,c)=>{res.push((c?'ok   ':'FAIL ')+n)};
// menu mobile
let ctx=await b.newContext({viewport:{width:390,height:844}});let pg=await ctx.newPage();
await pg.goto(base+'/');
ok('menu fechado no início',!(await pg.locator('#nav').isVisible()));
await pg.click('.burger');ok('menu abre',await pg.locator('#nav').isVisible());
ok('aria-expanded true',(await pg.getAttribute('.burger','aria-expanded'))==='true');
await pg.click('#nav a[href="/blog/"]');await pg.waitForURL('**/blog/');ok('navegação do menu',pg.url().endsWith('/blog/'));
await pg.goto(base+'/');await pg.click('.burger');await pg.keyboard.press('Escape');ok('Esc fecha o menu',!(await pg.locator('#nav').isVisible()));
await ctx.close();
// lightbox
ctx=await b.newContext({viewport:{width:1440,height:900}});pg=await ctx.newPage();
await pg.goto(base+'/fotos/');await pg.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}});await pg.waitForTimeout(800);
await pg.locator('.galeria button').first().click();ok('lightbox abre',await pg.locator('dialog#lb[open]').count()===1);
ok('lightbox mostra imagem real',(await pg.locator('#lb img').evaluate(i=>i.src.includes('/img/')))===true);
await pg.keyboard.press('Escape');ok('Esc fecha lightbox',await pg.locator('dialog#lb[open]').count()===0);
// formulário -> WhatsApp
await pg.goto(base+'/contato/');
await pg.click('#form-contato button[type=submit]');ok('valida nome obrigatório',await pg.locator('#f-erro').isVisible());
await pg.fill('#f-nome','Maria');await pg.fill('#f-msg','Gostaria de agendar.');
const [popup]=await Promise.all([ctx.waitForEvent('page'),pg.click('#form-contato button[type=submit]')]);
const u=popup.url();ok('abre WhatsApp com o número original',u.includes('phone=5585986224394'));
ok('mensagem leva nome e texto',decodeURIComponent(u).includes('Maria')&&decodeURIComponent(u).includes('agendar'));
// links de contato
await pg.goto(base+'/');
const wa=await pg.locator('a[href*="api.whatsapp.com"]').evaluateAll(a=>a.map(x=>x.href));
ok('todos os links de WhatsApp com o número',wa.length>5&&wa.every(h=>h.includes('phone=5585986224394')));
ok('mailto presente',(await pg.locator('a[href^="mailto:carolinaramospsi@gmail.com"]').count())>0);
// 404
const r=await pg.goto(base+'/nao-existe');ok('404 com status',r.status()===404);
// reduced motion
const c2=await b.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});const p2=await c2.newPage();await p2.goto(base+'/');
ok('reduced motion: peças visíveis sem rolar',await p2.locator('.mural button').first().evaluate(e=>getComputedStyle(e).opacity)==='1');
console.log(res.join('\n'));await b.close();process.exit(res.some(x=>x.startsWith('FAIL'))?1:0)})();
