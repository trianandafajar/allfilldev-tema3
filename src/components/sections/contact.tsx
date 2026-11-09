import Image from "next/image"

import { ContactForm, type ContactFormLabels } from "@/components/shared/contact-form"
import { NewsletterForm } from "@/components/shared/newsletter-form"
import { SectionTitle } from "@/components/shared/section-title"
import { cn } from "@/lib/utils"

type Decoration = { src: string; width: number; height: number }

export type ContactProps = {
  newsletter: {
    titleLead: string
    titleAccent: string
    titleTail: string
    emailLabel: string
    emailPlaceholder: string
    submit: string
  }
  form: ContactFormLabels & { eyebrow: string; title: string }
  getElement: Decoration
  sunElement: Decoration
  /** Kelas tambahan untuk `<section>`, mis. spasi bawah saat seksi tidak langsung diikuti footer. */
  className?: string
  /** Kelas tambahan untuk kartu form kontak, mis. padding vertikal lebih lega. */
  formClassName?: string
}

export function Contact({ newsletter, form, getElement, sunElement, className, formClassName }: ContactProps) {
  const { eyebrow, title, ...labels } = form

  return (
    <section
      id="kontak"
      className={cn("relative z-1 overflow-hidden bg-forest", className)}
    >
      <div className="container">
        <div className="container relative">
          <div className="grid items-end justify-between gap-6 md:grid-cols-2">
            <div className="xl:mb-12 xl:pb-6">
              <div className="relative hidden w-4/5 pb-[0] before:absolute before:-top-[2000px] before:-right-[100vw] before:bottom-0 before:-left-[100vw] before:-z-1 before:bg-white before:content-[''] md:block xl:w-auto">
                <Image src={getElement.src} alt="" width={getElement.width} height={getElement.height} aria-hidden />
              </div>
              <div className="relative z-1 rounded-b-[20px] px-[15px] pt-[60px] pb-[30px] before:absolute before:bottom-0 before:left-0 before:size-full before:rounded-b-[20px] before:bg-linear-[91deg_in_srgb,white_0.62%,transparent_99.47%] before:opacity-5 before:content-[''] sm:p-[30px] sm:pt-[70px] sm:pb-10 2xl:p-10 2xl:pt-6">
                <h2 className="mb-[25px] font-sans text-[32px] font-normal text-white sm:text-[42px] 2xl:mb-[30px] 2xl:text-[50px]">
                  {newsletter.titleLead}{" "}
                  <span className="font-sans text-[32px] text-transparent [-webkit-text-stroke:1px_white] sm:text-[42px] 2xl:text-[46px]">
                    {newsletter.titleAccent}
                  </span>{" "}
                  <br />
                  {newsletter.titleTail}
                </h2>
                <NewsletterForm
                  emailLabel={newsletter.emailLabel}
                  emailPlaceholder={newsletter.emailPlaceholder}
                  submit={newsletter.submit}
                />
              </div>
            </div>
            <div
              className={cn(
                "relative z-9 rounded-[20px] bg-white p-[15px] shadow-brand min-[501px]:p-[30px] xl:p-[60px]",
                formClassName
              )}
            >
              <SectionTitle
                align="left"
                eyebrow={eyebrow}
                title={title}
                className="mb-6 lg:mb-[30px] 2xl:mb-10"
              />
              <ContactForm {...labels} />
              <Image
                src={sunElement.src}
                alt=""
                width={sunElement.width}
                height={sunElement.height}
                aria-hidden
                className="absolute -top-[77px] -left-[77px] -z-1 hidden xl:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
