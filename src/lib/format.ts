const dayMonth = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", timeZone: "UTC" })
const full = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })

/** `2026-01-22` menjadi "22 Jan". Tanggal ISO tanpa jam dibaca sebagai UTC supaya hasilnya sama di server dan klien. */
export function formatDayMonth(iso: string) {
  return dayMonth.format(new Date(iso))
}

/** `2026-01-22` menjadi "22 Januari 2026". */
export function formatDate(iso: string) {
  return full.format(new Date(iso))
}

/** `18000` menjadi "Rp 18.000" (Rupiah tanpa desimal, pemisah ribuan titik; tidak bergantung pada ICU runtime). */
export function formatRupiah(amount: number) {
  return `Rp ${Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}
