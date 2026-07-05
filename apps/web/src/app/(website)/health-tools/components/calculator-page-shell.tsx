import Link from 'next/link'
import { cn } from '@wrapa/ui'
import React from 'react'

interface Crumb {
  label: string
  href?: string
}

interface CalculatorPageShellProps {
  breadcrumbs: Crumb[]
  title: string
  description: string
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  educationalContent?: React.ReactNode
}

export function CalculatorPageShell({
  breadcrumbs,
  title,
  description,
  leftContent,
  rightContent,
  educationalContent,
}: CalculatorPageShellProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-black/45 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-black/25">›</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-black transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-black/70 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Title section */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <h1 className="font-sans text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#1a237e] leading-tight mb-1">
          {title}
        </h1>
        <div className="w-12 h-[3px] bg-[#f97316] mb-4 rounded-full" />
        <p className="text-[14px] sm:text-[15px] text-black/60 leading-relaxed max-w-[820px]">
          {description}
        </p>
      </div>

      {/* Calculator area */}
      <div className="bg-[#eef3fc] py-8 lg:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            <div>{leftContent}</div>
            <div className="flex items-center justify-center min-h-[280px]">{rightContent}</div>
          </div>
        </div>
      </div>

      {/* Educational content */}
      {educationalContent && (
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          {educationalContent}
        </div>
      )}
    </div>
  )
}

// Shared styled native select for Activity Level
export const ACTIVITY_OPTIONS = [
  { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
  { value: 'light', label: 'Lightly active (1–3 days/week)' },
  { value: 'moderate', label: 'Moderately active (3–5 days/week)' },
  { value: 'active', label: 'Very active (6–7 days/week)' },
  { value: 'super', label: 'Super active (physical job & workouts)' },
]

export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  super: 1.9,
}

interface ActivitySelectProps {
  value: string
  onChange: (v: string) => void
}

export function ActivitySelect({ value, onChange }: ActivitySelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full h-[60px] pl-4 pr-10 rounded-[10px] bg-white border-none',
            'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.10)] ring-1 ring-transparent',
            'focus:outline-none focus:ring-black/20',
            'font-sans text-[15px] text-black/75 appearance-none'
          )}
        >
          <option value="">Activity level</option>
          {ACTIVITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// Shared Calculate button
export function CalculateButton({ children = 'Calculate ›' }: { children?: string }) {
  return (
    <button
      type="submit"
      className={cn(
        'w-full h-12 rounded-[10px] bg-[#1a56db] text-white',
        'font-sans text-[15px] font-semibold',
        'hover:bg-[#1a3db8] active:bg-[#1530a0]',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]/50'
      )}
    >
      {children}
    </button>
  )
}

// Shared height helpers
export function heightToCm(feet: string, inches: string): number {
  const f = parseFloat(feet) || 0
  const i = parseFloat(inches) || 0
  return (f * 12 + i) * 2.54
}
