'use client'

import { OptionSelector } from '@wrapa/ui'
import { useForm } from '@wrapa/forms'
import { QuoteStepWrapper } from './quote-step-wrapper'

function TruckIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}
function HomeIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function PlaneIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22 11 13 2 9l20-7z" />
    </svg>
  )
}
function PersonIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function BriefcaseIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

interface StepData {
  insuranceClasses: string[]
}

interface Props {
  defaultValues?: Partial<StepData>
  onSubmit: (data: StepData) => void
  onBack: () => void
}

const CLASS_OPTIONS = [
  { id: 'motor', icon: <TruckIcon />, title: 'Motor', subtitle: 'Car, motorbike, vehicle cover' },
  { id: 'home', icon: <HomeIcon />, title: 'Home / Property', subtitle: 'Buildings & contents' },
  {
    id: 'travel',
    icon: <PlaneIcon />,
    title: 'Travel',
    subtitle: 'Domestic & international trips',
  },
  { id: 'life', icon: <PersonIcon />, title: 'Life', subtitle: 'Term & whole-life policies' },
  {
    id: 'business',
    icon: <BriefcaseIcon />,
    title: 'Business',
    subtitle: 'Commercial & liability cover',
  },
]

export function StepInsuranceClass({ defaultValues, onSubmit, onBack }: Props) {
  const { watch, setValue } = useForm<StepData>({
    defaultValues: { insuranceClasses: defaultValues?.insuranceClasses ?? [] },
  })
  const insuranceClasses = watch('insuranceClasses')

  return (
    <QuoteStepWrapper
      heading="What would you like to insure?"
      subheading="Select all that apply. You can quote multiple products at once."
      onBack={onBack}
      onContinue={() => {
        if (insuranceClasses.length > 0) onSubmit({ insuranceClasses })
      }}
      continueDisabled={insuranceClasses.length === 0}
    >
      <OptionSelector
        options={CLASS_OPTIONS}
        value={insuranceClasses}
        onChange={(v) => setValue('insuranceClasses', Array.isArray(v) ? v : [v])}
        multiple
        columns={2}
      />
    </QuoteStepWrapper>
  )
}
