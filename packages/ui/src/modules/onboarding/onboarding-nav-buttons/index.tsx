'use client'

import * as React from 'react'
import { Button } from '../../../primitives/button'
import { cn } from '../../../cn'

export interface OnboardingNavButtonsProps {
  onBack?: () => void
  onContinue: () => void
  continueLabel?: string
  isLoading?: boolean
  isLastStep?: boolean
}

function OnboardingNavButtons({
  onBack,
  onContinue,
  continueLabel,
  isLoading = false,
  isLastStep = false,
}: OnboardingNavButtonsProps) {
  const label = isLastStep ? 'Submit' : (continueLabel ?? 'Continue')

  return (
    <div
      className={cn(
        'mt-8 flex flex-col gap-3',
        onBack && 'sm:flex-row sm:items-center sm:justify-between'
      )}
    >
      {/* Continue — full-width on mobile, auto-width on desktop */}
      <Button
        type="button"
        onClick={onContinue}
        disabled={isLoading}
        aria-busy={isLoading}
        className={cn('w-full', onBack && 'sm:w-auto sm:min-w-[180px] sm:order-last')}
      >
        {isLoading ? 'Please wait…' : label}
      </Button>

      {/* Back — only rendered if handler is provided */}
      {onBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="w-full sm:w-auto sm:min-w-[140px]"
        >
          ← Back
        </Button>
      )}
    </div>
  )
}

export { OnboardingNavButtons }
