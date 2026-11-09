import Image from "next/image"
import Link from "next/link"

import { AddToCartButton } from "@/components/shop/add-to-cart-button"
import { Price } from "@/components/shop/price"
import type { Product } from "@/content/produk"

/** Kartu produk daftar (`.feature-itemsv1`): foto di kiri, judul, deskripsi, harga, dan tombol keranjang di kanan. */
export function ProductCard({ product }: { product: Product }) {
  const href = `/produk/${product.slug}`

  return (
    <article className="group/card relative z-1 flex items-center gap-[18px] bg-white py-5 pr-[15px] pb-[25px] before:absolute before:top-0 before:right-0 before:-z-1 before:h-full before:w-4/5 before:rounded-[10px] before:border before:border-border before:content-[''] 2xl:gap-5 2xl:py-[30px] 2xl:pr-[30px]">
      <Link href={href} aria-label={product.name} className="w-[42%] shrink-0 2xl:w-[295px] 2xl:shrink">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={product.image.width}
          height={product.image.height}
          sizes="(min-width: 87.5rem) 295px, 200px"
          className="h-auto w-full rounded-[10px]"
        />
      </Link>
      <div className="min-w-0">
        <Link
          href={href}
          className="mb-2 block font-heading text-xl leading-[30px] font-normal text-forest group-hover/card:text-primary 2xl:mb-2.5"
        >
          {product.name}
        </Link>
        <p className="mb-2.5 text-sm leading-[160%] text-muted-foreground">{product.shortDescription}</p>
        <h5 className="mb-3.5 font-heading text-xl font-normal text-primary 2xl:mb-[15px]">
          <Price price={product.price} salePrice={product.salePrice} />
        </h5>
        <AddToCartButton slug={product.slug} disabled={!product.inStock} />
      </div>
    </article>
  )
}
