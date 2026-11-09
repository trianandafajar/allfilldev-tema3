import Image from "next/image"
import Link from "next/link"
import { SquareArrowOutUpRight } from "lucide-react"

import { ProcessStep, type ProcessStepData } from "@/components/shared/process-step"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"

type Decoration = { src: string; width: number; height: number }

export type WorkProcessProps = {
  eyebrow: string
  /** Satu baris per elemen; dipisah `<br>` seperti judul di template. */
  titleLines: readonly string[]
  description: string
  steps: readonly ProcessStepData[]
  footer: { text: string; linkLabel: string; href: string }
  decorations: {
    stepShape: Decoration
    arrowTop: Decoration
    arrowBottom: Decoration
    sylli: Decoration
    green: Decoration
  }
}

const delays = [0.3, 0.5, 0.7, 0.8] as const

/** Seksi alur kerja beranda (`.Working-section`): empat langkah di atas latar hijau tua dengan panah dekoratif. */
export function WorkProcess({ eyebrow, titleLines, description, steps, footer, decorations }: WorkProcessProps) {
  const { stepShape, arrowTop, arrowBottom, sylli, green } = decorations

  return (
    <section id="alur-kerja" className="section-padding relative z-1 overflow-hidden bg-forest">
      <div className="container">
        <div className="mb-[85px] grid justify-center gap-4 text-center lg:mb-[115px] lg:flex lg:items-end lg:justify-between lg:text-start">
          <SectionTitle
            align="left"
            tone="dark"
            uppercase
            eyebrow={eyebrow}
            className="max-lg:text-center"
            title={titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          />
          <Reveal animation="left" delay={0.3}>
            <p className="max-w-[500px] text-sm text-white lg:text-base">{description}</p>
          </Reveal>
        </div>
        <div className="relative mb-[60px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {steps.map((step, index) => (
            <Reveal key={step.number} animation="down" delay={delays[index % delays.length]}>
              <div>
                <ProcessStep {...step} shape={stepShape} />
              </div>
            </Reveal>
          ))}
          <Image
            src={arrowTop.src}
            alt=""
            width={arrowTop.width}
            height={arrowTop.height}
            aria-hidden
            className="pointer-events-none absolute -top-[50px] left-1/2 h-auto w-[129px] -translate-x-1/2 object-contain"
          />
          <Image
            src={arrowBottom.src}
            alt=""
            width={arrowBottom.width}
            height={arrowBottom.height}
            aria-hidden
            className="pointer-events-none absolute -bottom-[50px] left-[250px] hidden h-auto w-[129px] object-contain lg:block"
          />
          <Image
            src={arrowBottom.src}
            alt=""
            width={arrowBottom.width}
            height={arrowBottom.height}
            aria-hidden
            className="pointer-events-none absolute right-[250px] -bottom-[50px] hidden h-auto w-[129px] object-contain lg:block"
          />
        </div>
        <p className="flex flex-wrap items-center justify-center gap-2.5 text-muted">
          {footer.text}
          <Link href={footer.href} className="flex items-center gap-2.5 text-primary">
            {footer.linkLabel}
            <SquareArrowOutUpRight aria-hidden className="size-4" />
          </Link>
        </p>
      </div>
      <Image
        src={sylli.src}
        alt=""
        width={sylli.width}
        height={sylli.height}
        aria-hidden
        className="pointer-events-none absolute top-0 left-[60px] -z-1 animate-up-down"
      />
      <Image
        src={green.src}
        alt=""
        width={green.width}
        height={green.height}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-auto max-w-none"
      />
    </section>
  )
}
