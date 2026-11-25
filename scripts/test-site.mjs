// Teste do dist/: links internos, âncoras, imagens, títulos únicos, SEO básico e links do WhatsApp.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const htmls = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && htmls.push(p);
  }
})(dist);

const problems = [];
const titles = new Map();
const resolve = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  const f = join(dist, clean);
  if (existsSync(f) && statSync(f).isFile()) return f;
  const idx = join(f, 'index.html');
  return existsSync(idx) ? idx : null;
};
const idsOf = (file) => new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

for (const file of htmls) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '').replace(/\\/g, '/');
  const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!t) problems.push(`${rel}: sem <title>`);
  else (titles.get(t) || titles.set(t, []).get(t)).push(rel);
  if (!/<meta name="description" content="[^"]{30,}"/.test(html)) problems.push(`${rel}: description ausente ou curta`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${rel}: deve ter exatamente um <h1>`);
  if (!/<html lang="pt-BR">/.test(html)) problems.push(`${rel}: lang ausente`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) problems.push(`${rel}: <img> sem alt`);

  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|data:|#$)/.test(url)) continue;
    if (url.startsWith('#')) {
      if (!idsOf(file).has(url.slice(1))) problems.push(`${rel}: âncora ${url} inexistente`);
      continue;
    }
    const target = resolve(url);
    if (!target) problems.push(`${rel}: link quebrado ${url}`);
    else if (url.includes('#') && target.endsWith('.html') && !idsOf(target).has(url.split('#')[1])) problems.push(`${rel}: âncora ${url} inexistente`);
  }
  for (const m of html.matchAll(/https:\/\/api\.whatsapp\.com\/send\?phone=(\d+)/g)) if (m[1] !== '5585986224394') problems.push(`${rel}: número de WhatsApp divergente ${m[1]}`);
}
for (const [t, list] of titles) if (list.length > 1) problems.push(`título repetido "${t}": ${list.join(', ')}`);
for (const f of ['sitemap.xml', 'robots.txt', 'assets/site.css', 'assets/site.js']) if (!existsSync(join(dist, f))) problems.push(`ausente: ${f}`);

console.log(`${htmls.length} páginas verificadas`);
if (problems.length) { console.log(problems.map((p) => ' - ' + p).join('\n')); process.exit(1); }
console.log('sem problemas');
