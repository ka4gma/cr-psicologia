# CR Psicologia e Saúde: redesign do site

Redesign do site da psicóloga Carolina Ramos (CRP 11/09406). **Não publicado.** O domínio original não foi alterado.

## Como rodar

```powershell
npm install        # só as fontes (fontsource)
npm run build      # gera dist/
npm run preview    # serve dist/ em http://localhost:4173
npm test           # links, âncoras, títulos, descrições, número do WhatsApp
```

## Decisão de stack

Gerador estático em Node, sem framework. Razões: o site é de conteúdo (10 artigos, 8 páginas), precisa de HTML real para SEO, preserva as URLs originais com pastas `index.html`, e não exige servidor nem reescrita de rotas. Componentes são funções que devolvem HTML (`src/components`), páginas são módulos (`src/pages`), conteúdo fica em JSON (`src/data`).

```
src/
  data/        site.json (contato, nav) · content.json (formação, áreas, mídia, fotos) · posts.json (blog extraído)
  components/  ui.js · layout.js (head, header, footer) · sections.js (seções reutilizáveis)
  pages/       home · sobre · atuacao · infantil · fotos · entrevistas · blog · post · contato
  styles/      site.css (base e Home) · pages.css (páginas internas)
  scripts/     site.js (tranças em SVG, menu, entrada das peças, lightbox, formulário)
public/        imagens otimizadas (webp/jpg) e logo com fundo transparente
scripts/       extração de posts, imagens, testes, servidor local
docs/          divergencias.md
_audit/        material bruto do site original (HTML, capturas, crawl). Não vai para o dist.
```

## URLs

As URLs originais foram preservadas: `/sobre-mim/`, `/fotos/`, `/psicologia-infantil/`, `/entrevista/`, `/contato/`, `/blog/` e `/single-post/...` (os 10 artigos, com os mesmos caminhos). `/atuacao/` é nova. `sitemap.xml`, `robots.txt` e `404.html` são gerados. O canonical aponta para o domínio original, definido em `src/data/site.json` (`siteUrl`); ajustar antes de publicar se o domínio mudar.

## O que funciona de verdade

- WhatsApp: todos os links usam o número original (85) 98622-4394 e a mensagem original.
- Formulário de contato: **não há backend**. Ele monta a mensagem e abre o WhatsApp da Carolina. Para envio por e-mail seria preciso um serviço (por exemplo Formspree ou função serverless).
- Mapa: iframe do Google Maps sem chave, mais link de abertura.
- Lightbox das fotos, menu mobile, `prefers-reduced-motion`.

## Pendências (do cliente)

Lista completa em `docs/divergencias.md`. Resumo:

1. Confirmar o endereço: o site diz Sala 65G no texto e Sala 20 nos metadados.
2. Foto da Carolina em alta resolução: a única do site tem 313×399 px.
3. As duas imagens de TV da página Entrevistas não têm legenda nem link no site original; ficaram de fora.
4. O artigo "Feliz 2021!" não tem texto no site original (só a descrição).
5. As imagens dos artigos são as do blog original (bancos de imagem); avaliar se querem mantê-las.
6. Data do Diário do Nordeste não verificada.
