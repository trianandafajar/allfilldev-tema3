import type { Metadata, Viewport } from "next";
import { Mali, Montserrat, Noto_Serif } from "next/font/google";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Preloader } from "@/components/shared/preloader";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const mali = Mali({
  variable: "--font-mali",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      email: siteConfig.business.email,
      telephone: siteConfig.business.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.business.street,
        addressLocality: siteConfig.business.locality,
        addressRegion: siteConfig.business.region,
        postalCode: siteConfig.business.postalCode,
        addressCountry: siteConfig.business.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.business.latitude,
        longitude: siteConfig.business.longitude,
      },
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo),
        width: 200,
        height: 200,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: siteConfig.language,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${montserrat.variable} ${notoSerif.variable} ${mali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader
          name={siteConfig.name}
          image={{ src: "/images/banner/preloader.png", width: 200, height: 200 }}
        />
        <JsonLd data={organizationJsonLd} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ScrollToTop />
      </body>
    </html>
  );
}
