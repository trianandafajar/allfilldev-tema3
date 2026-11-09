import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { CartView } from "@/components/shop/cart-view";
import { ShopPageSection } from "@/components/shop/shop-page-section";
import { cartBanner } from "@/content/produk";
import { pageMetadata } from "@/lib/seo";

// Isi keranjang milik pengunjung, bukan konten publik: tidak diindeks dan tidak masuk sitemap.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Keranjang",
    description: "Keranjang belanja FarmHub.",
    path: "/keranjang",
  }),
  robots: { index: false, follow: false },
};

export default function KeranjangPage() {
  return (
    <>
      <PageBanner {...cartBanner} />
      <ShopPageSection>
        <CartView />
      </ShopPageSection>
    </>
  );
}
