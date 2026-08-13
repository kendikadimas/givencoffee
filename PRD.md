# PRD — Website Company Profile Given Coffee

**Produk:** Website company profile / corporate site untuk bisnis ekspor kopi
**Paket:** Korporat (25 halaman custom, multi-bahasa, admin panel, audit)
**Tech stack:** Laravel 13 (backend) + React 19 / Inertia 3 (frontend), TypeScript, Tailwind 4, shadcn/ui, Vite
**Status:** Draft v1

---

## 1. Ringkasan & Tujuan

Website Given Coffee berfungsi sebagai **katalog korporat digital dan pintu masuk B2B** — menampilkan brand, produk, proses produksi, dan kredibilitas ekspor. Target utama bukan pembeli retail, melainkan **importir, distributor, roastery, dan pembeli wholesale di luar negeri** yang butuh informasi teknis (spec produk, MOQ, incoterms, kapasitas) sebelum menghubungi tim penjualan.

### Goals bisnis
- Menghasilkan **lead B2B** (inquiry wholesale) melalui halaman Contact / Wholesale Inquiry.
- Membangun **kepercayaan ekspor** lewat transparansi proses, sertifikasi, dan data produk.
- Menjadi **sumber informasi resmi** (brand guide) yang bisa dikirim ke calon buyer.

### KPI
| Metrik | Target |
|---|---|
| Inquiry form terkirim | ≥ 10/bulan |
| Waktu muat (LCP) | < 2.5s (desktop) |
| SEO: halaman terindeks Google | 100% halaman utama |
| Bounce rate halaman produk | < 40% |

---

## 2. Cakupan Paket Korporat

Fitur yang disepakati dari paket korporat:

| Fitur | Status |
|---|---|
| Hingga 25 halaman custom | ✅ (5 halaman inti + halaman konten/artikel) |
| Multi-bahasa | ✅ (EN default, switch ke ID) |
| Admin panel | ✅ (kelola konten halaman, produk, artikel) |
| Performance + SEO audit | ✅ (diaudit, hasil diserahkan) |
| Source code diserahkan | ✅ |
| Blog / Artikel (CMS) | ✅ |
| SEO + Google Analytics | ✅ (meta, sitemap, GA4) |
| Google Maps embed + formulir | ✅ |
| Integrasi media sosial | ✅ (link footer + social feed opsional) |

---

## 3. Persona & Pengguna

1. **Importir / Distributor internasional** — butuh spec produk, MOQ, incoterms, kapasitas. Fokus: halaman Product, Contact.
2. **Roastery / coffee shop di luar negeri** — tertarik origin, roast profile, cupping notes, sampling. Fokus: Product, Process.
3. **Agen pengadaan / brand kopi** — butuh private label / packaging option. Fokus: Product, Packaging.
4. **Konsumen / pembaca umum** — membaca story & artikel brand.

---

## 4. Struktur Situs & Spesifikasi Halaman

> Referensi gaya: foto full-bleed, tipografi serif besar pada headline (gaya "FEEL MORE THAN CAN"), spacing lebar, teks emosional pendek, CTA jelas. Semua halaman responsif.

### 4.1 Home (`/`)
1. **Hero** — foto full-width biji kopi / roasting close-up; headline besar serif ("TASTE THE ORIGIN..."), tagline pendek, CTA "Explore →".
2. **About Teaser** — split layout (foto petani/kebun kiri, teks origin story singkat kanan).
3. **Product Highlight** — 1 hero product shot dengan spec singkat (origin, roast level, cupping notes).
4. **Why Us / Value Props** — 3–4 kartu icon+teks (single-origin, direct trade, certified export, traceability).
5. **Ceremony-style CTA** — full-bleed foto brewing/cupping, teks emosional, tombol "Request Sample" / "Download Catalog".
6. **Footer** — nav, kontak, media sosial.

