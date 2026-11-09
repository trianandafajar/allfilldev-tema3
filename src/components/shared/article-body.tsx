import Image from "next/image"
import { CircleDot } from "lucide-react"

import { CoverImage } from "@/components/shared/cover-image"
import { Reveal } from "@/components/shared/reveal"

export type ArticleImage = { src: string; alt: string; width: number; height: number }

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; image: ArticleImage }
  | { type: "images"; images: readonly [ArticleImage, ArticleImage] }
  | { type: "quote"; text: string; cite: string }
  | { type: "list"; items: readonly string[] }
  | { type: "steps"; items: readonly { title: string; icon: string }[] }

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="mb-[26px] text-muted-foreground">{block.text}</p>
    case "heading":
      return <h3 className="mb-4 text-2xl leading-[1.3] font-normal text-forest xl:text-4xl">{block.text}</h3>
    case "image":
      return (
        <CoverImage
          src={block.image.src}
          alt={block.image.alt}
          width={block.image.width}
          height={block.image.height}
          className="mb-[30px] rounded-[20px]"
        />
      )
    case "images":
      return (
        <div className="mb-[30px] grid grid-cols-2 gap-2.5 sm:gap-[30px]">
          {block.images.map((image) => (
            <CoverImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="rounded-[20px]"
            />
          ))}
        </div>
      )
    case "quote":
      return (
        <blockquote className="mb-[30px] rounded-[20px] border-2 border-muted p-5 sm:p-10">
          <Image
            src="/images/icon/quote-leftp2.svg"
            alt=""
            width={68}
            height={50}
            aria-hidden
            className="mb-4 w-11 sm:mb-5 sm:w-auto"
          />
          <p className="mb-3.5 text-sm text-muted-foreground sm:mb-[26px] sm:text-base">{block.text}</p>
          <cite className="font-heading text-xl leading-[30px] font-normal text-forest not-italic">{block.cite}</cite>
        </blockquote>
      )
    case "list": {
      const half = Math.ceil(block.items.length / 2)
      return (
        <div className="mb-[30px] flex flex-wrap gap-x-[30px] gap-y-4 lg:gap-x-20">
          {[block.items.slice(0, half), block.items.slice(half)].map((column) => (
            <ul key={column[0]} className="grid gap-4 lg:gap-7">
              {column.map((item) => (
                <li key={item} className="flex items-center gap-2.5 lg:gap-[15px]">
                  <CircleDot aria-hidden className="size-[15px] shrink-0 text-primary lg:size-[18px]" />
                  <span className="font-heading text-sm text-forest lg:text-xl">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )
    }
    case "steps":
      return (
        <div className="mb-10 flex flex-wrap gap-x-[22px] gap-y-2.5 lg:gap-x-[140px]">
          {block.items.map((step) => (
            <div
              key={step.title}
              className="relative z-1 w-[300px] max-w-full overflow-hidden rounded-[10px] bg-secondary px-[19px] py-[30px] lg:px-[30px]"
            >
              <h3 className="max-w-[60%] text-2xl leading-[1.3] font-normal text-forest xl:text-[30px]">
                {step.title}
              </h3>
              <div className="absolute top-0 right-0 rounded-[39px_4.3px_39px_0] bg-accent p-[17px]">
                <Image src={step.icon} alt="" width={45} height={45} aria-hidden className="w-8 lg:w-[45px]" />
              </div>
            </div>
          ))}
        </div>
      )
  }
}

/** Isi artikel untuk halaman detail layanan, galeri, dan blog: satu daftar blok berurutan. */
export function ArticleBody({ blocks }: { blocks: readonly ArticleBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => (
        <Reveal key={index} animation="up" delay={0.3}>
          <div>
            <Block block={block} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}
