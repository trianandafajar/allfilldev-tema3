import Image from "next/image"
import Link from "next/link"

import { ButtonLabel } from "@/components/shared/button-label"
import { FaIcon } from "@/components/shared/fa-icon"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"
import { Button } from "@/components/ui/button"

export type AboutProps = {
  eyebrow: string
  title: string
  description: string
  points: readonly string[]
  cta: { label: string; href: string }
  image: { src: string; alt: string; width: number; height: number }
}

/** Seksi "Mengapa Memilih Kami" beranda 2 (`.about-section.style-v01`): foto di kiri, teks, daftar poin, dan tombol di kanan. */
export function About({ eyebrow, title, description, points, cta, image }: AboutProps) {
  return (
    <section id="tentang" className="space-top mb-4 overflow-hidden bg-white pb-10 lg:pb-[50px] 2xl:pb-[60px]">
      <div className="container">
        <div className="grid items-center justify-center gap-6 md:grid-cols-2">
          <Reveal animation="down" delay={0.3}>
            <div className="order-1 mx-auto w-full sm:w-[calc((2/3)*(100%+24px)-24px)] md:order-0 md:w-full">
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full" />
            </div>
          </Reveal>
          <div>
            <SectionTitle
              align="left"
              eyebrow={eyebrow}
              title={title}
              titleClassName="mb-5"
              description={description}
              descriptionClassName="mb-3 text-muted-foreground lg:mb-6"
            />
            <ul className="mb-7 grid gap-[7px] lg:mb-[38px] lg:gap-[15px]">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm leading-[30px] text-muted-foreground lg:text-base">
                  <FaIcon name="solid-circle-check" className="text-primary" />
                  {point}
                </li>
              ))}
            </ul>
            <Button asChild variant="brand-outline" size="cta" className="inline-block">
              <Link href={cta.href}>
                <ButtonLabel iconClassName="text-primary group-hover/button:text-white">{cta.label}</ButtonLabel>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
