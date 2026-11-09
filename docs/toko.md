# Toko, keranjang, dan pembayaran

Halaman toko mengikuti situs WordPress FarmHub (WooCommerce): `/produk`, `/produk/[slug]`, `/keranjang`, `/pembayaran`. Tidak ada package tambahan.

## Peta file

| Bagian | File |
| --- | --- |
| Katalog, kategori, teks halaman toko, daftar kolom checkout | `src/content/produk.ts` |
| Keranjang di klien (store + hook `useCart`) | `src/components/shop/cart-store.ts` |
| Daftar dan filter produk | `product-list-section.tsx`, `product-catalog.tsx`, `shop-filters.tsx`, `product-card.tsx` |
| Detail produk | `product-detail.tsx`, `product-sidebar.tsx`, `category-accordion.tsx`, `product-purchase.tsx`, `product-tabs.tsx`, `product-tile.tsx` |
| Keranjang dan pembayaran | `cart-view.tsx`, `checkout-form.tsx`, `checkout-field.tsx`, `order-confirmation.tsx`, `empty-cart.tsx` |
| Validasi pesanan (murni, tanpa efek samping) | `src/lib/checkout.ts` |
| Server Action | `src/app/pembayaran/actions.ts` (`placeOrder`) |
| Format Rupiah | `formatRupiah` di `src/lib/format.ts` |
| Foto produk | `public/images/produk/<slug>.jpg` (dari media WordPress, 600x610) |

Semua komponen toko ada di `src/components/shop/` (komponen `Tabs` ada di `src/components/ui/tabs.tsx`).

## Menambah atau mengubah produk

Edit `entries` di `src/content/produk.ts`, taruh foto di `public/images/produk/<slug>.jpg`. Sitemap, `llms.txt`, `generateStaticParams`, JSON-LD `Product`, filter, dan kategori ikut otomatis. Harga dalam Rupiah bilangan bulat; isi `salePrice` untuk harga diskon (harga normal tampil dicoret, filter "Sedang Diskon" aktif). Kategori baru ditambah di `productCategories`.

## Cara kerja keranjang

- Tidak memakai Context. `cart-store.ts` menyimpan isi keranjang di modul dan di `localStorage` (kunci `farmhub-keranjang`, hanya `slug` dan `quantity`), dibaca lewat `useSyncExternalStore`. Server dan hidrasi selalu melihat keranjang kosong; `hydrated` baru `true` setelah di klien, jadi UI tidak berkedip dari "kosong" ke isi sebenarnya.
- Bila `localStorage` diblokir, keranjang tetap bekerja di memori selama tab terbuka. Perubahan di tab lain tersinkron lewat event `storage`.
- Data di storage divalidasi ulang saat dibaca (slug harus ada di katalog, jumlah 1-99), jadi isi storage yang rusak diabaikan.
- Halaman produk statis. Filter di `/produk` (kategori, harga, status) berjalan di klien karena seluruh katalog sudah ada di halaman; filter tidak tercermin di URL.

## Cara kerja pembayaran

`CheckoutForm` memakai `useActionState(placeOrder)`. Isi keranjang dikirim sebagai kolom tersembunyi `cart` berisi `slug` dan `quantity`. Server (`validateCheckout` di `src/lib/checkout.ts`):

- Hanya mempercayai `slug` dan `quantity`. Nama, harga, dan total dihitung ulang dari `src/content/produk.ts`; harga atau total kiriman klien diabaikan.
- Menolak slug yang tidak dikenal, jumlah di luar 1-99, keranjang kosong atau lebih dari 50 baris, dan menggabungkan baris duplikat.
- Memvalidasi semua kolom (wajib, email, telepon, kode pos 5 digit, panjang maksimum) dan kolom alamat kirim bila "Kirim ke alamat yang berbeda?" dicentang, serta persetujuan syarat.
- Galat dikembalikan beserta nilai yang sudah diisi, karena React 19 mengosongkan form setelah action.

Bila lolos, server mengembalikan nomor pesanan (`FH-YYYYMMDD-XXXX`), rincian, dan total. Klien menampilkan konfirmasi di tempat (bukan halaman terpisah) lalu mengosongkan keranjang.

## Keterbatasan (disengaja)

Repo ini tidak punya backend, jadi:

- **Pesanan tidak disimpan dan tidak diteruskan ke siapa pun.** Nomor pesanan hanya tampil di layar konfirmasi dan acak, bukan urutan dari database. UI konfirmasi menyatakan ini terang-terangan.
- **Tidak ada gateway pembayaran.** WordPress tidak punya metode pembayaran yang dikonfigurasi di kodenya (tidak ada gateway, ongkir, atau kupon), sehingga checkout di sini juga tidak memproses pembayaran dan menampilkan catatan bahwa tim akan menghubungi pembeli.
- **Tidak dibuat:** kupon, login/akun ("Sudah punya akun?"), ongkos kirim, ulasan produk, dan tombol "Perbarui Keranjang" (jumlah langsung berubah). Elemen itu adalah bawaan WooCommerce yang di WordPress tidak punya data.
- `/keranjang` dan `/pembayaran` `noindex` dan tidak ada di `sitePages` (sitemap), sama dengan `seo.php` WordPress.

## Yang harus disambungkan agar pesanan sungguhan

1. Simpan pesanan di `placeOrder` (database atau layanan pesanan), dengan nomor pesanan dari penyimpanan itu.
2. Kirim notifikasi ke tim (email atau WhatsApp) dan konfirmasi ke pembeli.
3. Pilih pembayaran (transfer manual, COD, atau gateway) dan ongkos kirim, lalu ubah `checkoutContent.paymentNote` dan teks `confirmation.notice` di `src/content/produk.ts`.
4. Bila stok dikelola, pindahkan `inStock` dari konten statis ke sumber data yang bisa berubah (dan periksa stok di `validateCheckout`).
5. Pertimbangkan pembatasan laju dan CAPTCHA di Server Action setelah ada penyimpanan.
