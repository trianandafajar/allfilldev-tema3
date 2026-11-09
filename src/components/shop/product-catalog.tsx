"use client"

import { useMemo, useState } from "react"

import { ProductCard } from "@/components/shop/product-card"
import { ShopFilters, type ShopFilterState } from "@/components/shop/shop-filters"
import { effectivePrice, shopContent, type Product, type ProductCategory } from "@/content/produk"
import { cn } from "@/lib/utils"

type ProductCatalogProps = {
  products: readonly Product[]
  categories: readonly ProductCategory[]
}

/** Daftar produk dengan filter kategori, harga, dan status. Disaring di klien karena seluruh katalog statis. */
export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const bounds = useMemo(() => {
    const prices = products.map(effectivePrice)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }, [products])

  const initial: ShopFilterState = {
    category: null,
    minPrice: String(bounds.min),
    maxPrice: String(bounds.max),
    inStockOnly: false,
    onSaleOnly: false,
  }
  const [state, setState] = useState(initial)

  const visible = useMemo(() => {
    const min = Number(state.minPrice) || 0
    const max = state.maxPrice === "" ? Infinity : Number(state.maxPrice)
    return products.filter((product) => {
      const price = effectivePrice(product)
      if (state.category && product.category !== state.category) return false
      if (price < min || price > max) return false
      if (state.inStockOnly && !product.inStock) return false
      if (state.onSaleOnly && product.salePrice === undefined) return false
      return true
    })
  }, [products, state])

  const counted = categories.map((category) => ({
    ...category,
    count: products.filter((product) => product.category === category.slug).length,
  }))

  const tabs: { slug: string | null; name: string }[] = [
    { slug: null, name: shopContent.filter.allCategories },
    ...categories.map((category) => ({ slug: category.slug, name: category.name })),
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-12 xl:gap-6">
      <div className="lg:col-span-3">
        <ShopFilters
          state={state}
          categories={counted}
          bounds={bounds}
          resultCount={visible.length}
          onSubmitPrice={(minPrice, maxPrice) => setState((current) => ({ ...current, minPrice, maxPrice }))}
          onCategory={(category) => setState((current) => ({ ...current, category }))}
          onToggle={(key) => setState((current) => ({ ...current, [key]: !current[key] }))}
          onReset={() => setState(initial)}
        />
      </div>
      <div className="lg:col-span-9">
        <div
          role="group"
          aria-label={shopContent.filter.categoryTitle}
          className="mb-10 flex flex-wrap justify-center gap-2.5 xl:mb-[60px]"
        >
          {tabs.map((tab) => {
            const active = state.category === tab.slug
            return (
              <button
                key={tab.name}
                type="button"
                aria-pressed={active}
                onClick={() => setState((current) => ({ ...current, category: tab.slug }))}
                className={cn(
                  "rounded-[10px] border px-5 py-[5px] font-heading text-xl leading-[30px] transition-all duration-400",
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-border text-forest hover:border-primary hover:text-primary"
                )}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-muted-foreground">{shopContent.filter.empty}</p>
        )}
      </div>
    </div>
  )
}
