import { ProjectCarousel, type ProjectSlide } from "@/components/shared/project-carousel"
import { SectionTitle } from "@/components/shared/section-title"

export type ProjectsProps = {
  eyebrow: string
  /** Satu baris per elemen; dipisah `<br>` seperti judul di template. */
  titleLines: readonly string[]
  href: string
  items: readonly ProjectSlide[]
  prevLabel: string
  nextLabel: string
  viewLabel: string
}

/** Seksi proyek terbaru beranda (`.recent-project-section`): carousel foto proyek yang menaut ke galeri. */
export function Projects({ eyebrow, titleLines, href, items, prevLabel, nextLabel, viewLabel }: ProjectsProps) {
  return (
    <section id="proyek" className="section-padding overflow-hidden bg-white">
      <ProjectCarousel
        href={href}
        items={items}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        viewLabel={viewLabel}
        header={
          <SectionTitle
            align="left"
            uppercase
            eyebrow={eyebrow}
            title={titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          />
        }
      />
    </section>
  )
}
