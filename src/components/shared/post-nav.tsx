import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

type PostNavLink = { title: string; href: string }

const arrow =
  "flex size-[50px] shrink-0 items-center justify-center border border-muted text-forest transition-all duration-400 hover:border-primary hover:bg-primary hover:text-white"

/** Navigasi artikel sebelumnya dan berikutnya (`.component-arrows`); sisi yang tidak ada dikosongkan. */
export function PostNav({ label, prev, next }: { label: string; prev?: PostNavLink; next?: PostNavLink }) {
  return (
    <nav
      aria-label={label}
      className="flex items-center justify-between gap-4 rounded-[20px] border border-muted bg-white p-5 sm:p-[30px]"
    >
      {prev ? (
        <Link href={prev.href} className="group flex items-center gap-3.5 sm:gap-5">
          <span className={arrow}>
            <ArrowLeft aria-hidden className="size-4" />
          </span>
          <span className="line-clamp-2 font-heading text-base text-forest group-hover:text-primary sm:text-xl">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      <span aria-hidden className="hidden h-[50px] w-px bg-primary sm:block" />
      {next ? (
        <Link href={next.href} className="group flex items-center gap-3.5 text-right sm:gap-5">
          <span className="line-clamp-2 font-heading text-base text-forest group-hover:text-primary sm:text-xl">
            {next.title}
          </span>
          <span className={arrow}>
            <ArrowRight aria-hidden className="size-4" />
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
