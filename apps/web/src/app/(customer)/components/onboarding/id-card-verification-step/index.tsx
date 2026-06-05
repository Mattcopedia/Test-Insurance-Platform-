'use client'

import { useForm, z } from '@wrapa/forms'
import { OnboardingNavButtons, TextField } from '@wrapa/ui'

// ── Schema — combines fields from Figma nodes 949-2567 + 949-2565 ─────────────

const idCardSchema = z.object({
  idType: z.string().min(1, 'ID type is required'),
  idNumber: z.string().min(1, 'ID number is required'),
  firstName: z.string().min(1, 'First name on ID is required'),
  lastName: z.string().min(1, 'Last name on ID is required'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
  issueDate: z
    .string()
    .min(1, 'Issue date is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
})

export type IdCardVerificationData = z.infer<typeof idCardSchema>

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

export interface IdCardVerificationStepProps {
  onSubmit: (data: IdCardVerificationData) => void
  onBack: () => void
  defaultValues?: Partial<IdCardVerificationData>
  isLoading?: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export function IdCardVerificationStep({
  onSubmit,
  onBack,
  defaultValues,
  isLoading = false,
}: IdCardVerificationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdCardVerificationData>({
    resolver: zodResolver(idCardSchema),
    defaultValues: {
      idType: '',
      idNumber: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
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
          National ID Verification
        </h2>
        <p className="font-sans text-[14px] text-black/60 sm:text-[15px]">
          Enter the details exactly as they appear on your ID card
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-[28px] sm:gap-[32px]">
        <TextField
          label="ID Type"
          placeholder="e.g. National ID, Voter's Card"
          disabled={isLoading}
          error={errors.idType?.message}
          {...register('idType')}
        />

        <TextField
          label="ID Number"
          placeholder="Enter your ID number"
          disabled={isLoading}
          error={errors.idNumber?.message}
          {...register('idNumber')}
        />

        {/* Name as on ID */}
        <div className="flex flex-col gap-[28px] sm:flex-row sm:gap-[16px]">
          <div className="flex-1">
            <TextField
              label="First Name (as on ID)"
              placeholder="Enter first name"
              disabled={isLoading}
              error={errors.firstName?.message}
              {...register('firstName')}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Last Name (as on ID)"
              placeholder="Enter last name"
              disabled={isLoading}
              error={errors.lastName?.message}
              {...register('lastName')}
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

        {/* Issue + Expiry side by side on desktop */}
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