### 4.2 About / Origin Story (`/about`)
1. **Hero banner** — foto kebun/pegunungan.
2. **Company Story** — narasi dengan beberapa kata kunci di-bold.
3. **Origin & Farm** — peta/lokasi kebun, ketinggian, varietas, foto petani.
4. **Process Timeline** — cherry → pulping → drying → roasting (visual step/flow).
5. **Sustainability** — komitmen keberlanjutan (teks/foto). Section sertifikasi/logo **ditunda** karena belum ada sertifikasi resmi; struktur siap ditambah nanti.
6. **Founder / Team Quote** — foto + kutipan pendek.

### 4.3 Product (`/product`)
1. **Hero product shot** — kemasan + biji kopi (styling seperti tin "ELLISE TEA").
2. **Product Story** — varietas, proses, profil rasa.
3. **Specs table** — origin, altitude, process (washed/natural/honey), roast profile, packaging options, MOQ, HS code (B2B).
4. **Cupping Notes** — visual flavor wheel/notes (fruity, nutty, chocolate, dll).
5. **Packaging Options** — foto varian (green bean bag, roasted retail, private label).
6. **Download Spec Sheet CTA** — untuk buyer B2B.

### 4.4 Process & Quality (`/process`)
1. **Farm to Cup Visual Journey** — full-bleed per tahap (harvesting, sorting, drying, roasting, packing), gaya foto tangan + teks emosional.
2. **Quality Control** — grading system, cupping score, lab test.
3. **Export Readiness** — kapasitas produksi, lead time, shipping terms (FOB/CIF), sertifikat ekspor.

### 4.5 Contact / Wholesale Inquiry (`/contact`)
1. **Hero** — foto kopi siap kirim / pelabuhan.
2. **Contact Form (B2B)** — nama, perusahaan, negara, jumlah order, pesan.
3. **Business Info** — alamat, WhatsApp Business, email, jam operasional.
4. **Export Info** — negara tujuan yang dilayani, incoterms, min order.
5. **Google Maps embed + lokasi.**
6. **Footer** — sama dengan home.

### 4.6 Blog / Artikel (CMS)
- Daftar artikel (`/blog`) + detail artikel (`/blog/{slug}`).
- Kategori, tag, pencarian dasar, pagination.
- Artikel contoh: asal-usul kopi, proses roasting, guide membeli kopi ekspor, berita brand.

---

## 5. Fitur Fungsional

### 5.1 Multi-bahasa
- Dukungan locale: **EN (default), ID** — struktur siap untuk bahasa lain.
- Switcher bahasa di header/footer.
- URL ber-awalan locale (`/en`, `/id`) — **diputuskan: path**, root `/` redirect ke `/en`.
- Terjemahan konten statis (UI) + konten dinamis (artikel/halaman) lewat admin.

### 5.2 Admin Panel
- CRUD: halaman statis, produk, artikel, kategori, testimoni/quote, foto/galeri.
- Kelola pengaturan kontak (email, WhatsApp, alamat, media sosial).
- Upload media (foto, spec sheet PDF).
- Autentikasi admin (sesi + Fortify, sudah tersedia dari starter kit).

### 5.3 SEO & Analytics
- Meta title/description/OG per halaman.
- Sitemap.xml + robots.txt.
- Canonical, struktur heading semantik, alt text.
- Google Analytics 4 (GA4) terpasang + Google Tag Manager opsional.
- Schema.org (Organization, Product, LocalBusiness, Article).

### 5.4 Lainnya
- Google Maps embed di Contact.
- Formulir inquiry B2B dengan validasi + notifikasi email / simpan ke admin.
- Link media sosial (Instagram, Facebook, LinkedIn, WhatsApp).
- **Performance + SEO audit** di akhir proyek, laporan hasil diserahkan.

---

## 6. Persyaratan Non-Fungsional

| Aspek | Requirement |
|---|---|
| Performa | LCP < 2.5s, gambar di-optimasi (WebP/AVIF), lazy-load, font subset |
| Responsif | Mobile-first, semua viewport (≤360px hingga desktop) |
| Aksesibilitas | Kontras AA, label form, navigasi keyboard, alt text |
| Keamanan | Form validated server-side, rate-limit, file upload di-scan, HTTPS |
| SEO | Struktur URL bersih, breadcrumb, internal link |
| Bahasa | Konten UI dapat diganti tanpa ubah kode |

