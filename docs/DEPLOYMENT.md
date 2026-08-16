# Deploy & CI/CD — Given Coffee

## Alur deploy (otomatis, sudah terpasang)

**Push ke `main` = auto deploy.** Tidak perlu upload manual.

1. Edit kode di lokal
2. `git add . && git commit -m "..." && git push origin main`
3. GitHub Actions menjalankan `.github/workflows/deploy.yml`:
   - Build frontend (`npm run build`) di CI — **server tidak punya Node**
   - `composer install`, `npm ci`
   - Sync kode → `~/givencoffee` (via `tar`-over-SSH, karena server tidak punya `rsync`)
   - Sync `public/build` + assets → `~/public_html`
   - Post-deploy: `composer install --no-dev`, `php artisan migrate --force`, `php artisan optimize`
   - Verifikasi site HTTP 200

## Cek status deploy

```bash
# dari lokal, di folder proyek
gh run list --repo kendikadimas/givencoffee --workflow deploy.yml
gh run view <RUN_ID> --repo kendikadimas/givencoffee
```

## Kredensial server

| Item | Nilai |
|---|---|
| Host / IP | `203.161.184.124` (nama server: `ngampilan`) |
| SSH port | **4422** |
| SSH user | `givencof` |
| cPanel URL | `https://ngampilan.idweb.host:2083/` |
| Lokasi app | `~/givencoffee` (Laravel) |
| Docroot | `~/public_html` (salinan `public`, index.php custom) |
| Domain | `https://givencoffeeid.com` |

## Struktur & aturan penting

- **Server tanpa Node & tanpa rsync.** Build harus di CI; transfer pakai `tar`-over-SSH, jangan `rsync`.
- **`~/public_html/index.php` & `.htaccess` adalah versi custom** yang menunjuk ke `~/givencoffee/`. Jangan pernah di-overwrite saat deploy.
- `.env` produksi **hanya ada di server**, tidak di-git. Jangan timpa saat sync.
- `vendor/` & `node_modules/` tidak di-track git → diinstall ulang oleh workflow.

## GitHub secrets (tersimpan di repo settings)

| Secret | Isi |
|---|---|
| `DEPLOY_SSH_KEY` | Private key deploy (ed25519), public key ada di `~/.ssh/authorized_keys` server |
| `DEPLOY_KNOWN_HOSTS` | Host key `[203.161.184.124]:4422 ssh-ed25519 AAAA...` |
| `DEPLOY_HOST` | `203.161.184.124` |
| `DEPLOY_PORT` | `4422` |
| `DEPLOY_USER` | `givencof` |

## Manual test SSH dari lokal (Windows)

```powershell
ssh -i <path/to/deploy_ed25519> -p 4422 givencof@203.161.184.124
# perbaiki permission file key bila diblokir:
icacls <path> /inheritance:r
icacls <path> /grant:r "$env:USERNAME:R"
```

## Jika deploy gagal

1. Cek log: `gh run view <RUN_ID> --log-failed`
2. Gagal di **Build frontend** → biasanya `vendor/` hilang (butuh `composer install`) atau `.env` belum dibuat untuk wayfinder. Workflow sudah mengurus keduanya; cek error di log.
3. Gagal di **Sync/Post-deploy** → cek koneksi SSH & permission key.

## Checklist konten baru

- [ ] Ubah konten di `lang/en.json` & `lang/id.json` (teks statis tidak bisa diedit dari admin panel)
- [ ] Produk & settings (email/WA/alamat/map) bisa diedit dari **admin panel** (`/admin`)
- [ ] Commit & push → auto deploy

## Email & upload media

- **Email inquiry**: server memakai `MAIL_MAILER=sendmail` (placeholder). Untuk pakai akun email cPanel (mis. `export@givencoffeeid.com`): buat akun di cPanel → set di `~/givencoffee/.env`: `MAIL_MAILER=smtp`, `MAIL_HOST=mail.givencoffeeid.com`, `MAIL_PORT=465`, `MAIL_USERNAME`, `MAIL_PASSWORD`, lalu `php artisan config:clear`. Ubah `.env` di server saja (tidak di-git).
- **Upload media** (produk/post PDF & foto): tersimpan di `~/public_html/uploads` (docroot) via disk `uploads` → di-serve di `/uploads/...`. `UPLOADS_DISK_ROOT` di `.env` server harus menunjuk `~/public_html/uploads`. Lokal default ke `public/uploads` (gitignored).

## Fitur admin panel

- **Posts** (blog CMS), **Categories**, **FAQs** (ditampilkan di halaman contact, editable), **Testimonials** (ditampilkan di homepage bila ada data), **Product** (termasuk upload foto & spec PDF), **Settings** (kontak, sosmed, Instagram embed code, GA4, map), **Inquiries** (list, detail, status, **Export CSV**).
- **Instagram feed**: paste embed code (LightWidget/SnapWidget) di Admin → Settings → "Instagram feed embed code". Section tampil di homepage hanya jika embed diisi.
- **WhatsApp float button**: muncul otomatis di semua halaman bila `whatsapp_url` terisi (Admin → Settings).
