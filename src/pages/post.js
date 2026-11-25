import { posts, site, esc, icons, formatDate, btnWa, print, excerptOf } from '../components/ui.js';
import { page } from '../components/layout.js';
import { pageHero, ctaBand } from '../components/sections.js';

/** Converte os parágrafos extraídos em blocos HTML. A lista de dicas do post de ansiedade vira lista numerada. */
function corpo(p) {
  const ps = p.paragraphs;
  if (p.key.startsWith('10-formas')) {
    const i = ps.findIndex((t) => /^Mas também existem 10 formas/.test(t));
    const fim = ps.findIndex((t, k) => k > i && /^Espero ter ajudado/.test(t));
    const antes = ps.slice(0, i + 1).map((t) => `<p>${esc(t)}</p>`).join('');
    const itens = ps.slice(i + 1, fim).map((t) => `<li>${esc(t)}</li>`).join('');
    const depois = ps.slice(fim).map((t) => `<p>${esc(t)}</p>`).join('');
    return `${antes}<ol class="dicas">${itens}</ol>${depois}`;
  }
  return ps.map((t) => `<p>${esc(t)}</p>`).join('');
}

export function post(p, i) {
  const newer = posts[i - 1];
  const older = posts[i + 1];
  const tags = p.tags.length ? `<p class="hashtags">${p.tags.map((t) => '#' + esc(t)).join(' ')}</p>` : '';
  const sem = p.paragraphs.length === 0;
  const body = `
${pageHero({ title: p.title, crumbs: [{ label: 'Blog', href: '/blog/' }, { label: 'Artigo' }] })}

<article class="artigo sec papelao claro">
  <div class="wrap estreito">
    <p class="meta"><time datetime="${p.date}">${formatDate(p.date)}</time>${p.minutes ? ` · ${p.minutes} min de leitura` : ''}${p.updated ? ` · Atualizado em ${esc(p.updated)}` : ''}</p>
    ${p.cover ? `<div class="capa-post">${print({ src: `/img/blog/${p.cover}.webp`, alt: '', rot: '-1.2deg', lazy: false, cls: 'capa' })}</div>` : ''}
    <div class="texto-post">
      ${sem ? `<p class="lead-post">${esc(p.excerpt)}</p><p class="nota-post">Este artigo não tem texto adicional no site original.</p>` : corpo(p)}
    </div>
    ${tags}
    <div class="acts">${btnWa('verde', 'Conversar com a Carolina', `Olá Carolina! Li seu artigo "${p.title}" e gostaria de mais informações sobre seu atendimento.`)}</div>
  </div>
</article>

<nav class="pos-nav sec papelao claro" aria-label="Outros artigos">
  <div class="wrap">
    ${older ? `<a class="ant" href="${older.path}/"><span>${icons.back} Artigo anterior</span><b>${esc(older.title)}</b></a>` : '<span></span>'}
    ${newer ? `<a class="prox" href="${newer.path}/"><span>Próximo artigo ${icons.arrow}</span><b>${esc(newer.title)}</b></a>` : '<span></span>'}
  </div>
</nav>

${ctaBand()}
`;
  const desc = excerptOf(p, 155);
  return page({
    title: p.seoTitle || p.title,
    desc: desc,
    path: p.path + '/',
    body,
    ogImage: p.cover ? `/img/blog/${p.cover}.webp` : '/img/carolina-retrato.jpg',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        datePublished: p.date,
        author: { '@type': 'Person', name: site.person },
        publisher: { '@type': 'Organization', name: site.name },
        mainEntityOfPage: site.siteUrl + p.path + '/',
        inLanguage: 'pt-BR',
      },
    ],
  });
}
