# Struktur Halaman — Given Coffee

Ringkasan susunan halaman dan informasi yang disajikan saat ini. Berguna sebagai acuan saat mengembangkan halaman baru.

## Peta Halaman (Sitemap)

| URL | Halaman | Rute |
|---|---|---|
| `/` | Redirect → `/en` | `Route::redirect` |
| `/{locale}` | Home | `site/home` |
| `/{locale}/about` | About | `site/about` |
| `/{locale}/product` | Product (katalog) | `site/product` |
| `/{locale}/product/{id}` | Product detail | `site/product/show` |
| `/{locale}/process` | Process & Quality | `site/process` |
| `/{locale}/contact` | Contact | `site/contact` |
| `/{locale}/blog` | Blog (daftar artikel) | `site/blog/index` |
| `/{locale}/blog/{slug}` | Blog (detail artikel) | `site/blog/show` |
| `/sitemap.xml` | Sitemap | `SitemapController` |
| `/robots.txt` | Robots | inline route |
| `/admin/*` | Admin panel | blade views |

`{locale}` = `en` (default) atau `id`. Konten utama multi-bahasa via `lang/en.json` & `lang/id.json`; konten dinamis (produk, blog, FAQ, testimonial, settings) dari database.

---

## 1. Home (`site/home`)

| Section | Informasi | Sumber |
|---|---|---|
| Hero | Foto full-width, eyebrow, headline tagline "Connecting Indonesian Highland Specialty Coffee to the World", subtitle, CTA Explore / Request Sample | `home.hero.*` |
| About teaser | Foto kebun + badge kapasitas (100 ton/tahun), cerita singkat, link "Read our story" | `home.about.*` |
| Product highlight | Foto produk besar, nama, subtitle, 4 spec pertama, CTA See full specs / Request Sample | DB produk (`product`) |
| Why us | 4 kartu value prop: Pure origin, Direct trade, Certified exporter, Full traceability | `home.why.items` |
| Testimonials | Grid 3 kolom kutipan pembeli (hanya tampil jika ada data) | DB `testimonials` |
| Ceremony CTA | Foto full-bleed, teks emosional, CTA Request Sample / Request a Quote | `home.ceremony.*` |
| Instagram feed | Section embed widget IG (hanya tampil jika `instagram_embed` diisi) | Settings |

## 2. About (`site/about`)

| Section | Informasi |
|---|---|
| Hero | Judul "The highlands that give...", subtitle (15+ tahun, PT, tersertifikasi) |
| Story | 2 paragraf narasi asal-usul (petani tak terlihat → bermitra langsung, gabung lot per varietas) |
| Origin & sourcing | Foto + narasi dataran tinggi, facts grid: Altitude (on request), Varieties, Process, Capacity 100 ton/tahun |
| Timeline | 5 langkah "From cherry to cargo": Cherry → Processing → Grading → Packing → Shipping |
| Trust & compliance | Section olive — NIB & Halal, bayar saat panen, farm-gate pricing |

## 3. Product (`site/product` + `site/product/show`)

| Section | Informasi |
|---|---|
| Hero | Eyebrow, judul, subtitle, body (green bean B2B) |
| Collection | Alternating section per produk: gambar, nama, subtitle, 4 spec utama, CTA View details |
| **Detail (show)** | Foto galeri interaktif, badge "Specialty Green Beans • Pure Origin", origin badge, story, 4 key specs, CTA WhatsApp + Request Sample, cupping traits, tabel specs lengkap + note, packaging options, related products |

Produk saat ini: 1 produk green bean (produk retail lama dinonaktifkan).

## 4. Process & Quality (`site/process`)

| Section | Informasi |
|---|---|
| Hero | Judul "From highland farm to container, in full view" |
| Journey | 5 langkah visual "Farm to cargo": Harvesting → Processing → Milling & grading → Quality control → Packing & shipping |
| Quality control | 3 kartu: Cupping, Grading, Traceability |
| Export readiness | 4 kartu data: Capacity 100 ton/tahun, Lead time, Shipping terms (FOB/CIF), Documentation |

## 5. Contact (`site/contact`)

| Section | Informasi |
|---|---|
| Hero | Judul "Let's ship your next lot" |
| Form inquiry | Nama, perusahaan, email, negara, quantity, pesan → simpan DB + email |
| Business info | Office/address, email, WhatsApp, jam operasional (dari Settings) |
| Export info | 4 kartu: Markets served, Incoterms, Min order (2 ton), Certifications (NIB & Halal) |
| FAQ B2B | Accordion — dari DB `faqs` (5 item), fallback ke JSON |
| Map | Google Maps embed (Settings → `map_embed`) |

## 6. Blog (`site/blog/index` + `show`)

| Section | Informasi |
|---|---|
| Index | Hero, filter kategori, 1 featured post + grid post lain |
| Show | Cover hero, excerpt, body (blok paragraf/heading), recent posts |

Konten dari DB `posts` + `categories` (CMS admin).

## 7. Admin Panel (`/admin`)

Menu: Dashboard, Posts, Categories, FAQs, Testimonials, Product, Settings, Inquiries.

| Halaman | Fitur |
|---|---|
| Dashboard | Statistik (inquiries/posts/categories/products) + recent lists |
| Posts | CRUD artikel (title/excerpt/content EN+ID, kategori, cover upload, featured, publish) |
| Categories | CRUD kategori (EN/ID, slug) |
| FAQs | CRUD FAQ (question/answer EN+ID, urutan, aktif) |
| Testimonials | CRUD testimonial (name/role/quote EN+ID, foto path, urutan, aktif) |
| Product | Edit produk tunggal (name/story/specs/cupping/packaging, upload foto + spec PDF) |
| Settings | Company, contact (email/WA/address/hours), sosmed, Instagram embed, map embed, GA4, catalog |
| Inquiries | List, detail, status (new/read/replied), delete, **Export CSV** |

---

## Catatan pengembangan (untuk halaman mendatang)

- **Teks statis** diubah via `lang/en.json` & `lang/id.json` + rebuild; **konten dinamis** via admin panel.
- Pola komponen: `PageHero` (banner), `SectionHeading`, `Reveal` (animasi scroll), `Cta`, `Seo` (meta/OG/JSON-LD), `InstagramFeed`, `WhatsAppFloat`.
- Data tambahan bisa dipasang di `SiteController` → Inertia render, lalu render di halaman.
- Halaman baru cukup: route di `routes/web.php` (dalam grup `{locale}`) → method `SiteController` → file `resources/js/pages/site/*.tsx` → terjemahan di `lang/*.json` → tambah ke nav (`site-header.tsx` / `site-footer.tsx`) & sitemap (`SitemapController`).
