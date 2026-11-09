"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type FaqEntry = { question: string; answer: string }

/** `.accordion-single` template: satu panel terbuka, item aktif berlatar hijau, tombol ± bulat di kanan. */
export function FaqAccordion({ items }: { items: readonly FaqEntry[] }) {
  return (
    <Accordion type="single" collapsible className="grid gap-2 lg:gap-4 2xl:gap-6">
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          className="rounded-[20px] bg-white shadow-soft transition-all duration-400 not-last:border-b-0 data-open:bg-primary"
        >
          <AccordionTrigger
            showIcon={false}
            className="items-center justify-start rounded-[20px] border-0 p-[15px] pr-[65px] font-heading text-[17px] leading-[1.2] font-normal text-forest hover:no-underline data-open:text-white xl:px-[26px] xl:py-5 xl:pr-[76px] xl:text-xl after:absolute after:right-[15px] after:z-1 xl:after:right-[26px] after:flex after:size-[34px] after:min-w-[34px] after:items-center after:justify-center after:rounded-full after:bg-secondary after:text-2xl after:font-black after:text-primary after:transition-all after:duration-500 after:content-['+'] after:[font-family:serif] data-open:after:bg-white/10 data-open:after:text-white data-open:after:content-['-'] xl:after:size-10 xl:after:min-w-10"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent style={{ animationDuration: "400ms" }} className="px-[15px] pt-0 pb-[15px] text-sm text-white xl:px-[26px] xl:pb-5">
            <p className="text-sm text-white">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
