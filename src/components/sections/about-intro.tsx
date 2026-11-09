import Image from "next/image"
import Link from "next/link"

import { ButtonLabel } from "@/components/shared/button-label"
import { ProgressBar } from "@/components/shared/progress-bar"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"
import { Button } from "@/components/ui/button"

type Picture = { src: string; width: number; height: number }

export type AboutIntroProps = {
  eyebrow: string
  title: string
  description: string
  progress: readonly { label: string; value: number }[]
  cta: { label: string; href: string }
  image: Picture & { alt: string }
  /** Tiga gambar makanan dekoratif di sekeliling foto utama. */
  decorations: { side: Picture; top: Picture; bottom: Picture }
}

export function AboutIntro({ eyebrow, title, description, progress, cta, image, decorations }: AboutIntroProps) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">
        <div className="grid items-center justify-center gap-6 md:grid-cols-2">
          <div className="relative order-1 mx-auto w-full px-0 sm:w-[calc((2/3)*(100%+24px)-24px)] md:order-0 md:w-full 2xl:px-[50px] xl:px-[25px]">
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="w-full" />
            <Image
              src={decorations.side.src}
              alt=""
              width={decorations.side.width}
              height={decorations.side.height}
              aria-hidden
              className="absolute top-1/2 left-0 w-[70px] -translate-y-1/2 xl:w-auto"
            />
            <Reveal animation="left" delay={0.5}>
              <Image
                src={decorations.top.src}
                alt=""
                width={decorations.top.width}
                height={decorations.top.height}
                aria-hidden
                className="absolute top-0 left-[90px] w-[70px] xl:w-auto"
              />
            </Reveal>
            <Reveal animation="left" delay={0.7}>
              <Image
                src={decorations.bottom.src}
                alt=""
                width={decorations.bottom.width}
                height={decorations.bottom.height}
                aria-hidden
                className="absolute bottom-0 left-[90px] w-[70px] xl:w-auto"
              />
            </Reveal>
          </div>

          <div>
            <SectionTitle
              uppercase
              align="left"
              eyebrow={eyebrow}
              title={title}
              titleClassName="mb-5 text-[34px] xl:text-[40px] 2xl:text-[50px]"
              description={description}
              descriptionClassName="mb-[30px] text-muted-foreground"
              className="mb-6"
            />
            <div className="mb-10 grid gap-6">
              {progress.map((item) => (
                <ProgressBar key={item.label} {...item} />
              ))}
            </div>
            <Button asChild variant="brand" size="cta" className="inline-block">
              <Link href={cta.href}>
                <ButtonLabel>{cta.label}</ButtonLabel>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
