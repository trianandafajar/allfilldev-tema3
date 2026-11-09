import type { ContactInfoProps } from "@/components/sections/contact-info"
import type { PageBannerProps } from "@/components/sections/page-banner"
import type { TalkingContactProps } from "@/components/sections/talking-contact"

export const banner: PageBannerProps = {
  title: "Kontak",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Kontak" }],
  image: { src: "/images/about/tt-slice.png", width: 222, height: 245 },
}

export const talking: TalkingContactProps = {
  form: {
    eyebrow: "Kontak",
    title: "Hubungi Kami",
    nameLabel: "Nama",
    emailLabel: "Email",
    subjectLabel: "Subjek",
    messageLabel: "Pesan",
    submit: "Kirim Sekarang",
  },
  image: { src: "/images/contact/bicara-dengan-tim.jpg", alt: "Tim FarmHub sedang berbincang", width: 710, height: 620 },
}

export const info: ContactInfoProps = {
  items: [
    {
      icon: "solid-location-dot",
      title: "Alamat",
      lines: [{ text: "Jl. Raya Lembang No. 24," }, { text: "Bandung, Jawa Barat 40391" }],
    },
    {
      icon: "solid-phone",
      title: "Hubungi Kami",
      lines: [{ text: "Telepon: (022) 555-0133", href: "tel:+62225550133" }, { text: "Faks: (022) 555-0134" }],
    },
    {
      icon: "solid-envelope",
      title: "Kirim Email",
      lines: [
        { text: "halo@farmhub.id", href: "mailto:halo@farmhub.id" },
        { text: "info@farmhub.id", href: "mailto:info@farmhub.id" },
      ],
    },
  ],
}

export const map = {
  query: "Lembang, Bandung Barat",
  title: "Peta lokasi FarmHub",
}
