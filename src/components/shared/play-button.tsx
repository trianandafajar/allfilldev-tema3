import { FaIcon } from "@/components/shared/fa-icon"
import { cn } from "@/lib/utils"

type PlayButtonProps = React.ComponentProps<"button"> & {
  label?: string
}

export function PlayButton({ label = "Putar video", className, ...props }: PlayButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "relative z-1 flex size-[50px] shrink-0 cursor-pointer items-center justify-center rounded-full text-lg before:absolute before:top-0 before:left-0 before:-z-1 before:size-[50px] before:animate-ripple before:rounded-full before:bg-inherit",
        className
      )}
      {...props}
    >
      <FaIcon name="solid-play" />
    </button>
  )
}
