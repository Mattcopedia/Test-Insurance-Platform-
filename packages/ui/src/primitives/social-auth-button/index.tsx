import * as React from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { cn } from '../../cn'

/**
 * Extracted from Figma node 267:832 (sign in client page)
 *
 * Social auth buttons (nodes 941:1594–1605):
 *   box:    h-60px | rounded-[10px] | bg-white | shadow-[0px_4px_90px_0px_rgba(0,0,0,0.1)]
 *   icon:   size-[36.415px] | left-[19.58px] | vertically centered
 *   label:  Karla Medium 20px | rgba(0,0,0,0.8) | horizontally centered in full width
 *   gap between buttons: 26px (86px − 60px)
 */

const PROVIDER_CONFIG = {
  google: {
    label: 'Continue with Google',
    icon: FcGoogle,
  },
  facebook: {
    label: 'Continue with Facebook',
    icon: FaFacebook,
  },
  apple: {
    label: 'Continue with Apple',
    icon: FaApple,
  },
} as const

export type SocialProvider = keyof typeof PROVIDER_CONFIG

export interface SocialAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Which OAuth provider this button represents */
  provider: SocialProvider
}

const SocialAuthButton = React.forwardRef<HTMLButtonElement, SocialAuthButtonProps>(
  ({ provider, className, disabled, ...props }, ref) => {
    const { label, icon: Icon } = PROVIDER_CONFIG[provider]

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          // Box — matches Figma nodes 941:1595 / 941:1599 / 941:1603
          'relative flex h-[60px] w-full items-center',
          'rounded-[10px] bg-white',
          'shadow-[0px_4px_90px_0px_rgba(0,0,0,0.10)]',
          // Interaction
          'cursor-pointer transition-shadow duration-150',
          'hover:shadow-[0px_4px_90px_0px_rgba(0,0,0,0.18)]',
          'active:scale-[0.99] active:shadow-[0px_2px_40px_0px_rgba(0,0,0,0.12)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-40',
          className
        )}
        {...props}
      >
        {/* Icon — left-aligned at 19.58px, matches Figma node 941:1596/1601/1604 */}
        <span
          className="absolute left-[19.58px] flex shrink-0 items-center justify-center"
          aria-hidden
        >
          <Icon
            className={cn(
              // Figma: size-[36.415px] — use responsive size so it looks right on smaller screens
              'size-[28px] sm:size-[34px]',
              // Facebook blue fill, Apple black fill
              provider === 'facebook' && 'text-[#1877F2]',
              provider === 'apple' && 'text-black'
            )}
          />
        </span>

        {/* Label — horizontally centered across the full button width */}
        {/* Figma: font Karla Medium 20px, rgba(0,0,0,0.8), centered */}
        <span className="w-full text-center font-sans text-[18px] font-medium leading-[19.833px] text-black/80 sm:text-[20px]">
          {label}
        </span>
      </button>
    )
  }
)

SocialAuthButton.displayName = 'SocialAuthButton'

/**
 * Convenience wrapper that stacks all three social buttons with the correct
 * 26px gap from the Figma design (86px row height − 60px button = 26px gap).
 * Pass individual `onProviderClick` or wire each `SocialAuthButton` directly.
 */
export interface SocialAuthGroupProps {
  onGoogleClick?: () => void
  onFacebookClick?: () => void
  onAppleClick?: () => void
  disabled?: boolean
  className?: string
}

function SocialAuthGroup({
  onGoogleClick,
  onFacebookClick,
  onAppleClick,
  disabled,
  className,
}: SocialAuthGroupProps) {
  return (
    <div className={cn('flex w-full flex-col gap-[26px]', className)}>
      <SocialAuthButton provider="google" onClick={onGoogleClick} disabled={disabled} />
      <SocialAuthButton provider="facebook" onClick={onFacebookClick} disabled={disabled} />
      <SocialAuthButton provider="apple" onClick={onAppleClick} disabled={disabled} />
    </div>
  )
}

export { SocialAuthButton, SocialAuthGroup }
