'use client'

import { useInView } from '@/hooks/use-in-view'
import { Button, cn } from '@wrapa/ui'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const BG_IMAGES = ['/assets/images/family Coverage.jpg', '/assets/images/HMO Coverage.jpg']

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref: contentRef, isInView: contentInView } = useInView({ rootMargin: '0px' })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background image layer */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={src} alt="" fill className="object-cover" priority={i === 0} />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-[1800px] px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          {/* Left copy */}
          <div
            ref={contentRef}
            className={cn(
              'flex-1 min-w-0 transition-[opacity,transform] duration-1000 ease-out',
              contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
          >
            <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.3] text-white mb-6 lg:mb-8">
              <span className="text-[#ff6b6b]">WRAPA</span>
              {' is Your Insurance & HMO Marketplace'}
            </h1>
            <p className="text-[18px] lg:text-[22px] leading-[40px] text-white/90  mb-10 lg:mb-14">
              Every day, insurers and HMOs make decisions that impact their customers. WRAPA enables
              them to automate and optimise their processes with technology solutions that deliver
              better experiences and outcomes. whether you need an insurance policy or an HMO health
              plan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="md" fullWidth={false} asChild>
                <Link href="/get-quote">Get a Free Quote</Link>
              </Button>
              <Button size="md" fullWidth={false} asChild>
                <Link href="/marketplace">Explore plans</Link>
              </Button>
              <Button
                className="bg-white text-black"
                variant="outline"
                size="md"
                fullWidth={false}
                asChild
              >
                <Link href="/">Make a claim</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
