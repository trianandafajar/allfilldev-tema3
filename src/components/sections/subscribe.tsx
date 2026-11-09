import Image from "next/image"

import { NewsletterForm } from "@/components/shared/newsletter-form"

export type SubscribeProps = {
  eyebrow: string
  /** Kata bergaris di awal judul (teks transparan dengan garis tepi putih). */
  titleAccent: string
  titleTail: string
  form: { emailLabel: string; emailPlaceholder: string; submit: string }
  shape: { src: string; width: number; height: number }
}

/**
 * Pita langganan beranda (`.subscribe-wrapper-v02`): kartu hijau yang menjorok 137px ke footer,
 * sehingga footer harus menyediakan padding atas yang cukup.
 */
export function Subscribe({ eyebrow, titleAccent, titleTail, form, shape }: SubscribeProps) {
  return (
    <section id="langganan">
      <div className="container">
        <div className="relative z-9 -mb-[137px] overflow-hidden rounded-[20px] bg-primary px-2.5 py-10 lg:px-20 lg:py-[60px]">
          <div className="container">
            <div className="grid items-center justify-between gap-6 md:grid-cols-[5fr_7fr] lg:grid-cols-2">
              <div className="relative z-1">
                <h5 className="mb-2.5 font-script text-xl leading-9 font-normal text-white lg:mb-3">{eyebrow}</h5>
                <h2 className="text-[34px] font-normal text-white lg:text-[42px] xl:text-[50px]">
                  <span className="text-[34px] text-transparent [-webkit-text-stroke:1px_white] lg:text-[50px]">
                    {titleAccent}
                  </span>{" "}
                  {titleTail}
                </h2>
              </div>
              <NewsletterForm
                variant="pill"
                emailLabel={form.emailLabel}
                emailPlaceholder={form.emailPlaceholder}
                submit={form.submit}
              />
            </div>
          </div>
          <Image
            src={shape.src}
            alt=""
            width={shape.width}
            height={shape.height}
            aria-hidden
            className="pointer-events-none absolute top-0 right-0"
          />
        </div>
      </div>
    </section>
  )
}
