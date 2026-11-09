import Image from "next/image"
import Link from "next/link"

import { ButtonLabel } from "@/components/shared/button-label"
import { FaIcon } from "@/components/shared/fa-icon"
import { Reveal } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"

export type HeroProps = {
  eyebrow: string
  titleLead: string
  /** Satu baris per elemen; dipisah `<br>` dan dicetak tipis seperti `<span>` di judul template. */
  titleAccent: readonly string[]
  description: string
  cta: { label: string; href: string }
  help: { label: string; phone: string; href: string }
  image: { src: string; alt: string; width: number; height: number }
}

/** Hero beranda 2 (`.banner-section.style-v2`): latar hijau muda, teks di kiri, foto memenuhi sisi kanan. */
export function Hero({ eyebrow, titleLead, titleAccent, description, cta, help, image }: HeroProps) {
  return (
    <section className="relative z-1 overflow-hidden bg-secondary">
      <div className="container">
        <div className="relative">
          <div className="md:w-[calc(0.75*(100%+24px)-24px)] lg:w-[calc(0.583333*(100%+24px)-24px)]">
            <div className="pt-[70px] pb-[85px] sm:pt-20 sm:pb-[95px] lg:pt-[110px] lg:pb-[125px] 2xl:pt-[130px] 2xl:pb-[165px]">
              <Reveal animation="up" delay={0.2}>
                <h5 className="mb-2.5 font-script text-xl leading-9 font-normal text-primary">{eyebrow}</h5>
              </Reveal>
              <Reveal animation="up" delay={0.5}>
                <h1 className="mb-5 text-[38px] leading-12 font-bold tracking-[-2.5px] text-forest sm:text-[58px] sm:leading-[78px] md:text-[66px] 2xl:text-[80px] 2xl:leading-[85px]">
                  {titleLead}{" "}
                  <span className="text-[38px] leading-12 font-extralight sm:text-[58px] sm:leading-[78px] md:text-[66px] 2xl:text-[80px] 2xl:leading-[85px]">
                    {titleAccent.map((line, index) => (
                      <span key={line}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </span>
                </h1>
              </Reveal>
              <Reveal animation="up" delay={0.7}>
                <p className="mb-7 max-w-[500px] text-forest sm:mb-[34px] 2xl:mb-10 2xl:max-w-[578px]">{description}</p>
              </Reveal>
              <Reveal animation="up" delay={1}>
                <div className="flex flex-wrap items-center gap-5 sm:flex-nowrap md:gap-[30px] 2xl:gap-10">
                  <Button asChild variant="brand-outline" size="cta" className="inline-block rounded-full">
                    <Link href={cta.href}>
                      <ButtonLabel icon="solid-angle-right">{cta.label}</ButtonLabel>
                    </Link>
                  </Button>
                  <Link href={help.href} className="flex items-center gap-2.5 md:gap-[15px]">
                    <span className="flex size-[55px] shrink-0 items-center justify-center rounded-full bg-primary text-base text-white">
                      <FaIcon name="solid-phone" />
                    </span>
                    <span className="grid">
                      <span className="text-base leading-[30px] font-normal text-muted-foreground">{help.label}</span>
                      <span className="block font-heading text-xl font-normal text-forest">{help.phone}</span>
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority
        className="absolute right-0 bottom-0 -z-1 h-full w-full max-w-none object-fill opacity-30 md:w-3/4 md:opacity-70 lg:w-[55%] lg:opacity-100"
      />
    </section>
  )
}
