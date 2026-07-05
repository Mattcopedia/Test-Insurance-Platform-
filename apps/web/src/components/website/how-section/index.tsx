'use client'

import { cn } from '@wrapa/ui'
import Image from 'next/image'
import { useState } from 'react'
import { useInView } from '@/hooks/use-in-view'

const HOW_IMAGE = '/assets/images/Insurance Policy.png'

type TabId = 'buying' | 'management' | 'claims'

const TABS: { id: TabId; label: string }[] = [
  { id: 'buying', label: 'Finding a Plan' },
  { id: 'management', label: 'Management' },
  { id: 'claims', label: 'Claims & Pre-auth' },
]

const TAB_CONTENT: Record<
  TabId,
  { heading: string; description: string; points: string[]; image: string }
> = {
  buying: {
    heading: 'Finding the right insurance or health plan',
    description:
      "Our state-of-the-art algorithms scour the market to surface insurance policies and HMO health plans that are genuinely tailored to your needs not just the most popular ones. Whether you're buying individual cover, a group scheme, or an HMO plan for your family, we'll match you with the right option.",
    points: [
      'Smart matching across insurance policies and HMO plans',
      'Partnerships with 40+ insurers and health plan providers',
      'Pre-negotiated discounts no haggling required',
    ],
    image: HOW_IMAGE,
  },
  management: {
    heading: 'Policy & Plan Management',
    description:
      'Manage all your insurance policies and HMO health plans from a single centralised dashboard. Track renewals, update coverage, view your benefits utilisation, and stay on top of every plan across all your providers in one place.',
    points: [
      'Unified dashboard for insurance and HMO plans',
      'Automated renewal and benefits reminders',
      'Easy policy updates and member modifications',
    ],
    image: HOW_IMAGE,
  },
  claims: {
    heading: 'Claims Processing &amp; HMO Pre-Authorisation',
    description:
      'File insurance claims or request HMO pre-authorisation digitally in minutes. Get real-time status updates so you always know exactly where your request stands no hold music, no lost paperwork.',
    points: [
      'Digital claim filing and pre-auth requests in minutes',
      'Real-time status tracking for claims and pre-authorisations',
      'Dedicated support team for insurance and HMO queries',
    ],
    image: HOW_IMAGE,
  },
}

export function HowSection() {
  const [activeTab, setActiveTab] = useState<TabId>('buying')
  const content = TAB_CONTENT[activeTab]
  const { ref, isInView } = useInView()

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section Heading */}
        <div
          ref={ref}
          className={cn(
            'mb-10 lg:mb-14',
            'transition-[opacity,transform] duration-1000 ease-out',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <h2 className="font-serif text-[40px] sm:text-[50px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-4">
            How are we doing it?
          </h2>
          <p className="text-[18px] lg:text-[24px] leading-[30px] text-black/80 max-w-[706px]">
            …simplifying everything about insurance and health coverage. We&apos;ll do it all for
            you.
          </p>
        </div>

        {/* Tab Card */}
        <div className="bg-white rounded-[20px] shadow-[0px_4px_160px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Tab Bar */}
          <div className="flex flex-wrap gap-2 p-5 lg:p-6 border-b border-black/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-5 py-2.5 rounded-[10px] text-[18px] lg:text-[24px] font-sans transition-all duration-150',
                  activeTab === tab.id ? 'bg-black text-white' : 'text-black/80 hover:bg-black/5'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            {/* Left text */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col gap-6 justify-center">
              <h3
                className="font-serif text-[28px] lg:text-[42px] font-bold text-black/80 leading-[1.3]"
                dangerouslySetInnerHTML={{ __html: content.heading }}
              />
              <p className="text-[16px] lg:text-[22px] leading-[30px] text-black/80">
                {content.description}
              </p>
              <ul className="space-y-3 list-disc list-inside">
                {content.points.map((point) => (
                  <li
                    key={point}
                    className="text-[16px] lg:text-[22px] leading-[30px] text-black/80"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right illustration */}
            <div className="relative w-full lg:w-[48%] h-[260px] sm:h-[340px] lg:h-[500px] shrink-0">
              <Image
                src={content.image}
                alt={content.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-contain object-center p-6 lg:p-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
