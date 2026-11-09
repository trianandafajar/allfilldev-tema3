import Image from "next/image"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type CoverImageProps = Omit<ComponentProps<typeof Image>, "width" | "height" | "alt"> & {
  alt: string
  width: number
  height: number
}

/** Foto yang dipotong (`object-cover`) ke rasio `width:height` supaya slot gambar seragam walau rasio aslinya berbeda. */
export function CoverImage({ alt, width, height, className, style, ...props }: CoverImageProps) {
  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      style={{ aspectRatio: `${width} / ${height}`, ...style }}
      className={cn("w-full object-cover", className)}
      {...props}
    />
  )
}
