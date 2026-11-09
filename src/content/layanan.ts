import type { PageBannerProps } from "@/components/sections/page-banner"
import type { ServiceCardItem } from "@/components/sections/service-cards"
import type { ServiceDetailProps } from "@/components/sections/service-detail"
import type { ArticleBlock, ArticleImage } from "@/components/shared/article-body"
import type { ServiceCardData } from "@/components/shared/service-card"
import { contactInfo } from "@/content/situs"

type ServiceEntry = {
  slug: string
  title: string
  /** Satu kalimat; dipakai sebagai ringkasan kartu dan deskripsi meta halaman detail. */
  summary: string
  image: ArticleImage
  /** Ikon hijau kartu (`sr1`..`sr6`). */
  icon: string
  /** Judul artikel dan dua sub-judul isi halaman detail. */
  headings: readonly [string, string, string]
}

const entries: readonly ServiceEntry[] = [
  {
    slug: "solusi-tani-hijau",
    title: "Solusi Tani Hijau",
    summary: "Pendampingan dari benih hingga panen.",
    image: { src: "/images/service/solusi-tanam-hijau.jpg", alt: "Tangan memegang tunas di tanah", width: 410, height: 311 },
    icon: "/images/icon/sr1.svg",
    headings: ["Tanam Sukses dengan Pertanian Terencana", "Siapkan tanah", "Jelajahi keindahan alam"],
  },
  {
    slug: "layanan-pertanian",
    title: "Layanan Pertanian",
    summary: "Pengolahan lahan dan perawatan kebun rutin.",
    image: { src: "/images/service/layanan-pertanian.jpg", alt: "Petani memetik jeruk bersama penyuluh lapangan", width: 410, height: 311 },
    icon: "/images/icon/sr2.svg",
    headings: ["Merawat Lahan agar Tetap Produktif", "Olah lahan", "Rawat kebun setiap hari"],
  },
  {
    slug: "konsultasi",
    title: "Konsultasi",
    summary: "Konsultasi budidaya, pupuk, dan hama.",
    image: { src: "/images/service/konsultasi.jpg", alt: "Penyuluh perempuan dan petani memeriksa tablet di sawah dengan drone di atasnya", width: 820, height: 622 },
    icon: "/images/icon/sr3.svg",
    headings: ["Konsultasi Budidaya yang Tepat Sasaran", "Kenali masalahnya", "Terapkan solusi di lapangan"],
  },
  {
    slug: "teknologi-panen",
    title: "Teknologi Panen",
    summary: "Alat dan teknik panen yang lebih efisien.",
    image: { src: "/images/service/teknologi-panen.jpg", alt: "Mesin pemanen merah memanen di hamparan lahan", width: 820, height: 622 },
    icon: "/images/icon/sr4.svg",
    headings: ["Panen Lebih Cepat dengan Teknologi Sederhana", "Pilih alat yang cocok", "Kurangi kehilangan hasil"],
  },
  {
    slug: "inovasi-agritech",
    title: "Inovasi Agritech",
    summary: "Pemantauan lahan lewat sensor dan ponsel.",
    image: { src: "/images/service/inovasi-agritech.jpg", alt: "Drone pertanian menyemprot lahan di perbukitan", width: 820, height: 622 },
    icon: "/images/icon/sr5.svg",
    headings: ["Inovasi Pertanian untuk Lahan Kecil", "Pasang sensor tanah", "Pantau lewat ponsel"],
  },
  {
    slug: "solusi-tanaman-pangan",
    title: "Solusi Tanaman Pangan",
    summary: "Pola tanam padi, jagung, dan palawija.",
    image: { src: "/images/service/solusi-tanaman-pangan.jpg", alt: "Hamparan padi hijau di sawah", width: 820, height: 622 },
    icon: "/images/icon/sr6.svg",
    headings: ["Solusi Tanaman Pangan Sepanjang Musim", "Atur pola tanam", "Jaga mutu hasil panen"],
  },
]

