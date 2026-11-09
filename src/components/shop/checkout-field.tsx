import { Input } from "@/components/ui/input"
import type { CheckoutField as CheckoutFieldDef } from "@/content/produk"
import { cn } from "@/lib/utils"

type CheckoutFieldProps = {
  field: CheckoutFieldDef
  defaultValue?: string
  error?: string
}

export const checkoutInputClass =
  "h-auto rounded-[20px] border-forest/20 px-3 py-3.5 text-base text-forest placeholder:text-muted-foreground md:text-base"

/** Satu kolom formulir checkout: label terlihat, input, dan pesan galat dari server. */
export function CheckoutField({ field, defaultValue, error }: CheckoutFieldProps) {
  const id = `checkout-${field.name}`
  const errorId = `${id}-error`

  return (
    <div className={cn(field.wide && "sm:col-span-2")}>
      <label htmlFor={id} className="mb-2 block font-heading text-base text-forest">
        {field.label}
        {field.required ? <span aria-hidden className="text-destructive"> *</span> : null}
      </label>
      <Input
        id={id}
        name={field.name}
        type={field.type ?? "text"}
        required={field.required}
        maxLength={field.maxLength}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={checkoutInputClass}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
