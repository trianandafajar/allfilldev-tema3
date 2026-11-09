import type { FaqListProps } from "@/components/sections/faq-list"
import type { PageBannerProps } from "@/components/sections/page-banner"

export const banner: PageBannerProps = {
  title: "FAQ",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "FAQ" }],
  image: { src: "/images/about/tt-slice.png", width: 222, height: 245 },
}

export const list: FaqListProps = {
  eyebrow: "Pertanyaan Umum",
  title: "Jawaban untuk pertanyaan yang sering kami terima",
  description:
    "Belum menemukan jawabannya? Tulis pertanyaan Anda lewat formulir di bagian bawah halaman ini dan tim kami akan membalasnya.",
  groups: [
    {
      title: "Tentang FarmHub",
      items: [
        {
          question: "Apa itu FarmHub?",
          answer:
            "FarmHub adalah layanan pendampingan untuk petani dan pelaku usaha tani. Kami membantu lewat konsultasi lapangan, teknologi panen, dan solusi tanam yang berkelanjutan.",
        },
        {
          question: "Di mana saja wilayah layanan FarmHub?",
          answer:
            "Kantor kami ada di Lembang, Bandung Barat, dan pendampingan paling sering kami lakukan di Jawa Barat. Untuk daerah lain, hubungi kami lebih dulu agar kami bisa menilai jadwal dan jangkauannya.",
        },
        {
          question: "Bagaimana cara menghubungi tim FarmHub?",
          answer:
            "Anda bisa memakai formulir di halaman Kontak, menelepon, atau mengirim email. Jam layanan kami Senin sampai Jumat, pukul 06.00 sampai 14.00 WIB.",
        },
      ],
    },
    {
      title: "Layanan dan pelatihan",
      items: [
        {
          question: "Bagaimana cara mendaftar layanan pendampingan?",
          answer:
            "Isi formulir di halaman Kontak dengan nama, kebutuhan, dan lokasi lahan Anda. Tim kami akan menghubungi untuk menjadwalkan survei awal.",
        },
        {
          question: "Apakah ada biaya untuk konsultasi awal?",
          answer:
            "Diskusi awal untuk memahami kebutuhan Anda tidak dipungut biaya. Biaya program pendampingan dihitung setelah survei lahan dan disampaikan secara tertulis sebelum kerja sama dimulai.",
        },
        {
          question: "Apakah pelatihan bisa diikuti oleh kelompok tani?",
          answer:
            "Bisa. Pelatihan dapat diikuti perorangan maupun kelompok tani, dan kami dapat datang ke lokasi kelompok agar anggota tidak perlu menempuh perjalanan jauh.",
        },
        {
          question: "Berapa lama satu program pendampingan berlangsung?",
          answer:
            "Umumnya satu musim tanam, mulai dari pengolahan lahan sampai panen. Lamanya menyesuaikan jenis tanaman, sehingga kami sampaikan perkiraannya setelah survei.",
        },
      ],
    },
    {
      title: "Budidaya dan panen",
      items: [
        {
          question: "Kapan waktu terbaik untuk memanen sayuran?",
          answer:
            "Pagi hari saat suhu masih rendah. Sayuran yang dipetik pagi lebih segar dan tidak cepat layu dibandingkan yang dipetik siang hari.",
        },
        {
          question: "Bagaimana cara menjaga kesuburan tanah?",
          answer:
            "Kembalikan bahan organik ke tanah lewat kompos dari sisa panen, lakukan rotasi tanaman, dan hindari pemakaian pupuk kimia berlebihan. Setelah dua sampai tiga musim, tanah biasanya menjadi lebih gembur.",
        },
        {
          question: "Apakah irigasi tetes cocok untuk lahan kecil?",
          answer:
            "Cocok. Irigasi tetes menyalurkan air langsung ke akar sehingga hemat air, dan satu tangki penampung sudah cukup untuk beberapa bedengan.",
        },
        {
          question: "Bagaimana memulai pertanian organik?",
          answer:
            "Mulailah dari satu petak percobaan. Pulihkan tanah dengan kompos, pilih benih yang sesuai dengan daerah Anda, dan catat hasilnya tiap musim sebelum memperluas lahan.",
        },
      ],
    },
  ],
}

/** Data terstruktur `FAQPage` dari pertanyaan yang sama dengan yang tampil di halaman. */
export const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }))
  ),
}
