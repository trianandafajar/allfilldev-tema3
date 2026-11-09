import { FaIcon } from "@/components/shared/fa-icon"
import type { FaIconName } from "@/components/shared/fa-icon-data"
import { Reveal } from "@/components/shared/reveal"

export type ContactInfoItem = {
  icon: FaIconName
  title: string
  /** Satu baris per elemen; `href` opsional untuk `tel:` atau `mailto:`. */
  lines: readonly { text: string; href?: string }[]
}

export type ContactInfoProps = {
  items: readonly ContactInfoItem[]
}

export function ContactInfo({ items }: ContactInfoProps) {
  return (
    <section className="overflow-hidden bg-white max-md:py-12 md:space-top md:space-bottom">
      <div className="container">
        <div className="grid justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <Reveal key={item.title} animation="up" delay={0.3}>
              <div className="flex gap-3.5 xl:gap-5 2xl:gap-[30px]">
                <div className="flex size-[45px] min-h-[45px] min-w-[45px] items-center justify-center rounded-full bg-primary text-base text-white xl:size-[75px] xl:min-h-[75px] xl:min-w-[75px] xl:text-3xl 2xl:size-[85px] 2xl:min-h-[85px] 2xl:min-w-[85px]">
                  <FaIcon name={item.icon} />
                </div>
                <div>
                  <h5 className="font-heading text-xl leading-10 font-normal text-forest xl:text-[28px] 2xl:text-[30px]">
                    {item.title}
                  </h5>
                  <div className="grid text-sm leading-6 text-muted-foreground xl:text-[15px] 2xl:text-base">
                    {item.lines.map((line) =>
                      line.href ? (
                        <a key={line.text} href={line.href} className="text-muted-foreground hover:text-primary">
                          {line.text}
                        </a>
                      ) : (
                        <span key={line.text}>{line.text}</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
