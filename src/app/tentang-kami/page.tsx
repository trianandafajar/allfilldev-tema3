import type { Metadata } from "next";

import { AboutIntro } from "@/components/sections/about-intro";
import { Brands } from "@/components/sections/brands";
import { Contact } from "@/components/sections/contact";
import { PageBanner } from "@/components/sections/page-banner";
import { ServiceCards } from "@/components/sections/service-cards";
import { Testimonials } from "@/components/sections/testimonials";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { sitePages } from "@/config/site";
import { brands, contact, testimonials } from "@/content/beranda";
import { banner, intro, services, who } from "@/content/tentang";
import { pageMetadata } from "@/lib/seo";

const page = sitePages[1];

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function TentangPage() {
  return (
    <>
      <PageBanner {...banner} />
      <AboutIntro {...intro} />
      <ServiceCards {...services} />
      <Testimonials {...testimonials} className="space-bottom" />
      <WhoWeAre {...who} />
      <Brands {...brands} />
      <Contact {...contact} />
    </>
  );
}
