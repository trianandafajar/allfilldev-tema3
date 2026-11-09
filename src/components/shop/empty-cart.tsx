import Link from "next/link"

import { Button } from "@/components/ui/button"

type EmptyCartProps = { title: string; actionLabel: string; actionHref?: string }

/** Keadaan kosong untuk keranjang dan pembayaran. */
export function EmptyCart({ title, actionLabel, actionHref = "/produk" }: EmptyCartProps) {
  return (
    <div className="rounded-[20px] border border-border px-5 py-16 text-center">
      <p className="mb-8 font-heading text-2xl text-forest">{title}</p>
      <Button asChild variant="brand" size="cta">
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  )
}
