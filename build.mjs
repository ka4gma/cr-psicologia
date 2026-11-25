// Gerador estático: src/ -> dist/. Sem dependências além das fontes (fontsource).
import { mkdirSync, rmSync, writeFileSync, readFileSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts, site } from './src/components/ui.js';
import { fontCss } from './src/components/layout.js';
import { home } from './src/pages/home.js';
import { sobre } from './src/pages/sobre.js';
import { atuacao } from './src/pages/atuacao.js';
import { infantil } from './src/pages/infantil.js';
import { fotos } from './src/pages/fotos.js';
import { entrevistas } from './src/pages/entrevistas.js';
import { blogIndex } from './src/pages/blog.js';
import { post } from './src/pages/post.js';
import { contato, notFound } from './src/pages/contato.js';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
for (const f of existsSync(dist) ? readdirSync(dist) : []) rmSync(join(dist, f), { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const write = (rel, data) => {
  const f = join(dist, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, data);
};

// --- páginas (URLs originais preservadas; /atuacao/ é nova) ---
const pages = [
  ['/', home()],
  ['/sobre-mim/', sobre()],
  ['/atuacao/', atuacao()],
  ['/psicologia-infantil/', infantil()],
  ['/fotos/', fotos()],
  ['/entrevista/', entrevistas()],
  ['/blog/', blogIndex()],
  ['/contato/', contato()],
  ...posts.map((p, i) => [p.path + '/', post(p, i)]),
];
for (const [url, html] of pages) write(url === '/' ? 'index.html' : join(url, 'index.html'), html);
write('404.html', notFound());

// --- estilos e scripts ---
const css = ['site.css', 'pages.css'].map((f) => readFileSync(join(root, 'src/styles', f), 'utf8')).join('\n');
write('assets/site.css', fontCss + '\n' + css);
write('assets/site.js', readFileSync(join(root, 'src/scripts/site.js'), 'utf8'));

// --- assets e fontes ---
cpSync(join(root, 'public'), dist, { recursive: true });
const fonts = [
  ['@fontsource/gilda-display/files/gilda-display-latin-400-normal.woff2', 'gilda-display-latin-400-normal.woff2'],
  ['@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2', 'hanken-grotesk-latin-wght-normal.woff2'],
  ['@fontsource/herr-von-muellerhoff/files/herr-von-muellerhoff-latin-400-normal.woff2', 'herr-von-muellerhoff-latin-400-normal.woff2'],
];
for (const [src, name] of fonts) {
  const from = join(root, 'node_modules', src);
  if (!existsSync(from)) throw new Error('Fonte ausente: ' + from);
  mkdirSync(join(dist, 'fonts'), { recursive: true });
  cpSync(from, join(dist, 'fonts', name));
}

// --- SEO ---
const urls = pages.map(([u]) => u);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site.siteUrl}${u}</loc></url>`).join('\n')}\n</urlset>\n`
);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.siteUrl}/sitemap.xml\n`);

console.log(`dist: ${pages.length} páginas + 404`);
