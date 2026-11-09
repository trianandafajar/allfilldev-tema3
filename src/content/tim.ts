import type { TeamProps } from "@/components/sections/team"
import type { SocialLink } from "@/components/shared/social-links"

const socials = (name: string): readonly SocialLink[] => [
  { network: "facebook", label: `Facebook ${name}`, href: "#" },
  { network: "x", label: `X ${name}`, href: "#" },
  { network: "linkedin", label: `LinkedIn ${name}`, href: "#" },
  { network: "pinterest", label: `Pinterest ${name}`, href: "#" },
]

const photo = { width: 820, height: 938 }

const people = [
  { name: "Siti Rahmawati", role: "Koordinator Pemasaran", file: "siti-rahmawati" },
  { name: "Budi Santoso", role: "Penyuluh Lapangan", file: "budi-santoso" },
  { name: "Dewi Lestari", role: "Teknisi Irigasi", file: "dewi-lestari" },
] as const

/** Tim FarmHub yang tampil di beranda. */
export const team: TeamProps = {
  eyebrow: "Tim Kami",
  title: "Memanen impian, satu panen demi panen",
  shareLabel: "Bagikan",
  members: people.map((person) => ({
    name: person.name,
    role: person.role,
    image: { ...photo, src: `/images/team/${person.file}.jpg`, alt: `Foto ${person.name}, ${person.role}` },
    socials: socials(person.name),
  })),
}
