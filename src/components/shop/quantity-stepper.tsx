"use client"

import { Minus, Plus } from "lucide-react"

import { MAX_QUANTITY } from "@/lib/checkout"
import { cn } from "@/lib/utils"

type QuantityStepperProps = {
  value: number
  onChange: (value: number) => void
  label: string
  className?: string
}

const stepButton =
  "flex size-8 items-center justify-center rounded-full text-forest transition-colors hover:text-primary disabled:opacity-40 disabled:hover:text-forest"

/** Penghitung jumlah (`.counter` template): tombol kurang/tambah dan kolom angka yang bisa diketik. */
export function QuantityStepper({ value, onChange, label, className }: QuantityStepperProps) {
  const clamp = (next: number) => Math.min(MAX_QUANTITY, Math.max(1, next))

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex w-[130px] items-center justify-between rounded-full border-2 border-border px-2 py-px", className)}
    >
      <button type="button" aria-label="Kurangi jumlah" disabled={value <= 1} onClick={() => onChange(clamp(value - 1))} className={stepButton}>
        <Minus aria-hidden className="size-4" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={value}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, "")
          if (digits) onChange(clamp(Number(digits)))
        }}
        className="h-10 w-10 appearance-none border-0 bg-transparent text-center text-sm text-muted-foreground outline-none"
      />
      <button type="button" aria-label="Tambah jumlah" disabled={value >= MAX_QUANTITY} onClick={() => onChange(clamp(value + 1))} className={stepButton}>
        <Plus aria-hidden className="size-4" />
      </button>
    </div>
  )
}
