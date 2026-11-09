import type { PageBannerProps } from "@/components/sections/page-banner"

export type ProductCategory = { slug: string; name: string }

export type Product = {
  slug: string
  name: string
  /** Harga normal dalam Rupiah (bilangan bulat). */
  price: number
  /** Harga diskon dalam Rupiah; bila ada, `price` tampil dicoret. */
  salePrice?: number
  category: ProductCategory["slug"]
  image: { src: string; alt: string; width: number; height: number }
  shortDescription: string
  description: string
  inStock: boolean
}

export const productCategories: readonly ProductCategory[] = [
  { slug: "sayuran", name: "Sayuran" },
  { slug: "daging-dan-telur", name: "Daging dan Telur" },
]

const photo = (slug: string, alt: string) => ({
  src: `/images/produk/${slug}.jpg`,
  alt,
  width: 600,
  height: 610,
})

const closing = "Dikemas rapi dan dikirim dalam keadaan segar."

const entries: readonly Product[] = [
  {
    slug: "tomat-segar",
    name: "Tomat Segar",
    price: 18000,
    category: "sayuran",
    image: photo("tomat-segar", "Tomat merah segar"),
    shortDescription: "Tomat merah segar dari kebun, per kg.",
    description: `Tomat merah segar dari kebun, per kg. ${closing}`,
    inStock: true,
  },
  {
    slug: "daging-sapi-lokal",
    name: "Daging Sapi Lokal",
    price: 135000,
    category: "daging-dan-telur",
    image: photo("daging-sapi-lokal", "Daging sapi lokal segar"),
    shortDescription: "Daging sapi lokal pilihan, per kg.",
    description: `Daging sapi lokal pilihan, per kg. ${closing}`,
    inStock: true,
  },
  {
    slug: "bunga-kol",
    name: "Bunga Kol",
    price: 22000,
    category: "sayuran",
    image: photo("bunga-kol", "Bunga kol putih padat"),
    shortDescription: "Bunga kol padat dan bersih.",
    description: `Bunga kol padat dan bersih. ${closing}`,
    inStock: true,
  },
  {
    slug: "telur-ayam-kampung",
    name: "Telur Kampung",
    price: 38000,
    category: "daging-dan-telur",
    image: photo("telur-ayam-kampung", "Telur ayam kampung"),
    shortDescription: "Telur ayam kampung segar, isi 10.",
    description: `Telur ayam kampung segar, isi 10. ${closing}`,
    inStock: true,
  },
  {
    slug: "jagung-manis",
    name: "Jagung Manis",
    price: 15000,
    category: "sayuran",
    image: photo("jagung-manis", "Jagung manis kuning"),
    shortDescription: "Jagung manis kuning, cocok dibakar.",
    description: `Jagung manis kuning, cocok dibakar. ${closing}`,
    inStock: true,
  },
  {
    slug: "kangkung-organik",
    name: "Kangkung Organik",
    price: 8000,
    category: "sayuran",
    image: photo("kangkung-organik", "Kangkung organik segar"),
    shortDescription: "Kangkung organik segar, per ikat.",
    description: `Kangkung organik segar, per ikat. ${closing}`,
    inStock: true,
  },
]

export const products = entries
export const productSlugs = entries.map((item) => item.slug)

export function getProduct(slug: string) {
  return entries.find((item) => item.slug === slug)
}

export function getCategory(slug: string) {
  return productCategories.find((item) => item.slug === slug)
}

/** Harga yang ditagihkan: harga diskon bila ada, selain itu harga normal. */
export function effectivePrice(product: Pick<Product, "price" | "salePrice">) {
  return product.salePrice ?? product.price
}

export function productsInCategory(category: ProductCategory["slug"]) {
  return entries.filter((item) => item.category === category)
}

/** Produk terkait: kategori yang sama dulu, lalu produk lain, tanpa produk itu sendiri. */
export function getRelatedProducts(slug: string, count: number) {
  const current = getProduct(slug)
  const others = entries.filter((item) => item.slug !== slug)
  const sameCategory = others.filter((item) => item.category === current?.category)
  const rest = others.filter((item) => item.category !== current?.category)
  return [...sameCategory, ...rest].slice(0, count)
}

/** Urutan di `entries` sama dengan urutan menu WordPress; "terbaru" mengambil dari belakang. */
export function getLatestProducts(count: number) {
  return [...entries].reverse().slice(0, count)
}

const bannerImage = { src: "/images/about/tt-slice.png", width: 222, height: 245 }

export const listBanner: PageBannerProps = {
  title: "Produk",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Produk" }],
  image: bannerImage,
}

export const cartBanner: PageBannerProps = {
  title: "Keranjang",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Produk", href: "/produk" }, { label: "Keranjang" }],
  image: bannerImage,
}

export const checkoutBanner: PageBannerProps = {
  title: "Pembayaran",
  crumbs: [{ label: "Beranda", href: "/" }, { label: "Keranjang", href: "/keranjang" }, { label: "Pembayaran" }],
  image: bannerImage,
}

export function getProductBanner(product: Product): PageBannerProps {
  return {
    title: "Detail Produk",
    crumbs: [{ label: "Beranda", href: "/" }, { label: "Produk", href: "/produk" }, { label: product.name }],
    image: bannerImage,
  }
}

