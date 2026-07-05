'use client'

import * as React from 'react'
import { cn } from '../../cn'

export interface CoverageSliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  formatLabel: (value: number) => string
  className?: string
}

function CoverageSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  formatLabel,
  className,
}: CoverageSliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <p className="font-sans text-[28px] sm:text-[32px] font-bold text-black">
        {formatLabel(value)}
      </p>

      <div className="relative flex items-center h-6">
        <div className="relative w-full h-1.5 rounded-full bg-black/15">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-black transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn('absolute inset-0 w-full opacity-0 cursor-pointer h-6')}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatLabel(value)}
        />
        {/* Custom thumb */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 size-5 rounded-full bg-black border-2 border-white shadow-md transition-all"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between text-[12px] text-black/50 font-sans">
        <span>{formatLabel(min)}</span>
        <span>{formatLabel(max)}</span>
      </div>
    </div>
  )
}

export { CoverageSlider }
