import { formatRupiah } from "@/lib/format"

type PriceProps = {
  price: number
  salePrice?: number
  className?: string
}

/** Harga produk; bila ada harga diskon, harga normal dicoret di samping harga diskon. */
export function Price({ price, salePrice, className }: PriceProps) {
  if (salePrice === undefined) return <span className={className}>{formatRupiah(price)}</span>

  return (
    <span className={className}>
      <del className="me-2 text-[0.7em] text-muted-foreground">
        <span className="sr-only">Harga normal </span>
        {formatRupiah(price)}
      </del>
      <ins className="no-underline">
        <span className="sr-only">Harga diskon </span>
        {formatRupiah(salePrice)}
      </ins>
    </span>
  )
}
