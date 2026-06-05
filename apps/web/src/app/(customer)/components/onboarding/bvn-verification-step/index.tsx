'use client'

import { useForm, z } from '@wrapa/forms'
import { OnboardingNavButtons, TextField } from '@wrapa/ui'

// ── Schema ────────────────────────────────────────────────────────────────────

const bvnSchema = z.object({
  bvn: z
    .string()
    .min(1, 'BVN is required')
    .regex(/^\d{11}$/, 'BVN must be exactly 11 digits'),
})

export type BvnVerificationData = z.infer<typeof bvnSchema>

// ── Inline resolver ───────────────────────────────────────────────────────────

function zodResolver<T extends z.ZodTypeAny>(schema: T) {
  return async (values: unknown) => {
    const result = schema.safeParse(values)
    if (result.success) return { values: result.data as z.infer<T>, errors: {} }
    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const key = issue.path.join('.')
      if (!errors[key]) errors[key] = { type: issue.code, message: issue.message }
    }
    return { values: {}, errors }
  }
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface BvnVerificationStepProps {
  onSubmit: (data: BvnVerificationData) => void
  onBack: () => void
  defaultValues?: Partial<BvnVerificationData>
  isLoading?: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BvnVerificationStep({
  onSubmit,
  onBack,
  defaultValues,
  isLoading = false,
}: BvnVerificationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BvnVerificationData>({
    resolver: zodResolver(bvnSchema),
    defaultValues: { bvn: '', ...defaultValues },
  })

  const handleContinue = handleSubmit((data) => onSubmit(data))

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[6px]">
        <h2 className="font-sans text-[22px] font-bold text-black sm:text-[24px]">
          BVN Verification
        </h2>
        <p className="font-sans text-[14px] text-black/60 sm:text-[15px]">
          Enter your 11-digit Bank Verification Number
        </p>
      </div>

      {/* Info callout */}
      <div className="mt-4 rounded-[10px] bg-black/[0.04] px-4 py-3">
        <p className="font-sans text-[13px] leading-relaxed text-black/60 sm:text-[14px]">
          Your BVN is a unique 11-digit number assigned to you by the Central Bank. You can find it
          by dialling <strong className="text-black/80">*565*0#</strong> on any registered mobile
          number.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-[28px] sm:gap-[32px]">
        <TextField
          label="BVN"
          type="number"
          placeholder="Enter your 11-digit BVN"
          disabled={isLoading}
          error={errors.bvn?.message}
          helperText="11-digit number"
          {...register('bvn')}
        />
      </div>

      <OnboardingNavButtons
        onBack={onBack}
        onContinue={handleContinue}
        isLoading={isLoading}
        isLastStep
      />
    </div>
  )
}
