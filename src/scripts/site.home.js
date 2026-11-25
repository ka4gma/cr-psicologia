
  var NS='http://www.w3.org/2000/svg';
  /* Gerador de trança: n fios que se cruzam, com sobre/sob nos cruzamentos.
     fn(i,t) -> [x,y]; p = índice da coordenada perpendicular (1 = y, trança horizontal; 0 = x, vertical). */
  function weave(svg,fn,n,p,halo,N){
    N=N||700;
    var pts=[],i,k;
    for(i=0;i<n;i++){var a=[];for(k=0;k<=N;k++)a.push(fn(i,k/N));pts.push(a)}
    function d(a,from,to){var s='';for(var q=from;q<=to;q++){s+=(q===from?'M':'L')+a[q][0].toFixed(1)+' '+a[q][1].toFixed(1)}return s}
    function path(dd,cls,stroke){var e=document.createElementNS(NS,'path');e.setAttribute('d',dd);e.setAttribute('class',cls);if(stroke)e.setAttribute('stroke',stroke);svg.appendChild(e)}
    for(i=0;i<n;i++)path(d(pts[i],0,N),'fio');
    var count=0;
    for(i=0;i<n;i++)for(var j=i+1;j<n;j++){
      for(k=1;k<=N;k++){
        var s0=pts[i][k-1][p]-pts[j][k-1][p],s1=pts[i][k][p]-pts[j][k][p];
        if(s0===0||s0*s1<0){
          var over=(count++%2===0)?i:j,from=Math.max(0,k-9),to=Math.min(N,k+8);
          path(d(pts[over],from,to),'halo',halo);
          path(d(pts[over],from,to),'fio');
        }
      }
    }
  }
  var TAU=Math.PI*2;
  var h=document.getElementById('trama-hero');
  if(h){
    var W=1440;
    weave(h,function(i,t){return [t*W,165+34*Math.sin(TAU*4.5*t+i*TAU/3)-t*14]},3,1,'#2B3F33');
    weave(h,function(i,t){return [t*W,230+8*Math.sin(TAU*8*t+i*Math.PI)+t*6]},2,1,'#2B3F33');
  }
  var tr=document.getElementById('trama-tres');
  if(tr){
    var box=document.getElementById('trama-svg'),cols=[].slice.call(document.querySelectorAll('.tres > div'));
    function sm(a,b,t){t=Math.min(1,Math.max(0,(t-a)/(b-a)));return t*t*(3-2*t)}
    function buildTrama(){
      var w=box.clientWidth,hh=box.clientHeight,br=box.getBoundingClientRect(),x0;
      while(tr.firstChild)tr.removeChild(tr.firstChild);
      tr.setAttribute('viewBox','0 0 '+w+' '+hh);tr.setAttribute('preserveAspectRatio','none');
      if(innerWidth>960){x0=cols.map(function(c){var r=c.getBoundingClientRect();return r.left+r.width/2-br.left})}
      else{x0=[w*.2,w*.5,w*.8]}
      var cx=w/2,amp=Math.min(105,w*.13);
      weave(tr,function(i,t){
        var s=sm(0,.4,t),a=amp*sm(.38,.52,t)*(1-sm(.93,1,t));
        return [x0[i]+(cx-x0[i])*s+a*Math.sin(TAU*2.1*(t-.38)+i*TAU/3),t*hh];
      },3,0,'#2B3F33',900);
    }
    buildTrama();
    var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){buildTrama();upd()},150)});
    function upd(){
      var r=box.getBoundingClientRect(),pr=(innerHeight*0.85-r.top)/(r.height*0.9);
      tr.style.setProperty('--corte',((1-Math.min(1,Math.max(0,pr)))*100)+'%');
    }
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){tr.style.setProperty('--corte','0%')}
    else{var tk=false;var on=function(){if(!tk){tk=true;requestAnimationFrame(function(){upd();tk=false})}};addEventListener('scroll',on,{passive:true});upd()}
  }
  var c=document.getElementById('trama-cta');
  if(c){weave(c,function(i,t){return [t*1440,170+36*Math.sin(TAU*4*t+i*TAU/3)]},3,1,'#A7B49B')}
  /* menu */
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')});
  n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}});
  /* peças que caem no pano */
  var els=[].slice.call(document.querySelectorAll('.cai'));
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
    els.forEach(function(e,i){e.style.transitionDelay=(i%3)*.08+'s';io.observe(e)});
  } else els.forEach(function(e){e.classList.add('in')});
  /* nav ativo */
  var links=[].slice.call(document.querySelectorAll('.nav a.nl')),map={};
  links.forEach(function(a){map[a.getAttribute('href')]=a});
  if('IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){var a=map['#'+x.target.id];if(a){links.forEach(function(l){l.classList.remove('on')});a.classList.add('on')}}})},{rootMargin:'-45% 0px -50% 0px'});
    ['inicio','sobre','atuacao','midia','blog'].forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)});
  }
  /* lightbox */
  var lb=document.getElementById('lb'),li=lb.querySelector('img'),lc=lb.querySelector('.cap');
  document.querySelectorAll('.mural button').forEach(function(btn){btn.addEventListener('click',function(){var im=btn.querySelector('img');li.src=im.currentSrc||im.src;li.alt=im.alt;lc.textContent=btn.dataset.cap||'';lb.showModal()})});
  lb.querySelector('.x').addEventListener('click',function(){lb.close()});
  lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});
