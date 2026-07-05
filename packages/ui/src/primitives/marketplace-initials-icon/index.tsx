import * as React from 'react'
import { cn } from '../../cn'

export interface MarketplaceInitialsIconProps {
  initials: string
  color: string
  className?: string
}

function MarketplaceInitialsIcon({ initials, color, className }: MarketplaceInitialsIconProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[14px] shrink-0',
        'w-12 h-12 sm:w-14 sm:h-14',
        className
      )}
      style={{ backgroundColor: color }}
      aria-hidden
    >
      <span className="font-sans text-[15px] sm:text-[17px] font-bold text-white tracking-wide">
        {initials.slice(0, 2).toUpperCase()}
      </span>
    </div>
  )
}

export { MarketplaceInitialsIcon }
