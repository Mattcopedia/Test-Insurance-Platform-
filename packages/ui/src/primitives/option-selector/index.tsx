import * as React from 'react'
import { cn } from '../../cn'

export interface OptionSelectorOption {
  id: string
  icon?: React.ReactNode
  title: string
  subtitle?: string
}

export interface OptionSelectorProps {
  options: OptionSelectorOption[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  columns?: 1 | 2
  className?: string
}

function OptionSelector({
  options,
  value,
  onChange,
  multiple = false,
  columns = 2,
  className,
}: OptionSelectorProps) {
  const selected = Array.isArray(value) ? value : value ? [value] : []

  function handleSelect(id: string) {
    if (multiple) {
      const arr = Array.isArray(value) ? value : value ? [value] : []
      if (arr.includes(id)) {
        onChange(arr.filter((v) => v !== id))
      } else {
        onChange([...arr, id])
      }
    } else {
      onChange(id)
    }
  }

  return (
    <div
      className={cn(
        'grid gap-3',
        columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = selected.includes(opt.id)
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => handleSelect(opt.id)}
            className={cn(
              'flex flex-col items-center justify-center gap-2 p-5 rounded-[12px] border-2',
              'font-sans text-center transition-all duration-150 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black',
              isSelected
                ? 'border-black bg-black/5'
                : 'border-black/15 bg-white hover:border-black/40'
            )}
          >
            {opt.icon && (
              <span className={cn('text-2xl', isSelected ? 'text-black' : 'text-black/60')}>
                {opt.icon}
              </span>
            )}
            <span
              className={cn(
                'text-[15px] sm:text-[16px] font-bold leading-tight',
                isSelected ? 'text-black' : 'text-black/80'
              )}
            >
              {opt.title}
            </span>
            {opt.subtitle && (
              <span className="text-[13px] sm:text-[14px] font-normal text-black/50 leading-snug">
                {opt.subtitle}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export { OptionSelector }
