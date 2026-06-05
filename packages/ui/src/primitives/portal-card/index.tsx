import * as React from 'react'
import { cn } from '../../cn'

export interface PortalCardProps {
  variant: 'client' | 'insurance' | 'hmo'
  title: string
  description: string
  icon: React.ReactNode
  selected?: boolean
  onClick?: () => void

  disabled?: boolean
}

const PortalCard = React.forwardRef<HTMLButtonElement, PortalCardProps>(
  (
    {
      title,
      description,
      icon,
      selected = false,
      variant = 'default',
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        disabled={disabled}
        onClick={onClick}
        className="flex flex-row cursor-pointer shadow-md bg-white gap-10 w-full rounded-[10px] px-6 py-4"
        {...props}
      >
        <span
          className="flex shrink-0 items-center justify-center pl-[36px] sm:pl-[47px] "
          aria-hidden
        >
          {icon}
        </span>

        <span className=" flex flex-col gap-[15px] items-start ">
          <span
            className={cn(
              'font-sans text-[17px] font-bold leading-[19.833px] text-black/80',
              'sm:text-[20px]'
            )}
          >
            {title}
          </span>

          <span
            className={cn(
              'font-sans text-[14px] font-normal leading-[19.833px] text-black/70',
              'sm:text-[18px]'
            )}
          >
            {description}
          </span>
        </span>

        {/* {selected && (
            <span
              aria-hidden
              className="absolute right-5 flex size-5 items-center justify-center rounded-full bg-black"
            >
              <svg viewBox="0 0 10 8" fill="none" className="size-[10px] text-white" aria-hidden>
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )} */}
      </button>
    )
  }
)

PortalCard.displayName = 'PortalCard'

export interface PortalCardGroupProps {
  children: React.ReactNode
  className?: string
}

function PortalCardGroup({ children, className }: PortalCardGroupProps) {
  return <div className={cn('flex w-full flex-col gap-[60px] pt-4', className)}>{children}</div>
}

export { PortalCard, PortalCardGroup }
