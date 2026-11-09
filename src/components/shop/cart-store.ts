"use client"

import { useMemo, useSyncExternalStore } from "react"

import { effectivePrice, getProduct, type Product } from "@/content/produk"
import { MAX_QUANTITY } from "@/lib/checkout"

const STORAGE_KEY = "farmhub-keranjang"

export type CartLine = { slug: string; quantity: number }
export type CartItem = { product: Product; quantity: number; unitPrice: number; subtotal: number }

const EMPTY: readonly CartLine[] = []
const listeners = new Set<() => void>()

let lines: readonly CartLine[] = EMPTY
let loaded = false

function parse(raw: string | null): readonly CartLine[] {
  if (!raw) return EMPTY
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return EMPTY
    return data.flatMap((entry): CartLine[] => {
      const { slug, quantity } = (entry ?? {}) as Record<string, unknown>
      if (typeof slug !== "string" || !getProduct(slug)) return []
      if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) return []
      return [{ slug, quantity: Math.min(quantity, MAX_QUANTITY) }]
    })
  } catch {
    return EMPTY
  }
}

function load() {
  if (loaded) return
  loaded = true
  try {
    lines = parse(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    lines = EMPTY
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

/** Sumber kebenaran adalah memori; localStorage hanya cadangan, jadi keranjang tetap bekerja bila storage diblokir. */
function commit(next: readonly CartLine[]) {
  load()
  lines = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage diblokir atau penuh: keranjang hanya bertahan selama tab terbuka.
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      loaded = false
      emit()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

const getSnapshot = () => {
  load()
  return lines
}
const getServerSnapshot = () => EMPTY

const noopSubscribe = () => () => {}

const clamp = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity) || 1))

export function addToCart(slug: string, quantity = 1) {
  if (!getProduct(slug)) return
  load()
  const existing = lines.find((line) => line.slug === slug)
  commit(
    existing
      ? lines.map((line) => (line.slug === slug ? { slug, quantity: clamp(line.quantity + quantity) } : line))
      : [...lines, { slug, quantity: clamp(quantity) }]
  )
}

export function setCartQuantity(slug: string, quantity: number) {
  load()
  commit(lines.map((line) => (line.slug === slug ? { slug, quantity: clamp(quantity) } : line)))
}

export function removeFromCart(slug: string) {
  load()
  commit(lines.filter((line) => line.slug !== slug))
}

export function clearCart() {
  commit(EMPTY)
}

/**
 * Isi keranjang di sisi klien. `hydrated` false saat render server dan hidrasi, supaya UI tidak
 * berkedip dari "kosong" ke isi yang sebenarnya.
 */
export function useCart() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false)

  return useMemo(() => {
    const items = stored.flatMap((line): CartItem[] => {
      const product = getProduct(line.slug)
      if (!product) return []
      const unitPrice = effectivePrice(product)
      return [{ product, quantity: line.quantity, unitPrice, subtotal: unitPrice * line.quantity }]
    })
    return {
      hydrated,
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.subtotal, 0),
    }
  }, [stored, hydrated])
}
