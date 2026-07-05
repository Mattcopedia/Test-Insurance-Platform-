import * as React from 'react'
import Link from 'next/link'
import { cn } from '../../cn'
import { MarketplaceInitialsIcon } from '../marketplace-initials-icon'

export interface MarketplaceCategoryCardProps {
  initials: string
  color: string
  name: string
  group: string
  description: string
  href: string
}

function MarketplaceCategoryCard({
  initials,
  color,
  name,
  group,
  description,
  href,
}: MarketplaceCategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-4 rounded-[16px] bg-white p-6',
        'shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]',
        'transition-transform duration-200 ease-out hover:scale-[1.02]',
        'border border-black/5'
      )}
    >
      <MarketplaceInitialsIcon initials={initials} color={color} />

      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="font-sans text-[17px] sm:text-[18px] font-bold text-black/85 leading-snug">
          {name}
        </h3>
        <span className="self-start px-2.5 py-0.5 rounded-full bg-black/8 text-[11px] font-semibold text-black/50 tracking-wide">
          {group}
        </span>
        <p className="mt-1.5 text-[13px] sm:text-[14px] text-black/55 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <span className="text-[13px] font-medium text-black/40 group-hover:text-black/70 transition-colors duration-150">
        View plans →
      </span>
    </Link>
  )
}

export { MarketplaceCategoryCard }
