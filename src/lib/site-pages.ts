import { sitePages } from "@/config/site"
import { blogSlugs, getPost } from "@/content/blog"
import { gallerySlugs, getGalleryItem } from "@/content/galeri"
import { getService, serviceSlugs } from "@/content/layanan"
import { getProduct, productSlugs } from "@/content/produk"

type PageEntry = { path: string; title: string; description: string }

function detailPages<T extends { title: string; summary: string }>(
  base: string,
  slugs: readonly string[],
  get: (slug: string) => T | undefined
): PageEntry[] {
  return slugs.flatMap((slug) => {
    const item = get(slug)
    return item ? [{ path: `${base}/${slug}`, title: item.title, description: item.summary }] : []
  })
}

/** Semua halaman publik: halaman tetap di `sitePages` plus halaman detail dari konten (untuk sitemap dan llms.txt). */
export function getAllPages(): PageEntry[] {
  return [
    ...sitePages,
    ...detailPages("/layanan", serviceSlugs, getService),
    ...detailPages("/galeri", gallerySlugs, getGalleryItem),
    ...detailPages("/blog", blogSlugs, (slug) => {
      const post = getPost(slug)
      return post && { title: post.title, summary: post.excerpt }
    }),
    ...detailPages("/produk", productSlugs, (slug) => {
      const product = getProduct(slug)
      return product && { title: product.name, summary: product.shortDescription }
    }),
  ]
}
