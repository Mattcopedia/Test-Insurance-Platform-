'use client'

import * as React from 'react'
import { PortalCard } from '../../../primitives/portal-card'
import { cn } from '../../../cn'

export type VerificationMethod = 'bvn' | 'id-card' | 'passport'

export interface VerificationMethodSelectorProps {
  selectedMethod: VerificationMethod | null
  onSelect: (method: VerificationMethod) => void
}

const METHODS: Array<{
  id: VerificationMethod
  title: string
  description: string
  icon: React.ReactNode
}> = [
  {
    id: 'bvn',
    title: 'BVN',
    description: 'Verify using your Bank Verification Number',
    icon: <BvnIcon />,
  },
  {
    id: 'id-card',
    title: 'National ID Card',
    description: 'Verify using your National Identity Card',
    icon: <IdCardIcon />,
  },
  {
    id: 'passport',
    title: 'International Passport',
    description: 'Verify using your International Passport',
    icon: <PassportIcon />,
  },
]

function VerificationMethodSelector({ selectedMethod, onSelect }: VerificationMethodSelectorProps) {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[6px]">
        <h2 className="font-sans text-[20px] font-bold text-black sm:text-[22px]">
          Identity Verification
        </h2>
        <p className="font-sans text-[14px] font-normal text-black/60 sm:text-[15px]">
          Choose a method to verify your identity
        </p>
      </div>

      <div className="flex flex-col gap-[14px]">
        {METHODS.map(({ id, title, description, icon }) => (
          <div
            key={id}
            className={cn(
              'rounded-[10px] ring-2 transition-all duration-150',
              selectedMethod === id ? 'ring-black' : 'ring-transparent'
            )}
          >
            <PortalCard
              variant="client"
              title={title}
              description={description}
              icon={icon}
              selected={selectedMethod === id}
              onClick={() => onSelect(id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Inline icons ── */

function BvnIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect width="36" height="36" rx="8" fill="#F4F4F4" />
      <path
        d="M18 8C12.477 8 8 12.477 8 18s4.477 10 10 10 10-4.477 10-10S23.523 8 18 8z"
        stroke="#000"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 18h8M18 14v8" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IdCardIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect width="36" height="36" rx="8" fill="#F4F4F4" />
      <rect x="7" y="12" width="22" height="14" rx="2" stroke="#000" strokeWidth="1.6" />
      <circle cx="13" cy="19" r="2.5" stroke="#000" strokeWidth="1.6" />
      <path
        d="M18 16.5h7M18 19.5h5M18 22.5h7"
        stroke="#000"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PassportIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect width="36" height="36" rx="8" fill="#F4F4F4" />
      <rect x="9" y="7" width="18" height="22" rx="2" stroke="#000" strokeWidth="1.6" />
      <circle cx="18" cy="17" r="3.5" stroke="#000" strokeWidth="1.6" />
      <path d="M12 25h12M12 13h4M20 13h4" stroke="#000" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export { VerificationMethodSelector }
