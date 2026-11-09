import Image from "next/image"
import Link from "next/link"

import { FaIcon } from "@/components/shared/fa-icon"
import { Reveal } from "@/components/shared/reveal"
import { SocialLinks } from "@/components/shared/social-links"
import { siteConfig } from "@/config/site"
import { footerContent, footerSocials } from "@/content/situs"

const widgetTitle = "text-[26px] leading-[130%] font-normal text-white lg:text-[30px]"
const widgetHead = "mb-[17px] lg:mb-7"
const listLink =
  "flex items-center gap-2 text-base leading-[28px] font-normal text-white/70 transition-all duration-400 hover:ms-[5px] hover:text-accent lg:gap-[15px]"
const contactRow = `${listLink} items-start`
const contactIcon = "text-base leading-loose text-primary"

export function SiteFooter() {
  return (
    <footer className="relative z-1 overflow-hidden bg-forest">
      <div className="pt-[264px] pb-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(12,minmax(0,1fr))]">
            <Reveal delay={0.3}>
              <div className="lg:col-span-3 xl:col-span-4">
                <div className={widgetHead}>
                  <Link href="/" aria-label={`${siteConfig.name} - Beranda`} className="inline-block">
                    <Image src="/images/logo/logo-light.png" alt={siteConfig.name} width={186} height={40} />
                  </Link>
                </div>
                <div>
                  <p className="mb-[22px] text-base leading-[30px] font-normal text-white/70 lg:mb-[30px]">
                    {footerContent.description}
                  </p>
                  <SocialLinks links={footerSocials} variant="footer" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="lg:col-span-3 xl:col-span-3">
                <div className={widgetHead}>
                  <h3 className={widgetTitle}>{footerContent.serviceTitle}</h3>
                </div>
                <ul className="grid gap-[9px] lg:gap-3.5">
                  {footerContent.serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={listLink}>
                        <FaIcon name="solid-angle-right" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="lg:col-span-3 xl:col-span-2">
                <div className={widgetHead}>
                  <h3 className={widgetTitle}>{footerContent.linksTitle}</h3>
                </div>
                <ul className="grid gap-[9px] lg:gap-3.5">
                  {footerContent.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={listLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="lg:col-span-3">
                <div className={widgetHead}>
                  <h3 className={widgetTitle}>{footerContent.contactTitle}</h3>
                </div>
                <ul className="grid gap-2.5 lg:gap-4">
                  <li>
                    <a href={`mailto:${siteConfig.business.email}`} className={contactRow}>
                      <FaIcon name="solid-envelope" className={contactIcon} />
                      {siteConfig.business.email}
                    </a>
                  </li>
                  <li className={contactRow}>
                    <FaIcon name="solid-location-dot" className={contactIcon} />
                    <address className="not-italic">
                      {footerContent.address.map((line, index) => (
                        <span key={line}>
                          {index > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))}
                    </address>
                  </li>
                  <li className={contactRow}>
                    <FaIcon name="solid-phone" className={contactIcon} />
                    <span>
                      {footerContent.phones.map((phone, index) => (
                        <span key={phone}>
                          {index > 0 ? <br /> : null}
                          <a
                            href={`tel:${phone.replace(/\D/g, "").replace(/^0/, "+62")}`}
                            className="text-white hover:text-accent"
                          >
                            {phone}
                          </a>
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative z-9">
        <div className="container">
          <div className="relative z-9 grid items-center justify-center gap-2 border-t border-white/30 py-[26px] text-center md:flex md:justify-between md:gap-0 md:text-start">
            <Reveal animation="left" delay={0.3}>
              <p className="text-sm leading-[25.6px] font-normal text-white/70 sm:text-base">
                &copy; {siteConfig.name} {siteConfig.copyrightYear}. {footerContent.copyright}
              </p>
            </Reveal>
            <Reveal animation="right" delay={0.5}>
              <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-px sm:gap-[30px]">
                {footerContent.legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-white/70 hover:text-accent sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <Image
        src="/images/footer/footer-wheat.png"
        alt=""
        aria-hidden
        width={922}
        height={632}
        className="pointer-events-none absolute bottom-0 left-0 -z-1 mb-[30px] h-auto max-w-full"
      />
    </footer>
  )
}
