/* Comportamento do site: fios de renda (SVG), menu, entrada das peças, lightbox e formulário. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var TAU = Math.PI * 2;
  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Trança: n fios que se cruzam, com sobre/sob nos cruzamentos.
     fn(i,t) -> [x,y]; p = coordenada perpendicular (1 = y, trança horizontal; 0 = x, vertical). */
  function weave(svg, fn, n, p, halo, N) {
    N = N || 700;
    var pts = [], i, k;
    for (i = 0; i < n; i++) { var a = []; for (k = 0; k <= N; k++) a.push(fn(i, k / N)); pts.push(a); }
    function d(a, from, to) { var s = ''; for (var q = from; q <= to; q++) s += (q === from ? 'M' : 'L') + a[q][0].toFixed(1) + ' ' + a[q][1].toFixed(1); return s; }
    function path(dd, cls, stroke) { var e = document.createElementNS(NS, 'path'); e.setAttribute('d', dd); e.setAttribute('class', cls); if (stroke) e.setAttribute('stroke', stroke); svg.appendChild(e); }
    for (i = 0; i < n; i++) path(d(pts[i], 0, N), 'fio');
    var count = 0;
    for (i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
      for (k = 1; k <= N; k++) {
        var s0 = pts[i][k - 1][p] - pts[j][k - 1][p], s1 = pts[i][k][p] - pts[j][k][p];
        if (s0 === 0 || s0 * s1 < 0) {
          var over = (count++ % 2 === 0) ? i : j, from = Math.max(0, k - 9), to = Math.min(N, k + 8);
          path(d(pts[over], from, to), 'halo', halo);
          path(d(pts[over], from, to), 'fio');
        }
      }
    }
  }
  function sm(a, b, t) { t = Math.min(1, Math.max(0, (t - a) / (b - a))); return t * t * (3 - 2 * t); }

  /* ---- tranças decorativas ---- */
  document.querySelectorAll('svg[data-braid]').forEach(function (svg) {
    var kind = svg.getAttribute('data-braid');
    if (kind === 'hero') {
      weave(svg, function (i, t) { return [t * 1440, 165 + 34 * Math.sin(TAU * 4.5 * t + i * TAU / 3) - t * 14]; }, 3, 1, '#2B3F33');
      weave(svg, function (i, t) { return [t * 1440, 230 + 8 * Math.sin(TAU * 8 * t + i * Math.PI) + t * 6]; }, 2, 1, '#2B3F33');
    } else if (kind === 'faixa') {
      weave(svg, function (i, t) { return [t * 1440, 80 + 20 * Math.sin(TAU * 5 * t + i * TAU / 3)]; }, 3, 1, '#2B3F33');
    } else if (kind === 'cta') {
      weave(svg, function (i, t) { return [t * 1440, 170 + 36 * Math.sin(TAU * 4 * t + i * TAU / 3)]; }, 3, 1, '#A7B49B');
    }
  });

  /* ---- trama de três fios (desenhada pelo scroll) ---- */
  var tr = document.getElementById('trama-tres');
  if (tr) {
    var box = document.getElementById('trama-svg');
    var cols = [].slice.call(document.querySelectorAll('.tres > div'));
    var buildTrama = function () {
      var w = box.clientWidth, hh = box.clientHeight, br = box.getBoundingClientRect(), x0;
      while (tr.firstChild) tr.removeChild(tr.firstChild);
      tr.setAttribute('viewBox', '0 0 ' + w + ' ' + hh); tr.setAttribute('preserveAspectRatio', 'none');
      x0 = innerWidth > 960 ? cols.map(function (c) { var r = c.getBoundingClientRect(); return r.left + r.width / 2 - br.left; }) : [w * .2, w * .5, w * .8];
      var cx = w / 2, amp = Math.min(105, w * .13);
      weave(tr, function (i, t) {
        var s = sm(0, .4, t), a = amp * sm(.38, .52, t) * (1 - sm(.93, 1, t));
        return [x0[i] + (cx - x0[i]) * s + a * Math.sin(TAU * 2.1 * (t - .38) + i * TAU / 3), t * hh];
      }, 3, 0, '#2B3F33', 900);
    };
    var upd = function () {
      var r = box.getBoundingClientRect(), pr = (innerHeight * 0.85 - r.top) / (r.height * 0.9);
      tr.style.setProperty('--corte', ((1 - Math.min(1, Math.max(0, pr))) * 100) + '%');
    };
    buildTrama();
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { buildTrama(); upd(); }, 150); });
    if (reduz) tr.style.setProperty('--corte', '0%');
    else { var tk = false; addEventListener('scroll', function () { if (!tk) { tk = true; requestAnimationFrame(function () { upd(); tk = false; }); } }, { passive: true }); upd(); }
  }

  /* ---- menu ---- */
  var b = document.querySelector('.burger'), n = document.getElementById('nav');
  if (b && n) {
    var close = function () { n.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Abrir menu'); };
    b.addEventListener('click', function () { var o = n.classList.toggle('open'); b.setAttribute('aria-expanded', o); b.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu'); });
    n.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && n.classList.contains('open')) { close(); b.focus(); } });
  }

  /* ---- peças que caem no pano ---- */
  var els = [].slice.call(document.querySelectorAll('.cai'));
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .12 });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 3) * .08 + 's'; io.observe(e); });
  } else els.forEach(function (e) { e.classList.add('in'); });

  /* ---- lightbox ---- */
  var lb = document.getElementById('lb');
  if (lb && lb.showModal) {
    var li = lb.querySelector('img'), lc = lb.querySelector('.cap');
    document.querySelectorAll('button.cai[data-cap]').forEach(function (btn) {
      btn.addEventListener('click', function () { var im = btn.querySelector('img'); li.src = im.currentSrc || im.src; li.alt = im.alt; lc.textContent = btn.dataset.cap || ''; lb.showModal(); });
    });
    lb.querySelector('.x').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  }

  /* ---- formulário: monta a mensagem e abre o WhatsApp da Carolina ---- */
  var form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim(), err = document.getElementById('f-erro');
      if (!nome) { err.hidden = false; form.nome.setAttribute('aria-invalid', 'true'); form.nome.focus(); return; }
      err.hidden = true; form.nome.removeAttribute('aria-invalid');
      var msg = 'Olá Carolina! Meu nome é ' + nome + '.\nAssunto: ' + form.assunto.value + '.' + (form.mensagem.value.trim() ? '\n' + form.mensagem.value.trim() : '');
      window.open('https://api.whatsapp.com/send?phone=5585986224394&text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();
