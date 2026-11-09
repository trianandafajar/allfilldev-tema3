import { ServiceGrid } from "@/components/shared/service-grid"
import type { ServiceCardData } from "@/components/shared/service-card"

export type ServiceListProps = {
  items: readonly ServiceCardData[]
}

export function ServiceList({ items }: ServiceListProps) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">
        <ServiceGrid items={items} />
      </div>
    </section>
  )
}
