"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react"

const STICKY_AFTER = 150

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

const getSnapshot = () => window.scrollY > STICKY_AFTER
const getServerSnapshot = () => false

/**
 * Header putih di alur halaman (di bawah topbar); setelah scroll lebih dari 150px menjadi
 * `fixed` di puncak layar dengan animasi fadeInDown (setara `.header-2` + `.sticky` template).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const sticky = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  // Saat `fixed`, header keluar dari alur halaman. Ruangnya ditahan agar konten di bawahnya tidak melompat.
  useEffect(() => {
    const header = wrapperRef.current?.firstElementChild
    if (!(header instanceof HTMLElement)) return
    const observer = new ResizeObserver(() => setHeight(header.offsetHeight))
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} style={{ minHeight: height }}>
      <header
        id="header-sticky"
        data-sticky={sticky}
        className="bg-background py-4 data-[sticky=true]:fixed data-[sticky=true]:top-0 data-[sticky=true]:left-0 data-[sticky=true]:z-100 data-[sticky=true]:w-full data-[sticky=true]:animate-fade-in-down-fast data-[sticky=true]:transition-all data-[sticky=true]:duration-900"
      >
        {children}
      </header>
    </div>
  )
}
