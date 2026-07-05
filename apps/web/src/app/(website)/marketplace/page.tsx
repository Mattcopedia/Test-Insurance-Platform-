'use client'

import { MarketplaceCategoryCard, MarketplaceFilterTabs } from '@wrapa/ui'
import { useMemo, useState } from 'react'
import { ALL_GROUPS, CATEGORIES } from './data/marketplace-data'

const TAB_FILTERS: Record<string, (c: (typeof CATEGORIES)[0]) => boolean> = {
  Insurance: (c) => c.type === 'insurance',
  HMO: (c) => c.type === 'hmo',
  Personal: (c) => c.useCase === 'personal',
  Business: (c) => c.useCase === 'business',
}

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('Insurance')
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const visible = useMemo(() => {
    // TODO: replace with real API call from @wrapa/api-client
    let list = [...CATEGORIES]
    const tabFn = TAB_FILTERS[activeTab]
    if (tabFn) list = list.filter(tabFn)
    if (activeGroup) list = list.filter((c) => c.group === activeGroup)
    return list
  }, [activeTab, activeGroup])

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] font-bold text-black/85 mb-1">
            Marketplace
          </h1>
          <p className="text-[15px] sm:text-[16px] text-black/50">
            Browse plans by category and find the right cover for you.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
          <MarketplaceFilterTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab)
              setActiveGroup(null)
            }}
            groups={ALL_GROUPS}
            activeGroup={activeGroup}
            onGroupChange={setActiveGroup}
          />
        </div>

        {/* Category grid */}
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-black/40 gap-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-[15px]">No categories match this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {visible.map((cat) => (
              <MarketplaceCategoryCard
                key={cat.id}
                initials={cat.initials}
                color={cat.color}
                name={cat.name}
                group={cat.group}
                description={cat.description}
                href={`/marketplace/${cat.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
