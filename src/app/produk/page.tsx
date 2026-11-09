import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { PageBanner } from "@/components/sections/page-banner";
import { ProductListSection } from "@/components/shop/product-list-section";
import { sitePages } from "@/config/site";
import { contact } from "@/content/beranda";
import { listBanner } from "@/content/produk";
import { pageMetadata } from "@/lib/seo";

const page = sitePages[9];

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function ProdukPage() {
  return (
    <>
      <PageBanner {...listBanner} />
      <ProductListSection />
      <Contact {...contact} />
    </>
  );
}
