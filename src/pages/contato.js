import { site, esc, external, waUrl, mapsUrl, mapsEmbed, icons, btnWa } from '../components/ui.js';
import { page } from '../components/layout.js';
import { pageHero, orgSchema } from '../components/sections.js';

export function contato() {
  const a = site.address;
  const body = `
${pageHero({ title: 'Contato', lead: 'Atendemos online. Marque sua consulta.', crumbs: [{ label: 'Contato' }] })}

<section class="contato sec papelao claro" aria-label="Formas de contato">
  <div class="wrap contato-grid">
    <div class="canais">
      <h2>Fale com a Carolina</h2>
      <dl>
        <div><dt>WhatsApp</dt><dd><a href="${waUrl()}" ${external}>${esc(site.phoneDisplay)}</a></dd></div>
        <div><dt>E-mail</dt><dd><a href="mailto:${site.email}">${esc(site.email)}</a></dd></div>
        <div><dt>Endereço</dt><dd>${esc(a.street)}, ${esc(a.room)}<br>${esc(a.district)} – ${esc(a.city)} – ${esc(a.stateName)}</dd></div>
        <div><dt>Atendimento</dt><dd>Presencial no consultório e online.</dd></div>
        <div><dt>Redes</dt><dd><a href="${site.social.instagram}" ${external}>Instagram ${esc(site.social.instagramHandle)}</a><br><a href="${site.social.facebook}" ${external}>Facebook</a></dd></div>
      </dl>
      <div class="acts">${btnWa('verde', 'Chamar no WhatsApp')}</div>
    </div>

    <form class="form-wa" id="form-contato" novalidate>
      <h2>Envie uma mensagem</h2>
      <p class="nota">A mensagem abre o WhatsApp da Carolina já escrita, para você revisar e enviar.</p>
      <div class="campo"><label for="f-nome">Seu nome</label><input id="f-nome" name="nome" type="text" autocomplete="name" required aria-describedby="f-erro"></div>
      <div class="campo"><label for="f-assunto">Assunto</label>
        <select id="f-assunto" name="assunto">
          <option>Atendimento para meu filho ou filha</option>
          <option>Atendimento para adolescente</option>
          <option>Autismo e terapia ABA</option>
          <option>Orientação de pais</option>
          <option>Atendimento para mim</option>
          <option>Outro assunto</option>
        </select>
      </div>
      <div class="campo"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" rows="5" placeholder="Conte brevemente como podemos ajudar."></textarea></div>
      <p class="erro" id="f-erro" role="alert" hidden>Escreva seu nome para continuar.</p>
      <button class="btn btn-verde" type="submit">${icons.wa}Enviar pelo WhatsApp</button>
    </form>
  </div>
</section>

<section class="mapa sec salvia" aria-labelledby="h-mapa">
  <div class="wrap">
    <h2 id="h-mapa">Como chegar</h2>
    <p class="lead">${esc(a.street)}, ${esc(a.room)}, ${esc(a.district)}, ${esc(a.city)}.</p>
    <div class="mapa-box">
      <iframe title="Mapa com a localização do consultório" src="${mapsEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <p class="mapa-link"><a class="link" href="${mapsUrl}" ${external}>Abrir no Google Maps</a></p>
  </div>
</section>
`;
  return page({
    title: 'Contato',
    desc: 'Fale com a psicóloga Carolina Ramos pelo WhatsApp (85) 98622-4394 ou e-mail. Consultório na Av. Washington Soares, 909, Fortaleza. Atendimento presencial e online.',
    path: '/contato/',
    body,
    schema: [orgSchema()],
  });
}

export function notFound() {
  const body = `
<section class="pagehero pano nf">
  <div class="wrap">
    <h1>Página não encontrada</h1>
    <p class="lead">O endereço pode ter mudado. Volte ao início ou fale com a Carolina.</p>
    <div class="acts"><a class="btn btn-fio" href="/">Voltar ao início</a> ${btnWa('fio', 'Falar pelo WhatsApp')}</div>
  </div>
</section>`;
  return page({ title: 'Página não encontrada', desc: 'A página que você procura não foi encontrada. Volte ao início ou fale com a psicóloga Carolina Ramos.', path: '/404.html', body, noindex: true });
}
