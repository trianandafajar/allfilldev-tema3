import Image from "next/image"
import Link from "next/link"
import { List } from "lucide-react"

import { CategoryAccordion } from "@/components/shop/category-accordion"
import { Price } from "@/components/shop/price"
import {
  getLatestProducts,
  productCategories,
  productsInCategory,
  shopContent,
  type Product,
} from "@/content/produk"

const box = "rounded-[20px] border border-border bg-white p-5 xl:p-10"

/** Kolom kiri detail produk: belanja per kategori (akordeon) dan produk terbaru. */
export function ProductSidebar({ current }: { current: Product }) {
  const { detail } = shopContent
  const groups = productCategories.map((category) => ({
    category,
    items: productsInCategory(category.slug).slice(0, 8),
  }))

  return (
    <aside className="grid content-start gap-[60px]">
      <div className={box}>
        <div className="mb-5 flex items-center gap-[15px] border-b border-border pb-2.5">
          <List aria-hidden className="size-[26px] text-forest" />
          <h5 className="font-heading text-xl leading-[30px] font-normal text-forest">{detail.categoryMenuTitle}</h5>
        </div>
        <CategoryAccordion groups={groups} defaultOpen={current.category} />
      </div>
      <div className={box}>
        <h5 className="mb-6 font-heading text-xl font-normal text-forest">{detail.latestTitle}</h5>
        <ul className="grid gap-[18px] xl:gap-8">
          {getLatestProducts(4).map((item) => (
            <li key={item.slug}>
              <Link href={`/produk/${item.slug}`} className="group flex items-center gap-2.5 xl:gap-[25px]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={95}
                  height={78}
                  className="h-[78px] w-[95px] shrink-0 rounded-[20px] object-cover"
                />
                <span>
                  <span className="mb-1 block text-base leading-[150%] font-medium text-forest group-hover:text-primary">
                    {item.name}
                  </span>
                  <Price price={item.price} salePrice={item.salePrice} className="font-heading text-sm text-muted-foreground" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
