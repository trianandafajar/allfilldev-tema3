import { Reveal } from "@/components/shared/reveal"
import { SectionTitle } from "@/components/shared/section-title"
import { TeamCard, type TeamMember } from "@/components/shared/team-card"

export type TeamProps = {
  eyebrow: string
  title: string
  shareLabel: string
  members: readonly TeamMember[]
}

const delays = [0.3, 0.5, 0.7] as const

/** Seksi tim beranda (`.team-section`): tiga kartu anggota, dua kolom di tablet. */
export function Team({ eyebrow, title, shareLabel, members }: TeamProps) {
  return (
    <section id="tim" className="section-padding overflow-hidden bg-white">
      <div className="container">
        <div className="title-col-6">
          <SectionTitle uppercase eyebrow={eyebrow} title={title} className="mb-10 lg:mb-[50px] 2xl:mb-[60px]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {members.map((member, index) => (
            <Reveal key={member.name} animation="up" delay={delays[index % delays.length]}>
              <div>
                <TeamCard {...member} shareLabel={shareLabel} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
