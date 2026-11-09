import type { ReactNode } from "react"

import { BlogSidebar, type BlogSidebarProps } from "@/components/shared/blog-sidebar"

/** Kolom 8/4 untuk daftar dan detail blog: konten di kiri, sidebar di kanan. */
export function BlogLayout({ sidebar, children }: { sidebar: BlogSidebarProps; children: ReactNode }) {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container">
        <div className="grid gap-4 lg:grid-cols-12 xl:gap-6">
          <div className="lg:col-span-8 xl:pr-2">{children}</div>
          <BlogSidebar {...sidebar} />
        </div>
      </div>
    </section>
  )
}
