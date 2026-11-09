import type { LegalDocumentProps, LegalSection } from "@/components/sections/legal-document"
import type { PageBannerProps } from "@/components/sections/page-banner"
import { siteConfig } from "@/config/site"

const bannerImage = { src: "/images/about/tt-slice.png", width: 222, height: 245 }
const name = siteConfig.name
const email = "halo@farmhub.id"

const common = {
  updated: "2026-11-02",
  updatedLabel: "Terakhir diperbarui",
  tocTitle: "Daftar Isi",
  help: {
    title: "Ada pertanyaan?",
    text: "Jika ada hal yang kurang jelas, hubungi kami lewat surel",
    email,
    cta: { label: "Buka halaman Kontak", href: "/kontak" },
  },
}

/** Bagian penutup "Hubungi kami" yang sama untuk kedua dokumen. */
const contactSection = (id: string, lead: string): LegalSection => ({
  id,
  title: "Hubungi kami",
  paragraphs: [lead],
  items: [name, "Jl. Raya Lembang No. 24, Bandung, Jawa Barat 40391", `Surel: ${email}`, "Telepon: (022) 555-0129"],
})

export const syaratBanner: PageBannerProps = {
  title: "Syarat & Ketentuan",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Syarat & Ketentuan" }],
  image: bannerImage,
}

export const syarat: LegalDocumentProps = {
  ...common,
  intro: `Harap baca syarat dan ketentuan berikut sebelum memakai situs dan berbelanja di ${name}.`,
  sections: [
    {
      id: "penerimaan",
      title: "Penerimaan syarat",
      paragraphs: [
        `Dengan membuka situs atau berbelanja di ${name}, Anda menyetujui syarat dan ketentuan ini serta Kebijakan Privasi. Bila tidak setuju, mohon tidak menggunakan situs ini.`,
      ],
    },
    {
      id: "layanan",
      title: "Layanan dan informasi",
      paragraphs: [
        `${name} menyediakan layanan pendampingan pertanian dan toko hasil tani. Informasi di situs bersifat umum dan dapat berubah; hasil di lapangan bergantung pada kondisi lahan, cuaca, dan pengelolaan masing-masing.`,
      ],
    },
    {
      id: "pemesanan",
      title: "Pemesanan dan harga",
      paragraphs: [
        "Harga tercantum dalam rupiah dan dapat berubah tanpa pemberitahuan sebelumnya. Pesanan dianggap sah setelah kami mengonfirmasinya. Kami berhak menolak atau membatalkan pesanan bila stok habis, harga salah tampil, atau terdapat dugaan penyalahgunaan; dana yang sudah dibayar dikembalikan penuh.",
      ],
    },
    {
      id: "pembayaran",
      title: "Pembayaran",
      paragraphs: [
        "Pembayaran dilakukan lewat metode yang tersedia di halaman Pembayaran. Pesanan diproses setelah pembayaran diterima. Pastikan data penagihan yang Anda isi benar.",
      ],
    },
    {
      id: "pengiriman",
      title: "Pengiriman",
      paragraphs: [
        "Kami mengirim melalui jasa kurir sesuai alamat yang Anda berikan. Estimasi waktu bersifat perkiraan dan dapat terpengaruh cuaca, jarak, atau kondisi kurir. Produk segar sebaiknya segera diterima dan disimpan sesuai petunjuk.",
      ],
    },
    {
      id: "pengembalian",
      title: "Pengembalian dan komplain",
      paragraphs: [
        "Karena sebagian besar produk adalah hasil tani segar, komplain kerusakan atau ketidaksesuaian harus disampaikan maksimal 24 jam setelah barang diterima disertai foto atau video kondisi barang. Setelah diverifikasi, kami akan menukar atau mengembalikan dana sesuai kesepakatan.",
      ],
    },
    {
      id: "penggunaan",
      title: "Penggunaan yang diperbolehkan",
      paragraphs: [
        "Anda setuju tidak menggunakan situs untuk tujuan melanggar hukum, mengganggu keamanan atau kinerja situs, mengambil data secara otomatis tanpa izin, atau menyebarkan isi yang menyesatkan.",
      ],
    },
    {
      id: "kekayaan-intelektual",
      title: "Hak kekayaan intelektual",
      paragraphs: [
        `Teks, logo, desain, dan materi lain di situs ini milik ${name} atau pemberi lisensinya. Dilarang menyalin, menyebarkan, atau memakainya untuk keperluan komersial tanpa izin tertulis.`,
      ],
    },
    {
      id: "batasan-tanggung-jawab",
      title: "Batasan tanggung jawab",
      paragraphs: [
        `Sejauh diizinkan hukum, ${name} tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan, atau gangguan yang timbul dari penggunaan situs, termasuk keterlambatan akibat pihak ketiga dan keadaan di luar kendali kami.`,
      ],
    },
    {
      id: "tautan-pihak-ketiga",
      title: "Tautan pihak ketiga",
      paragraphs: [
        "Situs dapat memuat tautan ke situs lain. Kami tidak bertanggung jawab atas isi dan kebijakan situs tersebut.",
      ],
    },
    {
      id: "hukum",
      title: "Hukum yang berlaku",
      paragraphs: [
        "Syarat ini tunduk pada hukum Republik Indonesia. Perselisihan diupayakan diselesaikan secara musyawarah; bila tidak berhasil, diselesaikan melalui pengadilan yang berwenang di Bandung.",
      ],
    },
    {
      id: "perubahan",
      title: "Perubahan syarat",
      paragraphs: [
        "Kami dapat mengubah syarat ini sewaktu-waktu. Penggunaan situs setelah perubahan berarti Anda menyetujui syarat yang baru.",
      ],
    },
    contactSection("kontak", "Pertanyaan tentang syarat ini dapat dikirim ke:"),
  ],
}

