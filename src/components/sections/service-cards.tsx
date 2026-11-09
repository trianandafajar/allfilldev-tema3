import Image from "next/image"
import Link from "next/link"

import { ButtonLabel } from "@/components/shared/button-label"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"

export type ServiceCardItem = {
  icon: string
  title: string
  text: string
  href: string
}

export type ServiceCardsProps = {
  eyebrow: string
  title: string
  readMore: string
  items: readonly ServiceCardItem[]
}

export function ServiceCards({ eyebrow, title, readMore, items }: ServiceCardsProps) {
  return (
    <section className="space-bottom overflow-hidden bg-white">
      <div className="container">
        <div className="title-col-6">
          <SectionTitle uppercase eyebrow={eyebrow} title={title} className="mb-10 lg:mb-[50px] 2xl:mb-[60px]" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 xl:gap-6">
          {items.map((item, index) => (
            <Reveal key={item.title} animation="up" delay={0.3 + index * 0.2}>
              <article className="group flex w-full items-center rounded-[10px] border border-muted bg-white p-5 transition-all duration-400 sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)] xl:w-[calc((100%-3rem)/3)] 2xl:p-[30px]">
                <Image
                  src={item.icon}
                  alt=""
                  width={65}
                  height={65}
                  aria-hidden
                  className="size-[50px] shrink-0 2xl:size-[65px]"
                />
                <div className="ms-[15px] border-s-2 border-muted ps-[15px] 2xl:ms-5 2xl:ps-5">
                  <Link
                    href={item.href}
                    className="mb-2 block font-heading text-[26px] leading-10 font-normal text-forest group-hover:text-primary 2xl:text-[30px]"
                  >
                    {item.title}
                  </Link>
                  <p className="mb-5 leading-[30px] text-muted-foreground 2xl:mb-[30px]">{item.text}</p>
                  <Link
                    href={item.href}
                    className="flex items-center gap-[22px] text-[15px] leading-6 tracking-[3px] group-hover:text-primary"
                  >
                    <ButtonLabel iconClassName="text-primary">{readMore}</ButtonLabel>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
