import Image from "next/image"

import { CountUp } from "@/components/shared/count-up"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"
import {
  TestimonialSlider,
  type TestimonialEntry,
  type TestimonialSliderVariant,
} from "@/components/shared/testimonial-slider"
import { cn } from "@/lib/utils"

export type TestimonialsProps = {
  eyebrow: string
  /** Satu baris per elemen; dipisah `<br>` seperti judul di template. */
  titleLines: readonly string[]
  dotLabel: string
  items: readonly TestimonialEntry[]
  image: { src: string; alt: string; width: number; height: number }
  highlight: {
    icon: { src: string; width: number; height: number }
    value: number
    suffix: string
    label: string
  }
  /** `dots` (beranda 3 dan halaman dalam) atau `arrows` (beranda 2: panah dan garis navigasi). */
  variant?: TestimonialSliderVariant
  /** Hanya varian `arrows`. */
  prevLabel?: string
  nextLabel?: string
  quoteIcon?: string
  /** Spasi vertikal tambahan bila seksi tidak diapit seksi ber-padding (mis. `space-bottom`). */
  className?: string
}

export function Testimonials({
  eyebrow,
  titleLines,
  dotLabel,
  items,
  image,
  highlight,
  variant = "dots",
  prevLabel,
  nextLabel,
  quoteIcon,
  className,
}: TestimonialsProps) {
  const arrows = variant === "arrows"

  return (
    <section
      id="testimoni"
      className={cn(
        "relative z-1 overflow-hidden",
        arrows
          ? "bg-secondary"
          : "before:absolute before:top-0 before:left-0 before:h-[410px] before:w-full before:bg-linear-to-b/srgb before:from-transparent before:to-primary before:opacity-10 before:content-['']",
        className
      )}
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div className="relative min-w-0">
            <SectionTitle
              align="left"
              eyebrow={eyebrow}
              eyebrowClassName={arrows ? undefined : "text-accent"}
              title={titleLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
              className="mb-[30px] lg:mb-10 2xl:mb-[50px]"
            />
            <TestimonialSlider
              items={items}
              dotLabel={dotLabel}
              variant={variant}
              prevLabel={prevLabel}
              nextLabel={nextLabel}
              quoteIcon={quoteIcon}
            />
          </div>
          <Reveal animation="down" delay={0.4}>
            <div
              className={cn(
                "relative w-full",
                arrows ? "md:pr-5 xl:pr-[38px]" : "hidden md:block lg:pl-5"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full"
              />
              <div
                className={cn(
                  "absolute flex items-center rounded-[10px] bg-accent",
                  arrows
                    ? "right-0 bottom-[50px] gap-px px-3.5 py-3 xl:bottom-[100px] xl:gap-[15px] xl:p-5"
                    : "right-[15px] bottom-[15px] gap-0 p-5 lg:right-5 lg:bottom-5 lg:gap-[15px]"
                )}
              >
                <Image
                  src={highlight.icon.src}
                  alt=""
                  width={highlight.icon.width}
                  height={highlight.icon.height}
                  aria-hidden
                />
                <div>
                  <h3 className="text-[26px] leading-9 font-normal text-forest lg:text-4xl">
                    <CountUp value={highlight.value} suffix={highlight.suffix} className="[&>span]:font-normal" />
                  </h3>
                  <p className="text-sm leading-[30px] font-normal text-forest lg:text-base">
                    {highlight.label}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
