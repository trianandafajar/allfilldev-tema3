import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\u003c");
}

const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.tagline}`,
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Metadata halaman lengkap: title, description, canonical, Open Graph, dan Twitter.
 * Open Graph dan Twitter ditulis ulang di sini karena Next mengganti (bukan menggabung)
 * objek `openGraph`/`twitter` dari layout saat halaman mendefinisikannya.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  // File `opengraph-image` tidak diwariskan ke halaman yang mendefinisikan `openGraph`, jadi ditunjuk eksplisit.
  const images = image ? [image] : [defaultOgImage];
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    // Template di layout tidak berlaku untuk page di segmen yang sama (root), jadi beranda ditulis lengkap.
    title: path === "/" ? { absolute: socialTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: socialTitle,
      description,
      images,
      ...(type === "article" && publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images,
    },
  };
}
