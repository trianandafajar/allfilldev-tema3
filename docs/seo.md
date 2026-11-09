# SEO, GEO, sitemap

Catatan setup. Dokumen ini diperbarui seiring fitur ditambah; bagian "Belum dikerjakan" adalah daftar kerja berikutnya.

"GEO" di sini berarti Generative Engine Optimization (agar muncul/terkutip di jawaban AI). SEO lokal (area layanan, alamat) dicatat terpisah di bagian terakhir.

## Yang sudah ada

| Fitur | File | Keterangan |
| --- | --- | --- |
| Identitas situs | `src/config/site.ts` | `siteConfig` (nama, deskripsi, bahasa, locale, url) dan `sitePages` (daftar halaman publik) |
| Metadata global | `src/app/layout.tsx` | `metadataBase`, title template `%s \| <nama situs>`, description, Open Graph, Twitter, `viewport.themeColor` |
| Metadata per halaman | `src/lib/seo.ts` (`pageMetadata`) | Title, description, canonical, Open Graph, dan Twitter dalam satu panggilan; dipakai semua `page.tsx` dan `generateMetadata` |
| Ikon | `src/app/favicon.ico`, `icon.png`, `apple-icon.png` | Dibuat dari logo `public/images/banner/preloader.png` (ico 16/32/48, icon 192, apple-icon 180 dengan latar putih) |
| Manifest | `src/app/manifest.ts` | Nama, warna tema, dan ikon untuk "Add to Home Screen" |
| OG image | `src/app/opengraph-image.tsx` | 1200x630, dirender saat build dari logo + `siteConfig.name` + `siteConfig.tagline` |
| robots.txt | `src/app/robots.ts` | Izinkan semua, tunjuk ke sitemap |
| sitemap.xml | `src/app/sitemap.ts` | Dibuat dari `sitePages` |
| llms.txt | `src/app/llms.txt/route.ts` | Ringkasan situs untuk AI, dibuat dari `siteConfig` + `sitePages` |
| JSON-LD | `src/components/seo/json-ld.tsx` | `Organization` + `LocalBusiness` (alamat, geo, telepon, email dari `siteConfig.business`) dan `WebSite` di layout; `Product` + `BreadcrumbList` di detail produk |
| Helper | `src/lib/seo.ts` | `absoluteUrl()`, `serializeJsonLd()` |

Tidak ada package tambahan; semua memakai fitur bawaan Next.

## Environment

`NEXT_PUBLIC_SITE_URL` (lihat `.env.example`) menentukan domain di canonical, sitemap, robots, llms.txt, dan JSON-LD. Jika kosong, jatuh ke `http://localhost:3000`, jadi **wajib diisi di production**. Nilainya ikut tertanam saat build, bukan saat runtime.

## Menambah halaman baru

1. Buat route di `src/app/...`.
2. Daftarkan di `sitePages` (`src/config/site.ts`). Otomatis masuk sitemap dan llms.txt.
3. Di `page.tsx` export `metadata = pageMetadata({ title, description, path })`. Title otomatis diberi akhiran nama situs. Untuk halaman detail, pakai `pageMetadata` di `generateMetadata` dan isi `image` (serta `type: "article"`) bila ada gambar sendiri.
4. Halaman yang tidak boleh diindeks (login, dashboard): jangan masukkan ke `sitePages`, dan set `robots: { index: false }` pada metadata-nya.

## Keputusan dan batasan

- **Sitemap tanpa `lastModified`.** Dengan `cacheComponents: true`, `new Date()` saat prerender membuat build gagal (contoh di doc Next memakainya, tapi tidak berlaku di setup ini). Isi `lastModified` hanya dari data nyata, mis. `updatedAt` konten dari database.
- **Canonical diset per halaman, bukan di layout.** Canonical di layout akan menunjuk semua halaman ke `/`.
- **Open Graph/Twitter ditulis ulang per halaman.** Next mengganti objek `openGraph`/`twitter` layout saat halaman mendefinisikannya, dan file `opengraph-image` tidak ikut diwariskan. Karena itu `pageMetadata` mengisi ulang `siteName`, `locale`, dan menunjuk `/opengraph-image` secara eksplisit. Jangan menulis `openGraph` mentah di halaman.
- **Ganti brand = ganti `siteConfig` + logo.** `themeColor` (hex, harus sama dengan `--primary`), `tagline`, dan `logo` ada di `src/config/site.ts`; hex dipakai di manifest/OG image karena token CSS tidak terbaca di sana. `favicon.ico`, `icon.png`, `apple-icon.png` adalah file statis: buat ulang dari logo baru bila logo berubah. Logo sumber hanya 200x200, jadi ikon 192 sudah di batas ketajaman; ganti dengan logo 512x512 bila ada.
- **`<html lang>`** diambil dari `siteConfig.language` (`id`).
- **JSON-LD** disisipkan lewat `<script>` biasa, dengan `<` di-escape (`<`) sesuai panduan Next, supaya data dinamis tidak bisa menutup tag script.
- **llms.txt** adalah usulan standar komunitas, dan belum ada bukti kuat mesin AI utama membacanya. Biayanya kecil, jadi disertakan, tapi jangan dianggap pengganti konten yang jelas, JSON-LD, dan halaman yang bisa di-crawl.
- **Crawler AI** (GPTBot, ClaudeBot, PerplexityBot, dll.) tidak diblokir karena aturan `*` mengizinkan semua. Untuk membatasi, tambah rule per `userAgent` di `robots.ts`.

## Belum dikerjakan

- [ ] **`sameAs`** di `Organization` JSON-LD (profil sosial) bila sudah ada.
- [ ] **Ikon manifest 512x512** (dibutuhkan PWA yang bisa di-install) setelah ada logo beresolusi tinggi.
- [ ] **Search Console / Bing Webmaster**: verifikasi domain dan submit `sitemap.xml` setelah domain final.
- [ ] **Skema per jenis halaman**: `Service`, `FAQPage`, `BreadcrumbList` saat halaman terkait ada.
- [ ] **Multi-bahasa** (`alternates.languages` / hreflang) bila situs lebih dari satu bahasa. Lihat guide `internationalization.md`.
- [ ] **Validasi** dengan Rich Results Test dan Schema Markup Validator setelah ada URL publik.

## SEO lokal (area layanan)

`LocalBusiness` sudah ada di layout dengan `address`, `geo`, `telephone`, dan `email` dari `siteConfig.business` (`src/config/site.ts`). Datanya meniru `seo.php` situs WordPress FarmHub. Yang belum ada: `areaServed` dan `openingHoursSpecification`. Samakan datanya persis dengan Google Business Profile sebelum rilis.

## Halaman noindex

`/keranjang` dan `/pembayaran` tidak ada di `sitePages` (jadi tidak masuk sitemap dan llms.txt) dan memakai `robots: { index: false }`, sama seperti `seo.php` pada WordPress (`is_cart()`, `is_checkout()`). Alur toko dijelaskan di `docs/toko.md`.

## URL lama

`/tentang` dan `/syarat-dan-ketentuan` dialihkan permanen (308) ke `/tentang-kami` dan `/syarat-ketentuan` lewat `redirects()` di `next.config.ts`, mengikuti slug situs WordPress.
