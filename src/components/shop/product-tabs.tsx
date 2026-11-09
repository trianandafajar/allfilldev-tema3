"use client"

import type { ReactNode } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ProductTabsProps = {
  tabs: readonly { value: string; label: string; content: ReactNode }[]
}

const trigger =
  "rounded-sm font-heading text-base leading-normal font-normal text-forest hover:text-primary data-[state=active]:text-primary xl:text-xl"

/** Tab deskripsi dan informasi tambahan produk (`.review-description`). */
export function ProductTabs({ tabs }: ProductTabsProps) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="rounded-[20px] border border-border p-5 xl:p-[30px] 2xl:p-10">
      <TabsList className="mb-[30px] flex-wrap justify-center gap-x-5 gap-y-1.5 xl:mb-10 xl:gap-x-[30px] xl:gap-y-2.5">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className={trigger}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="text-sm leading-[1.7] text-muted-foreground">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
