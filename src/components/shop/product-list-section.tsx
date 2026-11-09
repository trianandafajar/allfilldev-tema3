import { ProductCatalog } from "@/components/shop/product-catalog"
import { productCategories, products } from "@/content/produk"

/** Bagian daftar produk di halaman /produk: filter samping dan grid kartu. */
export function ProductListSection() {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">
        <ProductCatalog products={products} categories={productCategories} />
      </div>
    </section>
  )
}
