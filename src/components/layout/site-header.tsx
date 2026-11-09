import Image from "next/image"
import Link from "next/link"

import { HeaderShell } from "@/components/layout/header-shell"
import { MainMenu } from "@/components/layout/main-menu"
import { Offcanvas } from "@/components/layout/offcanvas"
import { TopBar } from "@/components/layout/top-bar"
import { FaIcon } from "@/components/shared/fa-icon"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { headerCta, navItems, topBar } from "@/content/situs"

export function SiteHeader() {
  return (
    <>
      <TopBar {...topBar} />
      <HeaderShell>
        <div className="container">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label={`${siteConfig.name} - Beranda`} className="block">
              <Image
                src="/images/logo/logo-black.png"
                alt={siteConfig.name}
                width={186}
                height={40}
                priority
              />
            </Link>
            <div className="flex items-center justify-end gap-5 2xl:gap-10">
              <MainMenu items={navItems} />
              <div className="hidden items-center sm:flex">
                <Button
                  asChild
                  variant="brand"
                  size="cta"
                  className="inline-flex h-auto items-center justify-center gap-0 rounded-full px-[18px] py-3 text-[13px] font-medium lg:py-4 2xl:px-[30px] 2xl:py-[18px] 2xl:text-[15px] 2xl:font-normal"
                >
                  <Link href={headerCta.href}>
                    {headerCta.label}
                    <FaIcon name="solid-arrow-right" className="ml-[5px]" />
                  </Link>
                </Button>
              </div>
              <Offcanvas />
            </div>
          </div>
        </div>
      </HeaderShell>
    </>
  )
}
