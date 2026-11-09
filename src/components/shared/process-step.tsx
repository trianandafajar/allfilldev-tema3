import Image from "next/image"

export type ProcessStepData = {
  /** Satu baris per elemen; dipisah `<br>` seperti judul langkah di template. */
  titleLines: readonly string[]
  number: string
}

/** Kartu langkah kerja (`.working-proces-items01`): panel transparan di atas latar hijau tua dengan angka di sudut. */
export function ProcessStep({
  titleLines,
  number,
  shape,
}: ProcessStepData & { shape: { src: string; width: number; height: number } }) {
  return (
    <div className="group relative z-1 h-full overflow-hidden rounded-[10px] bg-white/5 px-3.5 pt-3.5 pb-4 xl:px-[30px] xl:pt-6 xl:pb-[30px]">
      <h3 className="font-heading text-2xl font-normal text-white xl:text-[30px]">
        {titleLines.map((line, index) => (
          <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </h3>
      <Image
        src={shape.src}
        alt=""
        width={shape.width}
        height={shape.height}
        aria-hidden
        className="absolute top-0 right-0 -z-1 h-auto w-[60px] transition-all duration-500 group-hover:scale-[1.08] xl:w-auto"
      />
      <span className="absolute top-2.5 right-4 font-heading text-lg leading-[30px] font-normal text-forest xl:top-[22px] xl:right-[26px] xl:text-xl">
        {number}
      </span>
    </div>
  )
}
