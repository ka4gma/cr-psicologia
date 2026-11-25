import { posts, btnWa } from '../components/ui.js';
import { page } from '../components/layout.js';
import { pageHero, trama3, ctaBand, postRows } from '../components/sections.js';

export function infantil() {
  const rel = ['ansiedade-infantil', '_tdah', '2017_10_09_birra', 'punir-e-educar'].map((k) => posts.find((p) => p.key === k)).filter(Boolean);
  const body = `
${pageHero({ title: 'Psicologia na infância e adolescência', lead: 'Um cuidado que começa cedo e que alcança a criança, a família e a escola.', crumbs: [{ label: 'Psicologia infantil' }] })}

<section class="infantil sec papelao claro" aria-labelledby="h-dev">
  <div class="wrap duas">
    <div><h2 id="h-dev">O desenvolvimento infantil</h2></div>
    <div class="texto">
      <p class="lead">É na infância que iniciamos a construção de crenças e valores, que nos levarão a tomar determinadas atitudes na vida.</p>
      <p>O desenvolvimento infantil passa por inúmeras mudanças, que geram perdas e ganhos. Nem sempre é possível passar por esta etapa da vida sem sofrimentos, angústias e demais problemáticas que transcendem a escola e os pais.</p>
      <p>As dificuldades são inerentes ao crescimento de todos. No entanto, é preciso estar atento a sinais que indicam prejuízos no desenvolvimento natural da criança ou do adolescente.</p>
    </div>
  </div>
</section>

<section class="infantil sec salvia" aria-labelledby="h-tcc">
  <div class="wrap duas">
    <div><h2 id="h-tcc">Terapia Cognitivo-Comportamental</h2></div>
    <div class="texto">
      <p>A Terapia Cognitivo-Comportamental, em forma de psicoterapia, ajuda a criança ou o adolescente a entender de forma clara a origem de seus comportamentos.</p>
      <h3>Psicoeducação</h3>
      <p>Por meio da psicoeducação, é possível identificar os pensamentos disfuncionais que causam sentimentos ruins e comportamentos inadequados, para então detê-los.</p>
      <h3>Jogos lúdicos</h3>
      <p>Através de jogos lúdicos é possível acessar problemáticas que não são expressadas de forma natural pelos pacientes.</p>
      <h3>Técnicas de relaxamento</h3>
      <p>No tratamento de crianças e adolescentes ansiosos, uma das técnicas da TCC é o relaxamento: algumas com foco na respiração e na tensão muscular, outras com foco em distração cognitiva, outras com atividades psicomotoras.</p>
      <p class="fonte-nota">Fonte: artigo "Ansiedade", publicado no blog em 12 de julho de 2017.</p>
    </div>
  </div>
</section>

<section class="infantil sec papelao claro" aria-labelledby="h-imp">
  <div class="wrap duas">
    <div><h2 id="h-imp">Por que acompanhar</h2></div>
    <div class="texto">
      <p>O atendimento psicológico na infância e na adolescência é de extrema importância para a reabilitação emocional do desenvolvimento.</p>
      <p>Em sua maioria, os encaminhamentos para o atendimento psicológico são feitos por professores, familiares ou médicos, quando a frequência de comportamentos inadequados é percebida de forma intensa.</p>
      <p>Vale ressaltar que a psicologia infantil se estende à escola e aos familiares, tendo em vista que o tratamento precisa alcançar sua totalidade.</p>
    </div>
  </div>
</section>

${trama3}

<section class="infantil sec papelao claro" aria-labelledby="h-proc">
  <div class="wrap duas">
    <div><h2 id="h-proc">Sobre o processo</h2></div>
    <div class="texto">
      <p>Cada criança é única. No trabalho com ABA, por exemplo, o início é uma anamnese e uma entrevista com os pais, seguidas de análise funcional; o programa é personalizado e acompanhado por folhas de registro.</p>
      <p>Para conversar sobre a situação do seu filho ou da sua filha, fale com a Carolina. O atendimento é presencial em Fortaleza e também online.</p>
      <div class="acts">${btnWa('verde', 'Conversar pelo WhatsApp')}</div>
    </div>
  </div>
</section>

<section class="blog sec salvia" aria-labelledby="h-rel">
  <div class="wrap">
    <div class="topo"><h2 id="h-rel">Para ler em família</h2><a class="link" href="/blog/">Ver todos os artigos</a></div>
    ${postRows(rel)}
  </div>
</section>

${ctaBand({ msg: 'Olá Carolina! Gostaria de mais informações sobre atendimento na infância e adolescência.' })}
`;
  return page({
    title: 'Psicologia infantil e adolescência',
    desc: 'Psicologia na infância e adolescência em Fortaleza: desenvolvimento infantil, Terapia Cognitivo-Comportamental, jogos lúdicos e participação da família e da escola.',
    path: '/psicologia-infantil/',
    body,
  });
}
