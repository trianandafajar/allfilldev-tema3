import Image from "next/image"
import Link from "next/link"

import { Price } from "@/components/shop/price"
import type { Product } from "@/content/produk"

/** Kartu produk vertikal ringkas untuk "Produk Terkait". */
export function ProductTile({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      <Image
        src={product.image.src}
        alt={product.image.alt}
        width={product.image.width}
        height={product.image.height}
        sizes="(min-width: 62rem) 22vw, (min-width: 36rem) 33vw, 100vw"
        className="mb-4 h-auto w-full rounded-[10px]"
      />
      <h3 className="mb-1 font-heading text-lg leading-[1.3] font-normal text-forest group-hover:text-primary">
        {product.name}
      </h3>
      <Price price={product.price} salePrice={product.salePrice} className="font-heading text-base text-primary" />
    </Link>
  )
}
