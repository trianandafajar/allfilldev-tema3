import type { AboutIntroProps } from "@/components/sections/about-intro"
import type { PageBannerProps } from "@/components/sections/page-banner"
import type { ServiceCardsProps } from "@/components/sections/service-cards"
import type { WhoWeAreProps } from "@/components/sections/who-we-are"
import { serviceHighlights } from "@/content/layanan"

export const banner: PageBannerProps = {
  title: "Tentang Kami",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Tentang Kami" }],
  image: { src: "/images/about/tt-slice.png", width: 222, height: 245 },
}

export const intro: AboutIntroProps = {
  eyebrow: "Mengapa Memilih Kami",
  title: "Menghadirkan hasil bumi terbaik ke meja Anda",
  description:
    "Pertanian adalah industri penting yang mencakup budidaya tanaman, peternakan, dan produksi pangan. Kami hadir untuk memastikan setiap tahap berjalan sehat dan menguntungkan.",
  progress: [
    { label: "Murni dan Organik", value: 70 },
    { label: "Makanan Sehat", value: 80 },
  ],
  cta: { label: "Lihat Layanan", href: "/layanan" },
  image: { src: "/images/about/choose-man.jpg", alt: "Petani memegang hasil panen segar", width: 546, height: 546 },
  decorations: {
    side: { src: "/images/about/f-food.png", width: 162, height: 162 },
    top: { src: "/images/about/l-food.png", width: 130, height: 130 },
    bottom: { src: "/images/about/t-food.png", width: 130, height: 130 },
  },
}

export const services: ServiceCardsProps = {
  eyebrow: "Layanan Terbaru",
  title: "Menanam impian, memanen harapan",
  readMore: "Selengkapnya",
  items: serviceHighlights,
}

export const who: WhoWeAreProps = {
  eyebrow: "Siapa Kami",
  title: "Memberi makan dunia dari benih hingga meja makan",
  description:
    "Pertanian adalah industri penting yang mencakup budidaya tanaman, peternakan, dan produksi pangan. Kami mendampingi setiap langkahnya.",
  values: [
    { icon: "/images/icon/hand-planp900.svg", title: "Tumbuh kuat dan memberi makan", href: "/tentang-kami" },
    { icon: "/images/icon/wheath-p900.svg", title: "Merawat bumi kita", href: "/tentang-kami" },
  ],
  form: {
    title: "Kirim Pesan",
    nameLabel: "Nama",
    emailLabel: "Email",
    phoneLabel: "Nomor HP",
    regionLabel: "Wilayah Anda",
    regions: ["Jawa", "Sumatera", "Kalimantan", "Sulawesi", "Lainnya"],
    messageLabel: "Pesan",
    submit: "Kirim Sekarang",
  },
  decoration: { src: "/images/element/who-element.png", width: 681, height: 510 },
}
