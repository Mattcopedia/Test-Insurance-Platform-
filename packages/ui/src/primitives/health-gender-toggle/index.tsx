'use client'

import * as React from 'react'
import { cn } from '../../cn'

export interface HealthGenderToggleProps {
  value: 'male' | 'female'
  onChange: (v: 'male' | 'female') => void
  className?: string
}

function HealthGenderToggle({ value, onChange, className }: HealthGenderToggleProps) {
  return (
    <div className={cn('flex items-center gap-6', className)} role="radiogroup" aria-label="Gender">
      {(['male', 'female'] as const).map((g) => (
        <button
          key={g}
          type="button"
          role="radio"
          aria-checked={value === g}
          onClick={() => onChange(g)}
          className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]/40 rounded"
        >
          <span
            className={cn(
              'w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
              value === g ? 'border-[#1a56db]' : 'border-black/30'
            )}
          >
            {value === g && <span className="w-[9px] h-[9px] rounded-full bg-[#1a56db]" />}
          </span>
          <span
            className={cn(
              'text-[14px] sm:text-[15px] font-medium capitalize transition-colors',
              value === g ? 'text-black/85' : 'text-black/50'
            )}
          >
            {g === 'male' ? 'Male' : 'Female'}
          </span>
        </button>
      ))}
    </div>
  )
}

export { HealthGenderToggle }
