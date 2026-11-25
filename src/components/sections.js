// Seções reutilizáveis (usadas na Home e nas páginas internas).
import { site, content, posts, esc, icons, external, novaAba, waUrl, waAbout, btn, btnWa, print, formatDate } from './ui.js';

/** Faixa de abertura das páginas internas: pano verde, título e trança. */
export function pageHero({ title, lead = '', crumbs = [] }) {
  const trail = [{ label: 'Início', href: '/' }, ...crumbs]
    .map((c, i, a) => (i === a.length - 1 ? `<span aria-current="page">${esc(c.label)}</span>` : `<a href="${c.href}">${esc(c.label)}</a>`))
    .join('<span class="sep" aria-hidden="true">/</span>');
  return `<section class="pagehero pano">
  <div class="wrap">
    <nav class="crumbs" aria-label="Você está em">${trail}</nav>
    <h1>${esc(title)}</h1>
    ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
  </div>
  <div class="trama-hero trama-faixa" aria-hidden="true"><svg data-braid="faixa" viewBox="0 0 1440 120" preserveAspectRatio="none"></svg></div>
</section>`;
}

export function formacaoList() {
  return `<ul class="formacao" aria-label="Formação">
${content.formacao.map((f) => `    <li><b>${esc(f.titulo)}</b><span>${esc(f.detalhe)}</span></li>`).join('\n')}
  </ul>`;
}

export function experienciaBlocos() {
  return `<div class="experiencia">
${content.experiencia.map((e) => `    <p><strong>${esc(e.area)}.</strong> ${esc(e.texto)}</p>`).join('\n')}
  </div>`;
}

export function experienciaClinica() {
  return `<p class="tambem"><b>Também com experiência em</b> ${content.experienciaClinica.map(esc).join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p>`;
}

/** Linhas de áreas de atuação (sem cartões). Na Home, só o resumo. */
export function areasRows({ detail = false } = {}) {
  return `<ul class="areas">
${content.areas
  .map(
    (a) => `    <li class="area" id="${a.id}">
      <h3>${esc(a.titulo)}</h3>
      <div class="area-txt"><p>${esc(a.resumo)}</p>${
        detail
          ? a.corpo.map((p) => `<p>${esc(p)}</p>`).join('') +
            `<p class="area-links"><a class="link" href="${a.mais.href}">${esc(a.mais.label)}</a> <a class="link" href="${waAbout(a.wa)}" ${external}>Conversar sobre este atendimento${novaAba}</a></p>`
          : ''
      }</div>
    </li>`
  )
  .join('\n')}
  </ul>`;
}

/** Recortes de reportagem pregados. */
export function recortes() {
  return content.midia
    .map(
      (m, i) => `<a class="recorte${i % 2 ? ' inv' : ''}" href="${m.href}" ${external}>
      <div class="rimg cai" style="--r:${i % 2 ? '1.3deg' : '-1.4deg'};--r0:${i % 2 ? '5deg' : '-5deg'}"><span class="pin" aria-hidden="true"></span><img src="${m.img}" alt="${esc(m.alt)}" loading="lazy"></div>
      <div><h3>${esc(m.titulo)}</h3><time${m.data ? ` datetime="${m.data}"` : ''}><b>${esc(m.veiculo)}</b>${m.dataLabel ? ` · ${esc(m.dataLabel)}` : ''}</time><span class="ler">Ler a reportagem ${icons.ext}${novaAba}</span></div>
    </a>`
    )
    .join('\n    ');
}

/** Lista de artigos do blog em linhas. */
export function postRows(list) {
  return list
    .map(
      (p) => `<a class="post" href="${p.path}/"><time datetime="${p.date}">${formatDate(p.date)}</time><h3>${esc(p.title)}</h3><span class="ir">Ler ${icons.arrow}</span></a>`
    )
    .join('\n    ');
}

