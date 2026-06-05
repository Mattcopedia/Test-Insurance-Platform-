import { Button } from '@wrapa/ui'
import Image from 'next/image'
import Link from 'next/link'

const HERO_IMAGE =
  'https://res.cloudinary.com/dxpnod1bu/image/upload/v1780681756/WhatsApp_Image_2026-06-05_at_18.44.26_jucb7u.jpg'

export function HeroSection() {
  return (
    <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          {/* Left — copy */}
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.3] text-black/80 mb-6 lg:mb-8">
              <span className="text-[#990505]">WRAPA</span>
              {' — Your Insurance Market Place'}
            </h1>
            <p className="text-[18px] lg:text-[22px] leading-[40px] text-black/80 max-w-[660px] mb-10 lg:mb-14">
              Every day, insurers make decisions that impact their customers. WRAPA enables insurers
              to automate and optimise their processes and decision making with technology solutions
              which enables insurers to deliver better experiences and outcomes for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="md" fullWidth={false} asChild>
                <Link href="/sign-up">Buy now</Link>
              </Button>
              <Button variant="outline" size="md" fullWidth={false} asChild>
                <Link href="/sign-in">Make a claim</Link>
              </Button>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="w-full lg:w-[520px] xl:w-[660px] shrink-0">
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] rounded-[20px] overflow-hidden shadow-[0px_4px_160px_0px_rgba(0,0,0,0.05)]">
              <Image
                src={HERO_IMAGE}
                alt="Insurance market place illustration"
                fill
                sizes="(max-width: 1024px) 100vw, 660px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
