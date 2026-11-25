import { posts, esc, icons, formatDate, excerptOf } from '../components/ui.js';
import { page } from '../components/layout.js';
import { pageHero, ctaBand } from '../components/sections.js';

const excerpt = (p) => excerptOf(p, 170);

export function blogIndex() {
  const anos = [...new Set(posts.map((p) => new Date(Date.parse(p.date) - 3 * 3600e3).getUTCFullYear()))];
  const grupos = anos
    .map((ano) => {
      const lista = posts.filter((p) => new Date(Date.parse(p.date) - 3 * 3600e3).getUTCFullYear() === ano);
      return `<section class="ano" aria-labelledby="ano-${ano}">
      <h2 id="ano-${ano}">${ano}</h2>
      <div class="lista">
      ${lista
        .map(
          (p) => `<article class="card-post">
        <a href="${p.path}/">
          ${p.cover ? `<div class="capa"><img src="/img/blog/${p.cover}.webp" alt="" loading="lazy"></div>` : ''}
          <div class="txt">
            <time datetime="${p.date}">${formatDate(p.date)}${p.minutes ? ` · ${p.minutes} min de leitura` : ''}</time>
            <h3>${esc(p.title)}</h3>
            ${excerpt(p) ? `<p>${esc(excerpt(p))}</p>` : ''}
            ${p.categories?.length || p.tags.length ? `<p class="tags">${esc((p.categories?.length ? p.categories : p.tags.slice(0, 3)).join(' · '))}</p>` : ''}
            <span class="ir">Ler o artigo ${icons.arrow}</span>
          </div>
        </a>
      </article>`
        )
        .join('\n      ')}
      </div>
    </section>`;
    })
    .join('\n    ');
  const body = `
${pageHero({ title: 'Blog', lead: 'Textos da psicóloga Carolina Ramos sobre infância, adolescência, autismo, ansiedade e educação dos filhos.', crumbs: [{ label: 'Blog' }] })}

<section class="blog-index sec papelao claro" aria-label="Artigos">
  <div class="wrap">
    ${grupos}
  </div>
</section>

${ctaBand()}
`;
  return page({
    title: 'Blog',
    desc: 'Artigos da psicóloga Carolina Ramos sobre ansiedade, autismo, TDAH, terapia ABA, birra, limites e educação dos filhos.',
    path: '/blog/',
    body,
  });
}
