"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type ContactFormLabels = {
  nameLabel: string
  emailLabel: string
  subjectLabel: string
  messageLabel: string
  submit: string
}

export const fieldClass =
  "h-auto rounded-[20px] border-forest/20 px-3 py-4 text-base text-muted-foreground placeholder:text-muted-foreground md:text-base"

// Formulir belum terhubung ke backend; kirim data lewat server action atau API saat sudah ada tujuannya.
export function preventSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

export function ContactForm({ nameLabel, emailLabel, subjectLabel, messageLabel, submit }: ContactFormLabels) {
  return (
    <form onSubmit={preventSubmit} className="grid gap-4 xl:gap-6 lg:grid-cols-2">
      <label htmlFor="contact-name" className="sr-only">
        {nameLabel}
      </label>
      <Input
        id="contact-name"
        name="name"
        required
        autoComplete="name"
        placeholder={nameLabel}
        className={fieldClass}
      />
      <label htmlFor="contact-email" className="sr-only">
        {emailLabel}
      </label>
      <Input
        id="contact-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={emailLabel}
        className={fieldClass}
      />
      <label htmlFor="contact-subject" className="sr-only">
        {subjectLabel}
      </label>
      <Input
        id="contact-subject"
        name="subject"
        placeholder={subjectLabel}
        className={`${fieldClass} lg:col-span-2`}
      />
      <label htmlFor="contact-message" className="sr-only">
        {messageLabel}
      </label>
      <Textarea
        id="contact-message"
        name="message"
        required
        placeholder={messageLabel}
        className={`${fieldClass} min-h-0 lg:col-span-2`}
      />
      <div>
        <Button type="submit" variant="brand" size="cta">
          {submit}
        </Button>
      </div>
    </form>
  )
}
