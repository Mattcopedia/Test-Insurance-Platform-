import * as React from 'react'
import { cn } from '../../cn'

export interface HealthCalculatorCardProps {
  title: string
  children: React.ReactNode
  className?: string
}

function HealthCalculatorCard({ title, children, className }: HealthCalculatorCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[12px] shadow-[0px_4px_40px_rgba(0,0,0,0.10)] p-6 sm:p-8',
        className
      )}
    >
      <div className="mb-6">
        <h2 className="font-sans text-[20px] sm:text-[22px] font-bold text-[#1a237e] leading-snug">
          {title}
        </h2>
        <div className="w-10 h-[3px] bg-[#f97316] mt-2 rounded-full" />
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

export { HealthCalculatorCard }
