"use client"

import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"

import { removeFromCart, setCartQuantity, useCart } from "@/components/shop/cart-store"
import { EmptyCart } from "@/components/shop/empty-cart"
import { QuantityStepper } from "@/components/shop/quantity-stepper"
import { Button } from "@/components/ui/button"
import { shopContent } from "@/content/produk"
import { formatRupiah } from "@/lib/format"

const { cart } = shopContent

/** Isi halaman /keranjang: daftar produk dengan jumlah yang bisa diubah, dan total keranjang. */
export function CartView() {
  const { hydrated, items, total } = useCart()

  if (!hydrated) return <div aria-busy className="min-h-60" />
  if (items.length === 0) return <EmptyCart title={cart.emptyTitle} actionLabel={cart.emptyAction} />

  return (
    <div className="grid gap-6 lg:grid-cols-12 xl:gap-8">
      <div className="lg:col-span-8">
        <div
          aria-hidden
          className="hidden grid-cols-[96px_1fr_130px_120px_32px] items-center gap-4 border-b border-border pb-3 font-heading text-base text-forest md:grid"
        >
          <span />
          <span>{cart.columns.product}</span>
          <span>{cart.columns.quantity}</span>
          <span className="text-end">{cart.columns.subtotal}</span>
          <span />
        </div>
        <ul>
          {items.map(({ product, quantity, unitPrice, subtotal }) => (
            <li
              key={product.slug}
              className="grid grid-cols-[72px_1fr_auto] items-center gap-x-4 gap-y-3 border-b border-border py-5 md:grid-cols-[96px_1fr_130px_120px_32px]"
            >
              <Link
                href={`/produk/${product.slug}`}
                aria-label={product.name}
                className="row-span-2 self-start md:row-span-1 md:self-center"
              >
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={96}
                  height={96}
                  className="size-[72px] rounded-[10px] object-cover md:size-24"
                />
              </Link>
              <div>
                <Link
                  href={`/produk/${product.slug}`}
                  className="mb-1 block font-heading text-lg leading-[1.3] text-forest hover:text-primary"
                >
                  {product.name}
                </Link>
                <span className="text-sm text-muted-foreground">
                  {cart.columns.price}: {formatRupiah(unitPrice)}
                </span>
              </div>
              <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
                <QuantityStepper
                  value={quantity}
                  onChange={(next) => setCartQuantity(product.slug, next)}
                  label={`${cart.columns.quantity} ${product.name}`}
                />
              </div>
              <span className="col-start-3 row-start-2 text-end font-heading text-lg text-primary md:col-start-4 md:row-start-1">
                <span className="sr-only">{cart.columns.subtotal} </span>
                {formatRupiah(subtotal)}
              </span>
              <button
                type="button"
                onClick={() => removeFromCart(product.slug)}
                aria-label={`${cart.remove} ${product.name}`}
                className="col-start-3 row-start-1 flex size-8 items-center justify-center justify-self-end rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-destructive md:col-start-5"
              >
                <X aria-hidden className="size-4" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button asChild variant="brand-outline" size="cta">
            <Link href="/produk">{cart.continueShopping}</Link>
          </Button>
        </div>
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-[20px] border border-border p-5 xl:p-10">
          <h3 className="mb-6 text-2xl text-forest">{cart.totalsTitle}</h3>
          <dl className="mb-6 grid gap-3 text-base">
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-muted-foreground">{cart.subtotal}</dt>
              <dd className="text-forest">{formatRupiah(total)}</dd>
            </div>
            <div className="flex justify-between font-heading text-xl">
              <dt className="text-forest">{cart.total}</dt>
              <dd className="text-primary">{formatRupiah(total)}</dd>
            </div>
          </dl>
          <p className="mb-6 text-sm text-muted-foreground">{cart.shippingNote}</p>
          <Button asChild variant="brand" size="cta" className="w-full">
            <Link href="/pembayaran">{cart.checkout}</Link>
          </Button>
        </div>
      </aside>
    </div>
  )
}
