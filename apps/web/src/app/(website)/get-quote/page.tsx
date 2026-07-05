'use client'

import { useState } from 'react'
import { QuoteProgressBar } from './components/quote-progress-bar'
import { StepProductType } from './components/step-product-type'
import { StepInsuranceClass } from './components/step-insurance-class'
import { StepPersonalDetails } from './components/step-personal-details'
import { StepHousehold } from './components/step-household'
import { StepInsuranceDetails } from './components/step-insurance-details'
import { StepHmoDetails } from './components/step-hmo-details'
import { StepContact } from './components/step-contact'
import { QuoteResult } from './components/quote-result'

type ProductType = 'insurance' | 'hmo' | null

// Step IDs used in navigation
type StepId =
  | 'product-type'
  | 'insurance-class'
  | 'personal-details'
  | 'household'
  | 'insurance-details'
  | 'hmo-details'
  | 'contact'
  | 'result'

function buildSteps(productType: ProductType): StepId[] {
  if (!productType) return ['product-type']
  if (productType === 'insurance') {
    return [
      'product-type',
      'insurance-class',
      'personal-details',
      'household',
      'insurance-details',
      'contact',
      'result',
    ]
  }
  return ['product-type', 'personal-details', 'household', 'hmo-details', 'contact', 'result']
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AccumulatedData = Record<string, any>

export default function GetQuotePage() {
  const [productType, setProductType] = useState<ProductType>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [data, setData] = useState<AccumulatedData>({})

  const steps = buildSteps(productType)
  const totalSteps = steps.length - 1 // exclude result from progress count
  const currentStepId = steps[stepIndex]

  // currentStep starts at 1 for progress bar; result is shown at totalSteps+1
  const progressStep = Math.min(stepIndex + 1, totalSteps)

  function mergeAndAdvance(stepData: AccumulatedData) {
    const merged = { ...data, ...stepData }
    setData(merged)
    setStepIndex((i) => i + 1)
  }

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1))
  }

  return (
    <div className="min-h-screen bg-white">
      {currentStepId !== 'result' && (
        <QuoteProgressBar currentStep={progressStep} totalSteps={totalSteps} />
      )}

      <div className="pt-16 pb-20 flex flex-col items-center">
        {/* WRAPA wordmark when in flow */}
        <div className="w-full max-w-[1000px] px-4 sm:px-6 mb-10">
          <a href="/" className="font-serif text-[22px] font-bold text-black">
            WRAPA
          </a>
        </div>

        {currentStepId === 'product-type' && (
          <StepProductType
            defaultValues={data}
            onSubmit={(stepData) => {
              setProductType(stepData.productType)
              // Rebuild step list with known productType so we advance into the right branch
              const nextSteps = buildSteps(stepData.productType)
              setData({ ...data, ...stepData })
              setStepIndex(1)
              // Ensure steps will be rebuilt with new productType on next render
              void nextSteps
            }}
          />
        )}

        {currentStepId === 'insurance-class' && (
          <StepInsuranceClass defaultValues={data} onSubmit={mergeAndAdvance} onBack={goBack} />
        )}

        {currentStepId === 'personal-details' && (
          <StepPersonalDetails defaultValues={data} onSubmit={mergeAndAdvance} onBack={goBack} />
        )}

        {currentStepId === 'household' && (
          <StepHousehold defaultValues={data} onSubmit={mergeAndAdvance} onBack={goBack} />
        )}

        {currentStepId === 'insurance-details' && (
          <StepInsuranceDetails
            insuranceClasses={data.insuranceClasses ?? []}
            defaultValues={data}
            onSubmit={mergeAndAdvance}
            onBack={goBack}
          />
        )}

        {currentStepId === 'hmo-details' && (
          <StepHmoDetails defaultValues={data} onSubmit={mergeAndAdvance} onBack={goBack} />
        )}

        {currentStepId === 'contact' && (
          <StepContact defaultValues={data} onSubmit={mergeAndAdvance} onBack={goBack} />
        )}

        {currentStepId === 'result' && (
          <QuoteResult
            quoteData={data as Parameters<typeof QuoteResult>[0]['quoteData']}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  )
}
