import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/contact";
import { PageBanner } from "@/components/sections/page-banner";
import { ServiceDetail } from "@/components/sections/service-detail";
import { contact } from "@/content/beranda";
import { getService, serviceSlugs } from "@/content/layanan";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.title,
    description: service.summary,
    path: `/layanan/${slug}`,
  });
}

export default async function LayananDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageBanner {...service.banner} />
      <ServiceDetail {...service.detail} />
      <Contact {...contact} />
    </>
  );
}
