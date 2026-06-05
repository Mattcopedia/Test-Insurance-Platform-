import { cn } from '@wrapa/ui'
import Link from 'next/link'

function HealthIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="20" width="36" height="8" rx="4" fill="currentColor" />
      <rect x="20" y="6" width="8" height="36" rx="4" fill="currentColor" />
    </svg>
  )
}

function LifeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 40s-16-9-16-21a10 10 0 0 1 16-8 10 10 0 0 1 16 8c0 12-16 21-16 21z"
        fill="currentColor"
      />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4L6 12v14c0 11 8 18 18 20 10-2 18-9 18-20V12L24 4z" fill="currentColor" />
    </svg>
  )
}

function SavingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity="0.2" />
      <path
        d="M24 14v6m0 8v6M18 24h12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  )
}

const CATEGORIES = [
  {
    id: 'health',
    title: 'Health & Medical',
    description:
      'Tailored health plans for individuals and families, including dedicated coverage for chronic conditions like diabetes.',
    bg: 'bg-[#e8f0fe]',
    border: 'border-[#1a56db]/20',
    iconColor: 'text-[#1a56db]',
    dotColor: 'bg-[#1a56db]',
    products: ['Family health insurance', 'Term insurance for diabetic'],
    Icon: HealthIcon,
    href: '/products/health',
  },
  {
    id: 'life',
    title: 'Life Insurance',
    description:
      'Protect your loved ones and build a financial safety net with term, savings-linked, and return-of-premium life cover.',
    bg: 'bg-[#fef2f2]',
    border: 'border-[#990505]/20',
    iconColor: 'text-[#990505]',
    dotColor: 'bg-[#990505]',
    products: ['Return of premium', 'Zero cost term plan', 'Child saving plan'],
    Icon: LifeIcon,
    href: '/products/life',
  },
  {
    id: 'commercial',
    title: 'Business & Commercial',
    description:
      'Comprehensive commercial cover for businesses — from cargo and vessels to employee liability and cyberattacks.',
    bg: 'bg-[#f0faf4]',
    border: 'border-[#166534]/20',
    iconColor: 'text-[#166534]',
    dotColor: 'bg-[#166534]',
    products: ['Marine insurance', 'Work men compensation', 'Cyber insurance'],
    Icon: ShieldIcon,
    href: '/products/commercial',
  },
  {
    id: 'savings',
    title: 'Savings & Investment',
    description:
      'Grow your wealth while staying protected — tax-efficient investment plans with guaranteed returns.',
    bg: 'bg-[#fffbeb]',
    border: 'border-[#92400e]/20',
    iconColor: 'text-[#92400e]',
    dotColor: 'bg-[#92400e]',
    products: ['Guarantee return plan', 'Tax saving investment'],
    Icon: SavingsIcon,
    href: '/products/savings',
  },
]

export function ProductCategoriesSection() {
  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Heading */}
        <div className="mb-10 lg:mb-16">
          <h2 className="font-serif text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-4">
            Find the right cover for you
          </h2>
          <p className="text-[18px] lg:text-[22px] leading-[1.7] text-black/60 max-w-[660px]">
            WRAPA brings together insurance products from Africa&apos;s leading insurers — organised
            into the categories that matter most to you.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CATEGORIES.map(
            ({ id, title, description, bg, border, iconColor, dotColor, products, Icon, href }) => (
              <Link
                key={id}
                href={href}
                className={cn(
                  'group rounded-[20px] border p-7 lg:p-9 flex flex-col gap-6 transition-shadow duration-200 hover:shadow-[0px_8px_60px_0px_rgba(0,0,0,0.1)]',
                  bg,
                  border
                )}
              >
                {/* Icon */}
                <div className={cn('size-10 lg:size-12 shrink-0', iconColor)}>
                  <Icon className="size-full" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-serif text-[22px] lg:text-[26px] font-bold text-black/80 leading-[1.3] group-hover:text-black transition-colors">
                    {title}
                  </h3>
                  <p className="text-[15px] lg:text-[17px] leading-[1.7] text-black/60">
                    {description}
                  </p>
                </div>

                {/* Product list */}
                <ul className="flex flex-col gap-2 mt-auto">
                  {products.map((product) => (
                    <li
                      key={product}
                      className="flex items-center gap-2 text-[14px] lg:text-[16px] text-black/70"
                    >
                      <span className={cn('size-1.5 rounded-full shrink-0', dotColor)} />
                      {product}
                    </li>
                  ))}
                </ul>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}
