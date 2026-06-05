'use client'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'
import { cn } from '../../cn'

/**
 * Extracted from Figma node 267:832 (sign in client page)
 *
 * Email field (nodes 941:1616–1620):
 *   box:         h-60px | rounded-[10px] | bg-white | shadow-[0px_4px_160px_0px_rgba(0,0,0,0.1)]
 *   label:       Karla Medium 20px | rgba(0,0,0,0.5) | positioned ABOVE the box (~12px gap)
 *   placeholder: Karla Regular 16px | rgba(0,0,0,0.4) | px-[17px]
 *
 * Password field (nodes 941:1621–1625):
 *   same box style + eye-toggle icon on the right at right-[17px]
 */

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label rendered above the input box — matches Figma "Email" / "Password" label style */
  label?: string
  /** Input type. When "password", an eye-toggle button is rendered on the right */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  /** Validation error — shown below the input in red, input border shifts to red */
  error?: string
  /** Subtle helper text shown below the input when there is no error */
  helperText?: string
  /** Optional icon/element rendered on the left inside the box */
  leftIcon?: React.ReactNode
  /**
   * Optional icon/element rendered on the right inside the box.
   * Ignored when type="password" — the eye toggle takes that slot.
   */
  rightIcon?: React.ReactNode
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      label,
      type = 'text',
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const isPassword = type === 'password'
    const [showPassword, setShowPassword] = React.useState(false)

    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="flex w-full flex-col gap-[12px]">
        {/* ── Label (above box, matches Figma node 941:1618 / 941:1623) ── */}
        {label && (
          <LabelPrimitive.Root
            htmlFor={inputId}
            className={cn(
              'font-sans text-[20px] font-medium leading-[19.833px] text-black/50',
              disabled && 'opacity-40'
            )}
          >
            {label}
          </LabelPrimitive.Root>
        )}

        {/* ── Input box (matches Figma node 941:1617 / 941:1622) ── */}
        <div
          className={cn(
            'relative flex h-[60px] w-full items-center',
            'rounded-[10px] bg-white',
            // Figma shadow: 0px 4px 160px 0px rgba(0,0,0,0.1)
            'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.10)]',
            // Focus-within: subtle border so the focused state is clear
            'ring-1 ring-transparent transition-shadow duration-150',
            'focus-within:ring-black/20',
            // Error state: swap ring to red
            error && 'ring-red-400 focus-within:ring-red-500',
            disabled && 'opacity-40 cursor-not-allowed'
          )}
        >
          {/* Left icon */}
          {leftIcon && (
            <span className="pointer-events-none absolute left-[17px] flex shrink-0 items-center text-black/40">
              {leftIcon}
            </span>
          )}

          {/* ── <input> (matches Figma node 941:1619 / 941:1624) ── */}
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            className={cn(
              'h-full w-full bg-transparent',
              'rounded-[10px]',
              // Horizontal padding — 17px matches Figma 3.54% × 480px
              'px-[17px]',
              leftIcon && 'pl-[45px]',
              (isPassword || rightIcon) && 'pr-[45px]',
              // Text style — Karla Regular 16px rgba(0,0,0,0.4) for placeholder
              'font-sans text-[16px] font-normal leading-[19.833px] text-black',
              'placeholder:text-black/40 placeholder:font-normal',
              // Remove browser chrome
              'outline-none border-none',
              // Password autofill bg fix
              'autofill:bg-white [&:-webkit-autofill]:bg-white',
              disabled && 'cursor-not-allowed',
              className
            )}
            {...props}
          />

          {/* Password eye-toggle (right, matches Figma node 941:1625) */}
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
              className={cn(
                'absolute right-[17px] flex shrink-0 items-center',
                'text-black/40 hover:text-black/60 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded',
                disabled && 'pointer-events-none'
              )}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}

          {/* Custom right icon (non-password fields) */}
          {!isPassword && rightIcon && (
            <span className="pointer-events-none absolute right-[17px] flex shrink-0 items-center text-black/40">
              {rightIcon}
            </span>
          )}
        </div>

        {/* ── Error / helper text ── */}
        {error && (
          <p role="alert" className="text-sm leading-tight text-red-500">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-sm leading-tight text-black/40">{helperText}</p>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

// ── Inline SVG icons — avoids a react-icons import at the primitive level ──

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}

export { TextField }
