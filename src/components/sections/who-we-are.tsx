import Image from "next/image"
import Link from "next/link"

import { InquiryForm, type InquiryFormProps } from "@/components/shared/inquiry-form"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"

type Picture = { src: string; width: number; height: number }

export type WhoWeAreProps = {
  eyebrow: string
  title: string
  description: string
  values: readonly { icon: string; title: string; href: string }[]
  form: InquiryFormProps & { title: string }
  decoration: Picture
}

export function WhoWeAre({ eyebrow, title, description, values, form, decoration }: WhoWeAreProps) {
  const { title: formTitle, ...formProps } = form

  return (
    <section className="section-padding relative z-1 overflow-hidden bg-forest">
      <div className="container">
        <div className="grid items-center justify-between gap-6 lg:grid-cols-2">
          <div>
            <SectionTitle
              align="left"
              tone="dark"
              eyebrow={eyebrow}
              title={title}
              titleClassName="mb-6"
              description={description}
              descriptionClassName="text-white"
              className="mb-10"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:gap-6">
              {values.map((value, index) => (
                <Reveal key={value.title} animation="down" delay={0.4 + index * 0.2}>
                  <div className="group w-full rounded-[20px] bg-white/5 px-[15px] py-8 text-center xl:py-[50px]">
                    <div className="mx-auto mb-5 flex size-[65px] items-center justify-center rounded-[20px] bg-accent xl:mb-[30px]">
                      <Image src={value.icon} alt="" width={40} height={40} aria-hidden className="size-10" />
                    </div>
                    <Link
                      href={value.href}
                      className="block font-heading text-[22px] leading-[30px] font-normal text-white group-hover:text-accent xl:text-[30px] xl:leading-10"
                    >
                      {value.title}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal animation="right" delay={0.4}>
            <div className="relative z-9 rounded-[20px] bg-white p-[15px] shadow-brand min-[501px]:p-[30px] xl:p-[50px]">
              <h3 className="mb-6 font-heading text-[26px] leading-10 font-normal text-forest xl:mb-[30px] xl:text-[34px]">
                {formTitle}
              </h3>
              <InquiryForm {...formProps} />
            </div>
          </Reveal>
        </div>
      </div>
      <Image
        src={decoration.src}
        alt=""
        width={decoration.width}
        height={decoration.height}
        aria-hidden
        className="pointer-events-none absolute bottom-[60px] left-0 -z-1 h-auto"
      />
    </section>
  )
}
