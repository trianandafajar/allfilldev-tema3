"use client"

import Link from "next/link"

import { FaIcon } from "@/components/shared/fa-icon"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Product, ProductCategory } from "@/content/produk"

type CategoryAccordionProps = {
  groups: readonly { category: ProductCategory; items: readonly Pick<Product, "slug" | "name">[] }[]
  /** Kategori yang terbuka saat halaman dimuat. */
  defaultOpen?: string
}

/** Akordeon kategori di kolom kiri detail produk; tiap kategori memuat tautan ke produknya. */
export function CategoryAccordion({ groups, defaultOpen }: CategoryAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen} className="grid">
      {groups.map(({ category, items }) => (
        <AccordionItem key={category.slug} value={category.slug} className="border-b border-border pb-2.5 not-last:border-b">
          <AccordionTrigger
            showIcon={false}
            className="items-center rounded-none border-0 px-0 py-2.5 font-heading text-sm leading-[22px] font-medium text-forest hover:no-underline data-open:text-primary"
          >
            {category.name}
          </AccordionTrigger>
          <AccordionContent className="pb-0 pl-6">
            <ul>
              {items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/produk/${item.slug}`}
                    className="flex items-center gap-2.5 border-b border-border py-2.5 font-heading text-sm leading-[22px] font-medium text-forest last:border-b-0 hover:text-primary"
                  >
                    <FaIcon name="solid-angle-right" className="text-xs" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