const stepIcons = ["/images/icon/details-desert.svg", "/images/icon/details-flower.svg"] as const

const detailPair: readonly [ArticleImage, ArticleImage] = [
  { src: "/images/service/selada-berbaris.jpg", alt: "Barisan selada hijau di bedengan", width: 410, height: 259 },
  { src: "/images/service/keranjang-panen.jpg", alt: "Keranjang berisi sayur segar hasil panen", width: 410, height: 259 },
]

const href = (entry: ServiceEntry) => `/layanan/${entry.slug}`

export const serviceCards: readonly ServiceCardData[] = entries.map((entry) => ({
  title: entry.title,
  href: href(entry),
  image: { src: entry.image.src, alt: entry.image.alt },
  icon: entry.icon,
  summary: entry.summary,
}))

/** Tiga layanan pertama dalam bentuk kartu ringkas (bagian "Layanan Terbaru" di halaman Tentang Kami). */
export const serviceHighlights: readonly ServiceCardItem[] = entries.slice(0, 3).map((entry) => ({
  icon: entry.icon,
  title: entry.title,
  text: entry.summary,
  href: href(entry),
}))

export const serviceSlugs = entries.map((entry) => entry.slug)

export const listBanner: PageBannerProps = {
  title: "Layanan",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Layanan" }],
  image: { src: "/images/about/tt-slice.png", width: 222, height: 245 },
}

/** Data halaman detail satu layanan, atau `undefined` bila slug tidak dikenal. */
export function getService(slug: string) {
  const entry = entries.find((item) => item.slug === slug)
  if (!entry) return undefined

  const [heading, second, third] = entry.headings

  const body: readonly ArticleBlock[] = [
    { type: "heading", text: heading },
    {
      type: "paragraph",
      text: "Kami mendampingi petani dan pemilik lahan dari perencanaan tanam sampai panen. Tim lapangan menilai kondisi tanah, air, dan iklim setempat, lalu menyusun jadwal tanam yang realistis sesuai kebutuhan Anda.",
    },
    {
      type: "paragraph",
      text: "Setiap kegiatan dicatat dan dievaluasi bersama, sehingga biaya produksi lebih terkendali dan hasil panen lebih konsisten dari musim ke musim. Anda bisa meminta laporan perkembangan kapan saja.",
    },
    { type: "heading", text: second },
    {
      type: "paragraph",
      text: "Langkah pertama selalu dimulai dari lahan Anda sendiri. Kami memeriksa kesuburan tanah, pH, dan sistem pengairan, kemudian memberi rekomendasi pupuk dan perlakuan yang paling hemat biaya.",
    },
    { type: "heading", text: third },
    {
      type: "paragraph",
      text: "Pertanian yang baik menjaga keseimbangan alam. Kami mendorong penggunaan pupuk organik, rotasi tanaman, dan pengendalian hama terpadu supaya lahan tetap sehat untuk musim-musim berikutnya.",
    },
    {
      type: "steps",
      items: ["Siapkan tanah", "Tanam bibit"].map((title, index) => ({ title, icon: stepIcons[index] })),
    },
    { type: "images", images: detailPair },
  ]

  const detail: ServiceDetailProps = {
    image: entry.image,
    services: entries.map((item) => ({ title: item.title, href: href(item) })),
    body,
    callBox: {
      title: "Hubungi Kami",
      text: "Untuk layanan cepat",
      phone: contactInfo.phones[0],
    },
  }

  const banner: PageBannerProps = {
    title: entry.title,
    crumbs: [{ label: "Beranda", href: "/" }, { label: "Layanan", href: "/layanan" }, { label: entry.title }],
    image: listBanner.image,
  }

  return {
    slug: entry.slug,
    title: entry.title,
    summary: `${entry.summary} FarmHub mendampingi petani dan pemilik lahan dari perencanaan tanam sampai panen.`,
    detail,
    banner,
  }
}
