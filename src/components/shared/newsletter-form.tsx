"use client"

import { ButtonLabel } from "@/components/shared/button-label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type NewsletterFormProps = {
  emailLabel: string
  emailPlaceholder: string
  submit: string
  /** `default`: sudut 20px dan tombol hijau. `pill`: sudut penuh dan tombol putih tanpa panah (`.subscribe-form02`). */
  variant?: "default" | "pill"
}

// Formulir belum terhubung ke backend; kirim data lewat server action atau API saat sudah ada tujuannya.
function preventSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

export function NewsletterForm({ emailLabel, emailPlaceholder, submit, variant = "default" }: NewsletterFormProps) {
  const pill = variant === "pill"

  return (
    <form
      onSubmit={preventSubmit}
      className={cn(
        "relative z-1 flex flex-wrap items-center gap-[11px]",
        pill ? "sm:flex-nowrap" : "xl:flex-nowrap"
      )}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {emailLabel}
      </label>
      <Input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={emailPlaceholder}
        className={cn(
          "h-[60px] border-white/20 px-5 py-2.5 text-sm text-white placeholder:text-white md:text-sm",
          pill ? "rounded-full" : "rounded-[20px]"
        )}
      />
      <Button
        type="submit"
        variant="brand"
        size="cta"
        className={cn(
          "h-[60px] px-4",
          pill ? "min-w-40 rounded-full bg-white text-forest" : "min-w-[178px]"
        )}
      >
        {pill ? submit : <ButtonLabel>{submit}</ButtonLabel>}
      </Button>
    </form>
  )
}
