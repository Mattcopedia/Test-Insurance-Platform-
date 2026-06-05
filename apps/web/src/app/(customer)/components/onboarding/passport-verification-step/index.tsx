'use client'

import { useForm, z } from '@wrapa/forms'
import { OnboardingNavButtons, TextField } from '@wrapa/ui'

// ── Schema — combines fields from Figma nodes 937-1413 + 949-2708 + 949-2815 ──

const passportSchema = z.object({
  passportNumber: z.string().min(1, 'Passport number is required'),
  surname: z.string().min(1, 'Surname is required'),
  givenNames: z.string().min(1, 'Given names are required'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
  gender: z.string().min(1, 'Gender is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  countryOfIssue: z.string().min(1, 'Country of issue is required'),
  issueDate: z
    .string()
    .min(1, 'Issue date is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
})

export type PassportVerificationData = z.infer<typeof passportSchema>

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

export interface PassportVerificationStepProps {
  onSubmit: (data: PassportVerificationData) => void
  onBack: () => void
  defaultValues?: Partial<PassportVerificationData>
  isLoading?: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PassportVerificationStep({
  onSubmit,
  onBack,
  defaultValues,
  isLoading = false,
}: PassportVerificationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassportVerificationData>({
    resolver: zodResolver(passportSchema),
    defaultValues: {
      passportNumber: '',
      surname: '',
      givenNames: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      countryOfIssue: '',
      issueDate: '',
      expiryDate: '',
      ...defaultValues,
    },
  })

  const handleContinue = handleSubmit((data) => onSubmit(data))

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[6px]">
        <h2 className="font-sans text-[22px] font-bold text-black sm:text-[24px]">
          Passport Verification
        </h2>
        <p className="font-sans text-[14px] text-black/60 sm:text-[15px]">
          Enter the details exactly as they appear on your passport
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-[28px] sm:gap-[32px]">
        <TextField
          label="Passport Number"
          placeholder="e.g. A12345678"
          disabled={isLoading}
          error={errors.passportNumber?.message}
          {...register('passportNumber')}
        />

        {/* Surname + Given Names */}
        <div className="flex flex-col gap-[28px] sm:flex-row sm:gap-[16px]">
          <div className="flex-1">
            <TextField
              label="Surname"
              placeholder="As on passport"
              disabled={isLoading}
              error={errors.surname?.message}
              {...register('surname')}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Given Names"
              placeholder="As on passport"
              disabled={isLoading}
              error={errors.givenNames?.message}
              {...register('givenNames')}
            />
          </div>
        </div>

        <TextField
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          helperText="Format: DD/MM/YYYY"
          disabled={isLoading}
          error={errors.dateOfBirth?.message}
          {...register('dateOfBirth')}
        />

        {/* Gender + Nationality */}
        <div className="flex flex-col gap-[28px] sm:flex-row sm:gap-[16px]">
          <div className="flex-1">
            <TextField
              label="Gender"
              placeholder="e.g. Male / Female"
              disabled={isLoading}
              error={errors.gender?.message}
              {...register('gender')}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Nationality"
              placeholder="e.g. Kenyan"
              disabled={isLoading}
              error={errors.nationality?.message}
              {...register('nationality')}
            />
          </div>
        </div>

        <TextField
          label="Country of Issue"
          placeholder="e.g. Kenya"
          disabled={isLoading}
          error={errors.countryOfIssue?.message}
          {...register('countryOfIssue')}
        />

        {/* Issue + Expiry dates */}
        <div className="flex flex-col gap-[28px] sm:flex-row sm:gap-[16px]">
          <div className="flex-1">
            <TextField
              label="Issue Date"
              placeholder="DD/MM/YYYY"
              helperText="Format: DD/MM/YYYY"
              disabled={isLoading}
              error={errors.issueDate?.message}
              {...register('issueDate')}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Expiry Date"
              placeholder="DD/MM/YYYY"
              helperText="Format: DD/MM/YYYY"
              disabled={isLoading}
              error={errors.expiryDate?.message}
              {...register('expiryDate')}
            />
          </div>
        </div>
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
