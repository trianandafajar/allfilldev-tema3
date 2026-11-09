import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/site-pages";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllPages().map((page) => ({ url: absoluteUrl(page.path) }));
}
