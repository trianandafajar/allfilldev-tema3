import { FaqAccordion, type FaqEntry } from "@/components/shared/faq-accordion"
import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"

export type FaqGroup = { title: string; items: readonly FaqEntry[] }

export type FaqListProps = {
  eyebrow: string
  title: string
  description: string
  groups: readonly FaqGroup[]
}

/** Halaman FAQ: intro, lalu pertanyaan dikelompokkan per topik dengan `FaqAccordion`. */
export function FaqList({ eyebrow, title, description, groups }: FaqListProps) {
  return (
    <section className="section-padding overflow-hidden bg-secondary">
      <div className="container">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
          descriptionClassName="mt-4"
          className="mx-auto mb-10 max-w-[760px] xl:mb-[60px]"
        />
        <div className="mx-auto grid max-w-[900px] gap-10 xl:gap-[60px]">
          {groups.map((group) => (
            <Reveal key={group.title} animation="up" delay={0.3}>
              <div>
                <h3 className="mb-5 text-2xl font-normal text-forest xl:mb-6 xl:text-[30px]">{group.title}</h3>
                <FaqAccordion items={group.items} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
