'use client'

import { Button, cn } from '@wrapa/ui'

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

interface QuoteStepWrapperProps {
  heading: string
  subheading?: string
  children: React.ReactNode
  onContinue: () => void
  onBack?: () => void
  continueDisabled?: boolean
  continueLabel?: string
  showBack?: boolean
}

export function QuoteStepWrapper({
  heading,
  subheading,
  children,
  onContinue,
  onBack,
  continueDisabled = false,
  continueLabel = 'Continue',
  showBack = true,
}: QuoteStepWrapperProps) {
  return (
    <div className="w-full max-w-[680px] mx-auto px-4 sm:px-6">
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            'mb-6 flex items-center gap-1.5 text-sm text-black/50 hover:text-black transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded'
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Back
        </button>
      )}

      <h1 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black/90 mb-2 leading-tight">
        {heading}
      </h1>
      {subheading && (
        <p className="text-[15px] sm:text-[16px] text-black/55 mb-8 leading-relaxed">
          {subheading}
        </p>
      )}
      {!subheading && <div className="mb-8" />}

      {children}

      <div className="mt-8 flex flex-col gap-3">
        <Button
          type="button"
          size="lg"
          fullWidth
          disabled={continueDisabled}
          onClick={onContinue}
          className={cn(continueDisabled && 'opacity-40 cursor-not-allowed')}
        >
          {continueLabel}
        </Button>
        <div className="flex items-center justify-center gap-1.5 text-[13px] text-black/40">
          <LockIcon />
          <span>Your personal information is kept secure.</span>
        </div>
      </div>
    </div>
  )
}
