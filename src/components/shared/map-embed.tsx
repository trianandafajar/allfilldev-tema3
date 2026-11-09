type MapEmbedProps = {
  /** Alamat atau nama tempat yang dicari di Google Maps. */
  query: string
  title: string
  /** Level zoom Google Maps (mis. 4 untuk satu negara); kosong = zoom otomatis dari hasil pencarian. */
  zoom?: number
}

export function MapEmbed({ query, title, zoom }: MapEmbedProps) {
  const zoomParam = zoom ? `&z=${zoom}` : ""

  return (
    <section>
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}${zoomParam}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-[300px] w-full border-0 md:h-[400px] xl:h-[500px]"
      />
    </section>
  )
}