/** Faixa final de contato (sálvia com trança). */
export function ctaBand({ title = 'Atendemos online. Marque sua consulta.', text = 'Fale com a Carolina pelo WhatsApp ou por e-mail e tire suas dúvidas sobre o atendimento.', msg } = {}) {
  return `<section class="cta sec salvia" aria-labelledby="h-cta">
  <div class="fundo" aria-hidden="true"><svg data-braid="cta" viewBox="0 0 1440 300" preserveAspectRatio="none"></svg></div>
  <div class="wrap">
    <div>
      <h2 id="h-cta">${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    <div class="acts">
      ${btn({ href: waUrl(msg), label: `WhatsApp ${site.phoneDisplay}`, variant: 'verde', wa: true })}
      <a class="mail link" href="mailto:${site.email}">${esc(site.email)}</a>
    </div>
  </div>
</section>`;
}

export function mural() {
  const f = Object.fromEntries(content.fotos.map((x) => [x.id, x]));
  const pr = (id, cls, rot) => print({ src: f[id].src, alt: f[id].alt, cap: f[id].cap, rot, pos: f[id].pos, cls, lightbox: true });
  return `<div class="mural">
      <div class="col col-a">
        ${pr('poltronas', 'm1', '-1.6deg')}
        ${pr('apoio', 'm4', '1.1deg')}
      </div>
      <div class="col col-b">
        ${pr('reuniao', 'm2', '1.4deg')}
        ${pr('calcada', 'm5', '-1.8deg')}
      </div>
      <div class="col col-c">
        ${pr('corredor', 'm3', '-1deg')}
        <p class="resumo">Fotos do ambiente destinado à psicoterapia, na Av. Washington Soares, em Fortaleza.</p>
        <a class="link" href="/fotos/">Ver todas as fotos</a>
      </div>
    </div>`;
}

export const trama3 = `<section class="trama sec pano" id="trama" aria-labelledby="h-trama">
  <div class="wrap">
    <h2 id="h-trama">O cuidado é uma trama de três fios</h2>
    <p class="intro">Na Terapia Cognitivo-Comportamental com crianças e adolescentes, o atendimento psicológico se estende à escola e aos familiares, para que o cuidado alcance a criança como um todo.</p>
    <div class="tres">
      <div><span class="pin" aria-hidden="true"></span><h3>Criança</h3><p>Psicoeducação para compreender a origem dos comportamentos e identificar os pensamentos que geram sentimentos difíceis. Jogos lúdicos acessam o que não se expressa de forma espontânea.</p></div>
      <div><span class="pin" aria-hidden="true"></span><h3>Família</h3><p>Orientação de pais e participação dos familiares no processo, que também costuma começar por um encaminhamento de familiares ou de médicos.</p></div>
      <div><span class="pin" aria-hidden="true"></span><h3>Escola</h3><p>Professores estão entre quem mais encaminha, e o cuidado se estende ao ambiente escolar, onde muitos sinais aparecem.</p></div>
    </div>
    <div class="trama-svg" id="trama-svg"><svg id="trama-tres" aria-hidden="true"></svg><span class="pin" aria-hidden="true"></span></div>
  </div>
</section>`;

/** Dados estruturados do consultório (schema.org). */
export function orgSchema() {
  const a = site.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: 'Psicóloga clínica em Fortaleza: Terapia Cognitivo-Comportamental, infância e adolescência, autismo e terapia ABA, psicomotricidade relacional.',
    url: site.siteUrl,
    telephone: '+' + site.whatsappNumber,
    email: site.email,
    image: site.siteUrl + '/img/carolina-retrato.jpg',
    address: { '@type': 'PostalAddress', streetAddress: `${a.street}, ${a.room}`, addressLocality: a.city, addressRegion: a.state, addressCountry: 'BR' },
    sameAs: [site.social.instagram, site.social.facebook],
    employee: { '@type': 'Person', name: site.person, jobTitle: 'Psicóloga clínica' },
  };
}
