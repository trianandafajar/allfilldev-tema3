import type { Metadata } from "next";

import { ContactInfo } from "@/components/sections/contact-info";
import { PageBanner } from "@/components/sections/page-banner";
import { TalkingContact } from "@/components/sections/talking-contact";
import { MapEmbed } from "@/components/shared/map-embed";
import { sitePages } from "@/config/site";
import { banner, info, map, talking } from "@/content/kontak";
import { pageMetadata } from "@/lib/seo";

const page = sitePages[2];

export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function KontakPage() {
  return (
    <>
      <PageBanner {...banner} />
      <TalkingContact {...talking} />
      <MapEmbed {...map} />
      <ContactInfo {...info} />
    </>
  );
}
