'use client'

import { Button, cn } from '@wrapa/ui'

export interface OnboardingCompleteStepProps {
  onGoToDashboard: () => void
  portalType: 'customer'
}

export function OnboardingCompleteStep({ onGoToDashboard }: OnboardingCompleteStepProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-12 text-center sm:px-8">
      {/* Success icon */}
      <div
        className={cn(
          'flex h-[88px] w-[88px] items-center justify-center rounded-full',
          'bg-black text-white shadow-[0px_8px_40px_rgba(0,0,0,0.15)]',
          'sm:h-[100px] sm:w-[100px]'
        )}
        aria-hidden
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="sm:h-[46px] sm:w-[46px]"
        >
          <path
            d="M8 20L16 28L32 12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="mt-8 font-sans text-[26px] font-bold leading-tight text-black sm:text-[30px]">
        You&apos;re all set!
      </h1>

      {/* Sub-message */}
      <p className="mt-3 max-w-[380px] font-sans text-[15px] font-normal leading-relaxed text-black/60 sm:text-[16px]">
        Your profile has been created and your identity is being verified. This usually takes less
        than a minute.
      </p>

      {/* Details card */}
      <div className="mt-8 w-full max-w-[400px] rounded-[14px] bg-black/[0.04] px-6 py-5 text-left">
        <p className="font-sans text-[13px] font-semibold uppercase tracking-widest text-black/40">
          What happens next
        </p>
        <ul className="mt-3 flex flex-col gap-[10px]">
          {[
            'Your documents are under review',
            'You will receive an email confirmation',
            'Access your dashboard while we verify',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-black text-white">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
                  <path
                    d="M1 3.5L3.5 6L8 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-sans text-[14px] text-black/70 sm:text-[15px]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-10 w-full max-w-[400px]">
        <Button type="button" onClick={onGoToDashboard}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
