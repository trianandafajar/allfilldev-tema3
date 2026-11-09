"use client"

import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { shopContent, type ProductCategory } from "@/content/produk"
import { formatRupiah } from "@/lib/format"
import { cn } from "@/lib/utils"

export type ShopFilterState = {
  category: string | null
  minPrice: string
  maxPrice: string
  inStockOnly: boolean
  onSaleOnly: boolean
}

type ShopFiltersProps = {
  state: ShopFilterState
  categories: readonly (ProductCategory & { count: number })[]
  bounds: { min: number; max: number }
  resultCount: number
  onSubmitPrice: (min: string, max: string) => void
  onCategory: (slug: string | null) => void
  onToggle: (key: "inStockOnly" | "onSaleOnly") => void
  onReset: () => void
}

const heading = "font-heading text-xl leading-[30px] font-normal text-forest"
const priceInput =
  "h-10 w-full min-w-0 border-0 bg-transparent font-heading text-forest outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

const statusItems = [
  { key: "inStockOnly", label: shopContent.filter.inStock, swatch: "bg-accent" },
  { key: "onSaleOnly", label: shopContent.filter.onSale, swatch: "bg-line-strong" },
] as const

/** Kolom filter samping daftar produk (`.product-list-leftbar`): harga, kategori berhitung, dan status stok/diskon. */
export function ShopFilters({
  state,
  categories,
  bounds,
  resultCount,
  onSubmitPrice,
  onCategory,
  onToggle,
  onReset,
}: ShopFiltersProps) {
  const { filter } = shopContent

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmitPrice(String(data.get("min_price") ?? ""), String(data.get("max_price") ?? ""))
  }

  return (
    <aside className="rounded-[20px] border border-border bg-white px-5 py-6 xl:px-10 xl:py-[30px]">
      <h5 className={cn(heading, "mb-[15px]")}>{filter.priceTitle}</h5>
      <form onSubmit={handleSubmit} key={`${state.minPrice}-${state.maxPrice}`}>
        <div className="mb-[15px] flex items-center justify-between rounded-full bg-muted px-[15px] py-0.5">
          <input
            type="number"
            name="min_price"
            min={0}
            defaultValue={state.minPrice}
            aria-label={filter.minLabel}
            className={priceInput}
          />
          <span aria-hidden className="flex w-[130px] items-center justify-center font-heading text-[19px] text-forest">
            -
          </span>
          <input
            type="number"
            name="max_price"
            min={0}
            defaultValue={state.maxPrice}
            aria-label={filter.maxLabel}
            className={priceInput}
          />
        </div>
        <div className="mt-3 mb-6 flex items-center justify-between gap-2">
          <span className="font-heading text-sm leading-[22px] font-medium text-forest">
            {formatRupiah(bounds.min)} - {formatRupiah(bounds.max)}
          </span>
          <button
            type="submit"
            className="rounded-full border border-border px-2.5 py-1 font-heading text-sm leading-[22px] font-medium text-forest transition-colors hover:bg-primary hover:text-white"
          >
            {filter.submit}
          </button>
        </div>
      </form>

      <h5 className={cn(heading, "mb-5")}>{filter.categoryTitle}</h5>
      <ul className="grid gap-2.5">
        {categories.map((category) => {
          const active = state.category === category.slug
          return (
            <li key={category.slug}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onCategory(active ? null : category.slug)}
                className={cn(
                  "flex w-full items-center justify-between text-sm leading-[160%] text-muted-foreground transition-colors hover:text-primary",
                  active && "text-primary"
                )}
              >
                <span className="font-heading text-sm leading-[22px] text-forest">{category.name}</span>
                {String(category.count).padStart(2, "0")}
              </button>
            </li>
          )
        })}
      </ul>

      <span aria-live="polite" className="mt-[30px] mb-4 block text-sm leading-[160%] text-muted-foreground">
        Menampilkan {resultCount} produk
      </span>

      <h5 className={cn(heading, "mb-5")}>{filter.statusTitle}</h5>
      <ul className="grid gap-3.5">
        {statusItems.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              aria-pressed={state[item.key]}
              onClick={() => onToggle(item.key)}
              className={cn(
                "flex items-center gap-[5px] text-sm text-forest transition-colors hover:text-primary",
                state[item.key] && "font-semibold text-primary"
              )}
            >
              {item.label}
              <span aria-hidden className={cn("size-[11px]", item.swatch)} />
            </button>
          </li>
        ))}
      </ul>

      <Button type="button" variant="brand-outline" size="cta" onClick={onReset} className="mt-8 w-full px-4 py-3 text-xs">
        {filter.reset}
      </Button>
    </aside>
  )
}
