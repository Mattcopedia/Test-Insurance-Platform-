'use client'

import { cn } from '@wrapa/ui'
import { useInView } from '@/hooks/use-in-view'

const STATS = [
  { value: '40+', label: 'Insurance partners' },
  { value: '100K+', label: 'Policies issued' },
  { value: '7', label: 'African markets' },
  { value: '99.9%', label: 'Platform uptime' },
]

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const { ref, isInView } = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 transition-[opacity,transform] duration-1000 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: isInView ? `${Math.min(index * 80, 300)}ms` : '0ms' }}
    >
      <span className="font-serif text-[44px] sm:text-[56px] lg:text-[72px] font-bold text-white leading-none">
        {value}
      </span>
      <span className="text-[16px] lg:text-[20px] text-white/60 leading-[1.4]">{label}</span>
    </div>
  )
}

export function AboutStats() {
  return (
    <section className="bg-[#050306] py-14 lg:py-20">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
