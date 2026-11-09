import type { Metadata } from "next";

import { BlogList } from "@/components/sections/blog-list";
import { Contact } from "@/components/sections/contact";
import { PageBanner } from "@/components/sections/page-banner";
import { sitePages } from "@/config/site";
import { contact } from "@/content/beranda";
import { blogCards, blogSidebar, listBanner } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";

const page = sitePages[5];

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function BlogPage() {
  return (
    <>
      <PageBanner {...listBanner} />
      <BlogList posts={blogCards} sidebar={blogSidebar} />
      <Contact {...contact} />
    </>
  );
}
