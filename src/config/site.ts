export const siteConfig = {
  name: "FarmHub",
  description:
    "FarmHub mendampingi petani dan pemilik lahan: konsultasi budidaya, pengolahan lahan, teknologi panen, dan toko hasil tani segar langsung dari kebun.",
  tagline: "Pertanian modern untuk masa depan",
  language: "id",
  locale: "id_ID",
  copyrightYear: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  themeColor: "#2ab939",
  logo: "/images/banner/preloader.png",
  business: {
    street: "Jl. Raya Lembang No. 24",
    locality: "Lembang",
    region: "Jawa Barat",
    postalCode: "40391",
    country: "ID",
    latitude: -6.8133,
    longitude: 107.6179,
    phone: "+62-22-555-0129",
    email: "halo@farmhub.id",
  },
} as const;

/** Urutan tetap: halaman memakai `sitePages[n]`, jadi halaman baru ditambah di akhir. */
export const sitePages = [
  { path: "/", title: "Beranda", description: siteConfig.description },
  {
    path: "/tentang-kami",
    title: "Tentang Kami",
    description:
      "Kenali FarmHub: tim pendamping petani yang membantu menilai lahan, memilih bibit, hingga panen dengan cara yang lebih sehat dan menguntungkan.",
  },
  {
    path: "/kontak",
    title: "Kontak",
    description:
      "Hubungi FarmHub untuk konsultasi pertanian, kerja sama proyek, atau pertanyaan seputar pesanan. Kami berlokasi di Lembang, Bandung Barat.",
  },
  {
    path: "/layanan",
    title: "Layanan",
    description:
      "Layanan FarmHub: pendampingan petani, konsultasi budidaya, teknologi panen, dan solusi tanaman pangan untuk lahan Anda.",
  },
  {
    path: "/galeri",
    title: "Galeri",
    description:
      "Galeri proyek FarmHub: kebun sayur organik, irigasi tetes, greenhouse, sawah, hingga agrowisata di berbagai daerah.",
  },
  {
    path: "/blog",
    title: "Blog",
    description:
      "Artikel dan tips pertanian dari FarmHub: praktik bertani ramah lingkungan, perawatan lahan, hingga panen dan pascapanen.",
  },
  {
    path: "/faq",
    title: "FAQ",
    description:
      "Jawaban atas pertanyaan yang paling sering diajukan seputar FarmHub, layanan pendampingan, pemesanan, dan budidaya.",
  },
  {
    path: "/syarat-ketentuan",
    title: "Syarat dan Ketentuan",
    description:
      "Syarat dan ketentuan penggunaan situs dan belanja di FarmHub: pemesanan, pembayaran, pengiriman, dan pengembalian.",
  },
  {
    path: "/kebijakan-privasi",
    title: "Kebijakan Privasi",
    description:
      "Kebijakan Privasi FarmHub: data apa yang kami kumpulkan, untuk apa dipakai, dan bagaimana kami menjaganya.",
  },
  {
    path: "/produk",
    title: "Produk",
    description:
      "Belanja hasil tani segar dari FarmHub: tomat, jagung manis, kangkung organik, telur kampung, daging sapi lokal, dan lainnya.",
  },
] as const;
