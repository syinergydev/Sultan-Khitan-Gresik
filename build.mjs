import fs from 'node:fs';
import path from 'node:path';
import C from './site-config.mjs';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DIST = path.join(ROOT, 'dist');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const wa = (msg) => `https://wa.me/${C.waNumber}?text=${encodeURIComponent(msg)}`;
const MSG = {
  home: 'Halo Sultan Khitan, saya ingin bertanya mengenai layanan khitan dan informasi pendaftarannya.',
  layanan: 'Halo Sultan Khitan, saya ingin bertanya mengenai layanan yang tersedia.',
  metode: 'Halo Sultan Khitan, saya ingin berkonsultasi mengenai pilihan metode khitan.',
  kontak: 'Halo Sultan Khitan, saya ingin mendapatkan informasi pendaftaran.',
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- icons ---------- */
const S = (inner, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${inner}</svg>`;
const I = {
  wa: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
  ig: S('<rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none"/>'),
  tt: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>`,
  fb: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>`,
  map: S('<path d="M12 21s-7-6.2-7-11.2a7 7 0 1 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.6"/>'),
  arrow: S('<path d="M5 12h14M13 6l6 6-6 6"/>', 'class="arr"'),
  left: S('<path d="M15 18l-6-6 6-6"/>'), right: S('<path d="M9 18l6-6-6-6"/>'), x: S('<path d="M6 6l12 12M18 6L6 18"/>'),
  star: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.7 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`,
  clock: S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  phone: S('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  shield: S('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
  heart: S('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>'),
  stetho: S('<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a4 4 0 0 0 8 0v-1"/><circle cx="18" cy="12" r="2"/>'),
  bandage: S('<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M10.5 10.5l3 3M12.5 8.5l3 3M8.5 12.5l3 3"/>'),
  home: S('<path d="M3 11l9-7.5 9 7.5M5.5 9.5V20h13V9.5M10 20v-6h4v6"/>'),
  flask: S('<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3M7.5 15h9"/>'),
  crown: S('<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>'),
  chat: S('<path d="M4 5h16v11H9l-5 4z"/>'),
  book: S('<path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4z"/><path d="M12 5v15"/>'),
  send: S('<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>'),
};
const SOC = [
  ['wa', 'WhatsApp Sultan Khitan', wa(MSG.home), I.wa, 'soc--wa'],
  ['ig', 'Instagram Sultan Khitan', C.social.instagram, I.ig, 'soc--ig'],
  ['tt', 'TikTok Sultan Khitan', C.social.tiktok, I.tt, 'soc--tt'],
  ['fb', 'Facebook Sultan Khitan', C.social.facebook, I.fb, 'soc--fb'],
  ['map', 'Lokasi Sultan Khitan di Google Maps', C.maps, I.map, 'soc--map'],
];
const socials = () => `<div class="socials">${SOC.map(([, l, h, ic, cl]) => `<a class="soc ${cl}" href="${esc(h)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(l)}" title="${esc(l)}">${ic}</a>`).join('')}</div>`;
const btn = (href, label, cls = '', icon = '', ext = true) => `<a class="btn ${cls}" data-magnetic href="${esc(href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${icon}<span>${label}</span></a>`;
const waBtn = (msg, label = 'Konsultasi WhatsApp', cls = 'btn--wa') => btn(wa(msg), label, cls, I.wa);
const hoursText = () => `${C.hours.label} (menurut ${C.hours.source})`;
const photo = (k) => C.photos[k];
const img = (k, cls = '', eager = false, pos = '') => { const p = photo(k); return `<img class="${cls}" src="${p.src}" alt="${esc(p.alt)}" ${eager ? '' : 'loading="lazy"'} decoding="async"${pos ? ` style="object-position:${pos}"` : ''}>`; };

/* ---------- layout ---------- */
const NAV = [['/', 'Beranda'], ['/tentang-kami/', 'Tentang Kami'], ['/layanan/', 'Layanan'], ['/metode-khitan/', 'Metode Khitan'], ['/galeri/', 'Galeri'], ['/edukasi/', 'Edukasi'], ['/kontak/', 'Kontak']];
const NAV_ALL = [...NAV.slice(0, 6), ['/ulasan/', 'Ulasan'], NAV[6]];

function layout({ path: p, title, desc, h, body, ctx = 'home', schema = '', ogImg = '/assets/brand/logo-sultan-khitan.png' }) {
  const cur = (href) => (href === p ? ' aria-current="page"' : '');
  const url = C.siteUrl ? C.siteUrl.replace(/\/$/, '') : '';
  const full = `${title} | ${C.name}`;
  const depth = p === '/' ? 0 : 1;
  const html = `<!doctype html>
<html lang="id"${p === '/' ? ' data-home' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#102B46">
${url ? `<link rel="canonical" href="${url}${p}">` : ''}
<meta property="og:type" content="website"><meta property="og:locale" content="id_ID">
<meta property="og:site_name" content="${esc(C.name)}"><meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="${url}${ogImg}">
${url ? `<meta property="og:url" content="${url}${p}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css">
<script>(function(){var d=document.documentElement;d.classList.add('js');try{if(!sessionStorage.getItem('sk_pl')&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&d.hasAttribute('data-home')){d.classList.add('pl');setTimeout(function(){d.classList.remove('pl')},5000)}sessionStorage.setItem('sk_pl','1')}catch(e){}})()</script>
${schema}
</head>
<body data-wa="${esc(wa(MSG[ctx] || MSG.home))}">
<a class="skip" href="#main">Lewati ke konten</a>
<div class="preloader" aria-hidden="true"><div class="preloader__in">
<svg viewBox="0 0 120 80"><path id="plcrown" d="M10 66 L10 22 L38 44 L60 8 L82 44 L110 22 L110 66 Z"/></svg>
<img src="/assets/brand/logo-sultan-khitan.png" alt=""></div></div>
<header class="nav" id="nav">
 <div class="nav__bar">
  <a class="nav__logo" href="/" aria-label="${esc(C.name)} — Beranda"><img src="/assets/brand/logo-sultan-khitan.png" alt="Logo ${esc(C.name)}" width="146" height="40"></a>
  <nav class="nav__links" aria-label="Navigasi utama">${NAV.map(([h2, l]) => `<a href="${h2}"${cur(h2)}>${l}</a>`).join('')}</nav>
  <a class="btn btn--gold btn--sm nav__cta" data-magnetic href="${esc(wa(MSG[ctx] || MSG.home))}" target="_blank" rel="noopener noreferrer">${I.wa}<span>Konsultasi WhatsApp</span></a>
  <button class="burger" id="burger" aria-label="Buka menu" aria-expanded="false" aria-controls="overlay"><span></span><span></span><span></span></button>
 </div>
 <div class="overlay" id="overlay" role="dialog" aria-modal="true" aria-label="Menu navigasi">
  <nav aria-label="Menu mobile">${NAV_ALL.map(([h2, l]) => `<a href="${h2}"${cur(h2)}>${l}</a>`).join('')}</nav>
  <div class="overlay__foot">${waBtn(MSG[ctx] || MSG.home, 'Konsultasi WhatsApp', 'btn--gold')}${socials()}</div>
 </div>
</header>
<main id="main">
${body}
</main>
${footer()}
<a class="wa-float" href="${esc(wa(MSG[ctx] || MSG.home))}" target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp Sultan Khitan">${I.wa}<span>Chat WhatsApp</span></a>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
  const pre = depth ? '../' : './';
  return html.replace(/(href|src|data-full|content)="\/(?!\/)([^"]*)"/g, (m, a, rest) => `${a}="${pre}${rest}"`);
}

function footer() {
  return `<footer class="footer">
 <div class="container">
  <img class="flogo" src="/assets/brand/logo-sultan-khitan.png" alt="Logo ${esc(C.name)}" loading="lazy" width="260" height="71">
  <p>${esc(C.tagline)}</p>
  <div style="margin-top:1.4rem">${socials()}</div>
  <div class="footer__grid">
   <div><h4>Alamat</h4><p>${esc(C.address)}</p><p style="margin-top:.6rem"><a href="${esc(C.maps)}" target="_blank" rel="noopener noreferrer">Buka di Google Maps →</a></p></div>
   <div><h4>Hubungi</h4><p><a href="${esc(wa(MSG.home))}" target="_blank" rel="noopener noreferrer">WhatsApp ${esc(C.phone)}</a></p><p style="margin-top:.6rem">${esc(hoursText())}${C.hours.confirmed ? '' : '<br><small>Konfirmasi ketersediaan konsultasi &amp; tindakan via WhatsApp.</small>'}</p></div>
   <div><h4>Halaman</h4><ul>${NAV_ALL.map(([h2, l]) => `<li><a href="${h2}">${l}</a></li>`).join('')}</ul></div>
  </div>
  <p class="footer__bar">© ${new Date().getFullYear()} ${esc(C.name)}. Website ini media informasi dan komunikasi, bukan pengganti pemeriksaan atau konsultasi medis.</p>
 </div>
</footer>`;
}

const phero = (crumbs, h1, lead) => `<section class="phero"><div class="container">
<nav class="crumb" aria-label="Breadcrumb"><ol><li><a href="/">Beranda</a></li>${crumbs.map(([h, l]) => `<li>${h ? `<a href="${h}">${l}</a>` : `<span aria-current="page">${l}</span>`}</li>`).join('')}</ol></nav>
<h1 data-split>${h1}</h1><p class="lead" data-reveal>${lead}</p></div></section>`;

const cta = (msg, label = 'Hubungi Sultan Khitan') => `<section class="section" style="padding-bottom:0"><div class="cta" data-reveal>
<h2>Sudah Siap Konsultasi untuk Buah Hati?</h2>
<p>Ceritakan kebutuhan Ayah dan Bunda melalui WhatsApp. Pilihan layanan dan metode akan dikonsultasikan terlebih dahulu.</p>
<div class="actions">${waBtn(msg, label, 'btn--gold')}${btn(C.maps, 'Lihat Lokasi', 'btn--ghost', I.map)}</div></div></section>`;

const badge = (confirmed) => confirmed ? '<span class="badge badge--ok">Layanan utama</span>' : '<span class="badge">Tanyakan ketersediaan</span>';

/* ---------- data ---------- */
const SERVICES = [
  { id: 'khitan', ic: I.crown, t: 'Layanan Khitan', ok: true, d: 'Konsultasikan kebutuhan dan pilihan metode yang sesuai dengan kondisi buah hati bersama tenaga kesehatan yang menangani.', pts: ['Konsultasi awal via WhatsApp', 'Pilihan metode dibahas sebelum tindakan', 'Informasi pendaftaran yang jelas'], msg: 'Halo Sultan Khitan, saya ingin berkonsultasi mengenai layanan khitan untuk anak saya.' },
  { id: 'luka', ic: I.bandage, t: 'Perawatan Luka', ok: false, d: 'Informasi layanan perawatan luka yang tercantum pada materi Sultan Khitan. Ketersediaan dan jenis penanganan dikonfirmasi langsung oleh tim.', pts: ['Konsultasikan kondisi luka terlebih dahulu', 'Ketersediaan layanan dikonfirmasi via WhatsApp'], msg: 'Halo Sultan Khitan, saya ingin bertanya apakah layanan perawatan luka tersedia.' },
  { id: 'cek', ic: I.flask, t: 'Pemeriksaan GDA, Kolesterol & Asam Urat', ok: false, d: 'Pemeriksaan kesehatan dasar yang pernah tercantum pada materi Sultan Khitan. Tanyakan apakah layanan ini masih tersedia.', pts: ['Gula darah (GDA)', 'Kolesterol', 'Asam urat'], msg: 'Halo Sultan Khitan, saya ingin bertanya apakah pemeriksaan GDA, kolesterol, dan asam urat tersedia.' },
  { id: 'kunjungan', ic: I.home, t: 'Kunjungan Rumah', ok: false, d: 'Layanan kunjungan rumah pernah tercantum pada materi Sultan Khitan. Cakupan wilayah, jadwal, dan persyaratannya perlu dikonfirmasi lebih dulu.', pts: ['Cakupan wilayah: tanyakan via WhatsApp', 'Jadwal: tanyakan via WhatsApp', 'Persyaratan: tanyakan via WhatsApp'], msg: 'Halo Sultan Khitan, saya ingin bertanya mengenai kemungkinan layanan kunjungan rumah.' },
];
const METHODS = [
  { id: 'laser', n: 'Laser / Electric Cauter', img: 'alat-sultan1', d: 'Metode yang memanfaatkan alat elektrik (electric cauter) dalam prosesnya. Kesesuaiannya dinilai oleh tenaga kesehatan berdasarkan kondisi anak.' },
  { id: 'klem', n: 'Klem / Super Ring', img: 'alat-sultan2', d: 'Metode yang menggunakan alat klem atau ring khusus. Rincian pemakaian dan perawatannya dijelaskan oleh tenaga kesehatan saat konsultasi.' },
  { id: 'sealer', n: 'Tekno Sealer / Lem', img: 'alat-sultan3', d: 'Metode yang memakai alat sealer dan perekat medis. Apakah cocok untuk anak Anda akan dibahas bersama tenaga kesehatan.' },
];
const ART = [
  ['pra', 'Persiapan orang tua sebelum anak menjalani khitan', ['Ajak anak berbincang dengan bahasa sederhana dan tenang tentang apa yang akan terjadi.', 'Siapkan daftar pertanyaan untuk tenaga kesehatan: metode, proses, dan perawatan setelahnya.', 'Informasikan riwayat kesehatan, alergi, atau obat yang sedang dikonsumsi anak.', 'Siapkan pakaian longgar yang nyaman, dan ikuti arahan tenaga kesehatan terkait makan-minum sebelum tindakan.']],
  ['metode', 'Informasi umum mengenai pilihan metode', ['Terdapat beberapa pilihan metode khitan, dan tidak ada satu jawaban yang pasti cocok untuk semua anak.', 'Pilihan ditentukan bersama tenaga kesehatan setelah melihat kondisi dan kebutuhan anak.', 'Tanyakan: bagaimana prosesnya, bagaimana perawatannya, batasan aktivitas, dan tanda yang perlu diwaspadai.']],
  ['pasca', 'Persiapan setelah tindakan', ['Siapkan pakaian longgar dan tempat istirahat yang nyaman di rumah.', 'Simpan nomor kontak untuk bertanya apabila ada hal yang membuat Ayah dan Bunda ragu.', 'Ikuti arahan obat, jadwal kontrol, dan batasan aktivitas yang diberikan tenaga kesehatan.']],
  ['rawat', 'Perawatan dan kebersihan setelah khitan', ['Ikuti petunjuk perawatan yang diberikan tenaga kesehatan yang menangani.', 'Cuci tangan sebelum dan sesudah menyentuh area tindakan.', 'Jangan memberikan obat, ramuan, atau salep apa pun tanpa anjuran tenaga kesehatan.']],
  ['hubungi', 'Kapan orang tua perlu menghubungi tenaga kesehatan?', ['Segera hubungi bila ada perdarahan yang tidak berhenti, demam, atau nyeri yang makin hebat.', 'Hubungi juga bila muncul bengkak, kemerahan yang meluas, cairan tidak biasa, atau anak sulit buang air kecil.', 'Bila ragu, tanyakan. Untuk kondisi darurat, segera menuju fasilitas gawat darurat terdekat.']],
];
const FAQ = [
  ['Pada usia berapa anak dapat dikhitan?', 'Usia dan kondisi anak dikonsultasikan langsung dengan tenaga kesehatan yang menangani. Hubungi kami via WhatsApp untuk berkonsultasi.'],
  ['Apakah tindakan dijamin tanpa rasa sakit?', 'Kami tidak menjanjikan prosedur bebas nyeri atau bebas risiko. Tenaga kesehatan akan menjelaskan upaya kenyamanan yang tersedia saat konsultasi.'],
  ['Berapa biaya layanan?', 'Biaya dapat ditanyakan langsung melalui WhatsApp agar informasinya selalu yang terbaru.'],
  ['Bagaimana cara mendaftar?', 'Klik tombol WhatsApp, sampaikan kebutuhan Anda, dan tim akan membantu informasi pendaftaran.'],
  ['Apakah ada layanan kunjungan rumah?', 'Kunjungan rumah pernah tercantum pada materi kami. Tanyakan ketersediaan, cakupan wilayah, dan jadwalnya via WhatsApp.'],
  ['Google Maps menampilkan buka 24 jam, apakah tindakan tersedia kapan saja?', 'Informasi 24 jam bersumber dari Google Maps. Ketersediaan konsultasi, pendaftaran, dan tindakan medis sebaiknya dikonfirmasi lebih dulu via WhatsApp.'],
];
const faqHtml = (items) => `<div class="acc">${items.map(([q, a]) => `<details data-reveal><summary>${esc(q)}</summary><div class="body"><p>${esc(a)}</p></div></details>`).join('')}</div>`;

const members = () => {
  if (!C.members.length) return '';
  const logos = C.members.map((m) => `<a href="${esc(m.url || '#')}" target="_blank" rel="noopener noreferrer"><img src="${esc(m.logo)}" alt="${esc(m.name)}" loading="lazy"></a>`).join('');
  return `<section class="section bg-sky"><div class="container"><div class="head"><h2 data-split>Member Of &amp; Professional Credentials</h2></div>
  ${C.members.length >= 5 ? `<div class="marquee"><div class="marquee__in">${logos}${logos}</div></div>` : `<div class="members">${logos}</div>`}</div></section>`;
};

const orgSchema = () => `<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'MedicalClinic', name: C.name,
  url: C.siteUrl || undefined, telephone: '+' + C.waNumber, image: (C.siteUrl || '') + '/assets/brand/logo-sultan-khitan.png',
  address: { '@type': 'PostalAddress', streetAddress: 'Jl. Veteran IX H Leker Gunung Mbah Banten 4 No. 19, Leker, Kramatinggil', addressLocality: 'Gresik', addressRegion: 'Jawa Timur', postalCode: '61121', addressCountry: 'ID' },
  hasMap: C.maps, sameAs: Object.values(C.social),
})}</script>`;

const pages = [];
const add = (p, o) => pages.push({ path: p, ...o });

/* ================= HOME ================= */
const heroWords = (t) => t.split(' ').map((w) => `<span class="w"><i>${w}</i></span>`).join(' ');
add('/', {
  title: 'Khitan Modern Gresik — Layanan Khitan Anak',
  desc: 'Sultan Khitan Gresik: layanan khitan modern yang ramah anak dan informatif. Konsultasi pilihan metode dan pendaftaran mudah via WhatsApp di Gresik, Jawa Timur.',
  ctx: 'home', schema: orgSchema(),
  body: `
<section class="hero" id="top">
 <div class="hero__arcs" aria-hidden="true"><svg viewBox="0 0 800 400"><path d="M40 380 Q400 -140 760 380"/><path d="M110 380 Q400 -60 690 380"/><path d="M180 380 Q400 20 620 380"/></svg></div>
 <div class="container">
  <div class="pill" data-hero>${I.star}<span><b>${C.rating.score}</b> di Google Maps · ${C.rating.count} ulasan · Gresik</span></div>
  <h1 data-hero-title aria-label="Khitan Modern, Pengalaman Lebih Nyaman untuk Buah Hati.">${heroWords('Khitan Modern,')} ${heroWords('Pengalaman Lebih')} ${heroWords('Nyaman untuk')} <em>${heroWords('Buah Hati.')}</em></h1>
  <p class="lead" data-hero>Sultan Khitan Gresik hadir untuk membantu ayah dan bunda mendapatkan informasi layanan khitan dengan pendekatan yang ramah anak, informatif, dan profesional.</p>
  <div class="actions" data-hero>${waBtn(MSG.home, 'Konsultasi Sekarang', 'btn--gold')}${btn('/layanan/', 'Jelajahi Layanan', 'btn--ghost', I.arrow, false)}</div>
  <div class="hero__stage" data-hero-stage>
   <div class="arch arch--s" data-hero-img>${img('papan', '', true, '50% 8%')}</div>
   <div class="arch arch--c" data-hero-img>${img('dok1', '', true, '50% 25%')}</div>
   <div class="arch arch--s" data-hero-img>${img('dok2', '', true, '50% 25%')}</div>
   <div class="float-chip chip-a" data-float>${I.shield}<span>Ramah anak &amp; informatif</span></div>
   <div class="float-chip chip-b" data-float>${I.chat}<span>Konsultasi via WhatsApp</span></div>
  </div>
 </div>
</section>

<section class="trust" aria-label="Informasi bisnis">
 <div class="container"><div class="trust__grid">
  <div class="trust__item"><div class="stars" aria-hidden="true">${I.star}${I.star}${I.star}${I.star}${I.star}</div><div class="trust__num" data-count="5.0" data-dec="1">${C.rating.score}</div><div class="trust__lbl">Rating Google Maps</div></div>
  <div class="trust__item"><div class="trust__num" data-count="${C.rating.count}">${C.rating.count}</div><div class="trust__lbl">Ulasan di Google Maps</div></div>
  <div class="trust__item"><div class="trust__num">Gresik</div><div class="trust__lbl">Jawa Timur</div></div>
  <div class="trust__item"><div class="trust__num trust__num--sm">${esc(C.phone)}</div><div class="trust__lbl">Konsultasi WhatsApp</div></div>
  <div class="trust__item trust__item--last"><div class="trust__num trust__num--sm">Khitan Modern</div><div class="trust__lbl">Layanan yang dapat dikonsultasikan</div></div>
 </div><p class="trust__note">Informasi bisnis dari profil Google Maps, bukan jaminan hasil medis.</p></div>
</section>

<section class="section">
 <div class="container">
  <div class="head"><span class="eyebrow">Layanan Unggulan</span><h2 data-split>Satu tempat untuk berkonsultasi dengan tenang</h2><p class="lead" data-reveal>Mulai dari konsultasi khitan hingga informasi layanan pendukung.</p></div>
  <div class="bento">
   <article class="tile tile--hero b1" data-reveal><span class="ico">${I.crown}</span>${badge(true)}<h3>Layanan Khitan</h3><p>Konsultasikan kebutuhan buah hati, pahami pilihan metode, dan dapatkan informasi pendaftaran dengan jelas sebelum hari tindakan.</p>${btn('/layanan/', 'Lihat layanan', 'btn--gold btn--sm', I.arrow, false)}</article>
   <article class="tile b2 tile--sky" data-reveal><span class="ico">${I.stetho}</span><h3>Pilihan Metode Khitan</h3><p>Kenali metode yang dapat dikonsultasikan.</p>${btn('/metode-khitan/', 'Pelajari metode', 'btn--ghost btn--sm', I.arrow, false)}</article>
   <article class="tile b3" data-reveal><span class="ico">${I.bandage}</span>${badge(false)}<h3>Perawatan Luka</h3><p>Informasi perawatan luka. Tanyakan ketersediaannya.</p></article>
   <article class="tile b4 tile--gold" data-reveal><span class="ico">${I.home}</span>${badge(false)}<h3>Kunjungan Rumah</h3><p>Tanyakan cakupan wilayah, jadwal, dan persyaratannya.</p></article>
   <article class="tile b5" data-reveal><span class="ico">${I.book}</span><h3>Edukasi untuk Orang Tua</h3><p>Persiapan dan perawatan dalam bahasa yang mudah dipahami.</p>${btn('/edukasi/', 'Baca edukasi', 'btn--ghost btn--sm', I.arrow, false)}</article>
  </div>
 </div>
</section>

<section class="section assik" aria-labelledby="assik-h">
 <div class="container">
  <div class="head"><span class="eyebrow">Identitas Pengalaman Sultan Khitan</span><h2 id="assik-h" data-split>Khitan yang <span class="gold">ASSIK</span></h2><p class="lead" data-reveal>Filosofi komunikasi kami dalam menyambut anak dan orang tua. Ini nilai yang kami upayakan, bukan jaminan hasil medis.</p></div>
  <div class="assik__grid">
   ${[['A', 'Aman', 'Mengutamakan komunikasi dan penjelasan yang terarah sebelum tindakan.'], ['S', 'Sehat', 'Mendorong orang tua memahami kebersihan dan perawatan yang sehat.'], ['S', 'Singkat', 'Berupaya membuat proses konsultasi dan pendaftaran praktis.'], ['I', 'Estetik', 'Memperhatikan kerapian dan kenyamanan sesuai penilaian tenaga kesehatan.']].map(([l, w, d], i) => `<div class="assik__item" data-reveal><span class="assik__l" aria-hidden="true">${i === 3 ? 'IK' : l}</span><div class="assik__w">${i === 3 ? 'Estetik' : w}</div><p>${d}</p></div>`).join('')}
  </div>
 </div>
</section>

<section class="section">
 <div class="container split">
  <div class="split__media"><div class="deco" style="inset:-18px 18px 18px -18px" aria-hidden="true"></div><div class="frame frame--arch ratio-34" data-clip data-parallax-wrap>${img('dok3', '', false, '50% 30%')}</div></div>
  <div>
   <span class="eyebrow">Mengapa Sultan Khitan</span><h2 data-split>Alasan Ayah &amp; Bunda merasa lebih tenang</h2>
   <div class="reasons" style="margin-top:2rem">
    ${[['Pendekatan ramah anak dan orang tua', 'Komunikasi hangat sejak konsultasi pertama.'], ['Pilihan layanan yang dapat dikonsultasikan', 'Sesuaikan dengan kondisi dan kebutuhan anak.'], ['Informasi metode yang transparan', 'Penjelasan umum tersedia di halaman Metode Khitan.'], ['Kemudahan konsultasi lewat WhatsApp', 'Tanya dulu, tanpa formulir yang rumit.'], ['Lokasi layanan yang jelas', 'Alamat lengkap dan peta interaktif tersedia.']].map(([t, d], i) => `<div class="reason" data-reveal><span class="n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
   </div>
  </div>
 </div>
</section>

<section class="hs" id="hs" aria-label="Dokumentasi pilihan">
 <div class="hs__pin"><div class="container head"><span class="eyebrow">Dokumentasi Pilihan</span><h2 data-split>Sekilas suasana Sultan Khitan</h2><p class="lead">Geser untuk melihat dokumentasi. Foto ditampilkan dengan seizin yang bersangkutan.</p></div>
 <div class="hs__track" id="hsTrack">
  ${['papan', 'dok1', 'dok2', 'dok3', 'dok4'].filter((k) => photo(k).approved).map((k) => `<figure class="hs__item">${img(k)}<figcaption>${esc(photo(k).cap)}</figcaption></figure>`).join('')}
 </div>
 <p class="hs__hint"><a class="btn btn--ghost btn--sm" href="/galeri/">Buka galeri lengkap</a></p></div>
</section>

${C.video.src ? `<section class="section"><div class="container"><div class="video"><video id="vid" src="${esc(C.video.src)}" poster="${esc(C.video.poster)}" playsinline muted loop preload="none" controls></video></div></div></section>` : ''}

<section class="section">
 <div class="container">
  <div class="head"><span class="eyebrow">Testimoni Pilihan</span><h2 data-split>Kata mereka tentang Sultan Khitan</h2><p class="lead">Ulasan asli dari Google Maps.</p></div>
  <div class="quotes" id="quotes" tabindex="0" aria-roledescription="carousel" aria-label="Testimoni pelanggan">
   ${C.reviews.map((r, i) => `<figure class="quote${i === 0 ? ' is-on' : ''}"><span class="quote__mark" aria-hidden="true">“</span><blockquote>${esc(r)}</blockquote><cite>Ulasan Google Maps · ★★★★★</cite></figure>`).join('')}
   <div class="qctl"><button class="qbtn" id="qprev" aria-label="Testimoni sebelumnya">${I.left}</button><div class="dots" id="qdots">${C.reviews.map((_, i) => `<button aria-label="Testimoni ${i + 1}" ${i === 0 ? 'aria-current="true"' : ''}></button>`).join('')}</div><button class="qbtn" id="qnext" aria-label="Testimoni berikutnya">${I.right}</button></div>
  </div>
  <div class="actions" style="margin-top:2.4rem">${btn(C.maps, 'Lihat Semua Ulasan', 'btn--ghost', I.arrow)}</div>
 </div>
</section>
${cta(MSG.home)}`,
});

/* ================= TENTANG ================= */
add('/tentang-kami/', {
  title: 'Tentang Sultan Khitan Gresik',
  desc: 'Kenali Sultan Khitan Gresik, klinik kesehatan di Gresik dengan pendekatan ramah anak dan komunikasi yang jelas kepada orang tua.',
  ctx: 'home',
  body: `${phero([[null, 'Tentang Kami']], 'Layanan khitan yang hangat untuk anak dan orang tua', 'Mengenal Sultan Khitan Gresik, klinik kesehatan yang berlokasi di Gresik, Jawa Timur.')}
<section class="section" style="padding-top:2rem"><div class="container split">
 <div class="split__media"><div class="frame ratio-34" data-clip>${img('papan', '', true, '50% 10%')}</div></div>
 <div><span class="eyebrow">Profil</span><h2 data-split>Sultan Khitan Gresik</h2>
  <p class="lead" data-reveal style="margin-top:1.2rem">Sultan Khitan Gresik adalah klinik kesehatan di Gresik yang melayani konsultasi dan layanan khitan. Kami ingin ayah dan bunda mendapat informasi yang jelas, sementara anak merasa disambut dengan ramah.</p>
  <p class="lead" data-reveal style="margin-top:1rem">Di Google Maps, Sultan Khitan Gresik memiliki rating ${C.rating.score} dari ${C.rating.count} ulasan.</p>
  <div class="actions" style="margin-top:2rem">${waBtn(MSG.home)}</div></div>
</div></section>

<section class="section bg-sky"><div class="container">
 <div class="head"><span class="eyebrow">Filosofi Pelayanan</span><h2 data-split>Tiga hal yang kami pegang</h2></div>
 <div class="steps" style="counter-reset:s">
  <div class="step" data-reveal><h3>Ramah anak</h3><p>Anak adalah pusat pelayanan. Sapaan, bahasa, dan suasana dibuat agar anak merasa nyaman.</p></div>
  <div class="step" data-reveal><h3>Informasi yang jelas</h3><p>Orang tua berhak memahami pilihan layanan sebelum mengambil keputusan.</p></div>
  <div class="step" data-reveal><h3>Mudah dihubungi</h3><p>Konsultasi dan pendaftaran dapat dimulai langsung lewat WhatsApp.</p></div>
  <div class="step" data-reveal><h3>Dikonsultasikan</h3><p>Pilihan metode dan tindakan dibahas terlebih dahulu dengan tenaga kesehatan yang menangani.</p></div>
 </div></div></section>

<section class="section"><div class="container split split--rev">
 <div class="split__media"><div class="frame frame--arch ratio-34" data-clip>${img('dok2', '', false, '50% 30%')}</div></div>
 <div><span class="eyebrow">Identitas Brand</span><h2 data-split>Mahkota, simbol pelayanan yang bersahaja</h2>
  <p class="lead" data-reveal style="margin-top:1.2rem">Logo Sultan Khitan memadukan mahkota emas dan figur manusia, menggambarkan anak yang dimuliakan dan dilayani dengan penuh perhatian.</p>
  <div style="margin-top:1.6rem" data-reveal><img src="/assets/brand/logo-sultan-khitan.png" alt="Logo ${esc(C.name)}" width="300" height="82" style="margin-inline:auto;width:min(300px,80%)" loading="lazy"></div></div>
</div></section>
${members()}
${cta(MSG.home)}`,
});

/* ================= LAYANAN ================= */
add('/layanan/', {
  title: 'Layanan Khitan dan Layanan Pendukung di Gresik',
  desc: 'Layanan khitan di Sultan Khitan Gresik, serta informasi perawatan luka, pemeriksaan kesehatan, dan kunjungan rumah. Konsultasi dulu via WhatsApp.',
  ctx: 'layanan',
  body: `${phero([[null, 'Layanan']], 'Layanan yang mudah dipahami orang tua', 'Konsultasikan kebutuhan Anda. Layanan dengan label “Tanyakan ketersediaan” perlu dikonfirmasi langsung oleh tim.')}
<section class="section" style="padding-top:1rem"><div class="container">
 ${SERVICES.map((s, i) => `<article class="srow" id="${s.id}"><div class="srow__art" data-reveal>${s.ic}</div><div data-reveal>${badge(s.ok)}<h2>${esc(s.t)}</h2><p>${esc(s.d)}</p><ul>${s.pts.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><div class="actions">${waBtn(s.msg)}${s.id === 'khitan' ? btn('/metode-khitan/', 'Lihat metode', 'btn--ghost', I.arrow, false) : ''}</div></div></article>`).join('')}
 <div class="note" data-reveal><b>Catatan</b>Layanan khitan dapat dikonsultasikan sesuai kondisi dan kebutuhan masing-masing pasien. Layanan lain akan ditampilkan sebagai layanan aktif setelah dikonfirmasi tim Sultan Khitan.</div>
</div></section>
<section class="section bg-sky"><div class="container"><div class="head"><span class="eyebrow">Alur Konsultasi</span><h2 data-split>Mulai dari satu pesan</h2></div>
<div class="steps"><div class="step" data-reveal><h3>Hubungi WhatsApp</h3><p>Kirim pesan ke ${esc(C.phone)}.</p></div><div class="step" data-reveal><h3>Ceritakan kebutuhan</h3><p>Sampaikan usia dan kondisi anak.</p></div><div class="step" data-reveal><h3>Konsultasi pilihan</h3><p>Bahas layanan dan metode yang sesuai.</p></div><div class="step" data-reveal><h3>Jadwalkan</h3><p>Tentukan waktu setelah informasi dikonfirmasi.</p></div></div></div></section>
${cta(MSG.layanan)}`,
});

/* ================= METODE ================= */
add('/metode-khitan/', {
  title: 'Metode Khitan: Laser, Klem, dan Tekno Sealer',
  desc: 'Penjelasan umum pilihan metode khitan di Sultan Khitan Gresik: Laser/Electric Cauter, Klem/Super Ring, dan Tekno Sealer/Lem. Konsultasikan dengan tenaga kesehatan.',
  ctx: 'metode',
  body: `${phero([[null, 'Metode Khitan']], 'Pilihan metode khitan, dijelaskan dengan sederhana', 'Informasi umum untuk membantu orang tua menyiapkan pertanyaan sebelum berkonsultasi.')}
<section class="section" style="padding-top:1rem"><div class="container">
 ${METHODS.map((m) => `<article class="method" id="${m.id}" data-reveal><div class="method__img"><img src="/assets/services/${m.img}.webp" alt="Ilustrasi alat ${esc(m.n)}" loading="lazy" width="277" height="296"></div><div><span class="badge">Tanyakan ketersediaan</span><h2>${esc(m.n)}</h2><p>${esc(m.d)}</p><div class="method__meta"><div><b>Gambaran proses</b>Dijelaskan tenaga kesehatan saat konsultasi.</div><div><b>Perawatan setelah tindakan</b>Arahan perawatan diberikan oleh tenaga kesehatan yang menangani.</div></div>${waBtn(MSG.metode, 'Konsultasi metode ini')}</div></article>`).join('')}
 <div class="note" data-reveal><b>Penting diingat</b>Pilihan metode dan tindakan akan dikonsultasikan terlebih dahulu dengan tenaga kesehatan yang menangani. Kami tidak membandingkan metode mana yang pasti lebih baik, dan ketersediaan setiap metode perlu dikonfirmasi.</div>
</div></section>
<section class="section bg-sky"><div class="container"><div class="head"><span class="eyebrow">Alur Umum</span><h2 data-split>Dari konsultasi sampai perawatan</h2></div>
<div class="steps"><div class="step" data-reveal><h3>Konsultasi awal</h3><p>Orang tua menyampaikan kebutuhan dan kondisi anak.</p></div><div class="step" data-reveal><h3>Pemilihan metode</h3><p>Dibahas bersama tenaga kesehatan.</p></div><div class="step" data-reveal><h3>Tindakan</h3><p>Dilakukan oleh tenaga kesehatan yang menangani.</p></div><div class="step" data-reveal><h3>Perawatan lanjutan</h3><p>Arahan perawatan diberikan setelah tindakan.</p></div></div></div></section>
${cta(MSG.metode, 'Konsultasi Pilihan Metode')}`,
});

/* ================= GALERI ================= */
const CATS = [['semua', 'Semua'], ['layanan', 'Dokumentasi Layanan'], ['keluarga', 'Dokumentasi Keluarga'], ['kegiatan', 'Kegiatan'], ['lokasi', 'Fasilitas dan Lokasi'], ['edukasi', 'Informasi Edukasi']];
const gitems = Object.values(C.photos).filter((p) => p.approved);
add('/galeri/', {
  title: 'Galeri Dokumentasi Sultan Khitan Gresik',
  desc: 'Galeri dokumentasi Sultan Khitan Gresik: layanan, keluarga, kegiatan, serta lokasi. Foto ditampilkan dengan izin yang bersangkutan.',
  ctx: 'home',
  body: `${phero([[null, 'Galeri']], 'Galeri dokumentasi', 'Potret suasana Sultan Khitan. Foto pasien dan keluarga hanya ditampilkan dengan izin publikasi dari yang bersangkutan atau walinya.')}
<section class="section" style="padding-top:1rem"><div class="container">
 <div class="chips" role="group" aria-label="Filter kategori">${CATS.map(([k, l], i) => `<button class="chip" data-cat="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
 <div class="masonry" id="masonry">${gitems.map((p) => `<button class="gitem" data-cat="${p.cat}" data-full="${p.src}" data-cap="${esc(p.cap)}" aria-label="Perbesar foto: ${esc(p.cap)}"><img src="${p.src}" alt="${esc(p.alt)}" loading="lazy" decoding="async"><span>${esc(p.cap)}</span></button>`).join('')}</div>
 <p class="empty" id="empty" hidden>Belum ada dokumentasi untuk kategori ini. Foto baru akan ditambahkan setelah izin publikasi dipastikan.</p>
</div></section>
<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Pratinjau foto"><button class="lb__x" aria-label="Tutup">${I.x}</button><button class="lb__p" aria-label="Foto sebelumnya">${I.left}</button><figure><img id="lbimg" alt=""><figcaption id="lbcap"></figcaption></figure><button class="lb__n" aria-label="Foto berikutnya">${I.right}</button></div>
${cta(MSG.home)}`,
});

/* ================= EDUKASI ================= */
add('/edukasi/', {
  title: 'Edukasi Khitan untuk Orang Tua',
  desc: 'Edukasi khitan untuk orang tua: persiapan sebelum khitan, perawatan setelah tindakan, dan kapan perlu menghubungi tenaga kesehatan.',
  ctx: 'home',
  body: `${phero([[null, 'Edukasi']], 'Edukasi khitan untuk orang tua', 'Informasi umum dengan bahasa sederhana untuk mendampingi anak sebelum dan sesudah khitan.')}
<section class="section" style="padding-top:1rem"><div class="container">
 <div class="note" style="margin-top:0;margin-bottom:2rem" data-reveal><b>Draf edukasi umum</b>Artikel akan ditinjau tenaga kesehatan sebelum diterbitkan final. Informasi ini tidak menggantikan konsultasi medis maupun diagnosis.</div>
 <div class="acc">${ART.map(([id, t, ps], i) => `<details id="${id}" data-reveal ${i === 0 ? 'open' : ''}><summary>${esc(t)}</summary><div class="body"><span class="draft">Menunggu tinjauan tenaga kesehatan</span><ul>${ps.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div></details>`).join('')}</div>
</div></section>
<section class="section bg-sky"><div class="container"><div class="head"><span class="eyebrow">Pertanyaan Umum</span><h2 data-split>Yang sering ditanyakan orang tua</h2></div>${faqHtml(FAQ)}
<div class="actions" style="margin-top:2.4rem">${waBtn(MSG.home, 'Tanya Langsung via WhatsApp')}</div></div></section>
${cta(MSG.home)}`,
});

/* ================= ULASAN ================= */
add('/ulasan/', {
  title: 'Ulasan dan Testimoni Pelanggan',
  desc: `Ulasan Google Maps Sultan Khitan Gresik: rating ${C.rating.score} dari ${C.rating.count} ulasan. Baca testimoni orang tua.`,
  ctx: 'home',
  body: `${phero([[null, 'Ulasan']], 'Kata orang tua yang pernah berkunjung', 'Kutipan ulasan asli dari Google Maps, tanpa diubah.')}
<section class="section" style="padding-top:1rem"><div class="container">
 <div class="head"><div class="rating-big" data-count="5.0" data-dec="1">${C.rating.score}</div><div class="stars" style="margin-top:.6rem" aria-hidden="true">${I.star}${I.star}${I.star}${I.star}${I.star}</div><p class="lead">dari ${C.rating.count} ulasan di Google Maps</p></div>
 ${C.reviews.map((r) => `<figure class="big-quote" data-reveal><blockquote>${esc(r)}</blockquote><figcaption style="margin-top:1rem;color:var(--muted);font-size:.9rem">Ulasan Google Maps</figcaption></figure>`).join('')}
 <div class="actions" style="margin-top:2.5rem">${btn(C.maps, 'Lihat Semua Ulasan di Google Maps', 'btn--gold', I.arrow)}</div>
</div></section>
${cta(MSG.home)}`,
});

/* ================= KONTAK ================= */
add('/kontak/', {
  title: 'Kontak dan Lokasi Sultan Khitan Gresik',
  desc: 'Alamat, WhatsApp 0878-5133-1749, peta Google Maps, dan sosial media Sultan Khitan Gresik, Jl. Veteran IX Leker Gunung Mbah Banten 4 No. 19.',
  ctx: 'kontak',
  body: `${phero([[null, 'Kontak']], 'Hubungi dan kunjungi kami', 'WhatsApp adalah jalur komunikasi utama untuk konsultasi dan pendaftaran.')}
<section class="section" style="padding-top:1rem"><div class="container">
 <div class="cgrid">
  <div class="cinfo" data-reveal><span class="ico">${I.map}</span><h3>${esc(C.name)}</h3><p>${esc(C.address)}</p></div>
  <div class="cinfo" data-reveal><span class="ico">${I.phone}</span><h3>WhatsApp</h3><a href="${esc(wa(MSG.kontak))}" target="_blank" rel="noopener noreferrer"><b>${esc(C.phone)}</b></a></div>
  <div class="cinfo" data-reveal><span class="ico">${I.clock}</span><h3>Jam Operasional</h3><p>${esc(hoursText())}</p>${C.hours.confirmed ? '' : '<small>Mohon konfirmasi via WhatsApp sebelum datang. Ketersediaan konsultasi, pendaftaran, dan tindakan dapat berbeda.</small>'}</div>
 </div>
 <div class="map" data-reveal><iframe title="Peta lokasi ${esc(C.name)}" src="${esc(C.mapsEmbed)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
 <div class="actions" style="margin-top:2rem">${waBtn(MSG.kontak, 'Chat WhatsApp')}${btn(C.maps, 'Buka Google Maps', 'btn--ghost', I.map)}${btn('https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Sultan Khitan Gresik, ' + C.addressShort), 'Petunjuk Arah', 'btn--ghost', I.arrow)}</div>
 <div style="margin-top:2.2rem">${socials()}</div>
</div></section>
<section class="section bg-sky"><div class="container"><div class="head"><span class="eyebrow">Kirim Pesan</span><h2 data-split>Tulis kebutuhan Anda</h2><p class="lead">Formulir ini akan membuka WhatsApp dengan pesan yang sudah terisi.</p></div>
 <form class="form" id="waform"><label>Nama orang tua<input name="nama" autocomplete="name" placeholder="Nama Ayah/Bunda"></label>
 <label>Keperluan<select name="perlu"><option>Informasi pendaftaran khitan</option><option>Konsultasi pilihan metode</option><option>Perawatan luka</option><option>Kunjungan rumah</option><option>Lainnya</option></select></label>
 <label>Pesan<textarea name="pesan" placeholder="Usia anak, pertanyaan, dll. (jangan kirim data kesehatan sensitif lewat formulir)"></textarea></label>
 <button class="btn btn--wa" type="submit">${I.send}<span>Kirim lewat WhatsApp</span></button></form></div></section>
${cta(MSG.kontak)}`,
});

/* ---------- write ---------- */
for (const pg of pages) {
  const dir = path.join(DIST, pg.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout(pg));
}
fs.cpSync(path.join(ROOT, 'assets'), path.join(DIST, 'assets'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets/css'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets/js'), { recursive: true });
fs.copyFileSync(path.join(ROOT, 'src/site.css'), path.join(DIST, 'assets/css/site.css'));
fs.copyFileSync(path.join(ROOT, 'src/main.js'), path.join(DIST, 'assets/js/main.js'));
fs.copyFileSync(path.join(ROOT, 'assets/icons/favicon-32.png'), path.join(DIST, 'favicon.ico'));
const site = C.siteUrl.replace(/\/$/, '');
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}`);
if (site) fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${site}${p.path}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(DIST, '404.html'), `<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Halaman tidak ditemukan</title><body style="font-family:system-ui;text-align:center;padding:4rem 1rem;background:#FAFAF7;color:#102B46"><h1>Halaman tidak ditemukan</h1><p><a href="./">Kembali ke Beranda</a></p>`);
console.log('built', pages.length, 'pages');
