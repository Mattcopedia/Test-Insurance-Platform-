import { cn } from '@wrapa/ui'

interface QuoteProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function QuoteProgressBar({ currentStep, totalSteps }: QuoteProgressBarProps) {
  const pct = Math.round((currentStep / totalSteps) * 100)
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/10">
      <div
        className={cn('h-full bg-black transition-all duration-500 ease-out')}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${currentStep} of ${totalSteps}`}
      />
    </div>
  )
}
