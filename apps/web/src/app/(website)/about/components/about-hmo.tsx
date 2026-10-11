'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'

const HMO_POINTS = [
  {
    title: 'You enrol first',
    description:
      'With an insurance policy, payment usually comes after a claim. With an HMO, you enrol and then use the hospitals and clinics on that plan. Many visits cost little or nothing at the desk. Individuals, families, and employers can compare plans and enrol members on WRAPA.',
  },
  {
    title: 'You can see the hospitals',
    description:
      'Each plan shows the facilities you can use. In Nigeria, schemes follow the National Health Insurance Authority. In Kenya and East Africa, they include Social Health Authority networks and hospitals on the Kenya Master Health Facility List.',
  },
  {
    title: 'Approvals and hospital payments',
    description:
      'If a procedure needs approval, the request, the decision, and the payment to the hospital all stay on WRAPA. The member, the HMO, and the hospital see the same update, in Nigeria, Kenya, and across Africa.',
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
            How HMO plans work
          </h2>
          <p className="text-[17px] lg:text-[20px] leading-[1.8] text-black/70">
            WRAPA lists insurance policies and HMO plans. An HMO plan is a membership. You join a
            network of hospitals and clinics and use it for outpatient visits, admission, maternity,
            and everyday care. Personal plans, family cover, and company schemes are available in
            Nigeria, Kenya, and across Africa.
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