export const privasiBanner: PageBannerProps = {
  title: "Kebijakan Privasi",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Kebijakan Privasi" }],
  image: bannerImage,
}

export const privasi: LegalDocumentProps = {
  ...common,
  intro: `${name} menghargai privasi Anda. Halaman ini menjelaskan data apa yang kami kumpulkan saat Anda memakai situs dan toko kami, untuk apa data itu dipakai, dan bagaimana kami menjaganya.`,
  sections: [
    {
      id: "data-dikumpulkan",
      title: "Data yang kami kumpulkan",
      paragraphs: ["Kami hanya mengumpulkan data yang diperlukan untuk melayani Anda:"],
      items: [
        "Formulir kontak: nama, alamat surel, subjek, dan isi pesan.",
        "Langganan buletin: alamat surel.",
        "Pesanan di toko: nama, nomor telepon, alamat surel, alamat penagihan dan pengiriman, serta riwayat pesanan.",
        "Data teknis: alamat IP, jenis peramban dan perangkat, halaman yang dibuka, serta cookie yang diperlukan agar situs dan keranjang berfungsi.",
      ],
    },
    {
      id: "tujuan",
      title: "Tujuan penggunaan data",
      paragraphs: [
        "Data Anda kami gunakan untuk menjawab pertanyaan, memproses dan mengirim pesanan, mengirim buletin bila Anda berlangganan, menjaga keamanan situs, serta meningkatkan layanan dan isi situs.",
      ],
    },
    {
      id: "dasar-hukum",
      title: "Dasar pemrosesan",
      paragraphs: [
        "Kami memproses data pribadi berdasarkan persetujuan Anda, pelaksanaan perjanjian jual beli atau layanan, dan kewajiban hukum, sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
      ],
    },
    {
      id: "berbagi-data",
      title: "Berbagi data dengan pihak lain",
      paragraphs: [
        "Kami tidak menjual data pribadi Anda. Data hanya dibagikan seperlunya kepada penyedia jasa yang membantu operasional, misalnya jasa pengiriman, penyedia pembayaran, hosting, dan layanan surel, atau bila diwajibkan oleh hukum.",
      ],
    },
    {
      id: "cookie",
      title: "Cookie",
      paragraphs: [
        "Cookie dipakai agar keranjang belanja, proses pembayaran, dan formulir berjalan baik, serta untuk memahami penggunaan situs secara umum. Anda dapat menghapus atau memblokir cookie lewat pengaturan peramban, tetapi sebagian fitur toko mungkin tidak berfungsi.",
      ],
    },
    {
      id: "penyimpanan-keamanan",
      title: "Penyimpanan dan keamanan",
      paragraphs: [
        "Data disimpan selama diperlukan untuk tujuan di atas atau selama diwajibkan hukum, lalu dihapus atau dianonimkan. Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data dari akses, perubahan, atau kehilangan yang tidak sah.",
      ],
    },
    {
      id: "hak-anda",
      title: "Hak Anda",
      paragraphs: [
        "Anda berhak mengakses, memperbaiki, menghapus, atau membatasi pemrosesan data pribadi Anda, menarik persetujuan, dan berhenti berlangganan buletin kapan saja. Untuk menggunakan hak tersebut, hubungi kami lewat kontak di bawah.",
      ],
    },
    {
      id: "anak",
      title: "Anak di bawah umur",
      paragraphs: [
        "Situs ini tidak ditujukan bagi anak di bawah 18 tahun. Bila Anda mengetahui anak memberikan data tanpa izin orang tua atau wali, beri tahu kami agar data tersebut kami hapus.",
      ],
    },
    {
      id: "perubahan",
      title: "Perubahan kebijakan",
      paragraphs: [
        "Kebijakan ini dapat diperbarui sewaktu-waktu. Tanggal pembaruan terakhir selalu tercantum di bagian atas halaman ini.",
      ],
    },
    contactSection("kontak", "Pertanyaan tentang kebijakan ini dapat dikirim ke:"),
  ],
}
