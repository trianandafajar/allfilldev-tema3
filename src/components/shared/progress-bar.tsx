"use client"

import { useEffect, useState } from "react"

type ProgressBarProps = {
  label: string
  value: number
}

const STEP_MS = 30

/** `.progress_bar_item` template: lebar naik 0 → nilai tiap 30 ms setelah halaman siap. */
export function ProgressBar({ label, value }: ProgressBarProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let step = 0
    const timer = setInterval(() => {
      if (step > value) {
        clearInterval(timer)
        return
      }
      setCurrent(step)
      step += 1
    }, STEP_MS)
    return () => clearInterval(timer)
  }, [value])

  return (
    <div>
      <div className="mb-[15px] flex items-center justify-between">
        <div className="font-heading text-xl font-normal text-forest">{label}</div>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={current}
        className="h-2 bg-muted"
      >
        <div className="flex h-2 overflow-hidden rounded-md bg-primary" style={{ width: `${current}%` }} />
      </div>
    </div>
  )
}
