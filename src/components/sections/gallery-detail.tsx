import { ArticleBody, type ArticleBlock, type ArticleImage } from "@/components/shared/article-body"
import { CoverImage } from "@/components/shared/cover-image"
import { Reveal } from "@/components/shared/reveal"
import { SocialLinks, type SocialLink } from "@/components/shared/social-links"

export type GalleryDetailProps = {
  title: string
  summary: string
  /** Baris tabel info (Klien, Penulis, Tanggal, ...); nilai kosong tidak ditampilkan. */
  info: readonly { label: string; value: string }[]
  shareLinks: readonly SocialLink[]
  image: ArticleImage
  lead: { title: string; text: string }
  body: readonly ArticleBlock[]
}

export function GalleryDetail({ title, summary, info, shareLinks, image, lead, body }: GalleryDetailProps) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">
        <div className="mb-10 grid gap-3 lg:grid-cols-12 xl:gap-6">
          <Reveal animation="up" delay={0.3}>
            <aside className="rounded-[20px] bg-secondary px-5 py-[30px] sm:px-10 lg:col-span-4 lg:py-20">
              <h3 className="mb-2.5 text-[26px] font-normal text-forest xl:text-[30px]">{title}</h3>
              <p className="text-sm text-muted-foreground">{summary}</p>
              <dl className="my-[35px] grid gap-2.5">
                {info.map((row) => (
                  <div key={row.label} className="flex items-center gap-2.5 rounded-full bg-white px-[18px] py-[5px] sm:gap-4 sm:px-[22px]">
                    <dt className="flex w-[75px] shrink-0 items-center justify-between font-heading text-base leading-[30px] text-forest sm:w-[110px] sm:text-xl">
                      {row.label}
                      <span aria-hidden>:</span>
                    </dt>
                    <dd className="text-xs leading-[30px] text-muted-foreground sm:text-base">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <SocialLinks links={shareLinks} variant="share-outline" />
            </aside>
          </Reveal>
          <Reveal animation="up" delay={0.4}>
            <div className="relative lg:col-span-8">
              <CoverImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                className="rounded-[20px]"
              />
              <div className="relative z-1 -mt-[100px] w-full rounded-[20px] bg-secondary px-5 py-6 sm:w-[90%] sm:p-[30px] xl:p-10">
                <h3 className="mb-2.5 text-2xl font-normal text-forest sm:mb-[15px] sm:text-[30px] xl:text-4xl">
                  {lead.title}
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base">{lead.text}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <ArticleBody blocks={body} />
      </div>
    </section>
  )
}
