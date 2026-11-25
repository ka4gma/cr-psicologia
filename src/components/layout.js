// Estrutura comum: <head>, cabeçalho, rodapé, WhatsApp flutuante, lightbox.
import { site, esc, icons, external, waUrl, mapsUrl, btn } from './ui.js';

const fontFaces = `
@font-face{font-family:"Gilda Display";font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/gilda-display-latin-400-normal.woff2) format("woff2")}
@font-face{font-family:"Hanken Grotesk";font-style:normal;font-weight:100 900;font-display:swap;src:url(/fonts/hanken-grotesk-latin-wght-normal.woff2) format("woff2")}
@font-face{font-family:"Herr Von Muellerhoff";font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/herr-von-muellerhoff-latin-400-normal.woff2) format("woff2")}`;
export const fontCss = fontFaces;

const canonicalFor = (path) => site.siteUrl + path;

export function header(current) {
  const items = site.nav
    .map((n) => {
      const on = current === n.href || (n.href !== '/' && current.startsWith(n.href));
      return `<a class="nl" href="${n.href}"${on ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`;
    })
    .join('\n      ');
  return `<header class="header" id="topo">
  <div class="wrap">
    <a class="brand" href="/" aria-label="${esc(site.name)}, página inicial">
      <img src="/img/logo-mark-white.png" alt="" width="44" height="44">
      <span><b>${esc(site.name)}</b><span>${esc(site.person)} · Psicóloga</span></span>
    </a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="Abrir menu"><span class="bars"><i></i><i></i><i></i></span></button>
    <nav class="nav" id="nav" aria-label="Principal">
      ${items}
      ${btn({ href: waUrl(), label: 'Entre em contato', variant: 'fio', wa: true })}
    </nav>
  </div>
</header>`;
}

export function footer() {
  const a = site.address;
  return `<footer class="footer">
  <div class="wrap">
    <div class="cols">
      <div>
        <img class="lg" src="/img/logo-full-white.png" alt="${esc(site.person)}, psicóloga clínica" width="170" height="190" loading="lazy">
        <p style="max-width:28ch;font-size:.98rem">Psicóloga ${esc(site.person)}<br>${esc(site.crp)}</p>
      </div>
      <div>
        <h3>Navegação</h3>
        <ul>${site.nav.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h3>Contato</h3>
        <ul>
          <li><a href="${waUrl()}" ${external}>${esc(site.phoneDisplay)}</a></li>
          <li><a href="mailto:${site.email}">${esc(site.email)}</a></li>
          <li><a href="${site.social.instagram}" ${external}>Instagram</a></li>
          <li><a href="${site.social.facebook}" ${external}>Facebook</a></li>
        </ul>
      </div>
      <div>
        <h3>Endereço</h3>
        <address>${esc(a.street)}<br>${esc(a.room)} · ${esc(a.district)}<br>${esc(a.city)} – ${esc(a.stateName)}<br><a class="sub-link" href="${mapsUrl}" ${external}>Ver no mapa</a></address>
      </div>
    </div>
    <div class="legal"><span>© ${new Date().getFullYear()} ${esc(site.name)}. Todos os direitos reservados.</span><span>Atendimento presencial e online</span></div>
  </div>
</footer>
<a class="wa" href="${waUrl()}" ${external} aria-label="Conversar pelo WhatsApp">${icons.wa}</a>`;
}

export const lightbox = `<dialog class="lb" id="lb" aria-label="Imagem ampliada">
  <button class="x" type="button" aria-label="Fechar">×</button>
  <img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAACAkQBADs=">
  <p class="cap"></p>
</dialog>`;

/**
 * Monta uma página completa.
 * @param {{title:string, desc:string, path:string, body:string, schema?:object[], lb?:boolean, ogImage?:string, noindex?:boolean, bodyAttrs?:string}} p
 */
export function page({ title, desc, path, body, schema = [], lb = false, ogImage = '/img/carolina-retrato.jpg', noindex = false, bodyAttrs = '' }) {
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
  const ld = schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#2B3F33">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${canonicalFor(path)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="${canonicalFor(ogImage)}">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="preload" href="/fonts/gilda-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/hanken-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css">
${ld}
</head>
<body ${bodyAttrs}>
<script>document.documentElement.classList.add('js')</script>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
${header(path)}
<main id="conteudo">
${body}
</main>
${footer()}
${lb ? lightbox : ''}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}
