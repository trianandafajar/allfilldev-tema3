import Image from "next/image"

import { Price } from "@/components/shop/price"
import { ProductPurchase } from "@/components/shop/product-purchase"
import { ProductSidebar } from "@/components/shop/product-sidebar"
import { ProductTabs } from "@/components/shop/product-tabs"
import { ProductTile } from "@/components/shop/product-tile"
import { getCategory, getRelatedProducts, shopContent, type Product } from "@/content/produk"

/** Bagian isi halaman detail produk: sidebar, foto, info beli, tab, dan produk terkait. */
export function ProductDetail({ product }: { product: Product }) {
  const { detail } = shopContent
  const category = getCategory(product.category)
  const related = getRelatedProducts(product.slug, 3)

  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container xl:max-w-[1500px]">
        <div className="grid gap-4 md:grid-cols-12 xl:gap-6">
          <div className="md:col-span-5 lg:col-span-3 xl:pe-6">
            <ProductSidebar current={product} />
          </div>
          <div className="md:col-span-7 lg:col-span-9">
            <div className="mb-[60px] grid gap-4 lg:grid-cols-12 xl:gap-6">
              <div className="lg:col-span-6 xl:col-span-5">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={product.image.width}
                  height={product.image.height}
                  priority
                  sizes="(min-width: 75rem) 28vw, (min-width: 62rem) 33vw, 90vw"
                  className="h-auto w-full rounded-[30px]"
                />
              </div>
              <div className="lg:col-span-6 xl:col-span-7">
                <div className="rounded-[20px] border border-border p-5 xl:p-[30px] 2xl:p-10">
                  <h3 className="mb-[18px] text-forest">{product.name}</h3>
                  <p className="mb-5 text-sm text-muted-foreground">{product.shortDescription}</p>
                  <h3 className="mb-5 font-normal text-primary">
                    <Price price={product.price} salePrice={product.salePrice} className="font-heading text-[32px]" />
                  </h3>
                  <div className="grid gap-1.5 text-sm text-muted-foreground">
                    {category ? (
                      <span>
                        {detail.categoryLabel}: <span className="text-forest">{category.name}</span>
                      </span>
                    ) : null}
                    <span>
                      {detail.stockLabel}:{" "}
                      <span className="text-forest">{product.inStock ? detail.inStock : detail.outOfStock}</span>
                    </span>
                  </div>
                  <ProductPurchase slug={product.slug} inStock={product.inStock} />
                </div>
              </div>
            </div>

            <ProductTabs
              tabs={[
                { value: "deskripsi", label: detail.tabs.description, content: <p>{product.description}</p> },
                {
                  value: "informasi",
                  label: detail.tabs.info,
                  content: (
                    <dl className="grid max-w-md grid-cols-[auto_1fr] gap-x-10 gap-y-2">
                      <dt className="font-medium text-forest">{detail.categoryLabel}</dt>
                      <dd>{category?.name}</dd>
                      <dt className="font-medium text-forest">{detail.stockLabel}</dt>
                      <dd>{product.inStock ? detail.inStock : detail.outOfStock}</dd>
                    </dl>
                  ),
                },
              ]}
            />

            {related.length > 0 ? (
              <div className="mt-[60px]">
                <h2 className="mb-[30px] font-heading text-[32px] leading-tight font-normal text-forest">
                  {detail.relatedTitle}
                </h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  {related.map((item) => (
                    <ProductTile key={item.slug} product={item} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
