import { site, posts, esc, btnWa, btn, waUrl } from '../components/ui.js';
import { page } from '../components/layout.js';
import { formacaoList, experienciaBlocos, experienciaClinica, areasRows, recortes, postRows, ctaBand, mural, trama3, orgSchema } from '../components/sections.js';

export function home() {
  const body = `
<!-- HERO -->
<section class="hero pano" id="inicio" aria-labelledby="h-hero">
  <div class="wrap">
    <div>
      <!-- Título do mockup do briefing, aprovado pelo usuário -->
      <h1 id="h-hero">Um espaço de acolhimento para crescer, <span style="white-space:nowrap">compreender e</span> <span class="scr">florescer.</span></h1>
      <p class="sub">Psicoterapia com escuta e cuidado, para crianças, adolescentes e famílias. Presencial em Fortaleza e online.</p>
      <div class="acts">
        ${btnWa('fio', 'Falar pelo WhatsApp')}
        <a class="link crp" href="/sobre-mim/">Conheça meu trabalho</a>
      </div>
    </div>
    <figure class="print retrato cai" style="--r0:-6deg">
      <span class="pin" aria-hidden="true"></span>
      <img src="/img/carolina-retrato.jpg" alt="Retrato da psicóloga Carolina Ramos" width="313" height="399" fetchpriority="high">
      <figcaption><span class="scr">${esc(site.person)}</span><small>${esc(site.role)} · ${esc(site.crp)}</small></figcaption>
    </figure>
  </div>
  <div class="trama-hero" aria-hidden="true"><svg data-braid="hero" viewBox="0 0 1440 250" preserveAspectRatio="none"></svg></div>
</section>

<!-- SOBRE -->
<section class="sobre sec papelao claro" id="sobre" aria-labelledby="h-sobre">
  <div class="wrap grid">
    <div>
      <h2 id="h-sobre">Formação e experiência clínica</h2>
      <p class="lead">Psicóloga graduada pela Universidade de Fortaleza (UNIFOR), com pós-graduações em Psicomotricidade Relacional e em Terapia Cognitivo-Comportamental na Infância e Adolescência, e especialização em Autismo.</p>
      ${btnWa('verde', 'Conversar pelo WhatsApp')}
      <div class="exp-bloco">
        <h3>Experiência</h3>
        ${experienciaBlocos()}
        <p class="mais"><a class="link" href="/sobre-mim/">Ver a página completa</a></p>
      </div>
    </div>
    <div>
      ${formacaoList()}
    </div>
  </div>
</section>

<!-- ATUAÇÃO -->
<section class="atuacao sec salvia" id="atuacao" aria-labelledby="h-atuacao">
  <div class="wrap">
    <div class="topo">
      <h2 id="h-atuacao">Cuidado que respeita cada história</h2>
      <p>Atendimento a crianças, adolescentes, adultos e idosos, presencial e online.</p>
    </div>
    ${areasRows()}
    ${experienciaClinica()}
    <p class="mais-atuacao"><a class="link" href="/atuacao/">Ver todas as áreas de atuação</a></p>
  </div>
</section>

${trama3}

<!-- ESPAÇO -->
<section class="espaco sec papelao claro" id="espaco" aria-labelledby="h-espaco">
  <div class="wrap">
    <h2 id="h-espaco">Um consultório pensado para o acolhimento</h2>
    ${mural()}
  </div>
</section>

<!-- MÍDIA -->
<section class="midia sec pano" id="midia" aria-labelledby="h-midia">
  <div class="wrap">
    <h2 id="h-midia">Entrevistas e participações</h2>
    ${recortes()}
  </div>
</section>

<!-- BLOG -->
<section class="blog sec papelao claro" id="blog" aria-labelledby="h-blog">
  <div class="wrap">
    <div class="topo">
      <h2 id="h-blog">Conteúdos recentes</h2>
      <a class="link" style="color:var(--verde)" href="/blog/">Ver todos os artigos</a>
    </div>
    ${postRows(posts.slice(0, 3))}
  </div>
</section>

${ctaBand()}
`;
  return page({
    title: 'CR Psicologia e Saúde | Psicóloga Carolina Ramos em Fortaleza',
    desc: 'Psicóloga Carolina Ramos (CRP 11/09406), Fortaleza – CE. Terapia Cognitivo-Comportamental, psicologia na infância e adolescência, autismo e terapia ABA, psicomotricidade relacional. Atendimento presencial e online.',
    path: '/',
    body,
    lb: true,
    schema: [orgSchema()],
  });
}
