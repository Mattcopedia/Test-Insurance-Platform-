'use client'

import Image from 'next/image'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'
import { useInView } from '@/hooks/use-in-view'

const API_BG = 'https://www.figma.com/api/mcp/asset/7db783be-8402-49a8-a309-c22876ad8b87'
const API_CARD_IMAGE = '/assets/images/codeSandBox.png'
const API_ICON = '/assets/icons/apiIcon.png'
const UX_ICON = '/assets/icons/UX Icon.png'
const SUPPORT_ICON = '/assets/icons/technical-support.png'

export function ApiSection() {
  const { ref: mainRef, isInView: mainInView } = useInView()
  const { ref: card1Ref, isInView: card1InView } = useInView()
  const { ref: card2Ref, isInView: card2InView } = useInView()

  return (
    <section className="relative py-14 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={API_BG} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative mx-auto max-w-[1800px] px-6 lg:px-16 space-y-8 lg:space-y-10">
        {/* Main API Card */}
        <div
          ref={mainRef}
          className={cn(
            'bg-white rounded-[20px] shadow-[0px_4px_160px_0px_rgba(0,0,0,0.25)] overflow-hidden',
            scrollRevealClasses(mainInView, 'card')
          )}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left text */}
            <div className="flex-1 p-8 lg:p-14 flex flex-col justify-center gap-6">
              <div className="size-[80px] lg:size-[111px] relative">
                <Image
                  src={API_ICON}
                  alt="API icon"
                  fill
                  sizes="111px"
                  className="object-contain"
                />
              </div>
              <h2 className="font-serif text-[30px] lg:text-[54px] font-bold text-black/80 leading-[1.3] max-w-[640px]">
                Powerful APIs and easy-to-use resources
              </h2>
              <a
                href="#"
                className="text-[20px] lg:text-[30px] text-blue-700 underline decoration-solid font-sans hover:text-blue-900 transition-colors"
              >
                Read our API Docs
              </a>
            </div>

            {/* Right screenshot */}
            <div className="relative w-full lg:w-[55%] h-[220px] sm:h-[300px] lg:h-[507px] shrink-0 rounded-b-[20px] lg:rounded-b-none lg:rounded-tr-[20px] overflow-hidden">
              <Image
                src={API_CARD_IMAGE}
                alt="API documentation preview"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {/* UX Card */}
          <div
            ref={card1Ref}
            className={cn(
              'bg-white rounded-[20px] shadow-[0px_4px_160px_0px_rgba(0,0,0,0.25)] p-8 lg:p-12 flex flex-col items-center text-center gap-6',
              scrollRevealClasses(card1InView, 'card')
            )}
          >
            <div className="size-[80px] lg:size-[97px] relative">
              <Image src={UX_ICON} alt="UX icon" fill sizes="97px" className="object-contain" />
            </div>
            <h3 className="font-serif text-[26px] lg:text-[40px] font-bold text-black/80 leading-[1.3] max-w-[520px]">
              Beautiful seamless UX
            </h3>
          </div>

          {/* Support Card */}
          <div
            ref={card2Ref}
            className={cn(
              'bg-white rounded-[20px] shadow-[0px_4px_160px_0px_rgba(0,0,0,0.25)] p-8 lg:p-12 flex flex-col items-center text-center gap-6',
              scrollRevealClasses(card2InView, 'card')
            )}
            style={scrollRevealStagger(card2InView, 1)}
          >
            <div className="size-[80px] lg:size-[105px] relative">
              <Image
                src={SUPPORT_ICON}
                alt="Support icon"
                fill
                sizes="105px"
                className="object-contain"
              />
            </div>
            <h3 className="font-serif text-[26px] lg:text-[40px] font-bold text-black/80 leading-[1.3] max-w-[460px]">
              Always-on support
            </h3>
            <a
              href="#"
              className="text-[18px] lg:text-[24px] text-blue-700 underline decoration-solid font-sans hover:text-blue-900 transition-colors mt-auto"
            >
              connect with us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
