import type { ReactNode } from "react"

/** Pembungkus isi halaman keranjang dan pembayaran (`.shop-page-section`). */
export function ShopPageSection({ children }: { children: ReactNode }) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">{children}</div>
    </section>
  )
}
