import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/contact";
import { GalleryDetail } from "@/components/sections/gallery-detail";
import { PageBanner } from "@/components/sections/page-banner";
import { contact } from "@/content/beranda";
import { gallerySlugs, getGalleryItem } from "@/content/galeri";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { shareLinks } from "@/lib/share";

type Props = { params: Promise<{ slug: string }> };

// Semua slug diprerender lewat generateStaticParams; tanpa ini mode dev menuntut Suspense di sekitar `params`.
export const instant = false;

export function generateStaticParams() {
  return gallerySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getGalleryItem(slug);
  if (!item) return {};

  return pageMetadata({
    title: item.title,
    description: item.summary,
    path: `/galeri/${slug}`,
  });
}

export default async function GaleriDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getGalleryItem(slug);
  if (!item) notFound();

  return (
    <>
      <PageBanner {...item.banner} />
      <GalleryDetail {...item.detail} shareLinks={shareLinks(absoluteUrl(`/galeri/${slug}`), item.title)} />
      <Contact {...contact} />
    </>
  );
}