---

## 7. Teknologi & Arsitektur

- **Backend:** Laravel 13 (PHP 8.4), **MySQL** (dev: SQLite/Laragon; prod shared hosting → MySQL).
- **Frontend:** React 19 + Inertia 3 (SPA tanpa API terpisah), TypeScript.
- **Styling:** Tailwind CSS 4 + shadcn/ui.
- **Build:** Vite 8 — build dilakukan lokal, **hasil build (`public/build`) ikut di-deploy** (shared hosting tanpa Node).
- **CMS:** Custom admin di atas Laravel + Inertia (bukan package pihak ketiga).
- **Auth admin:** Fortify + sesi (dari starter kit).
- **Hosting:** shared hosting milik klien — implikasi: tanpa SSH/Node, pakai PHP-FPM + MySQL, symlink `public` ke docroot, deploy via upload FTP/file manager.

---

## 8. Konten & Aset yang Dibutuhkan dari Klien

> List ini untuk cross-check sebelum produksi konten.

- [ ] Foto: biji kopi, roasting, kebun/petani, produk (kemasan), brewing/cupping, pelabuhan/siap kirim — resolusi tinggi.
- [ ] Logo + versi warna.
- [ ] Narasi brand & origin story (teks).
- [ ] Data produk: origin, altitude, varietas, proses, roast profile, cupping notes, HS code, MOQ, packaging options.
- [ ] Data ekspor: kapasitas produksi, lead time, incoterms, negara tujuan, sertifikat ekspor.
- [ ] ~~Logo sertifikasi~~ — **tidak ada (ditunda)**; gunakan placeholder section sustainability.
- [ ] Foto founder/team + kutipan.
- [ ] Alamat, WhatsApp Business, email, jam operasional, media sosial.
- [ ] Spec sheet PDF (atau data untuk dibuatkan).

---

## 9. Alur Pengiriman / Milestone

| Fase | Deliverable |
|---|---|
| 1. Discovery & konten | Brief konten final, kumpul aset |
| 2. Desain | Wireframe → mockup high-fidelity (5 halaman inti) |
| 3. Pengembangan | Setup (selesai) → halaman inti → blog → admin panel → multi-bahasa |
| 4. Integrasi | GA4, Maps, form, media sosial, SEO teknis |
| 5. Audit & UAT | Performance + SEO audit, perbaikan, testing lintas perangkat |
| 6. Launch | Deploy, handover source code + dokumentasi + akses admin |

---

## 10. Keputusan & Asumsi (Confirmed)

| # | Item | Keputusan |
|---|---|---|
| 1 | Bahasa | **English default, switch ke Indonesia** (switcher header) |
| 2 | Jumlah produk | **1 produk** — halaman Product single-product; struktur reusable untuk tambahan nanti |
| 3 | Sertifikasi | **Belum ada** — section sustainability pakai komitmen/foto; slot logo disiapkan |
| 4 | Hosting | **Shared hosting klien** — build lokal, deploy via upload, MySQL, no-Node di server |
| 5 | Halaman tambahan | **Belum terencana** — tetap dalam kuota 25; tambahan bisa dibuat nanti |
| 6 | Tone visual | **Earth tone** — warm browns, cream, terracotta; serif editorial untuk headline |

### Open question tersisa
- ~~Subdomain vs path locale~~ — **diputuskan: path** (`/en`, `/id`).
- ~~Domain~~ — **diputuskan: givencoffeeid.com** (prod APP_URL = `https://givencoffeeid.com`).

---

## 11. Definition of Done

- [ ] Semua halaman di atas responsif & tervalidasi.
- [ ] Form inquiry mengirim data ke admin + notifikasi email.
- [ ] Multi-bahasa berfungsi penuh (konten + URL + switcher).
- [ ] Admin panel dapat mengelola semua konten dinamis tanpa sentuh kode.
- [ ] GA4 + sitemap + meta SEO aktif.
- [ ] Laporan audit performa & SEO diserahkan.
- [ ] Source code + akses admin + dokumentasi handover diserahkan ke klien.
