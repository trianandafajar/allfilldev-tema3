import { cn } from "@/lib/utils"

import { faIcons, type FaIconName } from "./fa-icon-data"

type FaIconProps = {
  name: FaIconName
  className?: string
}

export function FaIcon({ name, className }: FaIconProps) {
  const icon = faIcons[name]

  return (
    <svg
      aria-hidden
      viewBox={`0 -448 ${icon.width} 512`}
      fill="currentColor"
      className={cn("inline-block h-[1em] w-auto shrink-0 align-[-0.125em]", className)}
    >
      <path d={icon.path} />
    </svg>
  )
}
