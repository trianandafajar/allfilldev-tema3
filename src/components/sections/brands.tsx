import { BrandSlider } from "@/components/shared/brand-slider"
import { cn } from "@/lib/utils"

export type BrandsProps = {
  label: string
  items: readonly { src: string; alt: string; width: number; height: number }[]
  /** Kelas tambahan untuk `<section>`, mis. `bg-secondary` untuk latar hijau muda beranda. */
  className?: string
}

export function Brands({ label, items, className }: BrandsProps) {
  return (
    <section aria-label={label} className={cn("section-padding bg-white", className)}>
      <div className="container">
        <BrandSlider items={items} />
      </div>
    </section>
  )
}