export const shopContent = {
  filter: {
    priceTitle: "Filter Harga",
    minLabel: "Harga minimum",
    maxLabel: "Harga maksimum",
    submit: "Filter",
    categoryTitle: "Kategori",
    statusTitle: "Status Produk",
    inStock: "Stok Tersedia",
    onSale: "Sedang Diskon",
    allCategories: "Semua",
    reset: "Atur ulang filter",
    empty: "Tidak ada produk yang cocok dengan filter ini.",
  },
  card: { addToCart: "Ke Keranjang", added: "Ditambahkan" },
  detail: {
    categoryMenuTitle: "Belanja per Kategori",
    latestTitle: "Produk Terbaru",
    categoryLabel: "Kategori",
    addToCart: "Tambah ke Keranjang",
    quantityLabel: "Jumlah",
    outOfStock: "Stok habis",
    tabs: { description: "Deskripsi", info: "Informasi Tambahan" },
    stockLabel: "Ketersediaan",
    inStock: "Stok tersedia",
    relatedTitle: "Produk Terkait",
  },
  cart: {
    emptyTitle: "Keranjang Anda masih kosong.",
    emptyAction: "Kembali ke Produk",
    columns: { product: "Produk", price: "Harga", quantity: "Jumlah", subtotal: "Subtotal" },
    remove: "Hapus",
    totalsTitle: "Total Keranjang",
    subtotal: "Subtotal",
    total: "Total",
    shippingNote: "Ongkos kirim dikonfirmasi tim FarmHub setelah pesanan diterima.",
    checkout: "Lanjut ke Pembayaran",
    continueShopping: "Lanjut Belanja",
  },
} as const

export type CheckoutField = {
  name: string
  label: string
  placeholder: string
  autoComplete?: string
  type?: "text" | "email" | "tel"
  /** Lebar penuh pada grid dua kolom. */
  wide?: boolean
  required?: boolean
  maxLength: number
}

const addressFields = (prefix: "billing" | "shipping", section: string): CheckoutField[] => [
  { name: `${prefix}_first_name`, label: "Nama Depan", placeholder: "Nama depan", autoComplete: `${section} given-name`.trim(), required: true, maxLength: 60 },
  { name: `${prefix}_last_name`, label: "Nama Belakang", placeholder: "Nama belakang", autoComplete: `${section} family-name`.trim(), required: true, maxLength: 60 },
  { name: `${prefix}_company`, label: "Nama Perusahaan (opsional)", placeholder: "Nama perusahaan", autoComplete: `${section} organization`.trim(), wide: true, maxLength: 100 },
  { name: `${prefix}_address_1`, label: "Alamat Jalan", placeholder: "Nomor rumah dan nama jalan", autoComplete: `${section} street-address`.trim(), wide: true, required: true, maxLength: 200 },
  { name: `${prefix}_postcode`, label: "Kode Pos", placeholder: "Kode pos", autoComplete: `${section} postal-code`.trim(), required: true, maxLength: 5 },
  { name: `${prefix}_city`, label: "Kota", placeholder: "Kota", autoComplete: `${section} address-level2`.trim(), required: true, maxLength: 80 },
  { name: `${prefix}_state`, label: "Provinsi", placeholder: "Provinsi", autoComplete: `${section} address-level1`.trim(), wide: true, required: true, maxLength: 80 },
]

export const checkoutContent = {
  billingTitle: "Detail Penagihan",
  country: { label: "Negara/Wilayah", value: "Indonesia" },
  billingFields: [
    ...addressFields("billing", "billing"),
    { name: "billing_phone", label: "Telepon", placeholder: "Nomor telepon", autoComplete: "billing tel", type: "tel", required: true, maxLength: 20 },
    { name: "billing_email", label: "Alamat Email", placeholder: "nama@email.com", autoComplete: "billing email", type: "email", required: true, maxLength: 120 },
  ] satisfies CheckoutField[],
  shippingToggle: "Kirim ke alamat yang berbeda?",
  shippingFields: addressFields("shipping", "shipping") satisfies CheckoutField[],
  notes: {
    title: "Informasi Tambahan",
    name: "order_comments",
    label: "Catatan Pesanan (opsional)",
    placeholder: "Catatan tentang pesanan Anda, misalnya catatan khusus untuk pengiriman.",
    maxLength: 500,
  },
  summaryTitle: "Pesanan Anda",
  productHeader: "Produk",
  subtotalHeader: "Subtotal",
  paymentTitle: "Pembayaran",
  paymentNote:
    "Belum ada metode pembayaran online. Tim FarmHub akan menghubungi Anda untuk konfirmasi pesanan, ongkos kirim, dan cara pembayaran.",
  termsLead: "Saya telah membaca dan menyetujui",
  termsLink: { label: "syarat dan ketentuan", href: "/syarat-ketentuan" },
  submit: "Buat Pesanan",
  submitting: "Memproses...",
  emptyTitle: "Tidak ada produk untuk dibayar.",
  emptyAction: "Lihat Produk",
  errors: {
    cart: "Keranjang kosong atau berisi produk yang tidak dikenal. Periksa kembali keranjang Anda.",
    terms: "Anda harus menyetujui syarat dan ketentuan.",
    required: "Kolom ini wajib diisi.",
    email: "Alamat email tidak valid.",
    phone: "Nomor telepon tidak valid.",
    postcode: "Kode pos harus 5 digit.",
  },
  confirmation: {
    title: "Terima kasih, pesanan Anda sudah kami terima.",
    numberLabel: "Nomor pesanan",
    totalLabel: "Total",
    emailLabel: "Email",
    itemsTitle: "Rincian Pesanan",
    notice:
      "Pesanan Anda telah divalidasi. Sistem pemrosesan pesanan dan pembayaran belum terhubung pada situs ini, sehingga pesanan belum disimpan atau diteruskan ke tim FarmHub. Hubungi kami dengan menyebutkan nomor pesanan ini untuk melanjutkan.",
    action: "Lanjut Belanja",
  },
} as const
