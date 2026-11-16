(function(){
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  var targets = [].slice.call(document.querySelectorAll('.reveal,.stagger'));
  if(rm || !('IntersectionObserver' in window)){ targets.forEach(function(e){e.classList.add('vis');}); }
  else{
    var io = new IntersectionObserver(function(es){es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('vis'); io.unobserve(en.target); } });},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    targets.forEach(function(e){ io.observe(e); });
    setTimeout(function(){ targets.forEach(function(e){ e.classList.add('vis'); }); }, 2600);
  }
  if(!rm){
    document.addEventListener('pointermove', function(e){
      var t = e.target.closest ? e.target.closest('.fn,.feat .card') : null; if(!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--mx', (((e.clientX-r.left)/r.width)*100).toFixed(1)+'%');
      t.style.setProperty('--my', (((e.clientY-r.top)/r.height)*100).toFixed(1)+'%');
    }, {passive:true});
  }
  var nums = [].slice.call(document.querySelectorAll('[data-count]'));
  function run(el){
    var t = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suf')||'', pre = el.getAttribute('data-pre')||'';
    var dec = (t % 1 !== 0) ? 1 : 0, d = 1000, st = null;
    function f(ts){ if(!st) st=ts; var p=Math.min((ts-st)/d,1); var e=1-Math.pow(1-p,3); var v=t*(0.15+0.85*e);
      el.textContent = pre + (dec?v.toFixed(1):Math.round(v)).toLocaleString('fr-FR') + suf;
      if(p<1) requestAnimationFrame(f); else el.textContent = pre + (dec?t.toFixed(1):t).toLocaleString('fr-FR') + suf; }
    requestAnimationFrame(f);
  }
  if(!(rm) && ('IntersectionObserver' in window)){
    var io2 = new IntersectionObserver(function(es){es.forEach(function(en){ if(en.isIntersecting){ run(en.target); io2.unobserve(en.target); } });},{threshold:.6});
    nums.forEach(function(e){ io2.observe(e); });
  }
  /* Mot qui tourne */
  [].slice.call(document.querySelectorAll('.rot')).forEach(function(r){
    var sp = r.children; if(!sp.length) return; sp[0].classList.add('on');
    if(rm || sp.length < 2) return; var i = 0;
    setInterval(function(){ sp[i].classList.remove('on'); i = (i+1) % sp.length; sp[i].classList.add('on'); }, 2200);
  });
  /* Environnement hero injecté + parallaxe au scroll */
  if(!rm){
    var layers = [];
    [].slice.call(document.querySelectorAll('.hero')).forEach(function(h){
      if(h.querySelector('.fx')) return;
      var fx = document.createElement('div'); fx.className = 'fx';
      function layer(cls, par){ var l = document.createElement('div'); l.setAttribute('data-par', par); l.style.position='absolute'; l.style.inset='0'; l.style.willChange='transform'; var inner = document.createElement('div'); inner.className = cls; l.appendChild(inner); fx.appendChild(l); layers.push(l); }
      layer('aurora', '0.16'); layer('gridfx', '-0.05');
      h.insertBefore(fx, h.firstChild);
    });
    var ticking = false;
    function par(){ var y = window.pageYOffset || 0; layers.forEach(function(l){ var p = parseFloat(l.getAttribute('data-par')) || 0; l.style.transform = 'translate3d(0,' + (y*p).toFixed(1) + 'px,0)'; }); ticking = false; }
    window.addEventListener('scroll', function(){ if(!ticking){ requestAnimationFrame(par); ticking = true; } }, {passive:true});
  }
  /* Maquette 3D : inclinaison du dashboard suivant le curseur */
  if(!rm){
    [].slice.call(document.querySelectorAll('.dash')).forEach(function(d){
      d.addEventListener('pointermove', function(e){ var r = d.getBoundingClientRect(); var rx = ((e.clientY-r.top)/r.height - .5) * -3.5; var ry = ((e.clientX-r.left)/r.width - .5) * 3.5; d.style.transform = 'perspective(1300px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)'; }, {passive:true});
      d.addEventListener('pointerleave', function(){ d.style.transition = 'transform .3s ease'; d.style.transform = ''; setTimeout(function(){ d.style.transition = ''; }, 320); });
    });
  }
})();