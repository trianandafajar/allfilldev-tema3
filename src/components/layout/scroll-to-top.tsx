"use client"

import { useSyncExternalStore } from "react"

import { FaIcon } from "@/components/shared/fa-icon"
import { cn } from "@/lib/utils"

const SHOW_AFTER = 600

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

const getSnapshot = () => window.scrollY >= SHOW_AFTER
const getServerSnapshot = () => false

export function ScrollToTop() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      tabIndex={active ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-[30px] z-99 hidden size-10 cursor-pointer items-center justify-center bg-primary px-3 text-center text-xs leading-[120%] text-white transition-all duration-1000 md:flex",
        active ? "bottom-[30px] translate-y-0" : "bottom-0 translate-y-full"
      )}
    >
      <FaIcon name="solid-angles-up" />
    </button>
  )
}
