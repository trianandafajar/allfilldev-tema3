"use client"

import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import { FaIcon } from "@/components/shared/fa-icon"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { AUTOPLAY_DELAY, SLIDE_DURATION } from "@/lib/carousel"
import { cn } from "@/lib/utils"

export type TestimonialEntry = {
  name: string
  role: string
  quote: string
  avatar: { src: string; alt: string; width: number; height: number }
}

export type TestimonialSliderVariant = "dots" | "arrows"

type TestimonialSliderProps = {
  items: readonly TestimonialEntry[]
  dotLabel: string
  /** `dots`: titik di dalam tiap kartu. `arrows`: ikon kutipan di kartu, panah dan garis navigasi di bawah. */
  variant?: TestimonialSliderVariant
  /** Label tombol panah, hanya untuk varian `arrows`. */
  prevLabel?: string
  nextLabel?: string
  /** Ikon kutipan di sudut kartu, hanya untuk varian `arrows`. */
  quoteIcon?: string
}

type CarouselApi = Parameters<NonNullable<React.ComponentProps<typeof Carousel>["setApi"]>>[0]

function Stars({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-[7px] [&>svg:not(:last-child)]:text-accent", className)}>
      {Array.from({ length: 5 }, (_, star) => (
        <FaIcon key={star} name="solid-star" />
      ))}
    </div>
  )
}

function Avatar({ avatar }: { avatar: TestimonialEntry["avatar"] }) {
  return (
    <Image
      src={avatar.src}
      alt={avatar.alt}
      width={avatar.width}
      height={avatar.height}
      className="rounded-[10px]"
    />
  )
}

/**
 * `.testimonial-slidewrap01` template (Swiper): satu kartu per tampilan, loop,
 * autoplay 2 detik tanpa jeda saat disentuh. Navigasi berupa titik di dalam kartu (`dots`)
 * atau panah dan garis di bawah slider (`arrows`).
 */
export function TestimonialSlider({
  items,
  dotLabel,
  variant = "dots",
  prevLabel = "Sebelumnya",
  nextLabel = "Berikutnya",
  quoteIcon,
}: TestimonialSliderProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const arrows = variant === "arrows"

  useEffect(() => {
    if (!api) return
    const sync = () => setSelected(api.selectedScrollSnap())
    api.on("select", sync)
    api.on("reInit", sync)
    return () => {
      api.off("select", sync)
      api.off("reInit", sync)
    }
  }, [api])

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, duration: SLIDE_DURATION }}
        plugins={[Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false, stopOnMouseEnter: false })]}
        className={arrows ? undefined : "-mx-3 -my-[30px] md:-m-[30px]"}
      >
        <CarouselContent className={arrows ? "ml-0" : "ml-0 md:-ml-0.5"}>
          {items.map((item) => (
            <CarouselItem
              key={item.name}
              className={arrows ? "pl-0" : "px-3 py-[30px] md:pr-[30px] md:pl-8"}
            >
              {arrows ? (
                <div className="rounded-[10px] bg-white p-5 shadow-brand xl:p-10">
                  <div className="flex justify-between gap-4">
                    <div className="mb-6 flex items-center gap-3.5 xl:mb-[30px] xl:gap-11">
                      <Avatar avatar={item.avatar} />
                      <div>
                        <h3 className="mb-[5px] text-xl font-normal text-forest xl:mb-0 xl:text-[30px]">
                          {item.name}
                        </h3>
                        <span className="block text-base text-muted-foreground">{item.role}</span>
                      </div>
                    </div>
                    {quoteIcon ? (
                      <Image src={quoteIcon} alt="" width={68} height={50} aria-hidden className="h-auto w-10 self-start xl:w-auto" />
                    ) : null}
                  </div>
                  <Stars className="mb-[18px] xl:mb-5" />
                  <p className="text-[15px] leading-[26px] text-muted-foreground xl:text-[19px] xl:leading-[30px]">
                    {item.quote}
                  </p>
                </div>
              ) : (
                <div className="rounded-[10px] bg-white p-5 shadow-brand xl:p-10">
                  <div className="grid justify-between lg:flex">
                    <div className="mb-6 flex items-center gap-3.5 xl:mb-[30px] xl:gap-5 2xl:gap-11">
                      <Avatar avatar={item.avatar} />
                      <div>
                        <h3 className="mb-[5px] text-xl font-normal text-forest xl:mb-0 xl:text-[27px] 2xl:text-[30px]">
                          {item.name}
                        </h3>
                        <span className="block text-base text-muted-foreground">{item.role}</span>
                      </div>
                    </div>
                    <Stars className="mb-[18px] xl:mb-5" />
                  </div>
                  <p className="text-[15px] leading-[26px] text-muted-foreground xl:text-[19px] xl:leading-[30px]">
                    {item.quote}
                  </p>
                  <div className="mt-5 flex items-center justify-start 2xl:mt-10" role="group" aria-label={dotLabel}>
                    {items.map((dot, dotIndex) => (
                      <button
                        key={dot.name}
                        type="button"
                        aria-label={`${dotLabel}: ${dot.name}`}
                        aria-current={dotIndex === selected || undefined}
                        onClick={() => api?.scrollTo(dotIndex)}
                        className={cn(
                          "mx-1 shrink-0 cursor-pointer rounded-[10px] bg-muted",
                          dotIndex === selected ? "size-[18px] border-[5px] border-primary bg-white" : "size-2.5"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {arrows ? (
        <div className="mt-6 flex items-center justify-center gap-2 lg:mt-[30px] xl:gap-4 2xl:mt-10">
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => api?.scrollPrev()}
            className="flex size-[31px] items-center justify-center rounded-full bg-white text-[13px] text-forest transition-all duration-400 hover:bg-accent hover:text-white"
          >
            <FaIcon name="solid-angle-right" className="-scale-x-100" />
          </button>
          <div className="flex items-center" role="group" aria-label={dotLabel}>
            {items.map((dot, dotIndex) => (
              <button
                key={dot.name}
                type="button"
                aria-label={`${dotLabel}: ${dot.name}`}
                aria-current={dotIndex === selected || undefined}
                onClick={() => api?.scrollTo(dotIndex)}
                className={cn(
                  "mx-1 h-[3px] shrink-0 cursor-pointer bg-primary transition-all duration-400",
                  dotIndex === selected ? "w-6" : "w-4"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => api?.scrollNext()}
            className="flex size-[31px] items-center justify-center rounded-full bg-white text-[13px] text-forest transition-all duration-400 hover:bg-accent hover:text-white"
          >
            <FaIcon name="solid-angle-right" />
          </button>
        </div>
      ) : null}
    </>
  )
}
