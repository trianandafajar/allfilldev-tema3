import Link from "next/link"
import { CalendarDays, FolderOpen } from "lucide-react"

import { ArticleBody, type ArticleBlock } from "@/components/shared/article-body"
import { BlogLayout } from "@/components/shared/blog-layout"
import type { BlogSidebarProps } from "@/components/shared/blog-sidebar"
import { CoverImage } from "@/components/shared/cover-image"
import { FaIcon } from "@/components/shared/fa-icon"
import { PostNav } from "@/components/shared/post-nav"
import { Reveal } from "@/components/shared/reveal"
import { SocialLinks, type SocialLink } from "@/components/shared/social-links"

export type BlogDetailProps = {
  title: string
  meta: { author: string; category: string; date: string; dateLabel: string }
  body: readonly ArticleBlock[]
  tags: { label: string; items: readonly { label: string; href: string }[] }
  shareLinks: readonly SocialLink[]
  nav: { label: string; prev?: { title: string; href: string }; next?: { title: string; href: string } }
  related: {
    heading: string
    post: { title: string; excerpt: string; href: string; image: { src: string; alt: string; width: number; height: number } }
  }
  sidebar: BlogSidebarProps
}

export function BlogDetail({ title, meta, body, tags, shareLinks, nav, related, sidebar }: BlogDetailProps) {
  return (
    <BlogLayout sidebar={sidebar}>
      <article>
        <Reveal animation="up" delay={0.2}>
          <h2 className="mb-[30px] font-normal text-forest">{title}</h2>
        </Reveal>
        <Reveal animation="up" delay={0.3}>
          <ul className="mb-[30px] flex flex-wrap gap-x-[30px] gap-y-[5px] text-sm text-muted-foreground">
            <li className="flex items-center gap-[5px]">
              <FaIcon name="regular-user" className="text-forest" />
              {meta.author}
            </li>
            <li className="flex items-center gap-[5px]">
              <FolderOpen aria-hidden className="size-3.5 text-forest" />
              {meta.category}
            </li>
            <li className="flex items-center gap-[5px]">
              <CalendarDays aria-hidden className="size-3.5 text-forest" />
              <time dateTime={meta.date}>{meta.dateLabel}</time>
            </li>
          </ul>
        </Reveal>
        <ArticleBody blocks={body} />
        <Reveal animation="up" delay={0.4}>
          <div className="flex flex-wrap items-center justify-between gap-x-[30px] gap-y-3.5 border-y border-muted py-6">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
              <h5 className="text-xl font-normal text-forest">{tags.label}</h5>
              <ul className="flex flex-wrap gap-3">
                {tags.items.map((tag) => (
                  <li key={tag.label}>
                    <Link
                      href={tag.href}
                      className="inline-block border border-muted px-2.5 py-[5px] text-sm leading-[160%] text-muted-foreground hover:border-primary hover:bg-primary hover:text-white"
                    >
                      {tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <SocialLinks links={shareLinks} variant="share" />
          </div>
        </Reveal>
        <div className="my-10">
          <Reveal animation="up" delay={0.5}>
            <div>
              <PostNav {...nav} />
            </div>
          </Reveal>
        </div>
        <Reveal animation="up" delay={0.6}>
          <section aria-labelledby="related-heading">
            <h3 id="related-heading" className="mb-10 font-normal text-forest">
              {related.heading}
            </h3>
            <Link href={related.post.href} className="group block">
              <CoverImage
                src={related.post.image.src}
                alt={related.post.image.alt}
                width={related.post.image.width}
                height={related.post.image.height}
                className="mb-[30px] rounded-[20px]"
              />
              <h3 className="mb-5 font-normal text-forest group-hover:text-primary">{related.post.title}</h3>
              <p className="text-muted-foreground">{related.post.excerpt}</p>
            </Link>
          </section>
        </Reveal>
      </article>
    </BlogLayout>
  )
}
