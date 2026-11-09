# Embla Carousel

Terpasang lewat `bunx shadcn@latest add carousel` (paket `embla-carousel-react`). Dipakai oleh `src/components/ui/carousel.tsx`.

## Pemakaian di repo ini

- Satu-satunya pemakai: `src/components/sections/testimonials.tsx` (loop + dot navigasi).
- Autoplay dibuat sendiri dengan `setInterval` memanggil `api.scrollNext()` (tanpa plugin `embla-carousel-autoplay`). Berhenti saat mouse/fokus berada di area slider dan saat `prefers-reduced-motion: reduce`.
- State slide aktif (untuk dot) diambil dari event `select` dan `reInit` pada `api`.

## Keputusan

- Slider sponsor di template (Swiper, 5 logo) **tidak** dijadikan carousel: `sections/brands.tsx` memakai grid responsif karena lima logo muat satu baris. Jika daftar logo bertambah banyak, ganti dengan `Carousel` atau marquee CSS.
- `ui/carousel.tsx` punya satu `eslint-disable` (lihat `docs/shadcn-ui.md`).
