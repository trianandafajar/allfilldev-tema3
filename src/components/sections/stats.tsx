import Image from "next/image"

import { CountUp } from "@/components/shared/count-up"

type Decoration = { src: string; width: number; height: number }

export type StatItem = {
  value: number
  suffix: string
  label: string
  icon: Decoration
}

export type StatsProps = {
  items: readonly StatItem[]
  flowers: { left: Decoration; right: Decoration }
}

/**
 * Kartu angka beranda (`.counter-section02`): kartu putih berbayang dengan empat penghitung bergaris,
 * menjorok 80px ke seksi berikutnya.
 */
export function Stats({ items, flowers }: StatsProps) {
  return (
    <section className="relative">
      <div className="container">
        <div className="relative z-1 -mb-20 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-[20px] bg-white px-[30px] py-[26px] shadow-brand md:flex-nowrap lg:px-[60px] lg:py-9">
          {items.map((item) => (
            <div key={item.label} className="grid w-[40%] gap-3.5 md:w-auto md:gap-[15px] lg:flex lg:items-center xl:gap-5">
              <Image
                src={item.icon.src}
                alt=""
                width={item.icon.width}
                height={item.icon.height}
                aria-hidden
                className="size-[35px] md:size-[45px] xl:size-[65px]"
              />
              <div>
                <h2 className="mb-0 text-[26px] font-normal text-transparent [-webkit-text-stroke:1px_var(--muted-foreground)] md:text-[34px] xl:text-[50px]">
                  <CountUp
                    value={item.value}
                    suffix={item.suffix}
                    className="[&>span]:text-[26px] [&>span]:font-normal md:[&>span]:text-[34px] xl:[&>span]:text-[50px]"
                  />
                </h2>
                <p className="mt-2 text-xs leading-[18px] text-muted-foreground md:mt-0 md:text-sm md:leading-[25.6px] xl:text-base">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
          <Image
            src={flowers.left.src}
            alt=""
            width={flowers.left.width}
            height={flowers.left.height}
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 -z-1"
          />
          <Image
            src={flowers.right.src}
            alt=""
            width={flowers.right.width}
            height={flowers.right.height}
            aria-hidden
            className="pointer-events-none absolute right-0 bottom-0 -z-1"
          />
        </div>
      </div>
    </section>
  )
}
