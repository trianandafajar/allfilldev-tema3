import { FaIcon } from "@/components/shared/fa-icon"
import type { FaIconName } from "@/components/shared/fa-icon-data"
import { cn } from "@/lib/utils"

type ButtonLabelProps = {
  children: React.ReactNode
  iconClassName?: string
  /** Ikon di belakang teks; bawaan panah kanan, beranda 2 memakai `solid-angle-right` pada tombol hero. */
  icon?: FaIconName
}

/** Isi tombol `.cmn-btn`: teks, spasi, lalu ikon panah dengan `margin-left: 5px` (seperti `<i>` di template). */
export function ButtonLabel({ children, iconClassName, icon = "solid-arrow-right" }: ButtonLabelProps) {
  return (
    <>
      {children}{" "}
      <FaIcon name={icon} className={cn("ml-[5px] transition-all duration-400", iconClassName)} />
    </>
  )
}
