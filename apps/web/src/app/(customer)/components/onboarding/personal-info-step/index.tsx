'use client'

import { useForm, z } from '@wrapa/forms'
import { OnboardingNavButtons } from '@wrapa/ui'
import { TextField, cn } from '@wrapa/ui'
import * as React from 'react'

// ── Schema ────────────────────────────────────────────────────────────────────

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Use DD/MM/YYYY format'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s\-]{9,}$/, 'Enter a valid phone number'),
  gender: z.string().min(1, 'Gender is required'),
})

export type PersonalInfoData = z.infer<typeof personalInfoSchema>

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

export interface PersonalInfoStepProps {
  onSubmit: (data: PersonalInfoData) => void
  defaultValues?: Partial<PersonalInfoData>
  isLoading?: boolean
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PersonalInfoStep({
  onSubmit,
  defaultValues,
  isLoading = false,
}: PersonalInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phoneNumber: '',
      gender: '',
      ...defaultValues,
    },
  })

  const handleContinue = handleSubmit((data) => onSubmit(data))

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[6px]">
        <h2 className="font-sans text-[22px] font-bold text-black sm:text-[24px]">
          Personal Information
        </h2>
        <p className="font-sans text-[14px] text-black/60 sm:text-[15px]">
          Tell us a little about yourself
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-[28px] sm:gap-[32px]">
        {/* First Name + Last Name side by side on desktop */}
        <div className="flex flex-col gap-[28px] sm:flex-row sm:gap-[16px]">
          <div className="flex-1">
            <TextField
              label="First Name"
              placeholder="Enter your first name"
              disabled={isLoading}
              error={errors.firstName?.message}
              {...register('firstName')}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Last Name"
              placeholder="Enter your last name"
              disabled={isLoading}
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>
        </div>

        <TextField
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          disabled={isLoading}
          error={errors.dateOfBirth?.message}
          helperText="Format: DD/MM/YYYY"
          {...register('dateOfBirth')}
        />

        <TextField
          label="Phone Number"
          type="tel"
          placeholder="+254 7XX XXX XXX"
          disabled={isLoading}
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />

        {/* Gender — native select styled to match TextField */}
        <GenderSelect
          label="Gender"
          error={errors.gender?.message}
          disabled={isLoading}
          {...register('gender')}
        />
      </div>

      <OnboardingNavButtons onContinue={handleContinue} isLoading={isLoading} />
    </div>
  )
}

// ── GenderSelect — styled to match TextField visually ─────────────────────────

interface GenderSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

const GenderSelect = React.forwardRef<HTMLSelectElement, GenderSelectProps>(
  ({ label, error, disabled, id, className, ...props }, ref) => {
    const generatedId = React.useId()
    const selectId = id ?? generatedId
    return (
      <div className="flex w-full flex-col gap-[12px]">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'font-sans text-[20px] font-medium leading-[19.833px] text-black/50',
              disabled && 'opacity-40'
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            'relative flex h-[60px] w-full items-center',
            'rounded-[10px] bg-white',
            'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.10)]',
            'ring-1 ring-transparent transition-shadow duration-150',
            'focus-within:ring-black/20',
            error && 'ring-red-400 focus-within:ring-red-500',
            disabled && 'opacity-40 cursor-not-allowed'
          )}
        >
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              'h-full w-full appearance-none bg-transparent',
              'rounded-[10px] px-[17px]',
              'font-sans text-[16px] font-normal text-black outline-none',
              'cursor-pointer disabled:cursor-not-allowed',
              className
            )}
            {...props}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {/* Chevron */}
          <span className="pointer-events-none absolute right-[17px] text-black/40" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {error && (
          <p role="alert" className="text-sm leading-tight text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)
GenderSelect.displayName = 'GenderSelect'
