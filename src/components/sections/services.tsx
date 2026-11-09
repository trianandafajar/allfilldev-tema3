import { SectionTitle } from "@/components/shared/section-title"
import type { ServiceCardData } from "@/components/shared/service-card"
import { ServiceGrid } from "@/components/shared/service-grid"

export type ServicesProps = {
  eyebrow: string
  title: string
  items: readonly ServiceCardData[]
}

/**
 * Seksi layanan beranda (`.servicev2-section`): tanpa padding vertikal sendiri, kartu menumpang
 * di atas pita hijau tua setinggi 270px yang menyambung ke seksi berikutnya.
 */
export function Services({ eyebrow, title, items }: ServicesProps) {
  return (
    <section
      id="layanan"
      className="relative z-1 overflow-hidden bg-white before:absolute before:bottom-0 before:left-0 before:-z-1 before:h-[270px] before:w-full before:bg-forest before:content-['']"
    >
      <div className="container">
        <div className="title-col-6">
          <SectionTitle uppercase eyebrow={eyebrow} title={title} className="mb-10 lg:mb-[50px] 2xl:mb-[60px]" />
        </div>
        <ServiceGrid items={items} variant="card" />
      </div>
    </section>
  )
}
