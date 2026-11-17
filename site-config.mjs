// ============================================================
//  KONFIGURASI SULTAN KHITAN GRESIK
//  Edit file ini untuk mengubah nomor, alamat, jam, sosial media,
//  layanan, ulasan, dsb. Lalu jalankan:  node build.mjs
//  (hasil website ada di folder /dist — upload isi folder itu ke hosting)
// ============================================================
export default {
  siteUrl: '',                       // isi mis. 'https://sultankhitan.id' bila domain sudah ada (untuk canonical, OG, sitemap)
  name: 'Sultan Khitan Gresik',
  category: 'Klinik Kesehatan',
  tagline: 'Layanan Khitan Modern, Anak Nyaman, Orang Tua Tenang.',
  phone: '0878-5133-1749',
  waNumber: '6287851331749',
  address: 'Jl. Veteran IX H Leker Gunung Mbah Banten 4 No. 19, Leker, Kramatinggil, Kecamatan Gresik, Kabupaten Gresik, Jawa Timur 61121',
  addressShort: 'Jl. Veteran IX H Leker Gunung Mbah Banten 4 No. 19, Gresik',
  maps: 'https://maps.app.goo.gl/bWo1jgNGyx4ig7pQ6',
  mapsEmbed: 'https://www.google.com/maps?q=Sultan+Khitan+Gresik+Jl.+Veteran+IX+H+Leker+Gunung+Mbah+Banten+4+No.+19+Gresik&output=embed',
  social: {
    instagram: 'https://www.instagram.com/ahli.khitan',
    tiktok: 'https://www.tiktok.com/@sultan_khitan',
    facebook: 'https://www.facebook.com/share/1JV8xiZC4W/',
  },
  rating: { score: '5,0', count: 20 },
  // Jam operasional: sesuai Google Maps. Ubah confirmed -> true setelah pemilik memastikan.
  hours: { label: 'Buka 24 jam', source: 'Google Maps', confirmed: false },
  // Slot video asli (opsional). Isi src dengan file video milik Sultan Khitan, mis. '/assets/hero/profil.mp4'
  video: { src: '', poster: '' },
  // Member Of — HANYA isi bila ada afiliasi resmi + izin logo. Kosong = bagian disembunyikan.
  // Contoh: { name: 'Nama Organisasi', logo: '/assets/team/logo-org.png', url: 'https://...' }
  members: [],
  // Foto dokumentasi. Set approved:false untuk menyembunyikan foto sampai izin publikasi dari wali pasien dipastikan.
  photos: {
    papan:  { src: '/assets/gallery/papan-nama.webp',   approved: true, cat: 'lokasi',  alt: 'Papan nama Sultan Khitan di depan lokasi layanan di Gresik', cap: 'Papan nama Sultan Khitan' },
    dok1:   { src: '/assets/gallery/dokumentasi-1.webp', approved: true, cat: 'layanan', alt: 'Dokumentasi tenaga layanan Sultan Khitan bersama pasien anak', cap: 'Dokumentasi layanan' },
    dok2:   { src: '/assets/gallery/dokumentasi-2.webp', approved: true, cat: 'keluarga', alt: 'Dokumentasi tenaga layanan Sultan Khitan bersama anak dengan pose jempol', cap: 'Dokumentasi bersama keluarga' },
    dok3:   { src: '/assets/gallery/dokumentasi-3.webp', approved: true, cat: 'keluarga', alt: 'Dokumentasi anak bersama petugas Sultan Khitan', cap: 'Dokumentasi bersama keluarga' },
    dok4:   { src: '/assets/gallery/dokumentasi-4.webp', approved: true, cat: 'layanan', alt: 'Dokumentasi anak setelah berkonsultasi di Sultan Khitan', cap: 'Dokumentasi layanan' },
  },
  // Ulasan asli Google Maps — jangan diubah isinya.
  reviews: [
    'Pelayanan ramah n terbaik. Terimakasih sultan.khitan',
    'Rekomendasi untuk ayah bunda jika berniat khitankan buah hatinya.',
    'Proses cepat, biaya terjangkau, ramah sekali petugasnya.. rekomen khitan.',
  ],
};
