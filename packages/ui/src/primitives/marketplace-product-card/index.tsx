import * as React from 'react'
import Link from 'next/link'
import { cn } from '../../cn'
import { formatMoney } from '../../money'
import { MarketplaceInitialsIcon } from '../marketplace-initials-icon'

export interface MarketplaceProductCardProps {
  initials: string
  color: string
  name: string
  provider: string
  description: string
  startingPrice: number
  currency: string
  billingCycle: string
  href: string
}

function MarketplaceProductCard({
  initials,
  color,
  name,
  provider,
  description,
  startingPrice,
  currency,
  billingCycle,
  href,
}: MarketplaceProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-4 rounded-[16px] bg-white p-5 sm:p-6',
        'shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]',
        'transition-transform duration-200 ease-out hover:scale-[1.02]',
        'border border-black/5'
      )}
    >
      {/* Header: icon + name + provider */}
      <div className="flex items-start gap-3">
        <MarketplaceInitialsIcon initials={initials} color={color} />
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="font-sans text-[15px] sm:text-[16px] font-bold text-black/85 leading-snug">
            {name}
          </h3>
          <p className="text-[12px] sm:text-[13px] text-black/45">{provider}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] sm:text-[14px] text-black/55 leading-relaxed line-clamp-3 flex-1">
        {description}
      </p>

      {/* Price */}
      <div className="flex flex-col gap-0.5 mt-auto">
        <span className="text-[11px] text-black/40 font-medium">Starting from</span>
        <span className="text-[15px] sm:text-[16px] font-bold text-black/85">
          {formatMoney(startingPrice, currency)} / {billingCycle}
        </span>
      </div>
    </Link>
  )
}

export { MarketplaceProductCard }
