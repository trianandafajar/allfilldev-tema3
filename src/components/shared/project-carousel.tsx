"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import { FaIcon } from "@/components/shared/fa-icon"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { SLIDE_DURATION } from "@/lib/carousel"

export type ProjectSlide = { src: string; alt: string; width: number; height: number }

type ProjectCarouselProps = {
  /** Judul seksi (server component) yang ditaruh di kiri tombol navigasi. */
  header: ReactNode
  items: readonly ProjectSlide[]
  href: string
  prevLabel: string
  nextLabel: string
  viewLabel: string
}

type CarouselApi = Parameters<NonNullable<React.ComponentProps<typeof Carousel>["setApi"]>>[0]

const navButton =
  "flex size-11 items-center justify-center rounded-full transition-all duration-500 lg:size-[60px]"

/**
 * `.recent-project-wrap` template (Swiper): loop, slide aktif di tengah, jarak 24px (14px di layar kecil),
 * 2/3/3,5/4,5 slide per tampilan. Daftar digandakan agar loop embla tetap jalan saat slide sedikit.
 */
export function ProjectCarousel({ header, items, href, prevLabel, nextLabel, viewLabel }: ProjectCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const slides = items.length < 8 ? [...items, ...items] : items

  return (
    <>
      <div className="container">
        <div className="mb-10 grid items-end justify-between gap-4 md:flex lg:mb-[50px] 2xl:mb-[60px]">
          {header}
          <div className="flex items-center gap-2 xl:gap-4">
            <button
              type="button"
              aria-label={prevLabel}
              onClick={() => api?.scrollPrev()}
              className={`${navButton} bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground`}
            >
              <FaIcon name="solid-arrow-right" className="-scale-x-100" />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => api?.scrollNext()}
              className={`${navButton} bg-primary text-primary-foreground`}
            >
              <FaIcon name="solid-arrow-right" />
            </button>
          </div>
        </div>
      </div>
      <Carousel setApi={setApi} opts={{ loop: true, align: "center", duration: SLIDE_DURATION }}>
        <CarouselContent className="-ml-3.5 xl:-ml-6">
          {slides.map((slide, index) => {
            const isCopy = index >= items.length
            return (
              <CarouselItem
                key={`${slide.src}-${index}`}
                aria-hidden={isCopy || undefined}
                className="basis-1/2 pl-3.5 sm:basis-1/3 md:basis-[28.5714%] xl:basis-[22.2222%] xl:pl-6"
              >
                <Link
                  href={href}
                  aria-label={`${viewLabel}: ${slide.alt}`}
                  tabIndex={isCopy ? -1 : undefined}
                  className="group relative block overflow-hidden rounded-[10px]"
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    draggable={false}
                    className="h-auto w-full rounded-[10px]"
                  />
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-full w-0 bg-overlay/40 transition-all duration-400 group-hover:w-full"
                  />
                  <span
                    aria-hidden
                    className="invisible absolute top-1/2 left-1/2 flex size-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xl text-primary-foreground opacity-0 transition-all duration-400 group-hover:visible group-hover:opacity-100"
                  >
                    <FaIcon name="solid-angle-right" />
                  </span>
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </>
  )
}
