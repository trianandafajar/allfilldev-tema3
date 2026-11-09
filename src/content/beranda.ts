import type { AboutProps } from "@/components/sections/about"
import type { BlogProps } from "@/components/sections/blog"
import type { BrandsProps } from "@/components/sections/brands"
import type { ContactProps } from "@/components/sections/contact"
import type { HeroProps } from "@/components/sections/hero"
import type { ProjectsProps } from "@/components/sections/projects"
import type { ServicesProps } from "@/components/sections/services"
import type { StatsProps } from "@/components/sections/stats"
import type { SubscribeProps } from "@/components/sections/subscribe"
import type { TalkingContactProps } from "@/components/sections/talking-contact"
import type { TestimonialsProps } from "@/components/sections/testimonials"
import type { VideoBannerProps } from "@/components/sections/video-banner"
import type { WorkProcessProps } from "@/components/sections/work-process"
import { blogCards } from "@/content/blog"
import { serviceCards } from "@/content/layanan"
import { siteConfig } from "@/config/site"

/** Urutan seksi beranda mengikuti halaman WordPress; data tim ada di `content/tim.ts`. */

export const hero: HeroProps = {
  eyebrow: "Bertani untuk masa depan",
  titleLead: "Bertani adalah warisan kita",
  titleAccent: ["masa depan", "panen kita"],
  description:
    "Kami telah beroperasi lebih dari satu dekade, memberikan layanan terbaik kepada para petani dan mitra serta membangun rekam jejak yang kuat di bidang pertanian.",
  cta: { label: "Selengkapnya", href: "/tentang-kami" },
  help: { label: "Butuh bantuan?", phone: "(022) 555-0129", href: `tel:${siteConfig.business.phone.replaceAll("-", "")}` },
  image: { src: "/images/banner/hero-v2.webp", alt: "Petani perempuan menanam selada di kebun sayur", width: 1448, height: 1086 },
}

export const about: AboutProps = {
  eyebrow: "Mengapa Memilih Kami",
  title: "Bertani dengan semangat demi memberi makan banyak orang",
  description:
    "Kami membantu petani dan pemilik lahan mengelola kebun dengan cara yang lebih sehat dan menguntungkan. Mulai dari menilai kondisi tanah, memilih bibit, sampai mengatur jadwal tanam dan panen, semuanya kami dampingi langsung di lapangan.",
  points: [
    "Pendampingan lapangan dari persiapan lahan sampai panen",
    "Benih, pupuk, dan irigasi dipilih sesuai kondisi lahan Anda",
  ],
  cta: { label: "Selengkapnya", href: "/tentang-kami" },
  image: { src: "/images/about/petani-sayuran.png", alt: "Petani memetik sayuran segar di kebun", width: 1132, height: 928 },
}

/** Kartu layanan beranda memakai ikon putih di atas kotak hijau, bukan ikon hijau arsip. */
const homeServiceIcons = ["/images/icon/desert.svg", "/images/icon/fence.svg", "/images/icon/tree.svg"] as const

export const services: ServicesProps = {
  eyebrow: "Layanan Kami",
  title: "Memberi makan dunia dari benih hingga meja",
  items: serviceCards.slice(0, 3).map((card, index) => ({ ...card, icon: homeServiceIcons[index] })),
}

export const workProcess: WorkProcessProps = {
  eyebrow: "Alur Kerja",
  titleLines: ["Ubah kebun Anda", "menjadi karya seni"],
  description:
    "Setiap kebun punya kebutuhan berbeda. Kami mengikuti empat tahap yang sama di setiap lahan agar hasil tanam lebih terukur dan mudah dievaluasi bersama Anda.",
  steps: [
    { titleLines: ["Siapkan", "lahan"], number: "01" },
    { titleLines: ["Tanam", "benih"], number: "02" },
    { titleLines: ["Siram", "tanaman"], number: "03" },
    { titleLines: ["Pupuk", "kebun"], number: "04" },
  ],
  footer: { text: "Alur menyesuaikan kebutuhan proyek", linkLabel: "Pelajari lebih lanjut", href: "/kontak" },
  decorations: {
    stepShape: { src: "/images/element/step-shape.png", width: 94, height: 96 },
    arrowTop: { src: "/images/element/arro-round-top.png", width: 135, height: 36 },
    arrowBottom: { src: "/images/element/arro-round-bottom.png", width: 135, height: 36 },
    sylli: { src: "/images/element/sylli.png", width: 182, height: 195 },
    green: { src: "/images/element/green-area.png", width: 1920, height: 63 },
  },
}

