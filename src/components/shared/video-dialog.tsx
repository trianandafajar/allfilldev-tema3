"use client"

import type { ReactNode } from "react"
import { XIcon } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type VideoDialogProps = {
  videoId: string
  title: string
  children: ReactNode
}

/** Pop-up video bergaya Magnific Popup: latar gelap, iframe 16:9 maks. 900px tanpa kartu, tombol tutup di atas kanan. */
export function VideoDialog({ videoId, title, children }: VideoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-overlay/80 backdrop-blur-none duration-300"
        className="aspect-video w-full max-w-[min(900px,calc(100%-2rem))] gap-0 rounded-none bg-black p-0 shadow-[0_0_8px_rgba(0,0,0,0.6)] ring-0 sm:max-w-[min(900px,calc(100%-2rem))]"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">Pemutar video YouTube</DialogDescription>
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <DialogClose
          aria-label="Tutup"
          className="absolute -top-10 right-0 flex size-10 cursor-pointer items-center justify-center text-white/65 transition-opacity hover:text-white"
        >
          <XIcon className="size-7" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
