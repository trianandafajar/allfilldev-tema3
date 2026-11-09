import { ServiceCard, type ServiceCardData, type ServiceCardVariant } from "@/components/shared/service-card"

export function ServiceGrid({
  items,
  variant,
}: {
  items: readonly ServiceCardData[]
  variant?: ServiceCardVariant
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 xl:gap-6">
      {items.map((item) => (
        <ServiceCard key={item.href} variant={variant} {...item} />
      ))}
    </div>
  )
}
