'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'

const HMO_POINTS = [
  {
    title: 'Enrolment, not a checkout',
    description:
      'An insurance policy pays after something goes wrong. An HMO plan works the other way: you enrol, then use a network of hospitals and clinics, often with little or nothing to pay at the desk. On WRAPA, individuals, families, and employers compare plans and enrol members. Cover begins with the network, not a claim form.',
  },
  {
    title: 'Hospital networks you can check',
    description:
      'Every plan is tied to accredited facilities, so you can see where you will actually be treated. In Nigeria, schemes align with the National Health Insurance Authority. In Kenya and the wider East African region, they include Social Health Authority networks and facilities on the Kenya Master Health Facility List.',
  },
  {
    title: 'Care, approvals, and provider payments',
    description:
      'Pre-authorisation, treatment, and payments to hospitals sit on the same platform. Members, HMOs, and providers follow one status, from the request through to settlement, across Nigeria, Kenya, and the wider Pan-African market.',
  },
]

function HmoCard({ point, index }: { point: (typeof HMO_POINTS)[number]; index: number }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-[18px] border border-black/10 p-8 lg:p-10 flex flex-col gap-4 h-full',
        'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.04)]',
        scrollRevealClasses(isInView, 'card')
      )}
      style={scrollRevealStagger(isInView, index)}
    >
      <span className="text-[#990505] text-[13px] lg:text-[14px] font-bold tracking-[0.16em] uppercase">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-serif text-[22px] lg:text-[28px] font-bold text-black/80 leading-[1.3]">
        {point.title}
      </h3>
      <p className="text-[15px] lg:text-[18px] leading-[1.7] text-black/60">{point.description}</p>
    </div>
  )
}

export function AboutHmo() {
  const { ref, isInView } = useInView()

  return (
    <section className="bg-[#fafbfd] py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div
          ref={ref}
          className={cn('max-w-[820px] mb-10 lg:mb-16', scrollRevealClasses(isInView, 'heading'))}
        >
          <span className="inline-block text-[#990505] text-[14px] lg:text-[16px] font-semibold tracking-widest uppercase mb-4">
            HMOs on WRAPA
          </span>
          <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[56px] font-bold text-black/80 leading-[1.2] mb-5">
            Health cover that starts with the hospital, not the claim
          </h2>
          <p className="text-[17px] lg:text-[20px] leading-[1.8] text-black/70">
            WRAPA is built for traditional insurance and for HMOs as a path of its own. A health
            plan here is membership of a provider network: outpatient visits, admission, maternity,
            and the care your family actually uses. Personal plans, family cover, and company
            schemes are available in Nigeria, Kenya, and across the wider Pan-African market.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {HMO_POINTS.map((point, index) => (
            <HmoCard key={point.title} point={point} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
