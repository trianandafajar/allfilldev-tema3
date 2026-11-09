import type { GalleryDetailProps } from "@/components/sections/gallery-detail"
import type { PageBannerProps } from "@/components/sections/page-banner"
import type { ArticleBlock } from "@/components/shared/article-body"
import type { GalleryCardData } from "@/components/shared/gallery-card"
import { formatDate } from "@/lib/format"

type GalleryEntry = {
  slug: string
  title: string
  /** Kategori proyek (taksonomi `kategori_proyek` di WordPress). */
  category: string
  location: string
  client: string
  image: { src: string; alt: string }
}

/** Semua proyek dibuat pada hari yang sama saat konten contoh dimuat di WordPress. */
const publishedAt = "2026-11-02"

const entries: readonly GalleryEntry[] = [
  {
    slug: "kebun-sayur-organik-lembang",
    title: "Kebun Sayur Organik Lembang",
    category: "Sayuran",
    location: "Lembang, Jawa Barat",
    client: "Kelompok Tani Sinar Pagi",
    image: { src: "/images/gallery/kebun-sayur-organik-lembang.jpg", alt: "Barisan selada di kebun sayur organik dilihat dari udara" },
  },
  {
    slug: "irigasi-tetes-malang",
    title: "Irigasi Tetes Lahan Apel Malang",
    category: "Irigasi",
    location: "Malang, Jawa Timur",
    client: "Koperasi Apel Nusantara",
    image: { src: "/images/gallery/irigasi-tetes-apel-malang.jpg", alt: "Pohon apel berbuah lebat di kebun" },
  },
  {
    slug: "greenhouse-bogor",
    title: "Greenhouse Tomat Bogor",
    category: "Hortikultura",
    location: "Bogor, Jawa Barat",
    client: "CV Tani Makmur",
    image: { src: "/images/gallery/greenhouse-tomat-bogor.jpg", alt: "Lorong greenhouse dengan tanaman tomat merambat" },
  },
  {
    slug: "sawah-padi-sehat-klaten",
    title: "Sawah Padi Sehat Klaten",
    category: "Padi",
    location: "Klaten, Jawa Tengah",
    client: "Gapoktan Subur Jaya",
    image: { src: "/images/gallery/sawah-padi-klaten.jpg", alt: "Hamparan sawah selepas panen di musim kemarau" },
  },
  {
    slug: "kebun-cabai-garut",
    title: "Kebun Cabai Garut",
    category: "Hortikultura",
    location: "Garut, Jawa Barat",
    client: "Kelompok Tani Cabai Merah",
    image: { src: "/images/gallery/kebun-cabai-garut.jpg", alt: "Cabai merah segar hasil panen" },
  },
  {
    slug: "lahan-jagung-lampung",
    title: "Lahan Jagung Lampung",
    category: "Pangan",
    location: "Lampung Tengah, Lampung",
    client: "PT Lampung Agro Mandiri",
    image: { src: "/images/gallery/lahan-jagung-lampung.jpg", alt: "Lahan jagung saat matahari terbenam" },
  },
  {
    slug: "agrowisata-batu",
    title: "Agrowisata Petik Sayur Batu",
    category: "Agrowisata",
    location: "Batu, Jawa Timur",
    client: "Desa Wisata Bumiaji",
    image: { src: "/images/gallery/agrowisata-petik-sayur-batu.jpg", alt: "Pengunjung memetik sayur di kebun agrowisata" },
  },
  {
    slug: "pembibitan-kopi-toraja",
    title: "Pembibitan Kopi Toraja",
    category: "Perkebunan",
    location: "Tana Toraja, Sulawesi Selatan",
    client: "Koperasi Kopi Toraja",
    image: { src: "/images/gallery/pembibitan-kopi-toraja.jpg", alt: "Biji kopi merah dan hijau di dahan" },
  },
]

const highlights = [
  "Penilaian tanah dan air",
  "Penyusunan jadwal tanam",
  "Pemilihan bibit unggul",
  "Pengendalian hama terpadu",
  "Pemupukan berimbang",
  "Pendampingan lapangan",
  "Penanganan pascapanen",
  "Evaluasi hasil bersama",
] as const

const summaryOf = (entry: GalleryEntry) =>
  `Proyek pendampingan ${entry.category.toLowerCase()} di ${entry.location}. Kami mendampingi ${entry.client} dari penilaian lahan sampai panen.`

export const galleryCards: readonly GalleryCardData[] = entries.map((entry) => ({
  title: entry.title,
  category: entry.category,
  href: `/galeri/${entry.slug}`,
  image: { ...entry.image, width: 820, height: 848 },
}))

export const gallerySlugs = entries.map((entry) => entry.slug)

export const listBanner: PageBannerProps = {
  title: "Galeri",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Galeri" }],
  image: { src: "/images/about/tt-slice.png", width: 222, height: 245 },
}

/** Data halaman detail satu proyek galeri, atau `undefined` bila slug tidak dikenal. `shareLinks` diisi oleh halaman. */
export function getGalleryItem(slug: string) {
  const entry = entries.find((item) => item.slug === slug)
  if (!entry) return undefined

  const summary = summaryOf(entry)

  const body: readonly ArticleBlock[] = [
    {
      type: "image",
      image: { src: "/images/gallery/hamparan-jagung-senja.jpg", alt: "Hamparan lahan saat matahari terbenam", width: 1290, height: 536 },
    },
    { type: "heading", text: "Penilaian lahan sebelum menanam" },
    {
      type: "paragraph",
      text: `Tim kami memulai dengan memeriksa kondisi tanah, sumber air, dan pola cuaca di ${entry.location}. Hasilnya menjadi dasar jadwal tanam dan pilihan komoditas yang paling cocok untuk lahan ini.`,
    },
    { type: "heading", text: "Pendampingan selama satu musim tanam" },
    {
      type: "paragraph",
      text: `Petugas lapangan mendampingi ${entry.client} dari penyiapan lahan sampai panen. Setiap minggu kami mencatat perkembangan tanaman, lalu mengevaluasi hasilnya bersama pemilik lahan untuk perbaikan musim berikutnya.`,
    },
    { type: "list", items: highlights },
  ]

  const detail: Omit<GalleryDetailProps, "shareLinks"> = {
    title: entry.title,
    summary,
    info: [
      { label: "Klien", value: entry.client },
      { label: "Penulis", value: "Tim FarmHub" },
      { label: "Tanggal", value: formatDate(publishedAt) },
      { label: "Kategori", value: entry.category },
      { label: "Lokasi", value: entry.location },
    ],
    image: { ...entry.image, width: 820, height: 848 },
    lead: {
      title: entry.location,
      text: "Seluruh tahapan dikerjakan bersama pemilik lahan dengan pendampingan tim FarmHub, dari penilaian awal sampai panen.",
    },
    body,
  }

  const banner: PageBannerProps = {
    title: entry.title,
    crumbs: [{ label: "Beranda", href: "/" }, { label: "Galeri", href: "/galeri" }, { label: entry.title }],
    image: listBanner.image,
  }

  return { slug: entry.slug, title: entry.title, summary, detail, banner }
}
