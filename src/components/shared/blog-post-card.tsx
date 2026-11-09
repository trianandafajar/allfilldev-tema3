import Link from "next/link"
import { FolderOpen } from "lucide-react"

import { ButtonLabel } from "@/components/shared/button-label"
import { CoverImage } from "@/components/shared/cover-image"
import { FaIcon } from "@/components/shared/fa-icon"
import { Reveal } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"

export type BlogPostCardData = {
  title: string
  excerpt: string
  href: string
  dateLabel: string
  author: string
  category: string
  readMore: string
  image: { src: string; alt: string; width: number; height: number }
}

/** Kartu artikel besar di halaman daftar blog (`.blog-details-leftitem`). */
export function BlogPostCard({ title, excerpt, href, dateLabel, author, category, readMore, image }: BlogPostCardData) {
  return (
    <Reveal animation="up" delay={0.2}>
      <article className="group bg-white">
        <div className="relative w-full overflow-hidden rounded-t-[5px]">
          <CoverImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="rounded-t-[5px] transition-all duration-400 group-hover:scale-110"
          />
          <span className="absolute top-0 right-0 rounded-[0_5px_0_10px] bg-primary px-4 py-1.5 font-sans text-base leading-[30px] text-white">
            {dateLabel}
          </span>
        </div>
        <div className="rounded-b-[5px] bg-white px-5 pt-5 pb-6 shadow-brand min-[1200px]:-mt-[22px] min-[1200px]:px-10 min-[1200px]:pt-0 min-[1200px]:pb-[60px]">
          <ul className="relative z-1 mb-6 inline-flex flex-wrap items-center gap-x-5 gap-y-[5px] bg-primary px-4 py-2 text-sm leading-[160%] text-white/80 min-[1200px]:mb-[30px] min-[1200px]:px-5 min-[1200px]:py-2.5">
            <li className="flex items-center gap-[5px]">
              <FaIcon name="regular-user" className="text-white" />
              {author}
            </li>
            <li className="flex items-center gap-[5px]">
              <FolderOpen aria-hidden className="size-3.5 text-white" />
              {category}
            </li>
          </ul>
          <Link
            href={href}
            className="mb-4 block font-heading text-2xl leading-[30px] font-normal text-forest group-hover:text-primary min-[1200px]:mb-[26px] min-[1200px]:text-4xl min-[1200px]:leading-9"
          >
            {title}
          </Link>
          <p className="mb-6 text-[15px] leading-[26px] text-muted-foreground min-[1200px]:mb-10 min-[1200px]:text-base min-[1200px]:leading-[30px]">
            {excerpt}
          </p>
          <Button
            asChild
            variant="brand-outline"
            size="cta"
            className="group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <Link href={href}>
              <ButtonLabel iconClassName="text-forest group-hover:text-white">{readMore}</ButtonLabel>
            </Link>
          </Button>
        </div>
      </article>
    </Reveal>
  )
}
