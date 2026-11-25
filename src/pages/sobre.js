import { site, esc, btnWa } from '../components/ui.js';
import { page } from '../components/layout.js';
import { pageHero, formacaoList, experienciaBlocos, experienciaClinica, ctaBand, orgSchema } from '../components/sections.js';

export function sobre() {
  const body = `
${pageHero({ title: 'Sobre mim', lead: `Psicóloga clínica em Fortaleza, ${site.crp}.`, crumbs: [{ label: 'Sobre mim' }] })}

<section class="sobre-bio sec papelao claro" aria-labelledby="h-bio">
  <div class="wrap bio-grid">
    <figure class="print retrato cai" style="--r0:-6deg">
      <span class="pin" aria-hidden="true"></span>
      <img src="/img/carolina-retrato.jpg" alt="Retrato da psicóloga Carolina Ramos" width="313" height="399" loading="lazy">
      <figcaption><span class="scr">${esc(site.person)}</span><small>${esc(site.role)} · ${esc(site.crp)}</small></figcaption>
    </figure>
    <div class="bio-txt">
      <h2 id="h-bio">Carolina Ramos</h2>
      <p class="lead">Psicóloga graduada pela Universidade de Fortaleza (UNIFOR), com pós-graduações em Psicomotricidade Relacional e em Terapia Cognitivo-Comportamental na Infância e Adolescência, especialista em Análise do Comportamento Aplicada (ABA) e em Autismo.</p>
      <p>Tem formação em Terapia do Esquema, Avaliação Psicológica, Transtornos alimentares e Psicoterapia de Grupo, e experiência com Transtornos Globais do Desenvolvimento, TDAH, TOD, TOC, ansiedade e depressão, entre outros.</p>
      <p>Sua vasta experiência na área clínica vem de atendimentos individuais e em grupo de psicoterapia, com base na Terapia Cognitivo-Comportamental.</p>
      <div class="acts">${btnWa('verde', 'Conversar pelo WhatsApp')}</div>
    </div>
  </div>
</section>

<section class="sec salvia formacao-sec" aria-labelledby="h-form">
  <div class="wrap">
    <h2 id="h-form">Formação acadêmica e especializações</h2>
    ${formacaoList()}
  </div>
</section>

<section class="sec papelao claro" aria-labelledby="h-exp">
  <div class="wrap trajetoria">
    <div>
      <h2 id="h-exp">Trajetória profissional</h2>
      <p class="lead">Da clínica à escola e ao hospital, o trabalho sempre olhou para a criança, a família e o ambiente em que ela cresce.</p>
    </div>
    <div>
      ${experienciaBlocos()}
      ${experienciaClinica()}
    </div>
  </div>
</section>

${ctaBand()}
`;
  return page({
    title: 'Sobre mim: Psicóloga Carolina Ramos',
    desc: 'Formação, especializações e experiência da psicóloga Carolina Ramos (CRP 11/09406): UNIFOR, Psicomotricidade Relacional, TCC na infância e adolescência, ABA e Autismo.',
    path: '/sobre-mim/',
    body,
    schema: [orgSchema()],
  });
}
