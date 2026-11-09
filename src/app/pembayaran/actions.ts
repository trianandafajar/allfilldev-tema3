"use server"

import { validateCheckout, type CheckoutState } from "@/lib/checkout"

/**
 * Validasi pesanan di server: input, isi keranjang, dan total dihitung ulang dari katalog.
 * Belum ada penyimpanan pesanan maupun gateway pembayaran (lihat docs/toko.md).
 */
export async function placeOrder(_previous: CheckoutState, formData: FormData): Promise<CheckoutState> {
  return validateCheckout(formData, new Date())
}
