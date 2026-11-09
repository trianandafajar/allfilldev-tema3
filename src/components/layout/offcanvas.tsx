"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Dialog } from "radix-ui"

import { MobileMenu } from "@/components/layout/mobile-menu"
import { ButtonLabel } from "@/components/shared/button-label"
import { FaIcon } from "@/components/shared/fa-icon"
import { SocialLinks } from "@/components/shared/social-links"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import {
  contactInfo,
  headerCta,
  navItems,
  offcanvasContent,
  offcanvasSocials,
} from "@/content/situs"

const contactRows = [
  { icon: "light-location-dot", text: contactInfo.address, href: "#" },
  { icon: "light-envelope", text: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: "light-clock", text: contactInfo.hours, href: "#" },
  { icon: "regular-phone", text: contactInfo.phones[0].label, href: contactInfo.phones[0].href },
] as const

/** Tombol hamburger + panel geser kanan (setara `.offcanvas__info` template, aktif di bawah 1200px). */
export function Offcanvas() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="my-auto xl:hidden">
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label={offcanvasContent.openLabel}
            className="cursor-pointer text-[30px] leading-none text-foreground sm:text-[39px]"
          >
            <FaIcon name="solid-bars" />
          </button>
        </Dialog.Trigger>
      </div>

      {/* Tanpa forceMount: panel yang selalu terpasang membuat Radix menyembunyikan seluruh halaman (aria-hidden) dari pembaca layar. */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-900 bg-overlay opacity-80 duration-[450ms] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-0 right-0 z-99999 h-full w-[300px] overflow-y-scroll bg-white duration-[450ms] ease-in-out outline-none [scrollbar-width:none] min-[451px]:w-[400px] data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full [&::-webkit-scrollbar]:hidden"
        >
          <Dialog.Title className="sr-only">Menu navigasi</Dialog.Title>
          <div className="relative h-full p-5 sm:p-[30px]">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" aria-label={`${siteConfig.name} - Beranda`}>
                <Image src="/images/logo/favcion.png" alt={siteConfig.name} width={38} height={40} />
              </Link>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={offcanvasContent.closeLabel}
                  className="relative z-9 size-10 cursor-pointer rounded-sm bg-primary text-center leading-10 text-white"
                >
                  <FaIcon name="solid-xmark" />
                </button>
              </Dialog.Close>
            </div>

            <div className="mb-4">
              <MobileMenu items={navItems} />
            </div>

            <div className="mt-[35px]">
              <h4 className="text-[22px] xl:text-2xl">{offcanvasContent.contactTitle}</h4>
              <ul className="mt-5">
                {contactRows.map((row) => (
                  <li
                    key={row.icon}
                    className="flex items-center text-[13px] font-semibold capitalize not-last:mb-2.5"
                  >
                    <div className="me-5">
                      <FaIcon name={row.icon} className="text-base text-muted-foreground" />
                    </div>
                    <div>
                      <a href={row.href} className="text-[13px] normal-case text-muted-foreground">
                        {row.text}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 mb-6">
                <Dialog.Close asChild>
                  <Button asChild variant="brand" size="cta" className="inline-block">
                    <Link href={headerCta.href}>
                      <ButtonLabel>{headerCta.label}</ButtonLabel>
                    </Link>
                  </Button>
                </Dialog.Close>
              </div>
              <h4 className="text-[22px] xl:text-2xl">{offcanvasContent.socialTitle}</h4>
              <SocialLinks links={offcanvasSocials} variant="offcanvas" className="mt-[30px]" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
