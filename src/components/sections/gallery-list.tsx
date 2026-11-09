import { GalleryCard, type GalleryCardData } from "@/components/shared/gallery-card"

export type GalleryListProps = {
  items: readonly GalleryCardData[]
}

export function GalleryList({ items }: GalleryListProps) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4 xl:gap-6">
          {items.map((item) => (
            <GalleryCard key={item.href} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
