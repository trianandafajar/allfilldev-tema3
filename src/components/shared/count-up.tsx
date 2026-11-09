"use client"

import { useEffect, useRef } from "react"

type CountUpProps = {
  value: number
  suffix?: string
  /** Milidetik; counterUp template memakai `time: 4000`. */
  duration?: number
  className?: string
}

const formatter = new Intl.NumberFormat("id-ID")

/** Setara counterUp (`delay: 15, time: 4000`): hitung linear dari 0 begitu elemen masuk viewport. */
export function CountUp({ value, suffix = "", duration = 4000, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        node.textContent = formatter.format(Math.round(value * progress))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <span className={className}>
      <span ref={ref}>{formatter.format(value)}</span>
      {suffix}
    </span>
  )
}
