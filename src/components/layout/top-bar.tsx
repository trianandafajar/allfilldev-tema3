import { FaIcon } from "@/components/shared/fa-icon"

export type TopBarProps = {
  address: string
  phone: { label: string; href: string }
  email: { label: string; href: string }
}

const itemClass = "text-sm font-medium text-forest"

/** Strip info di atas header (`.header-top-section.style-v01`): alamat, telepon, email. Hanya tampil mulai `lg`. */
export function TopBar({ address, phone, email }: TopBarProps) {
  return (
    <div className="relative z-9 hidden bg-accent lg:block">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          <p className={itemClass}>
            <FaIcon name="solid-location-dot" className="me-[5px]" />
            {address}
          </p>
          <ul className="flex items-center gap-10">
            <li>
              <a href={phone.href} className={itemClass}>
                <FaIcon name="solid-phone" className="me-[5px]" />
                {phone.label}
              </a>
            </li>
            <li>
              <a href={email.href} className={itemClass}>
                <FaIcon name="solid-envelope" className="me-[5px]" />
                {email.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
