"use client"

import { useState } from "react"
import Link from "next/link"
import { Dialog } from "radix-ui"

import { FaIcon } from "@/components/shared/fa-icon"
import type { NavItem } from "@/content/situs"
import { cn } from "@/lib/utils"

const rowClass =
  "block w-full border-b border-line-strong py-2.5 text-base leading-normal font-medium text-foreground capitalize hover:text-primary"

/** Daftar menu bertingkat di dalam offcanvas (setara MeanMenu: tombol + memutar 45° saat terbuka). */
export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <nav aria-label="Navigasi seluler">
      <ul className="block w-full">
        {items.map((item) => {
          const expanded = open === item.label

          return (
            <li key={item.label} className="relative w-full">
              <Dialog.Close asChild>
                <Link href={item.href} className={rowClass}>
                  {item.label}
                </Link>
              </Dialog.Close>
              {item.children ? (
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-label={`Buka submenu ${item.label}`}
                  onClick={() => setOpen(expanded ? null : item.label)}
                  className="absolute top-[5px] right-0 z-2 flex h-8 w-[26px] cursor-pointer items-center justify-center"
                >
                  <FaIcon
                    name="regular-plus"
                    className={cn("text-lg transition-all duration-400 ease-in-out", expanded && "rotate-45")}
                  />
                </button>
              ) : null}

              {item.children && expanded ? (
                <ul>
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Dialog.Close asChild>
                        <Link href={child.href} className={cn(rowClass, "mx-[10%] w-4/5 py-2.5")}>
                          {child.label}
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
