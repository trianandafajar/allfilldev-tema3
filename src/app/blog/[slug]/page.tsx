import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogDetail } from "@/components/sections/blog-detail";
import { Contact } from "@/components/sections/contact";
import { PageBanner } from "@/components/sections/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { contact } from "@/content/beranda";
import { blogSlugs, getPost } from "@/content/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { shareLinks } from "@/lib/share";

type Props = { params: Promise<{ slug: string }> };

// Semua slug diprerender lewat generateStaticParams; tanpa ini mode dev menuntut Suspense di sekitar `params`.
export const instant = false;

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image.src,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${slug}`);

  return (
    <>
      <PageBanner {...post.banner} />
      <BlogDetail {...post.detail} shareLinks={shareLinks(url, post.title)} />
      <Contact {...contact} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          image: absoluteUrl(post.image.src),
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: siteConfig.name },
        }}
      />
    </>
  );
}
