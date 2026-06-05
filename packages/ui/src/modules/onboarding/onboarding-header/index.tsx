import * as React from 'react'
import { cn } from '../../../cn'

export interface OnboardingHeaderProps {
  steps: Array<{ title: string }>
  currentStep: 1 | 2 | 3
  logo?: React.ReactNode
}

function OnboardingHeader({ steps, currentStep, logo }: OnboardingHeaderProps) {
  return (
    <header className="w-full border-b border-black/10 bg-white px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[960px]">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-[4px]">
          {logo ?? (
            <span className="font-sans text-[22px] font-bold leading-none tracking-tight text-black sm:text-[24px]">
              WRAPA
            </span>
          )}
          <p className="font-sans text-[13px] font-normal text-black/50 sm:text-[14px]">
            Sign up and start using WRAPA
          </p>
        </div>

        {/* Step progress indicators */}
        <div className="mt-6 flex items-start" role="list" aria-label="Onboarding steps">
          {steps.map((step, index) => {
            const stepNum = (index + 1) as 1 | 2 | 3
            const isCompleted = stepNum < currentStep
            const isActive = stepNum === currentStep

            return (
              <React.Fragment key={index}>
                <div
                  className="flex flex-col items-center gap-[8px]"
                  role="listitem"
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      'flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border-2',
                      'font-sans text-[13px] font-bold leading-none transition-all duration-200',
                      isCompleted && 'border-black bg-black text-white',
                      isActive &&
                        'border-black bg-white text-black shadow-[0_0_0_3px_rgba(0,0,0,0.08)]',
                      !isCompleted && !isActive && 'border-black/20 bg-white text-black/30'
                    )}
                  >
                    {isCompleted ? (
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden>
                        <path
                          d="M1.5 5L5 8.5L11.5 1.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>

                  {/* Step title */}
                  <span
                    className={cn(
                      'max-w-[72px] text-center font-sans text-[11px] leading-tight sm:max-w-[96px] sm:text-[12px]',
                      isActive ? 'font-semibold text-black' : 'font-normal text-black/40'
                    )}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 mt-4 h-[2px] flex-1 transition-all duration-300 sm:mx-4',
                      stepNum < currentStep ? 'bg-black' : 'bg-black/12'
                    )}
                    aria-hidden
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export { OnboardingHeader }
export type { OnboardingHeaderProps }
