'use client'

import * as React from 'react'
import { OnboardingLayout, VerificationMethodSelector } from '@wrapa/ui'
import type { VerificationMethod } from '@wrapa/ui'

import { PersonalInfoStep } from '../components/onboarding/personal-info-step'
import { AddressInfoStep } from '../components/onboarding/address-info-step'
import { BvnVerificationStep } from '../components/onboarding/bvn-verification-step'
import { IdCardVerificationStep } from '../components/onboarding/id-card-verification-step'
import { PassportVerificationStep } from '../components/onboarding/passport-verification-step'
import { OnboardingCompleteStep } from '../components/onboarding/onboarding-complete-step'

import type { PersonalInfoData } from '../components/onboarding/personal-info-step'
import type { AddressInfoData } from '../components/onboarding/address-info-step'
import type { BvnVerificationData } from '../components/onboarding/bvn-verification-step'
import type { IdCardVerificationData } from '../components/onboarding/id-card-verification-step'
import type { PassportVerificationData } from '../components/onboarding/passport-verification-step'

// ── Constants ─────────────────────────────────────────────────────────────────

const STEPS = [
  { title: 'Personal Information' },
  { title: 'Address Information' },
  { title: 'Verification' },
] as const

// ── Types ─────────────────────────────────────────────────────────────────────

type FlowStep = 1 | 2 | 3 | 'complete'

type VerificationData = BvnVerificationData | IdCardVerificationData | PassportVerificationData

interface AccumulatedFormData {
  personalInfo?: PersonalInfoData
  addressInfo?: AddressInfoData
  verification?: VerificationData
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CustomerOnboardingPage() {
  const [step, setStep] = React.useState<FlowStep>(1)
  const [selectedVerificationMethod, setSelectedVerificationMethod] =
    React.useState<VerificationMethod | null>(null)
  const [accumulatedFormData, setAccumulatedFormData] = React.useState<AccumulatedFormData>({})

  // The header indicator clamps at step 3 (used for complete screen too)
  const headerStep = (step === 'complete' ? 3 : step) as 1 | 2 | 3

  // ── Step handlers ──────────────────────────────────────────────────────────

  function handlePersonalInfoSubmit(data: PersonalInfoData) {
    console.log('[onboarding] personal info:', data)
    setAccumulatedFormData((prev) => ({ ...prev, personalInfo: data }))
    setStep(2)
  }

  function handleAddressInfoSubmit(data: AddressInfoData) {
    console.log('[onboarding] address info:', data)
    setAccumulatedFormData((prev) => ({ ...prev, addressInfo: data }))
    setStep(3)
  }

  function handleVerificationSubmit(data: VerificationData) {
    console.log('[onboarding] verification:', data)
    console.log('[onboarding] all collected data:', {
      ...accumulatedFormData,
      verification: data,
      verificationMethod: selectedVerificationMethod,
    })
    setAccumulatedFormData((prev) => ({ ...prev, verification: data }))
    setStep('complete')
  }

  function handleGoToDashboard() {
    // Navigate to customer dashboard — replace with router.push('/customer-dashboard') when wired
    console.log('[onboarding] complete, navigating to dashboard')
  }

  // ── Render complete screen without layout header ───────────────────────────

  if (step === 'complete') {
    return (
      <OnboardingLayout steps={[...STEPS]} currentStep={3}>
        <OnboardingCompleteStep portalType="customer" onGoToDashboard={handleGoToDashboard} />
      </OnboardingLayout>
    )
  }

  // ── Main flow ──────────────────────────────────────────────────────────────

  return (
    <OnboardingLayout steps={[...STEPS]} currentStep={headerStep}>
      {/* ── Step 1: Personal Information ──────────────────────────────── */}
      {step === 1 && (
        <PersonalInfoStep
          onSubmit={handlePersonalInfoSubmit}
          defaultValues={accumulatedFormData.personalInfo}
        />
      )}

      {/* ── Step 2: Address Information ───────────────────────────────── */}
      {step === 2 && (
        <AddressInfoStep
          onSubmit={handleAddressInfoSubmit}
          onBack={() => setStep(1)}
          defaultValues={accumulatedFormData.addressInfo}
        />
      )}

      {/* ── Step 3a: Pick verification method ─────────────────────────── */}
      {step === 3 && selectedVerificationMethod === null && (
        <div className="flex flex-col gap-[8px]">
          <VerificationMethodSelector
            selectedMethod={selectedVerificationMethod}
            onSelect={setSelectedVerificationMethod}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="font-sans text-[15px] text-black/50 underline hover:text-black/80 transition-colors sm:order-first"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3b: BVN form ─────────────────────────────────────────── */}
      {step === 3 && selectedVerificationMethod === 'bvn' && (
        <BvnVerificationStep
          onSubmit={handleVerificationSubmit}
          onBack={() => setSelectedVerificationMethod(null)}
          defaultValues={
            accumulatedFormData.verification && 'bvn' in accumulatedFormData.verification
              ? (accumulatedFormData.verification as BvnVerificationData)
              : undefined
          }
        />
      )}

      {/* ── Step 3c: ID Card form ─────────────────────────────────────── */}
      {step === 3 && selectedVerificationMethod === 'id-card' && (
        <IdCardVerificationStep
          onSubmit={handleVerificationSubmit}
          onBack={() => setSelectedVerificationMethod(null)}
          defaultValues={
            accumulatedFormData.verification && 'idNumber' in accumulatedFormData.verification
              ? (accumulatedFormData.verification as IdCardVerificationData)
              : undefined
          }
        />
      )}

      {/* ── Step 3d: Passport form ────────────────────────────────────── */}
      {step === 3 && selectedVerificationMethod === 'passport' && (
        <PassportVerificationStep
          onSubmit={handleVerificationSubmit}
          onBack={() => setSelectedVerificationMethod(null)}
          defaultValues={
            accumulatedFormData.verification && 'passportNumber' in accumulatedFormData.verification
              ? (accumulatedFormData.verification as PassportVerificationData)
              : undefined
          }
        />
      )}
    </OnboardingLayout>
  )
}
