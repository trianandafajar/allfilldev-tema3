"use client"

import { useState } from "react"

import { AddToCartButton } from "@/components/shop/add-to-cart-button"
import { QuantityStepper } from "@/components/shop/quantity-stepper"
import { shopContent } from "@/content/produk"

/** Pilihan jumlah dan tombol tambah ke keranjang di halaman detail produk. */
export function ProductPurchase({ slug, inStock }: { slug: string; inStock: boolean }) {
  const [quantity, setQuantity] = useState(1)
  const { detail } = shopContent

  if (!inStock) return <p className="font-heading text-xl text-destructive">{detail.outOfStock}</p>

  return (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <QuantityStepper value={quantity} onChange={setQuantity} label={detail.quantityLabel} />
      <AddToCartButton slug={slug} quantity={quantity} variant="cta" label={detail.addToCart} />
    </div>
  )
}
