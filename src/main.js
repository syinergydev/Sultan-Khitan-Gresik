/* Sultan Khitan Gresik — interaksi & animasi (GSAP + ScrollTrigger) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- NAV (tanpa GSAP) ---------- */
  var nav = $('#nav'), burger = $('#burger'), overlay = $('#overlay');
  function setMenu(open) {
    nav.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  }
  if (burger) {
    burger.addEventListener('click', function () { setMenu(!nav.classList.contains('menu-open')); });
    $$('a', overlay).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1100) setMenu(false); });
  }
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Testimoni carousel (tanpa GSAP) ---------- */
  var qs = $$('.quote'), qi = 0;
  if (qs.length) {
    var dots = $$('#qdots button');
    var show = function (n) {
      qi = (n + qs.length) % qs.length;
      qs.forEach(function (q, i) { q.classList.toggle('is-on', i === qi); });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === qi)); });
    };
    $('#qprev').addEventListener('click', function () { show(qi - 1); });
    $('#qnext').addEventListener('click', function () { show(qi + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); }); });
    $('#quotes').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(qi - 1); if (e.key === 'ArrowRight') show(qi + 1);
    });
  }

  /* ---------- Galeri: filter + lightbox (tanpa GSAP) ---------- */
  var masonry = $('#masonry');
  if (masonry) {
    var items = $$('.gitem', masonry), chips = $$('.chip'), cur = 0, vis = items;
    var lb = $('#lb'), lbimg = $('#lbimg'), lbcap = $('#lbcap'), last = null;
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
        var cat = c.dataset.cat;
        items.forEach(function (it) { it.hidden = !(cat === 'semua' || it.dataset.cat === cat); });
        vis = items.filter(function (it) { return !it.hidden; });
        $('#empty').hidden = vis.length > 0;
      });
    });
    var open = function (i) {
      cur = (i + vis.length) % vis.length;
      var it = vis[cur];
      lbimg.src = it.dataset.full; lbimg.alt = it.querySelector('img').alt; lbcap.textContent = it.dataset.cap;
      lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
    };
    var close = function () { lb.classList.remove('is-open'); document.body.style.overflow = ''; if (last) last.focus(); };
    items.forEach(function (it) { it.addEventListener('click', function () { last = it; open(vis.indexOf(it)); $('.lb__x').focus(); }); });
    $('.lb__x').addEventListener('click', close);
    $('.lb__p').addEventListener('click', function () { open(cur - 1); });
    $('.lb__n').addEventListener('click', function () { open(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') open(cur - 1); if (e.key === 'ArrowRight') open(cur + 1);
    });
  }

  /* ---------- Form -> WhatsApp ---------- */
  var form = $('#waform');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form), nama = (f.get('nama') || '').toString().trim();
    var t = 'Halo Sultan Khitan, saya ' + (nama || 'orang tua calon pasien') + '. Keperluan: ' + f.get('perlu') + '.' + (f.get('pesan') ? ' ' + f.get('pesan') : '');
    window.open('https://wa.me/6287851331749?text=' + encodeURIComponent(t), '_blank', 'noopener');
  });

  /* ---------- GSAP (peningkatan; situs tetap utuh tanpa ini) ---------- */
  function endPreload() { doc.classList.remove('pl'); }
  if (!window.gsap || !window.ScrollTrigger || reduce) { endPreload(); return; }
  try {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    gsap.defaults({ ease: 'power3.out' });

    /* split heading */
    function split(el) {
      var out = [];
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
            var s = document.createElement('span'); s.className = 'w'; var i = document.createElement('i'); i.textContent = w; s.appendChild(i); frag.appendChild(s); out.push(i);
          });
          el.replaceChild(frag, n);
        } else if (n.nodeType === 1) {
          var s2 = document.createElement('span'); s2.className = 'w'; var i2 = document.createElement('i');
          el.replaceChild(s2, n); i2.appendChild(n); s2.appendChild(i2); out.push(i2);
        }
      });
      return out;
    }
    $$('[data-split]').forEach(function (h) {
      var words = split(h);
      gsap.from(words, { yPercent: 115, duration: 1, stagger: 0.05, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
    });

    /* reveal umum dengan stagger */
    var rev = $$('[data-reveal]');
    gsap.set(rev, { opacity: 0, y: 36 });
    ST.batch(rev, {
      start: 'top 92%', once: true,
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, overwrite: true }); }
    });

    /* clip-path image reveal + parallax scrub */
    $$('[data-clip]').forEach(function (el) {
      var im = $('img', el);
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', clearProps: 'clipPath', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      if (im) {
        gsap.set(im, { scale: 1.22 });
        gsap.to(im, { yPercent: 8, scale: 1.12, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      }
    });

    /* count-up */
    $$('[data-count]').forEach(function (el) {
      var end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10), o = { v: 0 };
      ST.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () {
        gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: function () { el.textContent = o.v.toFixed(dec).replace('.', ','); } });
      } });
    });

    /* ASSIK huruf: scrub tipis */
    $$('.assik__l').forEach(function (l, i) {
      gsap.fromTo(l, { yPercent: 18 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: l, start: 'top bottom', end: 'bottom 30%', scrub: 0.6 } });
    });

    /* galeri horizontal (desktop: pin + scrub, mobile: swipe native) */
    var hs = $('#hs'), track = $('#hsTrack');
    if (hs && track) {
      var mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', function () {
        hs.classList.add('is-pinned');
        var dist = function () { return Math.max(0, track.scrollWidth - document.documentElement.clientWidth); };
        gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: hs, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true } });
        return function () { hs.classList.remove('is-pinned'); gsap.set(track, { clearProps: 'transform' }); };
      });
    }

    /* magnetic CTA */
    if (fine) {
      $$('[data-magnetic]').forEach(function (b) {
        var xt = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' }), yt = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' });
        b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); xt((e.clientX - r.left - r.width / 2) * 0.28); yt((e.clientY - r.top - r.height / 2) * 0.4); });
        b.addEventListener('mouseleave', function () { xt(0); yt(0); });
      });
    }

    /* hero + preloader */
    var hero = $('.hero');
    var runHero = function () {
      if (!hero) return;
      var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('[data-hero-title] .w > i', { yPercent: 115, duration: 1.1, stagger: 0.08 })
        .from('.hero [data-hero]', { y: 28, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.7')
        .from('[data-hero-img]', { clipPath: 'inset(100% 0% 0% 0%)', y: 60, duration: 1.3, stagger: 0.14, ease: 'expo.out' }, '-=0.9')
        .from('[data-hero-img] img', { scale: 1.35, duration: 1.8, stagger: 0.14, ease: 'expo.out' }, '<')
        .from('[data-float]', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(1.8)' }, '-=0.6');
      $$('[data-float]').forEach(function (c, i) { gsap.to(c, { y: i ? 10 : -10, duration: 2.6 + i, repeat: -1, yoyo: true, ease: 'sine.inOut' }); });
      gsap.to('.hero__arcs svg', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    };
    if (doc.classList.contains('pl')) {
      var path = $('#plcrown'), len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.timeline({ onComplete: function () { endPreload(); ST.refresh(); } })
        .to(path, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' })
        .to('.preloader img', { opacity: 1, scale: 1, duration: 0.6 }, '-=0.3')
        .from('.preloader img', { scale: 0.85, duration: 0.6 }, '<')
        .to('.preloader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut', delay: 0.25 })
        .add(runHero, '-=0.5');
    } else { endPreload(); runHero(); }

    window.addEventListener('load', function () { ST.refresh(); });
  } catch (err) {
    /* bila animasi gagal, pastikan seluruh konten tetap terlihat */
    endPreload();
    $$('[data-reveal],[data-clip],[data-hero],[data-hero-img],[data-float]').forEach(function (el) { el.style.opacity = ''; el.style.transform = ''; el.style.clipPath = ''; });
    console.warn('Animasi dinonaktifkan:', err);
  }
})();
