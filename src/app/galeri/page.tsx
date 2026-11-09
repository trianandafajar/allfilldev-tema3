import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { GalleryList } from "@/components/sections/gallery-list";
import { PageBanner } from "@/components/sections/page-banner";
import { sitePages } from "@/config/site";
import { contact } from "@/content/beranda";
import { galleryCards, listBanner } from "@/content/galeri";
import { pageMetadata } from "@/lib/seo";

const page = sitePages[4];

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function GaleriPage() {
  return (
    <>
      <PageBanner {...listBanner} />
      <GalleryList items={galleryCards} />
      <Contact {...contact} />
    </>
  );
}
