'use client'

import Image from 'next/image'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'
import { useInView } from '@/hooks/use-in-view'

const INSURANCE_SCORE_BG =
  'https://www.figma.com/api/mcp/asset/c9fb8043-a3c8-4bc5-858e-de5033722d21'
const AGGREGATOR_IMAGE = '/assets/images/InsuranceAggregator.png'
const CLAIMS_IMAGE = '/assets/images/claimsProcessing.png'

export function FeaturesSection() {
  const { ref: headingRef, isInView: headingInView } = useInView()
  const { ref: bannerRef, isInView: bannerInView } = useInView()
  const { ref: card1Ref, isInView: card1InView } = useInView()
  const { ref: card2Ref, isInView: card2InView } = useInView()

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16 space-y-12 lg:space-y-16">
        {/* Section heading */}
        <div ref={headingRef} className={scrollRevealClasses(headingInView, 'heading')}>
          <h2 className="font-serif text-[40px] sm:text-[50px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-6 max-w-[750px]">
            The easiest way to find the right coverage
          </h2>
          <p className="text-[18px] lg:text-[22px] leading-[30px] text-black/80 max-w-[860px]">
            Our algorithms do all the hard work for you reading between the lines, decoding terms
            and conditions, and matching you with the insurance policy or health plan that truly
            fits your needs.
          </p>
        </div>

        {/* Insurance Score Banner */}
        <div
          ref={bannerRef}
          className={cn(
            'relative rounded-[20px] overflow-hidden h-[280px] sm:h-[360px] lg:h-[624px]',
            scrollRevealClasses(bannerInView)
          )}
        >
          <Image
            src={INSURANCE_SCORE_BG}
            alt="Insurance score platform"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay gradient + text */}
          <div className="absolute inset-0 bg-[#002046]/60" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16">
            <h3 className="font-serif text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-white leading-[1.4] max-w-[700px] mb-4 lg:mb-6">
              Insurance score measurement and ratings platform.
            </h3>
            <p className="text-[16px] lg:text-[22px] leading-[30px] text-white/90 max-w-[710px]">
              Insurance scores are ratings used by insurance companies and HMOs to determine an
              individual&apos;s risk profile, likelihood of filing a claim, and expected coverage
              costs helping you get the most accurate plan match.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Aggregator */}
          <div
            ref={card1Ref}
            className={cn(
              'bg-[#d1d7ef] rounded-[18px] shadow-[0px_4px_149px_0px_rgba(0,0,0,0.05)] p-8 lg:p-10 flex flex-col gap-6',
              scrollRevealClasses(card1InView, 'card')
            )}
          >
            <div>
              <h3 className="font-serif text-[28px] lg:text-[40px] font-bold text-black/80 leading-[1.3] mb-4">
                Insurance &amp; Health Plan Aggregator
              </h3>
              <p className="text-[16px] lg:text-[20px] leading-[30px] text-black/80">
                One place for every plan seeker. WRAPA gathers insurance policies and HMO health
                plans from multiple providers, organises them side-by-side, and connects you with
                carriers, independent agents, and HMO networks so you can compare and choose with
                confidence.
              </p>
            </div>
            <div className="relative h-[200px] sm:h-[280px] lg:h-[340px] rounded-[16px] overflow-hidden mt-auto">
              <Image
                src={AGGREGATOR_IMAGE}
                alt="Insurance and health plan aggregator"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Quick Claims / Pre-auth */}
          <div
            ref={card2Ref}
            className={cn(
              'bg-white rounded-[18px] shadow-[0px_4px_149px_0px_rgba(0,0,0,0.05)] p-8 lg:p-10 flex flex-col gap-6',
              scrollRevealClasses(card2InView, 'card')
            )}
            style={scrollRevealStagger(card2InView, 1)}
          >
            <div>
              <h3 className="font-serif text-[28px] lg:text-[40px] font-bold text-black/80 leading-[1.3] mb-4">
                Quick Claims &amp; Pre-Authorisation
              </h3>
              <p className="text-[16px] lg:text-[20px] leading-[30px] text-black/80">
                Whether you&apos;re filing an insurance claim or requesting HMO pre-authorisation
                for a medical procedure, WRAPA&apos;s streamlined digital process makes it fast and
                transparent. Track every step in real time and get resolutions without the paperwork
                headache.
              </p>
            </div>
            <div className="relative h-[200px] sm:h-[280px] lg:h-[340px] mt-auto">
              <Image
                src={CLAIMS_IMAGE}
                alt="Claims processing and pre-authorisation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
