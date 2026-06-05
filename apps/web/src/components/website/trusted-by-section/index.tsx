import Image from 'next/image'

const TRUST_LOGOS = [
  {
    src: 'https://www.figma.com/api/mcp/asset/d44d08c0-9a5a-446f-83cc-c9ec434d9663',
    alt: 'Trusted partner 1',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/c6f98e11-728c-46a3-9e7f-a07a3eab4294',
    alt: 'Sanlam',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/e006e7af-9087-49b3-b6d3-2f438e8626a6',
    alt: 'EpayRetail',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/a0b6363f-4c6e-4cf2-8285-d11cac93317e',
    alt: 'Trusted partner 4',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/6e7d900a-41f9-4784-8901-7b9aa7d32d1f',
    alt: 'Trusted partner 5',
  },
]

export function TrustedBySection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <h2 className="font-serif text-[32px] lg:text-[40px] font-bold text-black/80 mb-8 lg:mb-12">
          Trusted by
        </h2>

        <div className="flex flex-wrap items-center gap-6 lg:gap-12">
          {TRUST_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="relative h-[72px] w-[160px] lg:h-[108px] lg:w-[227px] rounded-[10px] overflow-hidden shrink-0"
            >
              <Image src={logo.src} alt={logo.alt} fill sizes="227px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
