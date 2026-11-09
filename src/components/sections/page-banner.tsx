import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"

import { FaIcon } from "@/components/shared/fa-icon"
import { Reveal } from "@/components/shared/reveal"

export type PageBannerProps = {
  title: string
  /** Remah roti; item terakhir adalah halaman aktif dan tidak punya `href`. */
  crumbs: readonly { label: string; href?: string }[]
  image: { src: string; width: number; height: number }
}

export function PageBanner({ title, crumbs, image }: PageBannerProps) {
  return (
    <section className="relative z-1 overflow-hidden bg-[url(/images/about/bread-bg.jpg)] bg-cover bg-center bg-no-repeat pt-[120px] pb-[60px] before:absolute before:inset-0 before:-z-1 before:bg-linear-to-r before:from-forest before:via-forest/90 before:to-primary/60 before:content-[''] lg:pt-[140px] lg:pb-[90px] xl:py-[150px]">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6 xl:gap-x-10">
          <div>
            <Reveal animation="down" delay={0.4}>
              <h1 className="mb-2.5 text-[39px] leading-[1.1] text-white sm:text-5xl lg:mb-[21px] lg:text-[60px] xl:mb-5 xl:text-[80px] xl:leading-[85px]">
                {title}
              </h1>
            </Reveal>
            <nav aria-label="Remah roti">
              <ol className="flex items-center gap-[15px] font-heading text-lg text-white xl:gap-[18px] xl:text-xl">
                {crumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-[15px] xl:gap-[18px]">
                    {index > 0 ? <FaIcon name="solid-angle-right" /> : null}
                    {crumb.href ? (
                      <Link href={crumb.href} className="text-white hover:text-accent">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            aria-hidden
            style={{ "--banner-image-width": `${image.width}px` } as CSSProperties}
            className="hidden h-auto w-[120px] sm:block lg:w-[180px] xl:w-(--banner-image-width)"
          />
        </div>
      </div>
    </section>
  )
}
