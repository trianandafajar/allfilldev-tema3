"use client"

import Link from "next/link"
import { useActionState, useEffect, useState } from "react"

import { placeOrder } from "@/app/pembayaran/actions"
import { CheckoutField, checkoutInputClass } from "@/components/shop/checkout-field"
import { clearCart, useCart } from "@/components/shop/cart-store"
import { EmptyCart } from "@/components/shop/empty-cart"
import { OrderConfirmation } from "@/components/shop/order-confirmation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { checkoutContent, shopContent } from "@/content/produk"
import { initialCheckoutState } from "@/lib/checkout"
import { formatRupiah } from "@/lib/format"

const content = checkoutContent
const sectionTitle = "mb-6 text-2xl text-forest xl:text-[28px]"

/** Formulir pembayaran: detail penagihan, alamat kirim opsional, ringkasan pesanan. Validasi final ada di server. */
export function CheckoutForm() {
  const { hydrated, items, total } = useCart()
  const [state, formAction, pending] = useActionState(placeOrder, initialCheckoutState)
  const [shipDifferent, setShipDifferent] = useState(false)

  useEffect(() => {
    if (state.status === "success") clearCart()
  }, [state])

  if (state.status === "success") return <OrderConfirmation order={state.order} />
  if (!hydrated) return <div aria-busy className="min-h-60" />
  if (items.length === 0) return <EmptyCart title={content.emptyTitle} actionLabel={content.emptyAction} />

  const errors = state.status === "error" ? state.errors : {}
  const values = state.status === "error" ? state.values : {}
  const cartPayload = JSON.stringify(items.map((item) => ({ slug: item.product.slug, quantity: item.quantity })))

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-12 xl:gap-10">
      <input type="hidden" name="cart" value={cartPayload} />

      <div className="grid content-start gap-10 lg:col-span-7">
        <section aria-labelledby="billing-title">
          <h2 id="billing-title" className={sectionTitle}>
            {content.billingTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.billingFields.slice(0, 3).map((field) => (
              <CheckoutField key={field.name} field={field} defaultValue={values[field.name]} error={errors[field.name]} />
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="checkout-country" className="mb-2 block font-heading text-base text-forest">
                {content.country.label}
              </label>
              <Input id="checkout-country" value={content.country.value} readOnly className={checkoutInputClass} />
            </div>
            {content.billingFields.slice(3).map((field) => (
              <CheckoutField key={field.name} field={field} defaultValue={values[field.name]} error={errors[field.name]} />
            ))}
          </div>
        </section>

        <section aria-labelledby="shipping-title">
          <h2 id="shipping-title" className={sectionTitle}>
            <label className="flex items-center gap-3 text-[inherit]">
              <input
                type="checkbox"
                name="ship_different"
                checked={shipDifferent}
                onChange={(event) => setShipDifferent(event.target.checked)}
                className="size-5 accent-primary"
              />
              {content.shippingToggle}
            </label>
          </h2>
          {shipDifferent ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {content.shippingFields.map((field) => (
                <CheckoutField
                  key={field.name}
                  field={field}
                  defaultValue={values[field.name]}
                  error={errors[field.name]}
                />
              ))}
            </div>
          ) : null}
        </section>

        <section aria-labelledby="notes-title">
          <h2 id="notes-title" className={sectionTitle}>
            {content.notes.title}
          </h2>
          <label htmlFor="checkout-notes" className="mb-2 block font-heading text-base text-forest">
            {content.notes.label}
          </label>
          <Textarea
            id="checkout-notes"
            name={content.notes.name}
            maxLength={content.notes.maxLength}
            placeholder={content.notes.placeholder}
            defaultValue={values[content.notes.name]}
            className={`${checkoutInputClass} min-h-28`}
          />
        </section>
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-[20px] border border-border p-5 xl:p-10">
          <h2 className={sectionTitle}>{content.summaryTitle}</h2>
          <table className="mb-6 w-full text-base">
            <thead>
              <tr className="border-b border-border text-start font-heading text-forest">
                <th scope="col" className="pb-3 text-start font-normal">
                  {content.productHeader}
                </th>
                <th scope="col" className="pb-3 text-end font-normal">
                  {content.subtotalHeader}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.product.slug} className="border-b border-border">
                  <td className="py-3 pe-3 text-forest">
                    {item.product.name} <span className="text-muted-foreground">× {item.quantity}</span>
                  </td>
                  <td className="py-3 text-end text-forest">{formatRupiah(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-heading text-xl">
                <th scope="row" className="pt-4 text-start font-normal text-forest">
                  {shopContent.cart.total}
                </th>
                <td className="pt-4 text-end text-primary">{formatRupiah(total)}</td>
              </tr>
            </tfoot>
          </table>

          <h3 className="mb-2 text-xl text-forest">{content.paymentTitle}</h3>
          <p className="mb-6 rounded-[20px] bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
            {content.paymentNote}
          </p>

          <div className="mb-6">
            <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
              <input
                type="checkbox"
                name="terms"
                required
                defaultChecked={values.terms === "on"}
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? "checkout-terms-error" : undefined}
                className="mt-1 size-5 shrink-0 accent-primary"
              />
              <span>
                {content.termsLead}{" "}
                <Link href={content.termsLink.href} target="_blank" className="text-primary underline">
                  {content.termsLink.label}
                </Link>{" "}
                <span aria-hidden className="text-destructive">*</span>
              </span>
            </label>
            {errors.terms ? (
              <p id="checkout-terms-error" className="mt-1.5 text-sm text-destructive">
                {errors.terms}
              </p>
            ) : null}
          </div>

          {errors.cart ? (
            <p role="alert" className="mb-4 text-sm text-destructive">
              {errors.cart}
            </p>
          ) : null}

          <Button type="submit" variant="brand" size="cta" disabled={pending} className="w-full">
            {pending ? content.submitting : content.submit}
          </Button>
        </div>
      </aside>
    </form>
  )
}
