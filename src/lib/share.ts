import type { SocialLink } from "@/components/shared/social-links"

/** Tautan bagikan ke jejaring sosial untuk satu halaman (`url` harus absolut). */
export function shareLinks(url: string, title: string): SocialLink[] {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return [
    { network: "facebook", label: "Bagikan ke Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { network: "x", label: "Bagikan ke X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { network: "linkedin", label: "Bagikan ke LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { network: "pinterest", label: "Bagikan ke Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}` },
  ]
}
