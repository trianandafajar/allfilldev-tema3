import Link from "next/link"

import { FaIcon } from "@/components/shared/fa-icon"
import type { NavItem } from "@/content/situs"

const topLinkClass =
  "inline-block py-5 font-sans text-base font-medium leading-[28px] text-foreground capitalize transition-all duration-400 ease-in-out hover:text-primary!"

const submenuClass =
  "invisible absolute start-0 top-full z-99999 min-w-60 translate-y-2.5 bg-white opacity-0 shadow-menu transition-all duration-400 ease-in-out group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100"

export function MainMenu({ items }: { items: readonly NavItem[] }) {
  return (
    <nav aria-label="Navigasi utama" className="hidden xl:block">
      <ul>
        {items.map((item) => (
          <li
            key={item.label}
            className="group/item relative inline-block me-[18px] last:me-0 2xl:me-[26px]"
          >
            <Link href={item.href} className={topLinkClass}>
              {item.label}
              {item.children ? <FaIcon name="solid-angle-down" className="ms-0.5 text-base" /> : null}
            </Link>

            {item.children ? (
              <ul className={submenuClass}>
                {item.children.map((child) => (
                  <li key={child.label} className="group/sub block w-full">
                    <Link
                      href={child.href}
                      className="relative z-11 block w-full border-b border-line px-[25px] py-[11px] text-base leading-[28px] font-semibold text-foreground capitalize group-last/sub:border-0 group-hover/sub:bg-forest group-hover/sub:text-white!"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}