const projectPhoto = { width: 515, height: 530 }

export const projects: ProjectsProps = {
  eyebrow: "Proyek terbaru",
  titleLines: ["Membawa hasil alam", "ke meja makan Anda"],
  href: "/galeri",
  prevLabel: "Proyek sebelumnya",
  nextLabel: "Proyek berikutnya",
  viewLabel: "Lihat proyek",
  items: [
    { ...projectPhoto, src: "/images/project/kebun-sayur-organik.jpg", alt: "Kebun sayur organik" },
    { ...projectPhoto, src: "/images/project/kebun-apel.jpg", alt: "Kebun apel yang sedang berbuah" },
    { ...projectPhoto, src: "/images/project/greenhouse-tomat.jpg", alt: "Greenhouse tomat" },
    { ...projectPhoto, src: "/images/project/cabai-merah.jpg", alt: "Panen cabai merah" },
  ],
}

const avatar = { width: 79, height: 79 }

/** Testimoni yang dipakai bersama beranda dan halaman dalam. */
export const testimonials: TestimonialsProps = {
  eyebrow: "Testimoni",
  titleLines: ["Tumbuh kuat, menyuburkan", "masa depan pertanian"],
  dotLabel: "Lihat testimoni",
  items: [
    {
      name: "Rina Kusuma",
      role: "Pemilik Kebun Sayur",
      quote:
        "Sejak didampingi FarmHub, hasil panen sayur kami naik dan biaya pupuk lebih hemat. Timnya sabar menjelaskan setiap tahap dan selalu datang tepat waktu ke lahan.",
      avatar: { ...avatar, src: "/images/testimonial/rina-kusuma.jpg", alt: "Foto Rina Kusuma" },
    },
    {
      name: "Agus Prasetyo",
      role: "Ketua Kelompok Tani",
      quote:
        "Kelompok kami belajar mengatur jadwal tanam dan irigasi dengan benar. Gagal panen akibat kekeringan jauh berkurang dibanding tahun lalu.",
      avatar: { ...avatar, src: "/images/testimonial/agus-prasetyo.jpg", alt: "Foto Agus Prasetyo" },
    },
    {
      name: "Maya Anggraini",
      role: "Pengusaha Olahan Pangan",
      quote:
        "Pasokan bahan baku dari mitra FarmHub stabil dan kualitasnya seragam. Kami tidak lagi khawatir kekurangan stok saat musim hujan.",
      avatar: { ...avatar, src: "/images/testimonial/maya-anggraini.jpg", alt: "Foto Maya Anggraini" },
    },
    {
      name: "Hendra Wijaya",
      role: "Pemilik Agrowisata",
      quote:
        "Penataan lahan dan pemilihan tanaman yang mereka sarankan membuat kebun kami lebih menarik bagi pengunjung sekaligus tetap produktif.",
      avatar: { ...avatar, src: "/images/testimonial/hendra-wijaya.jpg", alt: "Foto Hendra Wijaya" },
    },
  ],
  image: {
    src: "/images/testimonial/kolase-petani-sawah-jagung.png",
    alt: "Petani di sawah dan kebun jagung",
    width: 1000,
    height: 1000,
  },
  highlight: {
    icon: { src: "/images/icon/apple-count.png", width: 65, height: 65 },
    value: 4,
    suffix: "k+",
    label: "Pelanggan Puas",
  },
}

