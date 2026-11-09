import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Minus, Search } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"

type SidebarLink = { label: string; href: string }

export type BlogSidebarProps = {
  search: { title: string; placeholder: string; submitLabel: string }
  categories: { title: string; items: readonly SidebarLink[] }
  latest: {
    title: string
    items: readonly { title: string; href: string; dateLabel: string; image: { src: string; alt: string } }[]
  }
  tags: { title: string; items: readonly SidebarLink[] }
}

function Box({ title, delay, children }: { title: string; delay: number; children: React.ReactNode }) {
  return (
    <Reveal animation="up" delay={delay}>
      <div className="rounded-[20px] bg-secondary p-[26px] lg:px-10 lg:pt-[38px] lg:pb-10">
        <h3 className="mb-5 text-[26px] leading-10 font-normal text-forest xl:text-[30px]">{title}</h3>
        {children}
      </div>
    </Reveal>
  )
}

/** Sidebar blog template: pencarian, kategori, blog terbaru, dan tag. Pencarian hanya tampilan (belum menyaring daftar). */
export function BlogSidebar({ search, categories, latest, tags }: BlogSidebarProps) {
  return (
    <aside className="mt-4 grid content-start gap-[30px] lg:col-span-4 lg:mt-0 lg:gap-10">
      <Box title={search.title} delay={0.2}>
        <form action="/blog" role="search" className="flex items-center rounded-full bg-white px-5">
          <input
            type="search"
            name="q"
            aria-label={search.placeholder}
            placeholder={search.placeholder}
            className="w-full bg-transparent py-3.5 text-sm text-muted-foreground outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" aria-label={search.submitLabel} className="text-primary">
            <Search aria-hidden className="size-4" />
          </button>
        </form>
      </Box>
      <Box title={categories.title} delay={0.3}>
        <ul className="grid gap-4 lg:gap-[18px]">
          {categories.items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-4 font-heading text-[17px] leading-[30px] text-forest hover:gap-2.5 hover:text-primary lg:gap-5 lg:text-xl lg:hover:gap-2.5"
              >
                <Minus aria-hidden className="size-4 text-primary" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Box>
      <Box title={latest.title} delay={0.4}>
        <ul className="grid gap-[30px] lg:gap-10">
          {latest.items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group flex gap-3.5 lg:gap-5">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={88}
                  height={88}
                  className="size-[88px] shrink-0 rounded-[20px] object-cover"
                />
                <span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground lg:text-sm">
                    <CalendarDays aria-hidden className="size-[13px] text-primary" />
                    {item.dateLabel}
                  </span>
                  <span className="mt-[3px] block font-heading text-base leading-6 text-forest group-hover:text-primary lg:text-xl lg:leading-[30px]">
                    {item.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
      <Box title={tags.title} delay={0.5}>
        <ul className="flex flex-wrap gap-5">
          {tags.items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-block rounded-full bg-white px-2.5 py-[5px] text-sm leading-[160%] text-foreground hover:bg-primary hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </aside>
  )
}
