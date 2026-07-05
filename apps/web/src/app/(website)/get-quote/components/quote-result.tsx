'use client'

import { useState } from 'react'
import { Button, CoverageSlider, formatMoney, cn } from '@wrapa/ui'
import { toast } from 'sonner'
import Link from 'next/link'

function CheckIcon() {
  return (
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function ArrowRightIcon() {
  return (
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

interface QuoteData {
  productType: 'insurance' | 'hmo'
  insuranceClasses?: string[]
  gender?: string
  location?: string
  annualIncome?: string
  fullName?: string
  email?: string
  phone?: string
  coverageDuration?: string
  sumAssured?: string
  [key: string]: unknown
}

interface Props {
  quoteData: QuoteData
  onBack: () => void
}

const CURRENCY = 'KES'
const DURATION_OPTIONS = [1, 2, 5, 10, 20]

// TODO: Replace with real API call to pricing engine
function mockEstimate(
  productType: 'insurance' | 'hmo',
  coverageAmount: number,
  durationYears: number,
  extras: QuoteData
): { low: number; high: number } {
  if (productType === 'hmo') {
    const base = 36_000
    return { low: Math.round(base * 0.9), high: Math.round(base * 1.2) }
  }
  // Insurance: rough 0.3–0.5% of coverage per year
  const perYear = coverageAmount * 0.004
  return {
    low: Math.round(perYear * durationYears * 0.85),
    high: Math.round(perYear * durationYears * 1.15),
  }
}

function labelClass(cls: string) {
  const map: Record<string, string> = {
    motor: 'Motor',
    home: 'Home / Property',
    travel: 'Travel',
    life: 'Life',
    business: 'Business',
  }
  return map[cls] ?? cls
}

export function QuoteResult({ quoteData, onBack }: Props) {
  const isInsurance = quoteData.productType === 'insurance'
  const defaultCoverage = isInsurance ? 1_000_000 : 300_000
  const [coverageAmount, setCoverageAmount] = useState(defaultCoverage)
  const [duration, setDuration] = useState(isInsurance ? 5 : 1)

  const { low, high } = mockEstimate(quoteData.productType, coverageAmount, duration, quoteData)
  const [sent, setSent] = useState(false)

  function handleSendEmail() {
    // TODO: Wire to real email API via @wrapa/api-client
    setSent(true)
    toast.success(`Quote sent to ${quoteData.email}!`)
  }

  const summaryRows = [
    { label: 'Product', value: isInsurance ? 'Insurance Policy' : 'HMO / Health Plan' },
    isInsurance && quoteData.insuranceClasses?.length
      ? {
          label: 'Cover type',
          value: (quoteData.insuranceClasses as string[]).map(labelClass).join(', '),
        }
      : null,
    { label: 'Location', value: quoteData.location ?? '-' },
    { label: 'Duration', value: `${duration} year${duration > 1 ? 's' : ''}` },
    {
      label: 'Coverage amount',
      value: formatMoney(coverageAmount, CURRENCY),
    },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-sm text-black/50 hover:text-black transition-colors"
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

      <h1 className="font-serif text-[32px] sm:text-[40px] font-bold text-black/90 mb-2">
        Your estimate
      </h1>
      <p className="text-[15px] text-black/50 mb-8">
        This is a preliminary estimate based on the information you provided. A licensed advisor
        will confirm exact pricing.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ── Left: Summary & CTAs ── */}
        <div className="flex-1 min-w-0">
          {/* Estimate range */}
          <div className="rounded-[14px] bg-black text-white p-6 mb-6">
            <p className="text-[13px] uppercase tracking-wider text-white/60 mb-1">
              Estimated annual cost
            </p>
            <p className="font-serif text-[36px] sm:text-[44px] font-bold leading-tight">
              {formatMoney(low, CURRENCY)}
              <span className="text-white/60 text-[24px] mx-2">–</span>
              {formatMoney(high, CURRENCY)}
            </p>
            <p className="text-[13px] text-white/60 mt-1">per year · estimates only</p>
          </div>

          {/* Summary table */}
          <div className="rounded-[12px] border border-black/10 overflow-hidden mb-6">
            {summaryRows.map((row, i) => (
              <div
                key={row.label}
                className={cn(
                  'flex justify-between items-start px-5 py-3 gap-4',
                  i < summaryRows.length - 1 ? 'border-b border-black/8' : '',
                  i % 2 === 0 ? 'bg-white' : 'bg-black/[0.02]'
                )}
              >
                <span className="text-[14px] text-black/50 shrink-0">{row.label}</span>
                <span className="text-[14px] font-medium text-black/80 text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              size="lg"
              fullWidth
              onClick={handleSendEmail}
              disabled={sent}
              className="flex items-center justify-center gap-2"
            >
              <MailIcon />
              {sent ? 'Quote sent!' : 'Send quote to my email'}
            </Button>
            <Button variant="outline" size="lg" fullWidth asChild>
              <Link href="/sign-up" className="flex items-center justify-center gap-2">
                Create an account to buy this plan
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>

          {sent && (
            <div className="mt-4 flex items-center gap-2 text-[14px] text-green-600">
              <CheckIcon />
              <span>
                A detailed quote has been sent to <strong>{quoteData.email}</strong>
              </span>
            </div>
          )}
        </div>

        {/* ── Right: Interactive panel ── */}
        <div className="w-full lg:w-[340px] shrink-0 rounded-[14px] bg-slate-50 border border-slate-200 p-6">
          <p className="font-sans text-[14px] font-bold text-black/40 uppercase tracking-wider mb-5">
            Adjust your quote
          </p>

          <div className="mb-6">
            <p className="font-sans text-[14px] font-semibold text-black/70 mb-3">
              Coverage amount
            </p>
            <CoverageSlider
              value={coverageAmount}
              onChange={setCoverageAmount}
              min={isInsurance ? 100_000 : 50_000}
              max={isInsurance ? 10_000_000 : 1_000_000}
              step={isInsurance ? 100_000 : 50_000}
              formatLabel={(v) => formatMoney(v, CURRENCY)}
            />
          </div>

          <div>
            <p className="font-sans text-[14px] font-semibold text-black/70 mb-3">
              Duration (years)
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setDuration(yr)}
                  className={cn(
                    'h-10 w-16 rounded-[8px] border-2 font-sans text-sm font-semibold transition-all',
                    duration === yr
                      ? 'border-black bg-white text-black'
                      : 'border-black/20 bg-transparent text-black/60 hover:border-black/40'
                  )}
                >
                  {yr}yr
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200">
            <p className="text-[13px] text-black/40 leading-relaxed">
              Adjusting coverage amount or duration instantly recalculates your estimate range
              above.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
