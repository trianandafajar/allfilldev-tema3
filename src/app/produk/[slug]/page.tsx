import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/contact";
import { PageBanner } from "@/components/sections/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductDetail } from "@/components/shop/product-detail";
import { siteConfig } from "@/config/site";
import { contact } from "@/content/beranda";
import { effectivePrice, getCategory, getProduct, getProductBanner, productSlugs } from "@/content/produk";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Semua slug diprerender lewat generateStaticParams; tanpa ini mode dev menuntut Suspense di sekitar `params`.
export const instant = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return pageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/produk/${slug}`,
    image: product.image.src,
  });
}

export default async function ProdukDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const url = absoluteUrl(`/produk/${slug}`);
  const category = getCategory(product.category);
  const organization = { "@id": `${siteConfig.url}/#organization` };

  return (
    <>
      <PageBanner {...getProductBanner(product)} />
      <ProductDetail product={product} />
      <Contact {...contact} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Product",
              "@id": `${url}#product`,
              name: product.name,
              description: product.description,
              url,
              image: absoluteUrl(product.image.src),
              ...(category && { category: category.name }),
              brand: organization,
              offers: {
                "@type": "Offer",
                url,
                price: effectivePrice(product),
                priceCurrency: "IDR",
                availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                itemCondition: "https://schema.org/NewCondition",
                seller: organization,
              },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Beranda", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Produk", item: absoluteUrl("/produk") },
                { "@type": "ListItem", position: 3, name: product.name, item: url },
              ],
            },
          ],
        }}
      />
    </>
  );
}
