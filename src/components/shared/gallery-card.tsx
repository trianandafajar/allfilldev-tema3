import Link from "next/link"

import { CoverImage } from "@/components/shared/cover-image"
import { Reveal } from "@/components/shared/reveal"

export type GalleryCardData = {
  title: string
  category: string
  href: string
  image: { src: string; alt: string; width: number; height: number }
}

/** Kartu galeri statis (`.gallery-static-item`): seluruh kartu menaut, teks muncul di pojok bawah saat hover atau fokus. */
export function GalleryCard({ title, category, href, image }: GalleryCardData) {
  return (
    <Reveal animation="up" delay={0.3}>
      <div className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/3)]">
        <Link href={href} className="group relative z-1 block w-full overflow-hidden rounded-[10px]">
          <CoverImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="rounded-[10px]"
          />
          <span className="absolute bottom-0 left-0 m-2 block rounded-b-[5px] bg-secondary px-4 py-3 opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:m-2.5 sm:px-5 sm:pt-4 sm:pb-3">
            <span className="mb-1.5 block font-sans text-sm text-forest sm:mb-2 sm:text-base">{category}</span>
            <span className="block font-heading text-xl leading-[30px] font-normal text-forest sm:text-[30px] sm:leading-10">
              {title}
            </span>
          </span>
        </Link>
      </div>
    </Reveal>
  )
}
