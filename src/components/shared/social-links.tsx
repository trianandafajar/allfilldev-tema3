import { FaIcon } from "@/components/shared/fa-icon"
import { cn } from "@/lib/utils"

export type SocialNetwork = "facebook" | "twitter" | "x" | "youtube" | "linkedin" | "pinterest"

export type SocialLink = {
  network: SocialNetwork
  label: string
  href: string
}

const icons = {
  facebook: "brands-facebook-f",
  twitter: "brands-twitter",
  youtube: "brands-youtube",
  linkedin: "brands-linkedin-in",
  pinterest: "brands-pinterest-p",
} as const

const variants = {
  offcanvas:
    "gap-2.5 [&_a]:size-9 [&_a]:rounded-sm [&_a]:border [&_a]:border-primary [&_a]:bg-white [&_a]:text-base [&_a]:text-foreground [&_a:hover]:border-accent [&_a:hover]:bg-accent [&_a:hover]:text-white",
  footer:
    "gap-2.5 lg:gap-5 [&_a]:size-[38px] [&_a]:rounded-full [&_a]:border [&_a]:border-white/20 [&_a]:bg-forest [&_a]:text-white [&_a]:transition-all [&_a]:duration-500 [&_a:hover]:bg-accent [&_a:hover]:text-forest",
  share:
    "gap-2.5 [&_a]:size-[35px] [&_a]:rounded-[5px] [&_a]:bg-secondary [&_a]:text-base [&_a]:text-forest [&_a:hover]:bg-primary [&_a:hover]:text-white",
  "share-outline":
    "gap-5 [&_a]:size-9 [&_a]:border [&_a]:border-forest/20 [&_a]:text-base [&_a]:text-forest [&_a:hover]:border-accent [&_a:hover]:bg-accent [&_a:hover]:text-white",
  team:
    "flex-col gap-[9px] [&_a]:size-[35px] [&_a]:rounded-full [&_a]:border [&_a]:border-muted-foreground/40 [&_a]:bg-white [&_a]:text-base [&_a]:text-forest [&_a:hover]:border-white [&_a:hover]:bg-primary [&_a:hover]:text-white",
} as const

type SocialLinksProps = {
  links: readonly SocialLink[]
  variant: keyof typeof variants
  className?: string
}

export function SocialLinks({ links, variant, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center", variants[variant], className)}>
      {links.map((link) => (
        <li key={link.network}>
          <a
            href={link.href}
            aria-label={link.label}
            {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-center justify-center transition-all duration-400 ease-in-out"
          >
            {link.network === "x" ? (
              <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden>
                <path d="M6.55735 5.16157L10.5183 0.65625H9.57971L6.14039 4.56816L3.39341 0.65625H0.225098L4.37906 6.57174L0.225098 11.2963H1.16378L4.79579 7.16516L7.6968 11.2963H10.8651L6.55712 5.16157H6.55735ZM5.2717 6.62386L4.85082 6.03481L1.502 1.34768H2.94375L5.64629 5.13034L6.06717 5.71939L9.58015 10.6363H8.13839L5.2717 6.62409V6.62386Z" />
              </svg>
            ) : (
              <FaIcon name={icons[link.network]} />
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
