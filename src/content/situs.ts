import type { SocialLink } from "@/components/shared/social-links"

export type NavLink = { label: string; href: string }

export type NavItem = NavLink & {
  children?: readonly NavLink[]
}

export const navItems: readonly NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Layanan", href: "/layanan" },
  { label: "Galeri", href: "/galeri" },
  { label: "Blog", href: "/blog" },
  { label: "Produk", href: "/produk" },
  { label: "Kontak", href: "/kontak" },
]

export const headerCta: NavLink = { label: "Minta Penawaran", href: "/kontak" }

export const topBar = {
  address: "Jl. Raya Lembang No. 24, Bandung, Jawa Barat 40391",
  phone: { label: "(022) 555-0129", href: "tel:+62225550129" },
  email: { label: "halo@farmhub.id", href: "mailto:halo@farmhub.id" },
}

export const contactInfo = {
  address: "Jl. Raya Lembang No. 24, Bandung",
  email: "halo@farmhub.id",
  phones: [{ label: "(022) 555-0133", href: "tel:+62225550133" }],
  hours: "Senin - Jumat, 06.00 - 14.00 WIB",
}

export const offcanvasSocials: readonly SocialLink[] = [
  { network: "facebook", label: "Facebook FarmHub", href: "#" },
  { network: "twitter", label: "Twitter FarmHub", href: "#" },
  { network: "youtube", label: "YouTube FarmHub", href: "#" },
  { network: "linkedin", label: "LinkedIn FarmHub", href: "#" },
]

export const footerSocials: readonly SocialLink[] = [
  { network: "facebook", label: "Facebook FarmHub", href: "#" },
  { network: "x", label: "X FarmHub", href: "#" },
  { network: "linkedin", label: "LinkedIn FarmHub", href: "#" },
  { network: "pinterest", label: "Pinterest FarmHub", href: "#" },
]

export const offcanvasContent = {
  contactTitle: "Info Kontak",
  socialTitle: "Media Sosial",
  closeLabel: "Tutup menu",
  openLabel: "Buka menu",
}

export const footerContent = {
  description: "Mendampingi petani dan pemilik lahan dari benih hingga panen dengan cara yang lebih sehat",
  serviceTitle: "Layanan",
  serviceLinks: [
    { label: "Solusi Tani Hijau", href: "/layanan/solusi-tani-hijau" },
    { label: "Layanan Pertanian", href: "/layanan/layanan-pertanian" },
    { label: "Konsultasi", href: "/layanan/konsultasi" },
    { label: "Galeri Kami", href: "/galeri" },
  ] satisfies NavLink[],
  linksTitle: "Tautan",
  links: [
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Layanan", href: "/layanan" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog dan Berita", href: "/blog" },
  ] satisfies NavLink[],
  contactTitle: "Kontak",
  address: ["Jl. Raya Lembang No. 24,", "Bandung, Jawa Barat 40391"],
  phones: ["(022) 555-0117", "(022) 555-0118"],
  copyright: "Hak cipta dilindungi.",
  legalLinks: [
    { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    { label: "Hubungi Kami", href: "/kontak" },
  ] satisfies NavLink[],
}
