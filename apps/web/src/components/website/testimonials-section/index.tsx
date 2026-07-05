'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'
import Image from 'next/image'

const AVATAR_1 = '/assets/icons/Testimonial 1.svg'
const AVATAR_2 = '/assets/icons/Testimonial 2.svg'

const TESTIMONIALS = [
  {
    name: 'Emily Foster',
    role: 'Business owner',
    avatar: AVATAR_1,
    quote:
      'Wrapa made managing my insurance needs a breeze. Filing a claim used to be tedious. Now it takes minutes and I can track progress in real time.',
  },
  {
    name: 'Daniel Robinson',
    role: 'Insurance Analyst',
    avatar: AVATAR_2,
    quote:
      "Wrapa's platform has become indispensable for our team. The accuracy of the data has made our underwriting process smoother and more precise.",
  },
  {
    name: 'Amina Okoro',
    role: 'HR Manager',
    avatar: AVATAR_1,
    quote:
      'We enrolled our entire team on an HMO plan through Wrapa in one afternoon. The corporate dashboard makes mid-year changes effortless.',
  },
  {
    name: 'James Mwangi',
    role: 'Freelance consultant',
    avatar: AVATAR_2,
    quote:
      'I switched my health cover to Wrapa and cut my monthly premium significantly. The marketplace made comparing plans genuinely easy.',
  },
  {
    name: 'Fatima Bello',
    role: 'Small business owner',
    avatar: AVATAR_1,
    quote:
      'Getting a quote without signing up first was exactly what I needed. I had a clear cost estimate before committing to anything.',
  },
  {
    name: 'David Chen',
    role: 'Operations lead',
    avatar: AVATAR_2,
    quote:
      'Our motor fleet insurance renewal used to take weeks of back-and-forth. Wrapa handled everything digitally and we were covered in days.',
  },
  {
    name: 'Grace Wanjiku',
    role: 'Teacher',
    avatar: AVATAR_1,
    quote:
      'I found an affordable family HMO plan with maternity cover on Wrapa. The hospital network finder by county was incredibly helpful.',
  },
  {
    name: 'Samuel Adeyemi',
    role: 'Startup founder',
    avatar: AVATAR_2,
    quote:
      "Wrapa's get-a-quote flow is the simplest insurance experience I've had. Old-school insurers need to catch up to this level of UX.",
  },
  {
    name: 'Priya Sharma',
    role: 'Finance director',
    avatar: AVATAR_1,
    quote:
      'We consolidated three separate policies onto Wrapa and saved on admin overhead. One dashboard for claims, renewals, and reporting.',
  },
  {
    name: 'Michael Osei',
    role: 'Property developer',
    avatar: AVATAR_2,
    quote:
      'Property insurance for our portfolio is now managed in one place. Claims status updates in real time. No more chasing brokers by phone.',
  },
]

function TestimonialCard({
  name,
  role,
  avatar,
  quote,
}: {
  name: string
  role: string
  avatar: string
  quote: string
}) {
  return (
    <article
      className={cn(
        'w-[340px] sm:w-[380px] lg:w-[550px] shrink-0',
        'min-h-[220px] sm:min-h-[240px]',
        'bg-white rounded-[16px] border border-black/[0.06]',
        'shadow-[0_4px_32px_rgba(0,0,0,0.10)]',
        'p-6 sm:p-7 lg:p-8 flex flex-col gap-5'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative size-12 sm:size-14 rounded-full overflow-hidden shrink-0 bg-gray-100">
          <Image src={avatar} alt={name} fill sizes="56px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[20px] sm:text-[17px] font-bold text-black/90 leading-tight">
            {name}
          </p>
          <p className="text-[18px] sm:text-[20px] text-black/45 mt-0.5">{role}</p>
        </div>
      </div>

      <p className="text-[25px] sm:text-[28px] leading-[1.7] text-black/70">{quote}</p>
    </article>
  )
}

function MarqueeTrack({
  duplicate = false,
  className,
}: {
  duplicate?: boolean
  className?: string
}) {
  return (
    <div
      className={cn('flex shrink-0 items-stretch gap-5 sm:gap-6 pr-5 sm:pr-6', className)}
      aria-hidden={duplicate || undefined}
    >
      {TESTIMONIALS.map((t) => (
        <TestimonialCard key={`${duplicate ? 'dup-' : ''}${t.name}`} {...t} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { ref: headingRef, isInView: headingInView } = useInView()

  return (
    <section className="bg-[#f7f8fa] py-14 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div
          ref={headingRef}
          className={cn(
            'mb-10 lg:mb-12 transition-[opacity,transform] duration-1000 ease-out',
            headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-black/85 leading-[1.15] mb-3">
            Why businesses and individuals are choosing Wrapa
          </h2>
          <p className="text-[16px] lg:text-[18px] leading-relaxed text-black/55 max-w-[640px]">
            Here is what some of them say about Wrapa.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden" aria-label="Customer testimonials">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-linear-to-r from-[#f7f8fa] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-linear-to-l from-[#f7f8fa] to-transparent" />

        {/* Both tracks must be direct flex siblings for -50% loop math */}
        <div
          className={cn(
            'testimonials-marquee-track flex w-max will-change-transform',
            'motion-reduce:animate-none'
          )}
        >
          <MarqueeTrack />
          <MarqueeTrack duplicate className="motion-reduce:hidden" />
        </div>
      </div>
    </section>
  )
}
