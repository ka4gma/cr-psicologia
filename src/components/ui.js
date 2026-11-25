// Helpers e peças pequenas de interface reutilizadas em todas as páginas.
import { readFileSync } from 'node:fs';

export const site = JSON.parse(readFileSync(new URL('../data/site.json', import.meta.url), 'utf8'));
export const content = JSON.parse(readFileSync(new URL('../data/content.json', import.meta.url), 'utf8'));
export const posts = JSON.parse(readFileSync(new URL('../data/posts.json', import.meta.url), 'utf8'));

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Link do WhatsApp com o número original e mensagem (padrão ou personalizada). */
export const waUrl = (text) =>
  `https://api.whatsapp.com/send?phone=${site.whatsappNumber}&text=${encodeURIComponent(text || site.whatsappDefaultText)}`;

export const waAbout = (assunto) =>
  waUrl(`Olá Carolina! Gostaria de mais informações sobre ${assunto}.`);

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapsQuery)}&output=embed`;

/** Ícones desenhados em traço único (24x24, stroke currentColor). */
export const icons = {
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.2-4.1A8 8 0 1 1 8.3 19z"/><path d="M9 9.2c.3 2.3 2.6 4.6 5 5.4l1.3-1.3-1.9-1-1 .6c-.8-.4-1.6-1.2-2-2l.6-1-1-1.9z"/></svg>',
  arrow: '<svg class="seta" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  ext: '<svg class="seta" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>',
  back: '<svg class="seta" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6"/></svg>',
};

export const external = 'target="_blank" rel="noopener"';
export const novaAba = '<span class="sr-only"> (abre em nova aba)</span>';

/** Botão. variant: fio (sobre pano), verde (sobre papelão/sálvia). */
export function btn({ href, label, variant = 'fio', wa = false, ext = false, extra = '' }) {
  const attrs = wa || ext ? external : '';
  return `<a class="btn btn-${variant}" href="${esc(href)}" ${attrs} ${extra}>${wa ? icons.wa : ''}${esc(label)}${wa || ext ? novaAba : ''}</a>`;
}

export const btnWa = (variant = 'fio', label = 'Falar pelo WhatsApp', text) =>
  btn({ href: waUrl(text), label, variant, wa: true });

/** Cartão de "impressão pregada": foto com moldura marfim e alfinete. */
export function print({ src, alt, w, h, cap = '', rot = '-1.5deg', pos = '50% 50%', cls = '', lightbox = false, lazy = true }) {
  const inner = `<span class="pin" aria-hidden="true"></span><img src="${src}" alt="${esc(alt)}" ${w ? `width="${w}" height="${h}"` : ''} ${lazy ? 'loading="lazy"' : ''} style="object-position:${pos}">`;
  if (lightbox) {
    return `<button type="button" class="${cls} cai" style="--r:${rot};--r0:${rot}" data-cap="${esc(cap)}" aria-label="Ampliar foto: ${esc(cap || alt)}">${inner}</button>`;
  }
  return `<figure class="${cls} cai" style="--r:${rot};--r0:${rot}">${inner}${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;
}

export function formatDate(iso, { short = false } = {}) {
  const d = new Date(Date.parse(iso) - 3 * 3600e3); // horário de Fortaleza (UTC-3)
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const m = meses[d.getUTCMonth()];
  return short ? `${d.getUTCDate()} ${m.slice(0, 3)}. ${d.getUTCFullYear()}` : `${d.getUTCDate()} de ${m} de ${d.getUTCFullYear()}`;
}

/** Resumo de um artigo: primeiro parágrafo com texto, cortado em limite de palavra. */
export function excerptOf(p, max = 160) {
  const base = p.paragraphs.find((t) => t.length > 45) || p.excerpt || p.title;
  const t = base.replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…' : t;
}
