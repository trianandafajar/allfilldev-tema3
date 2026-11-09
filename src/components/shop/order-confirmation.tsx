import Link from "next/link"

import { Button } from "@/components/ui/button"
import { checkoutContent } from "@/content/produk"
import type { Order } from "@/lib/checkout"
import { formatRupiah } from "@/lib/format"

const { confirmation } = checkoutContent

/** Ringkasan pesanan yang sudah divalidasi server. Pesanan tidak disimpan, jadi ini satu-satunya tempat nomornya tampil. */
export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="mx-auto max-w-3xl rounded-[20px] border border-border p-5 xl:p-10" role="status">
      <h2 className="mb-6 text-[28px] text-forest xl:text-[32px]">{confirmation.title}</h2>
      <dl className="mb-8 grid gap-3 text-base sm:grid-cols-3">
        <div>
          <dt className="text-sm text-muted-foreground">{confirmation.numberLabel}</dt>
          <dd className="font-heading text-lg text-forest">{order.number}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">{confirmation.emailLabel}</dt>
          <dd className="break-all text-forest">{order.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">{confirmation.totalLabel}</dt>
          <dd className="font-heading text-lg text-primary">{formatRupiah(order.total)}</dd>
        </div>
      </dl>
      <h3 className="mb-3 text-xl text-forest">{confirmation.itemsTitle}</h3>
      <ul className="mb-8 border-t border-border">
        {order.lines.map((line) => (
          <li key={line.slug} className="flex justify-between gap-4 border-b border-border py-3 text-base">
            <span className="text-forest">
              {line.name} <span className="text-muted-foreground">× {line.quantity}</span>
            </span>
            <span className="text-forest">{formatRupiah(line.subtotal)}</span>
          </li>
        ))}
      </ul>
      <p className="mb-8 rounded-[20px] bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
        {confirmation.notice}
      </p>
      <Button asChild variant="brand" size="cta">
        <Link href="/produk">{confirmation.action}</Link>
      </Button>
    </div>
  )
}
