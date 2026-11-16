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
})();