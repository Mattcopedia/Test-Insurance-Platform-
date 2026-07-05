'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'
import Link from 'next/link'

const TOOLS = [
  {
    slug: 'bmi',
    name: 'BMI Calculator',
    desc: 'Check if your weight is healthy for your height',
    icon: ActivityIcon,
    color: '#2563eb',
  },
  {
    slug: 'ideal-weight',
    name: 'Ideal Weight',
    desc: 'Find your ideal body weight range',
    icon: WeightIcon,
    color: '#16a34a',
  },
  {
    slug: 'calorie',
    name: 'Calorie Calculator',
    desc: 'Estimate your daily calorie needs',
    icon: FlameIcon,
    color: '#f97316',
  },
  {
    slug: 'bmr',
    name: 'BMR Calculator',
    desc: 'Calculate your basal metabolic rate',
    icon: HeartIcon,
    color: '#dc2626',
  },
  {
    slug: 'body-fat',
    name: 'Body Fat Calculator',
    desc: 'Estimate your body fat percentage',
    icon: PercentIcon,
    color: '#7c3aed',
  },
  {
    slug: 'ovulation',
    name: 'Ovulation Calculator',
    desc: 'Track your ovulation and fertile window',
    icon: CalendarIcon,
    color: '#db2777',
  },
  {
    slug: 'pregnancy',
    name: 'Pregnancy Calculator',
    desc: 'Estimate your due date and pregnancy milestones',
    icon: StarIcon,
    color: '#0891b2',
  },
]

export function HealthToolsSection() {
  const { ref, isInView } = useInView()

  return (
    <section className="bg-[#f8f9fb] py-14 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Heading */}
        <div
          ref={ref}
          className={cn(
            'mb-10 lg:mb-14 transition-[opacity,transform] duration-1000 ease-out',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] rounded-full bg-[#f97316]" />
            <span className="text-[#f97316] text-[12px] font-bold tracking-[0.18em] uppercase">
              Free Tools
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[52px] font-bold text-black/85 leading-[1.15] mb-4">
            Health & Wellness Tools
          </h2>
          <p className="text-[16px] lg:text-[20px] leading-[1.7] text-black/55 max-w-[600px]">
            Free health calculators to help you understand your body and find the right coverage.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ToolCard({ tool, index }: { tool: (typeof TOOLS)[0]; index: number }) {
  const { ref, isInView } = useInView()
  const Icon = tool.icon

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: isInView ? `${Math.min(index * 60, 360)}ms` : '0ms' }}
    >
      <Link
        href={`/health-tools/${tool.slug}`}
        className={cn(
          'group flex flex-col gap-3 sm:gap-4 bg-white rounded-[16px] p-5 sm:p-6',
          'border border-black/5 shadow-[0px_2px_16px_rgba(0,0,0,0.05)]',
          'transition-transform duration-200 ease-out hover:scale-[1.02]',
          'hover:shadow-[0px_4px_28px_rgba(0,0,0,0.10)]'
        )}
      >
        <div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: tool.color + '18' }}
        >
          <Icon color={tool.color} />
        </div>
        <div>
          <h3 className="font-sans text-[14px] sm:text-[15px] font-bold text-black/85 leading-snug mb-1">
            {tool.name}
          </h3>
          <p className="text-[12px] sm:text-[13px] text-black/50 leading-relaxed">{tool.desc}</p>
        </div>
        <span className="text-[12px] font-medium text-black/35 group-hover:text-black/60 transition-colors mt-auto">
          Calculate →
        </span>
      </Link>
    </div>
  )
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function ActivityIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function WeightIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="5" r="3" />
      <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.46A2 2 0 0 0 17.5 8Z" />
    </svg>
  )
}

function FlameIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

function HeartIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function PercentIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function StarIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
