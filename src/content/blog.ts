import type { BlogDetailProps } from "@/components/sections/blog-detail"
import type { PageBannerProps } from "@/components/sections/page-banner"
import type { ArticleBlock } from "@/components/shared/article-body"
import type { BlogPostCardData } from "@/components/shared/blog-post-card"
import type { BlogSidebarProps } from "@/components/shared/blog-sidebar"
import { formatDate, formatDayMonth } from "@/lib/format"

type BlogEntry = {
  slug: string
  title: string
  /** Tanggal ISO (`2024-10-19`). Daftar diurutkan dari yang terbaru. */
  date: string
  category: string
  image: { src: string; alt: string }
}

const author = "Oleh admin"
const excerpt = "Ulasan singkat tentang praktik bertani yang ramah lingkungan dan menguntungkan petani."
const tags = ["Panen", "Organik", "Petani"] as const

const entries: readonly BlogEntry[] = [
  {
    slug: "memberi-makan-dunia-dari-benih-hingga-meja",
    title: "Memberi makan dunia dari benih hingga meja makan",
    date: "2024-10-19",
    category: "Pertanian",
    image: { src: "/images/blog/keranjang-hasil-panen.jpg", alt: "Keranjang anyaman berisi sayur segar hasil panen" },
  },
  {
    slug: "menabur-memanen-mengulang",
    title: "Menabur lalu memanen",
    date: "2024-10-12",
    category: "Tips Berkebun",
    image: { src: "/images/blog/petani-di-pematang.jpg", alt: "Petani bertopi caping di pematang sawah" },
  },
  {
    slug: "menjelajahi-dunia-pertanian",
    title: "Menjelajahi dunia tani",
    date: "2024-10-05",
    category: "Pertanian",
    image: { src: "/images/blog/hamparan-kebun-selada.jpg", alt: "Hamparan kebun selada hijau" },
  },
]

/** Isi artikel contoh yang sama untuk ketiga tulisan. */
const body: readonly ArticleBlock[] = [
  {
    type: "paragraph",
    text: "Pertanian yang baik dimulai dari tanah yang sehat. Petani yang rutin memeriksa kondisi tanah, mengatur pola tanam, dan memanfaatkan pupuk organik biasanya mendapat hasil panen yang lebih stabil.",
  },
  {
    type: "paragraph",
    text: "Di artikel ini kami merangkum langkah sederhana yang bisa langsung dicoba di lahan Anda, mulai dari persiapan lahan sampai perawatan setelah panen.",
  },
  {
    type: "image",
    image: { src: "/images/blog/barisan-selada-udara.jpg", alt: "Barisan selada dilihat dari udara", width: 850, height: 361 },
  },
  {
    type: "paragraph",
    text: "Mulailah dengan mencatat kondisi lahan: jenis tanah, ketersediaan air, dan hama yang pernah muncul. Catatan ini menjadi dasar keputusan di setiap musim tanam.",
  },
  {
    type: "paragraph",
    text: "Setelah itu atur jadwal tanam bergilir supaya unsur hara tanah tidak habis oleh satu jenis tanaman saja.",
  },
  {
    type: "quote",
    text: "Tanah yang dirawat hari ini adalah panen yang kita nikmati musim depan. Merawat tanah berarti merawat penghidupan.",
    cite: "Tim FarmHub",
  },
  { type: "heading", text: "Gunakan waktu panen dengan bijak" },
  {
    type: "paragraph",
    text: "Panen pada waktu yang tepat menjaga mutu hasil dan harga jual. Siapkan tenaga, wadah, dan jalur angkut sebelum hari panen tiba.",
  },
  {
    type: "images",
    images: [
      { src: "/images/blog/petik-hasil-kebun.jpg", alt: "Petani memetik hasil kebun", width: 410, height: 290 },
      { src: "/images/blog/panen-bersama.jpg", alt: "Dua petani memanen bersama", width: 410, height: 290 },
    ],
  },
  {
    type: "paragraph",
    text: "Pascapanen, bersihkan lahan dari sisa tanaman dan kembalikan sebagian sebagai kompos agar tanah tetap subur.",
  },
  {
    type: "paragraph",
    text: "Dengan kebiasaan sederhana ini, hasil panen lebih stabil dan biaya produksi lebih terkendali.",
  },
]

const href = (entry: BlogEntry) => `/blog/${entry.slug}`
const uniqueSorted = (values: readonly string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b, "id"))
/** Empat kata pertama, sama dengan `wp_trim_words(judul, 4, '')` pada navigasi artikel di WordPress. */
const trimWords = (text: string, count: number) => text.split(/\s+/).slice(0, count).join(" ")

export const blogSlugs = entries.map((entry) => entry.slug)

export const listBanner: PageBannerProps = {
  title: "Blog",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Blog" }],
  image: { src: "/images/about/tt-slice.png", width: 222, height: 245 },
}

export const blogCards: readonly BlogPostCardData[] = entries.map((entry) => ({
  title: entry.title,
  excerpt,
  href: href(entry),
  dateLabel: formatDayMonth(entry.date),
  author,
  category: entry.category,
  readMore: "Selengkapnya",
  image: { ...entry.image, width: 1200, height: 800 },
}))

export const blogSidebar: BlogSidebarProps = {
  search: { title: "Cari", placeholder: "Cari di sini...", submitLabel: "Cari" },
  categories: {
    title: "Kategori",
    items: uniqueSorted(entries.map((entry) => entry.category)).map((label) => ({ label, href: "/blog" })),
  },
  latest: {
    title: "Artikel Terbaru",
    items: entries.slice(0, 3).map((entry) => ({
      title: entry.title,
      href: href(entry),
      dateLabel: formatDate(entry.date),
      image: entry.image,
    })),
  },
  tags: {
    title: "Tag",
    items: uniqueSorted(tags).map((label) => ({ label, href: "/blog" })),
  },
}

/** Data halaman detail satu artikel, atau `undefined` bila slug tidak dikenal. `shareLinks` diisi oleh halaman. */
export function getPost(slug: string) {
  const index = entries.findIndex((item) => item.slug === slug)
  if (index === -1) return undefined

  const entry = entries[index]
  // Urutan daftar dari terbaru: artikel sebelumnya adalah yang lebih lama, berikutnya yang lebih baru.
  const older = entries[index + 1]
  const newer = entries[index - 1]
  const related = entries.find((item) => item !== entry) ?? entry

  const navLink = (target: BlogEntry | undefined) =>
    target && { title: trimWords(target.title, 4), href: href(target) }

  const detail: Omit<BlogDetailProps, "shareLinks"> = {
    title: entry.title,
    meta: { author, category: entry.category, date: entry.date, dateLabel: formatDate(entry.date) },
    body,
    tags: {
      label: "Tag:",
      items: tags.map((label) => ({ label, href: "/blog" })),
    },
    nav: {
      label: "Artikel lainnya",
      prev: navLink(older),
      next: navLink(newer),
    },
    related: {
      heading: "Mungkin Anda Suka",
      post: {
        title: related.title,
        excerpt,
        href: href(related),
        image: { ...related.image, width: 1200, height: 800 },
      },
    },
    sidebar: blogSidebar,
  }

  const banner: PageBannerProps = {
    title: "Detail Blog",
    crumbs: [{ label: "Beranda", href: "/" }, { label: "Blog", href: "/blog" }, { label: entry.title }],
    image: listBanner.image,
  }

  return { slug: entry.slug, title: entry.title, excerpt, date: entry.date, image: entry.image, detail, banner }
}
