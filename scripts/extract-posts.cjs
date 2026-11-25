// Extrai os posts do blog original (HTML salvo em _audit/posts) para src/data/posts.json
const fs=require('fs'),path=require('path');
const he=require('module').createRequire(path.join(__dirname,'..','_audit','package.json'))('he');
const dir=path.join(__dirname,'..','_audit','posts');
const urls={ // slug original -> caminho original (preservado)
 'punir-e-educar':'/single-post/punir-e-educar','2017_10_09_birra':'/single-post/2017/10/09/birra','terapia-aba-em-fortaleza':'/single-post/terapia-aba-em-fortaleza','2017_04_08_autismo':'/single-post/2017/04/08/autismo','_tdah':'/single-post/_tdah','feliz-ano-novo':'/single-post/feliz-ano-novo','2017_04_01_autismo-abril-azul':'/single-post/2017/04/01/autismo-abril-azul','ansiedade-infantil':'/single-post/ansiedade-infantil','2017_06_27_adolescentes':'/single-post/2017/06/27/adolescentes','10-formas-para-diminuir-a-ansiedade':'/single-post/10-formas-para-diminuir-a-ansiedade'};
const out=[];
for(const f of fs.readdirSync(dir).filter(x=>x.endsWith('.html'))){
  const key=f.replace('.html','');
  const h=fs.readFileSync(path.join(dir,f),'utf8');
  const get=r=>{const m=h.match(r);return m?he.decode(m[1]):''};
  const headline=get(/"headline":"([^"]*)"/);
  const date=get(/"datePublished":"([^"]*)"/);
  const ogd=get(/property="og:description" content="([^"]*)"/)||get(/<meta name="description" content="([^"]*)"/);
  const body=h.slice(h.indexOf('<body'));
  let t=body.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<(br|\/p|\/h\d|\/div|\/li)[^>]*>/g,'\n').replace(/<[^>]+>/g,'');
  const lines=he.decode(t).split('\n').map(s=>s.replace(/[​ ]/g,' ').replace(/\s+/g,' ').trim()).filter(Boolean);
  const iR=lines.findIndex(l=>/min de leitura/.test(l));
  const iE=lines.findIndex(l=>/^Posts Em Destaque/.test(l));
  const minutes=(lines[iR]||'').match(/\d+/)?.[0]||'';
  let i0=iR+1,updated='';
  if(/^Atualizado:/.test(lines[i0]||'')){updated=lines[i0].replace('Atualizado:','').trim();i0++}
  let paras=lines.slice(i0,iE<0?undefined:iE);
  let tags=[];
  const hashIdx=paras.findIndex(l=>/^#\S/.test(l));
  if(hashIdx>=0){tags=paras[hashIdx].split(/\s+/).filter(x=>x.startsWith('#')).map(x=>x.slice(1));paras=paras.filter((_,k)=>k!==hashIdx)}
  const tIdx=paras.indexOf('Tags:');
  if(tIdx>=0){tags=paras.slice(tIdx+1);paras=paras.slice(0,tIdx)}
  const cats=[];while(paras.length&&paras[paras.length-1].split(' ').length<=2&&!/[.!?:]$/.test(paras[paras.length-1])){cats.unshift(paras.pop())}
  const imgs=[...new Set([...h.matchAll(/https:\/\/static\.wixstatic\.com\/media\/([A-Za-z0-9_]+(?:~mv2)?\.(?:jpg|jpeg|png|webp))/gi)].map(m=>m[1]))].filter(x=>!/^(b44080_e38eff|11062b_|8d13be_|4057345|38f4657|e1aa082|b44080_7a7222)/.test(x));
  const covers={'terapia-aba-em-fortaleza':'terapia-aba-em-fortaleza','2017_06_27_adolescentes':'2017_06_27_adolescentes','_tdah':'tdah','2017_04_01_autismo-abril-azul':'2017_04_01_autismo-abril-azul','2017_04_08_autismo':'2017_04_08_autismo','ansiedade-infantil':'ansiedade-infantil'};
  const visible=lines[iR-2]||headline;
  out.push({key,path:urls[key],title:visible,seoTitle:headline,cover:covers[key]||null,date,minutes:+minutes||null,updated,excerpt:ogd,tags,categories:cats,paragraphs:paras});
}
out.sort((a,b)=>b.date.localeCompare(a.date));
fs.writeFileSync(path.join(__dirname,'..','src','data','posts.json'),JSON.stringify(out,null,1));
for(const p of out)console.log(p.date.slice(0,10),p.minutes,p.paragraphs.length,p.tags.join(','),'|',p.cover,'|',p.title);
