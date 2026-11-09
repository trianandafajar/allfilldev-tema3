import Image from "next/image"
import Link from "next/link"

import { CoverImage } from "@/components/shared/cover-image"
import { FaIcon } from "@/components/shared/fa-icon"
import { Reveal } from "@/components/shared/reveal"

export type ServiceCardData = {
  title: string
  href: string
  image: { src: string; alt: string }
  icon: string
  /** Ringkasan satu kalimat; dipakai kartu yang menampilkan teks (beranda), bukan kartu arsip. */
  summary?: string
}

export type ServiceCardVariant = "strip" | "card"

const widths = "w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/3)]"

/**
 * Kartu layanan template. `strip` (`.service-style03`): foto, lalu judul dan ikon di strip terang.
 * `card` (`.service-itemsv02`): foto, lalu kotak ikon hijau, judul, ringkasan, dan tautan di panel gelap.
 */
export function ServiceCard({
  title,
  href,
  image,
  icon,
  summary,
  variant = "strip",
  readMore = "Selengkapnya",
}: ServiceCardData & { variant?: ServiceCardVariant; readMore?: string }) {
  if (variant === "card") {
    return (
      <Reveal animation="up" delay={0.3}>
        <div className={`flex ${widths}`}>
          <article className="group flex w-full flex-col overflow-hidden rounded-[10px] border border-white/20 transition-all duration-400 hover:border-accent">
            <div className="w-full overflow-hidden">
              <CoverImage
                src={image.src}
                alt={image.alt}
                width={410}
                height={311}
                className="transition-all duration-400 group-hover:scale-110"
              />
            </div>
            <div className="w-full flex-1 rounded-b-[5px] bg-forest pt-5 pr-2.5 pb-5 pl-5 xl:pb-[30px] xl:pl-6 2xl:pr-[30px] 2xl:pb-10 2xl:pl-10">
              <div className="relative z-1 -mt-[70px] mb-4 flex size-20 items-center justify-center rounded-[0_50px] bg-primary xl:mb-5 xl:size-[100px]">
                <Image src={icon} alt="" width={65} height={65} aria-hidden className="h-auto w-10 xl:w-[65px]" />
              </div>
              <Link
                href={href}
                className="mb-2 block font-heading text-[21px] leading-10 font-normal text-white group-hover:text-primary xl:mb-2.5 xl:text-[30px]"
              >
                {title}
              </Link>
              {summary ? (
                <p className="mb-4 text-sm leading-5 text-white xl:mb-[30px] xl:text-base xl:leading-[25.6px]">{summary}</p>
              ) : null}
              <Link href={href} className="text-[15px] leading-6 font-normal tracking-[3px] text-white">
                {readMore} <FaIcon name="solid-angle-right" className="ml-2.5 text-sm" />
              </Link>
            </div>
          </article>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal animation="up" delay={0.3}>
      <div className={`flex ${widths}`}>
        <article className="group flex w-full flex-col overflow-hidden rounded-[10px] border border-muted transition-all duration-400 hover:border-primary">
          <div className="w-full overflow-hidden">
            <CoverImage
              src={image.src}
              alt={image.alt}
              width={410}
              height={311}
              className="overflow-hidden transition-all duration-400 group-hover:scale-110"
            />
          </div>
          <div className="flex w-full flex-1 justify-center gap-2.5 bg-tint px-[17px] pt-4 pb-3.5 xl:gap-[15px] xl:px-6 xl:pt-[19px] xl:pb-[22px] 2xl:gap-[25px] 2xl:px-10 2xl:pt-6 2xl:pb-[30px]">
            <Link
              href={href}
              className="mb-0 block min-w-0 flex-1 font-heading text-xl leading-7 font-normal text-forest group-hover:text-primary xl:text-[26px] xl:leading-8 2xl:text-[30px] 2xl:leading-10"
            >
              {title}
            </Link>
            <Image src={icon} alt="" width={60} height={60} aria-hidden className="h-auto w-11 shrink-0 self-start xl:w-[60px]" />
          </div>
        </article>
      </div>
    </Reveal>
  )
}
