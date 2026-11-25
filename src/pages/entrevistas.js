import { page } from '../components/layout.js';
import { pageHero, recortes, ctaBand } from '../components/sections.js';

export function entrevistas() {
  const body = `
${pageHero({ title: 'Entrevistas e participações', lead: 'A psicóloga Carolina Ramos na imprensa cearense.', crumbs: [{ label: 'Na mídia' }] })}

<section class="midia sec pano" aria-label="Entrevistas">
  <div class="wrap">
    <h2 class="sr-only">Reportagens</h2>
    ${recortes()}
  </div>
</section>

${ctaBand()}
`;
  return page({
    title: 'Entrevistas e participações na mídia',
    desc: 'Entrevistas da psicóloga Carolina Ramos aos jornais O Povo e Diário do Nordeste sobre vínculo familiar e atendimento psicológico a autistas.',
    path: '/entrevista/',
    body,
  });
}
