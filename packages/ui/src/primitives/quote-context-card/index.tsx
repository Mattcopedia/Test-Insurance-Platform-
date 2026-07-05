import * as React from 'react'
import { cn } from '../../cn'

export interface QuoteContextCardProps {
  heading: string
  body: string
  className?: string
}

function QuoteContextCard({ heading, body, className }: QuoteContextCardProps) {
  return (
    <div className={cn('rounded-[12px] bg-slate-50 border border-slate-200 p-5', className)}>
      <p className="font-sans text-[15px] font-bold text-black/80 mb-2 leading-snug">{heading}</p>
      <p className="font-sans text-[14px] text-black/60 leading-relaxed">{body}</p>
    </div>
  )
}

export { QuoteContextCard }
