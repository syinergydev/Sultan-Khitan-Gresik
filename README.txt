SULTAN KHITAN GRESIK — WEBSITE
================================
siap-upload/  -> upload ISI folder ini ke root hosting (Netlify, Vercel, cPanel/public_html, dll).
                 URL bersih: /layanan/, /metode-khitan/, dst. Harus di root domain.
sumber/       -> sumber untuk edit: site-config.mjs (data bisnis), build.mjs, src/ (CSS & JS), assets/.
                 Ubah data di site-config.mjs lalu jalankan:  node build.mjs  (hasil di sumber/dist)

YANG PERLU DIKONFIRMASI PEMILIK SEBELUM PUBLIK
1. Jam operasional (saat ini: "Buka 24 jam menurut Google Maps") -> set hours.confirmed=true bila benar.
2. Layanan bertanda "Tanyakan ketersediaan": perawatan luka, pemeriksaan GDA/kolesterol/asam urat, kunjungan rumah, dan 3 metode khitan.
3. Izin publikasi foto anak/keluarga (photos di site-config.mjs; set approved:false untuk menyembunyikan).
4. Artikel edukasi masih draf -> tinjau tenaga kesehatan.
5. Member Of: isi members[] bila ada afiliasi resmi + logo; kosong = bagian tidak tampil.
6. Domain: isi siteUrl untuk canonical, Open Graph, dan sitemap.xml.
7. Video asli: isi video.src untuk menampilkan slot video di Beranda.
Animasi GSAP dimuat dari cdnjs; bila CDN tidak terjangkau, situs tetap tampil utuh tanpa animasi.
