import type { ReactNode } from "react"

import { Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"

type SectionTitleProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  tone?: "light" | "dark"
  /** `text-uppercase` pada eyebrow (hanya sebagian judul di template). */
  uppercase?: boolean
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  uppercase = false,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("relative z-1", align === "center" && "text-center", className)}>
      <Reveal animation="left" delay={0.4}>
        <h5
          className={cn(
            "mb-2.5 font-script text-xl leading-8 font-normal text-primary",
            uppercase && "uppercase",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </h5>
      </Reveal>
      <Reveal animation="down" delay={0.3}>
        <h2 className={cn("font-normal", tone === "dark" ? "text-white" : "text-forest", titleClassName)}>
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal animation="up" delay={0.4}>
          <p className={descriptionClassName}>{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
