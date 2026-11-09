import { checkoutContent, effectivePrice, getProduct, type CheckoutField } from "@/content/produk"

export const MAX_QUANTITY = 99
const MAX_LINES = 50

export type OrderLine = { slug: string; name: string; quantity: number; unitPrice: number; subtotal: number }

export type Order = {
  number: string
  email: string
  total: number
  lines: OrderLine[]
}

export type CheckoutState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string>; values: Record<string, string> }
  | { status: "success"; order: Order }

export const initialCheckoutState: CheckoutState = { status: "idle" }

const { errors: messages, billingFields, shippingFields, notes } = checkoutContent

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^\+?[\d\s().-]{8,20}$/

/** Baca dan validasi isi keranjang kiriman klien. Hanya slug dan jumlah yang dipercaya; nama dan harga diambil dari katalog. */
export function resolveCart(raw: unknown): OrderLine[] | null {
  if (typeof raw !== "string" || raw.length > 4000) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > MAX_LINES) return null

  const quantities = new Map<string, number>()
  for (const entry of parsed) {
    if (typeof entry !== "object" || entry === null) return null
    const { slug, quantity } = entry as Record<string, unknown>
    if (typeof slug !== "string" || !getProduct(slug)) return null
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) return null
    quantities.set(slug, Math.min(MAX_QUANTITY, (quantities.get(slug) ?? 0) + quantity))
  }

  return [...quantities].map(([slug, quantity]) => {
    const product = getProduct(slug)!
    const unitPrice = effectivePrice(product)
    return { slug, name: product.name, quantity, unitPrice, subtotal: unitPrice * quantity }
  })
}

function readText(formData: FormData, name: string, maxLength: number) {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function validateField(field: CheckoutField, value: string): string | null {
  if (field.required && !value) return messages.required
  if (!value) return null
  if (field.type === "email" && !emailPattern.test(value)) return messages.email
  if (field.type === "tel" && !phonePattern.test(value)) return messages.phone
  if (field.name.endsWith("_postcode") && !/^\d{5}$/.test(value)) return messages.postcode
  return null
}

function orderNumber(now: Date) {
  const day = now.toISOString().slice(0, 10).replaceAll("-", "")
  const suffix = Math.floor(Math.random() * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
  return `FH-${day}-${suffix}`
}

/** Validasi seluruh formulir checkout di server dan hitung total dari katalog. */
export function validateCheckout(formData: FormData, now: Date): CheckoutState {
  const values: Record<string, string> = {}
  const errors: Record<string, string> = {}
  const shipDifferent = formData.get("ship_different") === "on"

  const groups: readonly (readonly CheckoutField[])[] = shipDifferent
    ? [billingFields, shippingFields]
    : [billingFields]
  for (const fields of groups) {
    for (const field of fields) {
      const value = readText(formData, field.name, field.maxLength)
      values[field.name] = value
      const error = validateField(field, value)
      if (error) errors[field.name] = error
    }
  }
  values[notes.name] = readText(formData, notes.name, notes.maxLength)
  if (shipDifferent) values.ship_different = "on"

  if (formData.get("terms") === "on") values.terms = "on"
  else errors.terms = messages.terms

  const lines = resolveCart(formData.get("cart"))
  if (!lines) errors.cart = messages.cart

  if (!lines || Object.keys(errors).length > 0) {
    return { status: "error", errors, values }
  }

  return {
    status: "success",
    order: {
      number: orderNumber(now),
      email: values.billing_email,
      total: lines.reduce((sum, line) => sum + line.subtotal, 0),
      lines,
    },
  }
}
