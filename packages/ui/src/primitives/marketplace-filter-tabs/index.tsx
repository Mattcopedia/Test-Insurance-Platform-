'use client'

import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { cn } from '../../cn'

export interface MarketplaceFilterTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  groups: string[]
  activeGroup: string | null
  onGroupChange: (group: string | null) => void
}

const TABS = ['Insurance', 'HMO', 'Personal', 'Business']

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn('transition-transform duration-200', open ? 'rotate-180' : '')}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MarketplaceFilterTabs({
  activeTab,
  onTabChange,
  groups,
  activeGroup,
  onGroupChange,
}: MarketplaceFilterTabsProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const filteredGroups = search.trim()
    ? groups.filter((g) => g.toLowerCase().includes(search.toLowerCase()))
    : groups

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              'shrink-0 h-9 px-4 rounded-full border font-sans text-[14px] font-medium transition-all duration-150 whitespace-nowrap',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40',
              isActive
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/60 border-black/20 hover:border-black/50 hover:text-black'
            )}
          >
            {tab}
          </button>
        )
      })}

      {/* All groups popover */}
      <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={cn(
              'shrink-0 h-9 px-4 rounded-full border font-sans text-[14px] font-medium transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40',
              activeGroup
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/60 border-black/20 hover:border-black/50 hover:text-black'
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            {activeGroup ?? 'All groups'}
            <ChevronDownIcon open={popoverOpen} />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={8}
            className={cn(
              'z-50 w-[220px] rounded-[12px] bg-white',
              'shadow-[0px_8px_40px_rgba(0,0,0,0.15)]',
              'border border-black/8 p-2',
              'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
            )}
          >
            {/* Search */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 mb-1 border-b border-black/8">
              <span className="text-black/35 shrink-0">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search groups..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-[13px] text-black placeholder:text-black/35 outline-none bg-transparent"
              />
            </div>

            {/* "All groups" option */}
            <button
              type="button"
              onClick={() => {
                onGroupChange(null)
                setPopoverOpen(false)
              }}
              className={cn(
                'w-full flex items-center justify-between px-2.5 py-2 rounded-[8px] text-[13px] font-medium transition-colors',
                !activeGroup ? 'text-black' : 'text-black/60 hover:bg-black/5'
              )}
            >
              All groups
              {!activeGroup && <CheckIcon />}
            </button>

            {filteredGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  onGroupChange(g)
                  setPopoverOpen(false)
                }}
                className={cn(
                  'w-full flex items-center justify-between px-2.5 py-2 rounded-[8px] text-[13px] font-medium transition-colors',
                  activeGroup === g ? 'text-black' : 'text-black/60 hover:bg-black/5'
                )}
              >
                {g}
                {activeGroup === g && <CheckIcon />}
              </button>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}

export { MarketplaceFilterTabs }
