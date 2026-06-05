'use client'

import { useForm, z } from '@wrapa/forms'
import { OnboardingNavButtons, TextField } from '@wrapa/ui'

// ── Schema ────────────────────────────────────────────────────────────────────

const addressInfoSchema = z.object({
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
})

export type AddressInfoData = z.infer<typeof addressInfoSchema>

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

export interface AddressInfoStepProps {
  onSubmit: (data: AddressInfoData) => void
  onBack: () => void
  defaultValues?: Partial<AddressInfoData>
  isLoading?: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AddressInfoStep({
  onSubmit,
  onBack,
  defaultValues,
  isLoading = false,
}: AddressInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInfoData>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: {
      streetAddress: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      ...defaultValues,
    },
  })

  const handleContinue = handleSubmit((data) => onSubmit(data))

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[6px]">
        <h2 className="font-sans text-[22px] font-bold text-black sm:text-[24px]">
          Address Information
        </h2>
        <p className="font-sans text-[14px] text-black/60 sm:text-[15px]">Where are you based?</p>
      </div>

      <div className="mt-6 flex flex-col gap-[28px] sm:gap-[32px]">
        <TextField
          label="Street Address"
          placeholder="Enter your street address"
          disabled={isLoading}
          error={errors.streetAddress?.message}
          {...register('streetAddress')}
        />

        {/* City + State side by side on desktop */}
        <div className="flex flex-col gap-[28px] sm:flex-row sm:gap-[16px]">
          <div className="flex-1">
            <TextField
              label="City"
              placeholder="Enter your city"
              disabled={isLoading}
              error={errors.city?.message}
              {...register('city')}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="State / County"
              placeholder="Enter your state"
              disabled={isLoading}
              error={errors.state?.message}
              {...register('state')}
            />
          </div>
        </div>

        {/* Country + Postal Code side by side on desktop */}
        <div className="flex flex-col gap-[28px] sm:flex-row sm:gap-[16px]">
          <div className="flex-1">
            <TextField
              label="Country"
              placeholder="e.g. Kenya"
              disabled={isLoading}
              error={errors.country?.message}
              {...register('country')}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Postal Code"
              placeholder="e.g. 00100"
              disabled={isLoading}
              error={errors.postalCode?.message}
              {...register('postalCode')}
            />
          </div>
        </div>
      </div>

      <OnboardingNavButtons onBack={onBack} onContinue={handleContinue} isLoading={isLoading} />
    </div>
  )
}
