import Link from "next/link"

import { Reveal } from "@/components/shared/reveal"
import { formatDate } from "@/lib/format"

export type LegalSection = {
  id: string
  title: string
  paragraphs: readonly string[]
  items?: readonly string[]
}

export type LegalDocumentProps = {
  /** Tanggal ISO (`2026-10-31`). */
  updated: string
  updatedLabel: string
  intro: string
  tocTitle: string
  sections: readonly LegalSection[]
  help: { title: string; text: string; email: string; cta: { label: string; href: string } }
}

/** Dokumen hukum (syarat, privasi): daftar isi di kiri, bagian bernomor di kanan. */
export function LegalDocument({ updated, updatedLabel, intro, tocTitle, sections, help }: LegalDocumentProps) {
  return (
    <section className="section-padding overflow-x-clip bg-white">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12 xl:gap-6">
          <aside className="lg:col-span-4">
            <Reveal animation="up" delay={0.3}>
              <nav
                aria-label={tocTitle}
                className="rounded-[20px] bg-secondary p-5 sm:p-[30px] lg:sticky lg:top-28"
              >
                <h3 className="mb-4 text-2xl font-normal text-forest">{tocTitle}</h3>
                <ol className="grid gap-2.5">
                  {sections.map((section, index) => (
                    <li key={section.id} className="flex gap-2.5 text-sm leading-[1.5]">
                      <span className="font-semibold text-primary">{index + 1}.</span>
                      <a href={`#${section.id}`} className="text-muted-foreground hover:text-primary">
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          </aside>
          <div className="lg:col-span-8 xl:pl-2">
            <Reveal animation="up" delay={0.3}>
              <p className="mb-[26px] text-sm text-muted-foreground">
                {updatedLabel}: <time dateTime={updated}>{formatDate(updated)}</time>
              </p>
            </Reveal>
            <Reveal animation="up" delay={0.4}>
              <p className="mb-10 text-muted-foreground">{intro}</p>
            </Reveal>
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="mb-10 scroll-mt-28">
                <h2 className="mb-4 text-2xl leading-[1.3] font-normal text-forest xl:text-[30px]">
                  {index + 1}. {section.title}
                </h2>
                {section.paragraphs.map((text) => (
                  <p key={text} className="mb-4 text-muted-foreground">
                    {text}
                  </p>
                ))}
                {section.items ? (
                  <ul className="mb-4 grid list-disc gap-2 pl-6 text-muted-foreground marker:text-primary">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <div className="rounded-[20px] bg-secondary p-5 sm:p-[30px]">
              <h3 className="mb-2.5 text-2xl font-normal text-forest">{help.title}</h3>
              <p className="mb-5 text-muted-foreground">
                {help.text}{" "}
                <a href={`mailto:${help.email}`} className="text-primary hover:underline">
                  {help.email}
                </a>
                .
              </p>
              <Link href={help.cta.href} className="font-heading text-lg text-forest hover:text-primary">
                {help.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
