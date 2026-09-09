# Panduan Penggunaan Admin Panel — Given Coffee

Dokumen ini berisi panduan lengkap tata cara penggunaan dan pengelolaan konten website **Given Coffee** (`https://givencoffeeid.com`) melalui Admin Panel.

---

## Daftar Isi
1. [Akses & Akses Masuk (Login)](#1-akses--akses-masuk-login)
2. [Ringkasan Dashboard](#2-ringkasan-dashboard)
3. [Pengelolaan Artikel Jurnal (Posts)](#3-pengelolaan-artikel-jurnal-posts)
4. [Pengelolaan Kategori (Categories)](#4-pengelolaan-kategori-categories)
5. [Pengelolaan FAQ (Frequently Asked Questions)](#5-pengelolaan-faq-frequently-asked-questions)
6. [Pengelolaan Testimoni B2B (Testimonials)](#6-pengelolaan-testimoni-b2b-testimonials)
7. [Pengelolaan Spesifikasi Produk (Product)](#7-pengelolaan-spesifikasi-produk-product)
8. [Pengaturan Website (Settings)](#8-pengaturan-website-settings)
9. [Pengelolaan Inquiry / Pesanan Sampel (Inquiries)](#9-pengelolaan-inquiry--pesanan-sampel-inquiries)
10. [Panduan Alur Deployment & Sinkronisasi](#10-panduan-alur-deployment--sinkronisasi)

---

## 1. Akses & Akses Masuk (Login)

### URL Halaman Login
- **URL Admin:** `https://givencoffeeid.com/login`
- Setelah sukses login, sistem akan otomatis mengarahkan ke halaman **Dashboard Admin** (`https://givencoffeeid.com/admin`).

### Akun Bawaan (Default Account)
- **Email:** `admin@givencoffeeid.com`
- **Password:** `password123`

> 💡 **Saran Keamanan:** Setelah login pertama kali di lingkungan produksi, sangat disarankan untuk memperbarui password melalui menu pengaturan akun atau database.

---

## 2. Ringkasan Dashboard (`/admin`)

Halaman utama admin menampilkan statistik cepat dan aktivitas terbaru:
- **Metrik Utama:** Jumlah *Inquiries* (Pesan Masuk Baru), *Posts* (Artikel), *Categories* (Kategori), dan *Products* (Produk Aktif).
- **Recent Inquiries:** 5 pesan masuk terbaru dari formulir kontak.
- **Recent Posts:** 5 artikel terbaru beserta status publikasinya (Published / Draft).

---

## 3. Pengelolaan Artikel Jurnal (Posts)

Menu **Posts** (`/admin/posts`) digunakan untuk menambah, mengedit, dan menghapus artikel di halaman **Journal/Blog**.

### Menambah atau Mengedit Artikel (`/admin/posts/create` atau `/admin/posts/{id}/edit`)

#### Komponen Form:
1. **Title (EN) & Judul (ID):** Judul artikel dalam bahasa Inggris dan bahasa Indonesia (Wajib).
2. **Slug:** Identifikasi unik URL artikel (misal: `lake-toba-volcanic-terroir`). Jika dikosongkan, sistem akan membuat slug otomatis berdasarkan Judul EN.
3. **Category:** Kategori artikel (misal: *Origin*, *Process*, atau *Market*).
4. **Cover Image:** Gambar sampul artikel.
   - **Spesifikasi Rekomendasi:** Orientasi landscape (16:9 atau 16:10), format `JPG`, `PNG`, atau `WebP`, ukuran maks **5 MB**.
   - File tersimpan di folder `/uploads/posts/` dan terintegrasi otomatis dengan server.
5. **Excerpt (EN & ID):** Ringkasan singkat artikel (1–2 kalimat, maks 250 karakter). Digunakan pada kartu artikel di halaman Jurnal dan meta deskripsi SEO.
6. **Content Editor (EN & ID) — Rich Text Editor (Quill.js):**
   - **Header 2 (H2):** Gunakan dropdown toolbar untuk membuat Sub-Judul bagian. Sub-judul akan dirender dalam fontPlayfair khas Given Coffee di website.
   - **Formatting Teks:** Mendukung **Bold (B)**, *Italic (I)*, <u>Underline (U)</u>, serta daftar berpoin/berangka (*Numbered/Bullet List*).
   - **Teks Otomatis Reflow:** Teks paragraf akan menyesuaikan lebar kontainer secara aman tanpa keluar ke samping.
7. **Opsi Publikasi:**
   - ☑ **Published:** Centang agar artikel langsung terbit di website.
   - ☑ **Featured:** Centang untuk menjadikan artikel utama yang tampil besar di bagian atas halaman Jurnal.

---

## 4. Pengelolaan Kategori (Categories)

Menu **Categories** (`/admin/categories`) mengelompokkan artikel jurnal.

- **Name (EN & ID):** Nama kategori (contoh: `Origin / Asal-Usul`, `Process / Pengolahan`, `Market / Pasar`).
- **Slug:** URL identifier kategori (misal: `origin`, `process`, `market`).
- Kategori digunakan sebagai filter di bagian atas halaman Jurnal (`/en/blog` & `/id/blog`).

---

## 5. Pengelolaan FAQ (Frequently Asked Questions)

Menu **FAQs** (`/admin/faqs`) mengelola pertanyaan umum B2B yang tampil di halaman **Contact** (`/en/contact`).

### Fitur Pengelolaan:
- **Tambah FAQ Baru:** Masukkan Pertanyaan (EN & ID) dan Jawaban (EN & ID).
- **Proteksi Anti-Double Submit:** Tombol submit otomatis terkunci saat diklik untuk mencegah duplikasi data akibat double-click.
- **Urutan Tampil (Sort Order):** Angka urutan tampilan di website. Semakin kecil angkanya, semakin atas posisinya.
- **Toggle Active:** Centang checkbox *Active* untuk menampilkan/menyembunyikan FAQ di website secara instant.
- **Edit & Delete:** Klik **Edit** untuk membuka modal formulir ubah data, atau **Delete** untuk menghapus FAQ dengan konfirmasi.

---

## 6. Pengelolaan Testimoni B2B (Testimonials)

Menu **Testimonials** (`/admin/testimonials`) mengelola ulasan pembeli internasional yang tampil di halaman utama (**Home**).

### Struktur Data:
- **Name (EN & ID):** Nama pembeli / perwakilan (contoh: `Marcus Vance`).
- **Role (EN & ID):** Jabatan dan nama perusahaan (contoh: `Head of Sourcing, Apex Coffee Roasters (UK)`).
- **Quote (EN & ID):** Isi ulasan/testimoni dalam bahasa Inggris dan Indonesia.
- **Photo Path:** Path foto pembeli (opsional). Jika dikosongkan, sistem akan menampilkan inisial nama dengan lingkaran warna Terra.
- **Tampilan di Website:** Halaman utama (`Home`) secara otomatis menampilkan hingga 3 testimoni aktif terbaru.

---

## 7. Pengelolaan Spesifikasi Produk (Product)

Menu **Product** (`/admin/product`) digunakan untuk memperbarui lembar data teknis produk unggulan **Specialty Arabica Lintong Doloksanggul**.

### Data yang Dikelola:
- **Title & Subtitle:** Nama dan deskripsi singkat produk.
- **Specification Table:** Data teknis (MASL, Moisture %, Cupping Score 85.5+, Defect Rate, Screen Size, Harvest Period, dll.).
- **Spec Sheet PDF Upload:** Unggah file PDF lembar spesifikasi resmi (`/uploads/specs/`). File ini dapat diunduh langsung oleh pembeli B2B dari halaman produk.
- **Product Images:** Gambar galeri produk green beans.

---

## 8. Pengaturan Website (Settings)

Menu **Settings** (`/admin/settings`) mengelola informasi kontak, media sosial, dan widget pihak ketiga.

### Opsi Pengaturan:
1. **General Information:**
   - `company_name`: Nama perusahaan (`Given Coffee`).
   - `email` & `email_sample`: Email utama & email khusus permintaan sampel.
   - `phone` & `whatsapp`: Nomor telepon/WhatsApp (`+62 852 6225 0583`).
   - `address`: Alamat kantor & fasilitas gudang di Dolok Sanggul.
   - `hours`: Jam operasional.

2. **Social Media & Embeds:**
   - Link akun Instagram, Facebook, LinkedIn, dan YouTube.
   - **Instagram Feed Embed Code:** Tempat menempelkan (*paste*) kode widget Instagram dari **Elfsight**, **LightWidget**, atau **SnapWidget**.
     
     *Contoh Kode Elfsight:*
     ```html
     <script src="https://elfsightcdn.com/platform.js" async></script>
     <div class="elfsight-app-2d750e55-b001-4972-b491-4370cd80c0de" data-elfsight-app-lazy></div>
     ```
     > 📌 **Ukuran Otomatis:** Widget Elfsight telah dikonfigurasi untuk tampil proporsional di tengah halaman utama tanpa meluap/terlalu besar.

3. **Google Maps Embed:** Kode `<iframe>` peta lokasi Google Maps yang tampil di halaman kontak.

---

## 9. Pengelolaan Inquiry / Pesanan Sampel (Inquiries)

Menu **Inquiries** (`/admin/inquiries`) menyimpan semua formulir yang dikirimkan oleh pembeli B2B melalui halaman kontak.

### Fitur:
- **Daftar Pesan:** Menampilkan Nama Pembeli, Perusahaan, Email, Negara, Estimasi Kebutuhan Tahunan (Ton), dan Alamat Kirim Sampel.
- **Status Pesan:**
  - `New` (Pesan Baru - ditandai badge merah di sidebar)
  - `Read` (Sudah Dibaca)
  - `Replied` (Sudah Dibalas)
- **Export CSV:** Tombol untuk mengunduh seluruh data inquiry ke dalam file spreadsheet Excel/CSV.

---

## 10. Panduan Alur Deployment & Sinkronisasi

Sistem ekosistem Given Coffee telah terintegrasi dengan **GitHub Actions CI/CD** yang terhubung ke server cPanel shared hosting:

### Alur Kerja Pengembang (Developer Workflow):
1. Pengembang melakukan update kode atau template secara lokal.
2. Menjalankan `npm run build` untuk menguji kompabilitas frontend.
3. Melakukan `git push` ke branch `main` di repository GitHub (`kendikadimas/givencoffee`).
4. **Otomatisasi CI/CD:** GitHub Actions akan otomatis:
   - Meng-install dependencies PHP & Node.js
   - Membangun aset frontend (`npm run build`)
   - Mengirimkan kode aplikasi & file aset build ke server cPanel secara otomatis via SSH
   - Jalankan `php artisan migrate --force` dan `php artisan optimize` di server.

### Catatan Pengelola Admin:
- Pengelola Admin dapat menambah, mengedit, atau menghapus artikel, testimoni, FAQ, dan inquiry secara langsung dari Admin Panel tanpa perlu melakukan `git push` atau deploy ulang.
- Seluruh file yang diunggah (*cover image*, *pdf spec*, foto) akan tersimpan secara permanen di direktori `public_html/uploads/` pada server.

---

*Dokumen ini dibuat otomatis sebagai panduan resmi pengoperasian Admin Panel Given Coffee.*
