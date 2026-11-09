import Image from "next/image"

import { ContactForm, type ContactFormLabels } from "@/components/shared/contact-form"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"
import { cn } from "@/lib/utils"

export type TalkingContactProps = {
  form: ContactFormLabels & { eyebrow: string; title: string }
  image: { src: string; alt: string; width: number; height: number }
  /** Kelas tambahan untuk `<section>`. */
  className?: string
}

/** Seksi `.talking-section`: kartu formulir di kanan dan foto di kiri (kolom dibalik seperti `flex-row-reverse`). */
export function TalkingContact({ form, image, className }: TalkingContactProps) {
  const { eyebrow, title, ...labels } = form

  return (
    <section id="kontak" className={cn("space-top overflow-hidden bg-white pb-[60px] md:pb-[100px]", className)}>
      <div className="container">
        <div className="grid items-center justify-between gap-6 md:grid-cols-2">
          <div className="relative z-9 rounded-[20px] bg-white px-[15px] pt-5 pb-[25px] shadow-brand min-[501px]:px-6 min-[1400px]:px-[50px] min-[1400px]:pt-[30px] min-[1400px]:pb-[34px] md:order-2">
            <SectionTitle align="left" eyebrow={eyebrow} title={title} className="mb-6 lg:mb-[30px] 2xl:mb-10" />
            <ContactForm {...labels} />
          </div>
          <div className="md:order-1">
            <Reveal animation="right" delay={0.4}>
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-auto w-full" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
