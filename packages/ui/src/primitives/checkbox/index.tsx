import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '../../cn'

/**
 * Extracted from Figma node 267:832 → Component1 (node 267:893)
 *
 * Checkbox box (node 267:885):
 *   size: 24 × 24 px  |  border: ~1px, rgba(0,0,0,0.3)  |  border-radius: 3px
 *   unchecked bg: white  |  checked bg: #000000 (brand primary)
 *
 * Label (node 267:888):
 *   font: Karla Regular 18px  |  color: rgba(0,0,0,0.8)  |  leading: 19.833px
 */

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  /** Optional label rendered to the right of the box */
  label?: React.ReactNode
  /** Validation error message — renders below the row in red */
  error?: string
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-[10px]">
          <CheckboxPrimitive.Root
            ref={ref}
            id={inputId}
            className={cn(
              // Box geometry — matches Figma 24×24 px box
              'size-[18px] shrink-0',
              'rounded-[3px] border border-black/30 bg-white',
              // Checked state — bg-black with white indicator, border follows
              'data-[state=checked]:bg-black data-[state=checked]:border-black',
              // Focus ring
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1',
              // Disabled
              'disabled:cursor-not-allowed disabled:opacity-40',
              // Error state — red border when unchecked + error
              error && 'border-red-500 data-[state=unchecked]:border-red-500',
              className
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
              {/* Checkmark — matches the icon weight seen in Figma */}
              <svg viewBox="0 0 10 8" fill="none" className="size-[10px]" aria-hidden>
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                // Matches Figma label: Karla Regular 18px, rgba(0,0,0,0.8), leading-[19.833px]
                'font-sans text-[18px] font-normal leading-[19.833px] text-black/80',
                'cursor-pointer select-none',
                props.disabled && 'cursor-not-allowed opacity-40'
              )}
            >
              {label}
            </label>
          )}
        </div>

        {error && <p className="pl-[28px] text-sm text-red-500 leading-tight">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
