import Image from "next/image"
import { Share2 } from "lucide-react"

import { SocialLinks, type SocialLink } from "@/components/shared/social-links"

export type TeamMember = {
  name: string
  role: string
  image: { src: string; alt: string; width: number; height: number }
  socials: readonly SocialLink[]
}

/** Kartu anggota tim (`.team-itemsv01`): foto penuh, panel buram di bawah, tombol bagikan membuka ikon sosial. */
export function TeamCard({ name, role, image, socials, shareLabel }: TeamMember & { shareLabel: string }) {
  return (
    <article className="relative w-full overflow-hidden rounded-[10px] transition-all duration-400 hover:translate-y-[5px]">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-auto w-full"
      />
      <div className="absolute bottom-0 left-0 z-1 w-[93%] rounded-[0_10px_10px_10px] bg-forest/50 px-[19px] pt-3.5 pb-[19px] backdrop-blur-[15px] lg:pt-[18px] xl:px-[30px] xl:pt-6 xl:pb-[30px]">
        <h3 className="font-heading text-[22px] leading-10 font-normal text-white lg:text-[26px] xl:text-[30px]">
          {name}
        </h3>
        <span className="block text-sm leading-[30px] font-normal text-white lg:text-base">{role}</span>
        <div className="group/share absolute right-5 bottom-5 z-1">
          <button
            type="button"
            aria-label={`${shareLabel} ${name}`}
            className="flex size-[37px] items-center justify-center rounded-[20px] bg-accent text-forest"
          >
            <Share2 aria-hidden className="size-4" />
          </button>
          <div className="invisible absolute bottom-[50px] left-0 opacity-0 transition-all duration-400 [transform:rotateY(90deg)] group-focus-within/share:visible group-focus-within/share:opacity-100 group-focus-within/share:[transform:rotateY(0deg)] group-hover/share:visible group-hover/share:opacity-100 group-hover/share:[transform:rotateY(0deg)]">
            <SocialLinks links={socials} variant="team" />
          </div>
        </div>
      </div>
    </article>
  )
}