/** Beranda 2: judul satu kalimat dan navigasi panah di bawah slider. */
export const homeTestimonials: TestimonialsProps = {
  ...testimonials,
  titleLines: ["Tumbuh kuat, menyuburkan masa depan pertanian"],
  variant: "arrows",
  prevLabel: "Testimoni sebelumnya",
  nextLabel: "Testimoni berikutnya",
  quoteIcon: "/images/icon/quote-leftp2.svg",
}

export const brands: BrandsProps = {
  label: "Mitra dan pendukung FarmHub",
  items: [
    { src: "/images/sponsor/sp1.png", alt: "Logo mitra 1", width: 77, height: 81 },
    { src: "/images/sponsor/sp2.png", alt: "Logo mitra 2", width: 127, height: 81 },
    { src: "/images/sponsor/sp3.png", alt: "Logo mitra 3", width: 113, height: 82 },
    { src: "/images/sponsor/sp4.png", alt: "Logo mitra 4", width: 112, height: 80 },
    { src: "/images/sponsor/sp5.png", alt: "Logo mitra 5", width: 119, height: 81 },
  ],
}

export const stats: StatsProps = {
  items: [
    { value: 200, suffix: "+", label: "Anggota tim", icon: { src: "/images/icon/count1.svg", width: 40, height: 40 } },
    { value: 300, suffix: "k+", label: "Penghargaan", icon: { src: "/images/icon/count2.svg", width: 40, height: 40 } },
    { value: 100, suffix: "+", label: "Proyek selesai", icon: { src: "/images/icon/count3.svg", width: 40, height: 40 } },
    { value: 900, suffix: "+", label: "Ulasan klien", icon: { src: "/images/icon/count4.svg", width: 40, height: 40 } },
  ],
  flowers: {
    left: { src: "/images/element/count-flower-left.png", width: 96, height: 140 },
    right: { src: "/images/element/count-flower-right.png", width: 96, height: 140 },
  },
}

export const videoBanner: VideoBannerProps = {
  image: { src: "/images/about/feature-video02.jpg", alt: "" },
  video: { label: "Putar video", title: "Video profil FarmHub", videoId: "-hTVNidxg2s" },
}

/** Dipakai seksi kontak halaman dalam (bagian newsletter dan formulir). */
export const contact: ContactProps = {
  newsletter: {
    titleLead: "Dapatkan Kabar Terbaru,",
    titleAccent: "Berlangganan",
    titleTail: "Newsletter Kami",
    emailLabel: "Alamat email",
    emailPlaceholder: "Masukkan email Anda",
    submit: "Berlangganan",
  },
  form: {
    eyebrow: "Kontak",
    title: "Hubungi Kami",
    nameLabel: "Nama",
    emailLabel: "Email",
    subjectLabel: "Subjek",
    messageLabel: "Pesan",
    submit: "Kirim Pesan",
  },
  getElement: { src: "/images/element/get-element.png", width: 510, height: 279 },
  sunElement: { src: "/images/element/sun-element.png", width: 204, height: 204 },
}

export const homeContact: TalkingContactProps = {
  form: { ...contact.form, submit: "Kirim Sekarang" },
  image: { src: "/images/contact/talking-contact.png", alt: "Petani berbincang dengan tim FarmHub", width: 710, height: 620 },
}

export const blog: BlogProps = {
  eyebrow: "Blog Kami",
  title: "Merawat bumi, satu lahan demi satu lahan",
  posts: blogCards.slice(0, 3),
}

export const subscribe: SubscribeProps = {
  eyebrow: "Berlangganan buletin kami",
  titleAccent: "Berlangganan",
  titleTail: "untuk mendapat informasi terbaru",
  form: { emailLabel: "Alamat email", emailPlaceholder: "Masukkan email Anda", submit: "Berlangganan" },
  shape: { src: "/images/footer/subscribe-shapev2.png", width: 235, height: 252 },
}
