import * as React from 'react'
import { cn } from '../../cn'

export interface YesNoToggleProps {
  value: boolean | null
  onChange: (value: boolean) => void
  disabled?: boolean
  yesLabel?: string
  noLabel?: string
  className?: string
}

function YesNoToggle({
  value,
  onChange,
  disabled = false,
  yesLabel = 'Yes',
  noLabel = 'No',
  className,
}: YesNoToggleProps) {
  return (
    <div className={cn('flex w-full gap-3', className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(true)}
        aria-pressed={value === true}
        className={cn(
          'flex-1 h-[52px] sm:h-[60px] rounded-[10px] border-2 font-sans text-base font-medium transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black',
          'disabled:pointer-events-none disabled:opacity-40',
          value === true
            ? 'border-black bg-black/5 text-black font-bold'
            : 'border-black/20 bg-white text-black/70 hover:border-black/50'
        )}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(false)}
        aria-pressed={value === false}
        className={cn(
          'flex-1 h-[52px] sm:h-[60px] rounded-[10px] border-2 font-sans text-base font-medium transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black',
          'disabled:pointer-events-none disabled:opacity-40',
          value === false
            ? 'border-black bg-black/5 text-black font-bold'
            : 'border-black/20 bg-white text-black/70 hover:border-black/50'
        )}
      >
        {noLabel}
      </button>
    </div>
  )
}

export { YesNoToggle }
