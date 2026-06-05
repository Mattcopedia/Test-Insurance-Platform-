import * as React from 'react'
import { OnboardingHeader } from '../onboarding-header'

export interface OnboardingLayoutProps {
  steps: Array<{ title: string }>
  currentStep: 1 | 2 | 3
  children: React.ReactNode
}

function OnboardingLayout({ steps, currentStep, children }: OnboardingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <OnboardingHeader steps={steps} currentStep={currentStep} />
      <main className="flex flex-1 flex-col items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="w-full max-w-[600px]">{children}</div>
      </main>
    </div>
  )
}

export { OnboardingLayout }
