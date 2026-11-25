import { content, print } from '../components/ui.js';
import { page } from '../components/layout.js';
import { pageHero, ctaBand } from '../components/sections.js';

export function fotos() {
  const f = content.fotos;
  const rot = ['-1.6deg', '1.4deg', '-1deg', '1.2deg', '-1.8deg'];
  const prints = f.map((x, i) => print({ src: x.src, alt: x.alt, cap: x.cap, rot: rot[i % rot.length], pos: x.pos, cls: `g g${i + 1}`, lightbox: true })).join('\n      ');
  const body = `
${pageHero({ title: 'Fotos', lead: 'O ambiente destinado à psicoterapia, na Av. Washington Soares, em Fortaleza.', crumbs: [{ label: 'Fotos' }] })}

<section class="fotos-sec sec papelao claro" aria-label="Galeria de fotos do consultório">
  <div class="wrap">
    <div class="galeria">
      ${prints}
      <div class="galeria-nota">
        <p>Toque em uma foto para ampliar.</p>
        <p class="sub">Para conhecer o consultório, marque uma consulta com a Carolina.</p>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Quer conhecer o consultório?', text: 'Fale com a Carolina para marcar uma consulta, presencial ou online.' })}
`;
  return page({
    title: 'Fotos do consultório',
    desc: 'Fotos do ambiente e do espaço destinado à psicoterapia de crianças, adolescentes, adultos e idosos, na Av. Washington Soares, em Fortaleza.',
    path: '/fotos/',
    body,
    lb: true,
  });
}
