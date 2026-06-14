'use client'

import { cn } from '@wrapa/ui'
import Image from 'next/image'
import { useState } from 'react'

const HOW_IMAGE = '/assets/images/Insurance Policy.png'

type TabId = 'buying' | 'management' | 'claims'

const TABS: { id: TabId; label: string }[] = [
  { id: 'buying', label: 'Buying Insurance' },
  { id: 'management', label: 'Management' },
  { id: 'claims', label: 'Claim processing' },
]

const TAB_CONTENT: Record<
  TabId,
  { heading: string; description: string; points: string[]; image: string }
> = {
  buying: {
    heading: 'Buying Insurance policy',
    description:
      "Our state-of-the-art algorithms are your trusty guides, meticulously scouring the landscape to unearth and elevate the insurance plans that are not just suitable but utterly tailored to your individual needs. We're in the business of making sure you don't just get coverage but get it right.",
    points: [
      'Algorithms that match plans to your specific needs',
      'Tie-ups with 40+ insurance companies',
      'Get a pre-negotiated highest discount',
    ],
    image: HOW_IMAGE,
  },
  management: {
    heading: 'Policy Management',
    description:
      'Manage all your insurance policies in one centralised dashboard. Track renewals, update coverage, and stay informed about every policy across all your insurance providers with ease.',
    points: [
      'Centralised policy dashboard',
      'Automated renewal reminders',
      'Easy policy updates and modifications',
    ],
    image: HOW_IMAGE,
  },
  claims: {
    heading: 'Claim Processing',
    description:
      'File and track your insurance claims with our streamlined digital process. Get faster resolutions and real-time status updates so you always know where your claim stands.',
    points: [
      'Digital claim filing in minutes',
      'Real-time claim status tracking',
      'Dedicated claims support team',
    ],
    image: HOW_IMAGE,
  },
}

export function HowSection() {
  const [activeTab, setActiveTab] = useState<TabId>('buying')
  const content = TAB_CONTENT[activeTab]

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section Heading */}
        <div className="mb-10 lg:mb-14">
          <h2 className="font-serif text-[40px] sm:text-[50px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-4">
            How are we doing it?
          </h2>
          <p className="text-[18px] lg:text-[24px] leading-[30px] text-black/80 max-w-[706px]">
            …simplifying everything about Insurance. We&apos;ll do it all for you.
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
            {/* Left — text */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col gap-6 justify-center">
              <h3 className="font-serif text-[28px] lg:text-[42px] font-bold text-black/80 leading-[1.3]">
                {content.heading}
              </h3>
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

            {/* Right — illustration */}
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
