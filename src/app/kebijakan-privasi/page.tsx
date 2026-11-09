import type { Metadata } from "next";

import { LegalDocument } from "@/components/sections/legal-document";
import { PageBanner } from "@/components/sections/page-banner";
import { sitePages } from "@/config/site";
import { privasi, privasiBanner } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const page = sitePages[8];

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function KebijakanPrivasiPage() {
  return (
    <>
      <PageBanner {...privasiBanner} />
      <LegalDocument {...privasi} />
    </>
  );
}
