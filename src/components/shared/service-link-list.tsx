import Link from "next/link"

export type ServiceLink = { title: string; href: string }

/** Daftar layanan di sidebar detail layanan: tiap baris kartu putih bertepi bulat dengan judul yang menaut. */
export function ServiceLinkList({ items, label }: { items: readonly ServiceLink[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="grid gap-2 lg:gap-4 2xl:gap-6">
        {items.map((item) => (
          <li key={item.href} className="rounded-[20px] bg-white shadow-soft">
            <Link
              href={item.href}
              className="block rounded-[20px] p-[15px] font-heading text-[17px] leading-[1.2] font-normal text-forest transition-colors duration-400 hover:text-primary xl:px-[26px] xl:py-5 xl:text-xl"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
