import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"

import { FaIcon } from "@/components/shared/fa-icon"
import type { BlogPostCardData } from "@/components/shared/blog-post-card"

export type BlogTeaserData = Pick<BlogPostCardData, "title" | "href" | "dateLabel" | "author" | "readMore" | "image">

/** Kartu artikel ringkas beranda (`.blog-itemsv1.blog-itemsv2`): foto, baris tanggal dan penulis, lalu judul bergaris tepi. */
export function BlogTeaserCard({ title, href, dateLabel, author, readMore, image }: BlogTeaserData) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-t-[10px]">
      <div className="relative w-full shrink-0 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full transition-all duration-400 group-hover:scale-110"
        />
      </div>
      <ul className="flex shrink-0 flex-wrap items-center gap-x-3.5 gap-y-[7px] bg-secondary px-5 py-2.5 2xl:gap-x-5 2xl:px-[30px]">
        <li className="flex items-center gap-[5px] text-[13px] leading-[160%] text-muted-foreground 2xl:text-sm">
          <CalendarDays aria-hidden className="size-3.5 text-primary" />
          {dateLabel}
        </li>
        <li className="flex items-center gap-[5px] text-[13px] leading-[160%] text-muted-foreground 2xl:text-sm">
          <FaIcon name="regular-user" className="text-primary" />
          {author}
        </li>
      </ul>
      <div className="w-full flex-1 rounded-b-[5px] border-2 border-t-0 border-muted pt-[17px] pr-2 pb-5 pl-5 2xl:pt-5 2xl:pr-2.5 2xl:pb-[30px] 2xl:pl-[30px]">
        <Link
          href={href}
          className="mb-2.5 block font-heading text-xl leading-[26px] font-normal text-forest group-hover:text-primary xl:text-[26px] xl:leading-[35px] 2xl:text-[30px] 2xl:leading-10"
        >
          {title}
        </Link>
        <Link href={href} className="text-[15px] leading-6 font-normal tracking-[3px] text-forest">
          {readMore} <FaIcon name="solid-arrow-right" className="text-primary" />
        </Link>
      </div>
    </article>
  )
}
