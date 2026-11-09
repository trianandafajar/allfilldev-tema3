"use client"

import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { AUTOPLAY_DELAY, SLIDE_DURATION } from "@/lib/carousel"
import { cn } from "@/lib/utils"

type BrandLogo = { src: string; alt: string; width: number; height: number }

type BrandSliderProps = {
  items: readonly BrandLogo[]
}

type CarouselApi = Parameters<NonNullable<React.ComponentProps<typeof Carousel>["setApi"]>>[0]

/**
 * `.brand-slider` template (Swiper): loop, slide aktif di tengah, jarak 30px,
 * autoplay 2 detik tanpa berhenti saat disentuh, 5/4/3/2/2 logo per tampilan.
 * Daftar digandakan agar loop embla tetap jalan saat jumlah logo sama dengan jumlah tampilan.
 */
export function BrandSlider({ items }: BrandSliderProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [active, setActive] = useState(0)
  const slides = [...items, ...items]

  useEffect(() => {
    if (!api) return
    const sync = () => setActive(api.selectedScrollSnap())
    api.on("select", sync)
    api.on("reInit", sync)
    return () => {
      api.off("select", sync)
      api.off("reInit", sync)
    }
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, align: "center", duration: SLIDE_DURATION }}
      plugins={[Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: false })]}
    >
      <CarouselContent className="-ml-[30px]">
        {slides.map((logo, index) => (
          <CarouselItem
            key={`${logo.src}-${index}`}
            aria-hidden={index >= items.length || undefined}
            className="basis-1/2 pl-[30px] min-[767px]:basis-1/3 min-[991px]:basis-1/4 min-[1199px]:basis-1/5"
          >
            <div
              className={cn(
                "text-center opacity-90 grayscale transition-all duration-400 ease-in-out hover:opacity-100 hover:grayscale-0",
                index === active && "opacity-100 grayscale-0"
              )}
            >
              <Image
                src={logo.src}
                alt={index >= items.length ? "" : logo.alt}
                width={logo.width}
                height={logo.height}
                className="align-middle"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
