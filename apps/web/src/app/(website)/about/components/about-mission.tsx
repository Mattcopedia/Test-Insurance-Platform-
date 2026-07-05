'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'

export function AboutMission() {
  const { ref: missionRef, isInView: missionInView } = useInView()
  const { ref: visionRef, isInView: visionInView } = useInView()

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Mission */}
          <div
            ref={missionRef}
            className={cn(
              'flex flex-col gap-6 transition-[opacity,transform] duration-1000 ease-out',
              missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
          >
            <span className="inline-block text-[#990505] text-[14px] lg:text-[16px] font-semibold tracking-widest uppercase">
              Our Mission
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[50px] font-bold text-black/80 leading-[1.2]">
              Making insurance and health coverage accessible to every African
            </h2>
            <p className="text-[17px] lg:text-[20px] leading-[1.8] text-black/70">
              WRAPA exists to remove the barriers between people and the financial protection they
              deserve. We do this by building the technology that connects insurers, brokers, HMOs,
              and customers on a single, transparent platform so that getting insured is as simple
              as sending a message.
            </p>
            <p className="text-[17px] lg:text-[20px] leading-[1.8] text-black/70">
              We partner with traditional insurers and HMOs across Kenya and the Pan-African market
              to digitise their workflows, automate decisions, and serve customers faster, fairer,
              and with full transparency.
            </p>
          </div>

          {/* Vision */}
          <div
            ref={visionRef}
            className={cn(
              'flex flex-col gap-6 transition-[opacity,transform] duration-1000 ease-out',
              visionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
            style={{ transitionDelay: visionInView ? '100ms' : '0ms' }}
          >
            <span className="inline-block text-[#990505] text-[14px] lg:text-[16px] font-semibold tracking-widest uppercase">
              Our Vision
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[50px] font-bold text-black/80 leading-[1.2]">
              The insurance backbone of Africa
            </h2>
            <p className="text-[17px] lg:text-[20px] leading-[1.8] text-black/70">
              We envision a continent where every individual, business, and enterprise can access
              the right insurance product at the right price powered by algorithms, driven by data,
              and delivered with empathy.
            </p>
            <p className="text-[17px] lg:text-[20px] leading-[1.8] text-black/70">
              By 2030, WRAPA aims to be the infrastructure layer that every African insurer, HMO,
              broker, and regulator relies on to serve their customers and manage their operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
