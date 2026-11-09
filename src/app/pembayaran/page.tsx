import type { Metadata } from "next";

import { PageBanner } from "@/components/sections/page-banner";
import { CheckoutForm } from "@/components/shop/checkout-form";
import { ShopPageSection } from "@/components/shop/shop-page-section";
import { checkoutBanner } from "@/content/produk";
import { pageMetadata } from "@/lib/seo";

// Halaman transaksi: tidak diindeks dan tidak masuk sitemap.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Pembayaran",
    description: "Selesaikan pesanan hasil tani segar Anda di FarmHub.",
    path: "/pembayaran",
  }),
  robots: { index: false, follow: false },
};

export default function PembayaranPage() {
  return (
    <>
      <PageBanner {...checkoutBanner} />
      <ShopPageSection>
        <CheckoutForm />
      </ShopPageSection>
    </>
  );
}
