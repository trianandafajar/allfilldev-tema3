import { BlogTeaserCard, type BlogTeaserData } from "@/components/shared/blog-teaser-card"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"

export type BlogProps = {
  eyebrow: string
  title: string
  posts: readonly BlogTeaserData[]
}

const delays = [0.3, 0.5, 0.7] as const

/** Seksi blog beranda (`.blog-section`): tiga artikel terbaru, kartu pertama lebih lebar di layar xl. */
export function Blog({ eyebrow, title, posts }: BlogProps) {
  return (
    <section id="blog" className="section-padding overflow-hidden bg-white">
      <div className="container">
        <div className="title-col-6">
          <SectionTitle uppercase eyebrow={eyebrow} title={title} className="mb-10 lg:mb-[50px] 2xl:mb-[60px]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(0,633fr)_minmax(0,305fr)_minmax(0,305fr)] xl:gap-6">
          {posts.slice(0, delays.length).map((post, index) => (
            <Reveal key={post.href} animation="up" delay={delays[index]}>
              <div className="h-full">
                <BlogTeaserCard {...post} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
