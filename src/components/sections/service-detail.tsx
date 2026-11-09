import { ArticleBody, type ArticleBlock, type ArticleImage } from "@/components/shared/article-body"
import { CoverImage } from "@/components/shared/cover-image"
import { FaIcon } from "@/components/shared/fa-icon"
import { Reveal } from "@/components/shared/reveal"
import { ServiceLinkList, type ServiceLink } from "@/components/shared/service-link-list"

export type ServiceDetailProps = {
  image: ArticleImage
  /** Semua layanan, ditampilkan sebagai daftar tautan di sidebar. */
  services: readonly ServiceLink[]
  body: readonly ArticleBlock[]
  callBox: { title: string; text: string; phone: { label: string; href: string } }
}

export function ServiceDetail({ image, services, body, callBox }: ServiceDetailProps) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">
        <div className="grid gap-3 lg:grid-cols-12 xl:gap-6">
          <aside className="grid content-start gap-10 lg:col-span-4">
            <Reveal animation="up" delay={0.3}>
              <div>
                <ServiceLinkList items={services} label="Layanan kami" />
              </div>
            </Reveal>
            <Reveal animation="up" delay={0.4}>
              <div className="relative z-1 overflow-hidden rounded-[20px] bg-forest px-5 py-[30px] text-center xl:py-[50px]">
                <h3 className="text-[26px] leading-10 font-normal text-white uppercase 2xl:text-[30px]">
                  {callBox.title}
                </h3>
                <span className="font-sans text-base text-white">{callBox.text}</span>
                <a
                  href={callBox.phone.href}
                  className="mt-[27px] grid justify-center gap-5 font-heading text-2xl leading-9 text-white xl:gap-[30px] xl:text-4xl"
                >
                  <span className="mx-auto flex size-[60px] items-center justify-center rounded-full bg-primary text-xl xl:size-[90px] xl:text-3xl">
                    <FaIcon name="solid-phone" />
                  </span>
                  {callBox.phone.label}
                </a>
              </div>
            </Reveal>
          </aside>
          <div className="lg:col-span-8 xl:pl-2">
            <Reveal animation="up" delay={0.3}>
              <CoverImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                className="mb-[30px] rounded-[20px]"
              />
            </Reveal>
            <ArticleBody blocks={body} />
          </div>
        </div>
      </div>
    </section>
  )
}
