import { esc, content } from '../components/ui.js';
import { page } from '../components/layout.js';
import { pageHero, areasRows, experienciaClinica, ctaBand } from '../components/sections.js';

export function atuacao() {
  const exp = (area) => esc(content.experiencia.find((e) => e.area === area).texto);
  const body = `
${pageHero({ title: 'Áreas de atuação', lead: 'Atendimento a crianças, adolescentes, adultos e idosos, presencial e online.', crumbs: [{ label: 'Atuação' }] })}

<section class="atuacao atuacao-detalhe sec salvia" aria-label="Áreas de atuação">
  <div class="wrap">
    <h2 class="sr-only">Áreas de atuação</h2>
    ${areasRows({ detail: true })}
    ${experienciaClinica()}
  </div>
</section>

<section class="sec papelao claro" aria-labelledby="h-outras">
  <div class="wrap trajetoria">
    <div>
      <h2 id="h-outras">Outras frentes de experiência</h2>
      <p class="lead">Além da clínica, a Carolina atuou em ambientes diferentes, sempre com foco no desenvolvimento e no cuidado.</p>
    </div>
    <div class="experiencia">
      <p><strong>Psicologia hospitalar.</strong> ${exp('Hospitalar')}</p>
      <p><strong>Escola.</strong> ${exp('Escolar')}</p>
      <p><strong>Orientação.</strong> ${exp('Orientação')}</p>
    </div>
  </div>
</section>

${ctaBand()}
`;
  return page({
    title: 'Áreas de atuação',
    desc: 'Infância e adolescência, autismo e terapia ABA, orientação de pais, psicomotricidade relacional e grupos. Atendimento presencial em Fortaleza e online.',
    path: '/atuacao/',
    body,
  });
}
