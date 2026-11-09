"use client"

import { useEffect, useRef, useState } from "react"

import { addToCart } from "@/components/shop/cart-store"
import { Button } from "@/components/ui/button"
import { shopContent } from "@/content/produk"
import { cn } from "@/lib/utils"

type AddToCartButtonProps = {
  slug: string
  quantity?: number
  /** `card`: tombol kecil bergaris di kartu produk. `cta`: tombol hijau besar di halaman detail. */
  variant?: "card" | "cta"
  label?: string
  disabled?: boolean
  className?: string
}

export function AddToCartButton({ slug, quantity = 1, variant = "card", label, disabled, className }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  function handleClick() {
    addToCart(slug, quantity)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1800)
  }

  const text = added ? shopContent.card.added : (label ?? shopContent.card.addToCart)

  if (variant === "cta") {
    return (
      <Button type="button" variant="brand" size="cta" disabled={disabled} onClick={handleClick} className={className}>
        <span aria-live="polite">{text}</span>
      </Button>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "inline-block rounded-full border border-border px-3.5 py-2.5 text-xs leading-[22px] tracking-[1.2px] text-forest transition-all duration-400 hover:bg-primary hover:text-white group-hover/card:bg-primary group-hover/card:text-white 2xl:px-[18px] 2xl:text-[15px] 2xl:tracking-[3px]",
        className
      )}
    >
      <span aria-live="polite">{text}</span>
    </button>
  )
}
