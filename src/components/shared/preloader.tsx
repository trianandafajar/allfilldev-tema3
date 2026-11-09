"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type PreloaderProps = {
  name: string
  image: { src: string; width: number; height: number }
}

type Phase = "visible" | "fading" | "gone"

const HOLD_MS = 1000
const FADE_MS = 400

/**
 * `#preloader` template: lapisan penuh yang ditutup 1 detik setelah `window.load`
 * (jQuery `delay(1000).fadeOut()`). Tanpa JavaScript, animasi CSS menutupnya sendiri.
 */
export function Preloader({ name, image }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("visible")

  useEffect(() => {
    let hold: ReturnType<typeof setTimeout>
    let fade: ReturnType<typeof setTimeout>
    const start = () => {
      hold = setTimeout(() => {
        setPhase("fading")
        fade = setTimeout(() => setPhase("gone"), FADE_MS)
      }, HOLD_MS)
    }

    if (document.readyState === "complete") start()
    else window.addEventListener("load", start, { once: true })

    return () => {
      window.removeEventListener("load", start)
      clearTimeout(hold)
      clearTimeout(fade)
    }
  }, [])

  if (phase === "gone") return null

  return (
    <div
      id="preloader"
      aria-hidden
      className={cn(
        "fixed inset-0 z-[9999999] flex cursor-default items-center justify-center bg-preloader transition-opacity ease-linear motion-reduce:duration-0",
        phase === "fading" ? "opacity-0 duration-400" : "animate-preloader-safety"
      )}
    >
      <div className="grid gap-6">
        <span className="m-auto">
          <Image src={image.src} alt="" width={image.width} height={image.height} priority className="w-[120px]" />
        </span>
        <span className="block text-center text-[40px] font-bold text-primary">{name}</span>
      </div>
    </div>
  )
}
