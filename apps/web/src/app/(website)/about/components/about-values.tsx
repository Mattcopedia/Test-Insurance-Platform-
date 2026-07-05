'use client'

import { cn } from '@wrapa/ui'
import { useInView } from '@/hooks/use-in-view'

const VALUES = [
  {
    title: 'Customer-First',
    description:
      'Every product decision starts with the customer. We build for the person on the other end  not the institution.',
    accent: 'bg-[#fef2f2]',
    border: 'border-[#990505]/20',
  },
  {
    title: 'Radical Transparency',
    description:
      'Insurance has long been opaque. WRAPA surfaces the terms, the exclusions, the scores  so customers can choose with eyes wide open.',
    accent: 'bg-[#f0f4ff]',
    border: 'border-[#002046]/20',
  },
  {
    title: 'Technology-Driven',
    description:
      'We believe the best insurance experiences are built on great software  algorithms that match, APIs that scale, and UX that does not get in the way.',
    accent: 'bg-[#f0faf4]',
    border: 'border-[#166534]/20',
  },
  {
    title: 'Pan-African Ambition',
    description:
      'Kenya is home, but Africa is the market. We design for multiple currencies, regulators, and languages from day one.',
    accent: 'bg-[#fffbeb]',
    border: 'border-[#92400e]/20',
  },
  {
    title: 'Trust & Security',
    description:
      'We handle sensitive financial and health data. We take that responsibility seriously  with bank-grade security, PASETO-based auth, and rigorous audits.',
    accent: 'bg-[#fdf4ff]',
    border: 'border-[#6b21a8]/20',
  },
  {
    title: 'Speed to Resolution',
    description:
      'Whether it is a claim, a policy change, or a customer query we obsess over time-to-resolution. Every hour saved matters.',
    accent: 'bg-[#fff1f2]',
    border: 'border-[#be123c]/20',
  },
]

function ValueCard({ value, index }: { value: (typeof VALUES)[number]; index: number }) {
  const { ref, isInView } = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[18px] border p-8 lg:p-10 flex flex-col gap-4',
        'transition-[opacity,transform] duration-1000 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        value.accent,
        value.border
      )}
      style={{ transitionDelay: isInView ? `${Math.min((index % 3) * 80, 300)}ms` : '0ms' }}
    >
      <h3 className="font-serif text-[22px] lg:text-[28px] font-bold text-black/80 leading-[1.3]">
        {value.title}
      </h3>
      <p className="text-[15px] lg:text-[18px] leading-[1.7] text-black/60">{value.description}</p>
    </div>
  )
}

export function AboutValues() {
  const { ref: headingRef, isInView: headingInView } = useInView()

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section heading */}
        <div
          ref={headingRef}
          className={cn(
            'mb-10 lg:mb-16 transition-[opacity,transform] duration-1000 ease-out',
            headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <h2 className="font-serif text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-4">
            What we stand for
          </h2>
          <p className="text-[18px] lg:text-[22px] leading-[1.6] text-black/60 max-w-[660px]">
            These are the principles that guide every product, partnership, and decision at WRAPA.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
