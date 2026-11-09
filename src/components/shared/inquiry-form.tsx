"use client"

import { useId } from "react"

import { fieldClass, preventSubmit } from "@/components/shared/contact-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type InquiryFormProps = {
  nameLabel: string
  emailLabel: string
  phoneLabel: string
  regionLabel: string
  regions: readonly string[]
  messageLabel: string
  submit: string
}

const selectClass = `${fieldClass} w-full border bg-transparent outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`

/** Formulir pesan dengan nomor HP dan pilihan wilayah (kolom tunggal). Belum terhubung ke backend. */
export function InquiryForm({
  nameLabel,
  emailLabel,
  phoneLabel,
  regionLabel,
  regions,
  messageLabel,
  submit,
}: InquiryFormProps) {
  const id = useId()

  return (
    <form onSubmit={preventSubmit} className="grid gap-4 xl:gap-6">
      <label htmlFor={`${id}-name`} className="sr-only">
        {nameLabel}
      </label>
      <Input id={`${id}-name`} name="name" required autoComplete="name" placeholder={nameLabel} className={fieldClass} />
      <label htmlFor={`${id}-email`} className="sr-only">
        {emailLabel}
      </label>
      <Input
        id={`${id}-email`}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={emailLabel}
        className={fieldClass}
      />
      <label htmlFor={`${id}-phone`} className="sr-only">
        {phoneLabel}
      </label>
      <Input
        id={`${id}-phone`}
        type="tel"
        name="phone"
        autoComplete="tel"
        placeholder={phoneLabel}
        className={fieldClass}
      />
      <label htmlFor={`${id}-region`} className="sr-only">
        {regionLabel}
      </label>
      <select id={`${id}-region`} name="region" defaultValue="" className={selectClass}>
        <option value="" disabled>
          {regionLabel}
        </option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <label htmlFor={`${id}-message`} className="sr-only">
        {messageLabel}
      </label>
      <Textarea id={`${id}-message`} name="message" required placeholder={messageLabel} className={`${fieldClass} min-h-0`} />
      <div>
        <Button type="submit" variant="brand" size="cta">
          {submit}
        </Button>
      </div>
    </form>
  )
}
