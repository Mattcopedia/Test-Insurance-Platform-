'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'
import Image from 'next/image'

const TRUST_LOGOS = [
  {
    src: '/assets/icons/interswitch-logo.svg',
    alt: 'Interswitch',
  },
  {
    src: '/assets/icons/leadway-assurance-logo.svg',
    alt: 'Leadway Assurance',
  },
  {
    src: '/assets/icons/sanlam-logo.svg',
    alt: 'Sanlam',
  },
  {
    src: '/assets/icons/exxonmobil-logo.svg',
    alt: 'ExxonMobil',
  },
  {
    src: '/assets/icons/lagos-ride-logo.svg',
    alt: 'Lagos Ride',
  },
]

export function TrustedBySection() {
  const { ref: headingRef, isInView: headingInView } = useInView()

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <h2
          ref={headingRef}
          className={cn(
            'font-serif text-[32px] lg:text-[40px] font-bold text-black/80 mb-8 lg:mb-12',
            'transition-[opacity,transform] duration-1000 ease-out',
            headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          Trusted by
        </h2>

        <div className="flex flex-wrap items-center gap-6 lg:gap-12">
          {TRUST_LOGOS.map((logo, i) => (
            <LogoItem key={i} logo={logo} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoItem({ logo, index }: { logo: { src: string; alt: string }; index: number }) {
  const { ref, isInView } = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        'relative h-[72px] w-[160px] lg:h-[108px] lg:w-[227px] rounded-[10px] overflow-hidden shrink-0',
        'transition-[opacity,transform] duration-1000 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: isInView ? `${Math.min(index * 60, 300)}ms` : '0ms' }}
    >
      <Image src={logo.src} alt={logo.alt} fill sizes="227px" className="object-contain" />
    </div>
  )
}
