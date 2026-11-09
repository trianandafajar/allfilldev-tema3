"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const animations = {
  up: "animate-fade-in-up",
  down: "animate-fade-in-down",
  left: "animate-fade-in-left",
  right: "animate-fade-in-right",
} as const

type RevealProps = {
  /** Satu elemen DOM; kelas animasi ditambahkan langsung ke elemen itu (seperti `.wow` di template). */
  children: ReactNode
  animation?: keyof typeof animations
  /** Detik, setara `data-wow-delay`. */
  delay?: number
}

type Phase = "idle" | "hidden" | "shown"

/**
 * Setara WOW.js: elemen disembunyikan sampai masuk viewport, lalu memainkan animasi fade 1 detik.
 * Konten tetap terlihat tanpa JavaScript dan untuk elemen yang sudah ada di layar saat dimuat.
 */
export function Reveal({ children, animation = "up", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>("idle")

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setPhase("shown")
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setPhase("shown")
      observer.disconnect()
    })

    setPhase("hidden")
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Slot.Root
      ref={ref}
      style={phase === "shown" && delay ? { animationDelay: `${delay}s` } : undefined}
      className={cn(phase === "hidden" && "invisible", phase === "shown" && animations[animation])}
    >
      {children}
    </Slot.Root>
  )
}
