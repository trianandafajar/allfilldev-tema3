import Image from "next/image"

import { PlayButton } from "@/components/shared/play-button"
import { VideoDialog } from "@/components/shared/video-dialog"

export type VideoBannerProps = {
  image: { src: string; alt: string }
  video: { label: string; title: string; videoId: string }
}

/** Banner video beranda (`.feature-videov02`): foto penuh dengan tombol putar aksen di tengah; bagian atasnya tertutup kartu angka. */
export function VideoBanner({ image, video }: VideoBannerProps) {
  return (
    <section className="relative isolate overflow-hidden pt-[270px] pb-[170px]">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-1 object-cover" />
      <div className="container">
        <div className="flex w-full items-center justify-center">
          <VideoDialog videoId={video.videoId} title={video.title}>
            <PlayButton
              label={video.label}
              className="size-[60px] bg-accent text-xl text-forest before:size-[60px] md:size-[100px] md:text-[28px] md:before:size-[100px]"
            />
          </VideoDialog>
        </div>
      </div>
    </section>
  )
}
