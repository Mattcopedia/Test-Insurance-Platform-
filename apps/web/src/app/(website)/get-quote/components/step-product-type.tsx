'use client'

import { OptionSelector } from '@wrapa/ui'
import { useForm } from '@wrapa/forms'
import { QuoteStepWrapper } from './quote-step-wrapper'

function ShieldIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

interface StepData {
  productType: 'insurance' | 'hmo'
}

interface Props {
  defaultValues?: Partial<StepData>
  onSubmit: (data: StepData) => void
}

const PRODUCT_OPTIONS = [
  {
    id: 'insurance',
    icon: <ShieldIcon />,
    title: 'Insurance Policy',
    subtitle: 'Motor, home, travel, life & business cover',
  },
  {
    id: 'hmo',
    icon: <HeartIcon />,
    title: 'HMO / Health Plan',
    subtitle: 'Managed healthcare & hospital network access',
  },
]

export function StepProductType({ defaultValues, onSubmit }: Props) {
  const { watch, setValue } = useForm<StepData>({
    defaultValues: { productType: defaultValues?.productType ?? ('' as 'insurance') },
  })
  const productType = watch('productType')

  return (
    <QuoteStepWrapper
      heading="Let's get your quote"
      subheading="What type of cover are you looking for?"
      showBack={false}
      onContinue={() => {
        if (productType) onSubmit({ productType })
      }}
      continueDisabled={!productType}
    >
      <OptionSelector
        options={PRODUCT_OPTIONS}
        value={productType ?? ''}
        onChange={(v) => setValue('productType', v as 'insurance' | 'hmo')}
        columns={2}
      />
    </QuoteStepWrapper>
  )
}
