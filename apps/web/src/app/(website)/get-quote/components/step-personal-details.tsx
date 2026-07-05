'use client'

import { TextField } from '@wrapa/ui'
import { useForm, z, zodResolver } from '@wrapa/forms'
import { QuoteStepWrapper } from './quote-step-wrapper'

const schema = z.object({
  gender: z.enum(['male', 'female'], { error: 'Please select your gender' }),
  dobDay: z.string().min(1, 'Day required'),
  dobMonth: z.string().min(1, 'Month required'),
  dobYear: z.string().length(4, 'Enter 4-digit year'),
  location: z.string().min(1, 'Location required'),
})

type StepData = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<StepData>
  onSubmit: (data: StepData) => void
  onBack: () => void
}

export function StepPersonalDetails({ defaultValues, onSubmit, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<StepData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValues ?? {},
  })

  const gender = watch('gender')

  return (
    <QuoteStepWrapper
      heading="Tell us about yourself"
      subheading="This helps us estimate the right cover for you."
      onBack={onBack}
      onContinue={handleSubmit(onSubmit)}
      continueDisabled={!isValid}
    >
      <div className="flex flex-col gap-6">
        {/* Gender */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-[15px] font-medium text-black/50">Gender</p>
          <div className="flex gap-3">
            {(['male', 'female'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setValue('gender', g, { shouldValidate: true })}
                aria-pressed={gender === g}
                className={`flex-1 h-[52px] sm:h-[60px] rounded-[10px] border-2 font-sans text-base font-medium capitalize transition-all ${
                  gender === g
                    ? 'border-black bg-black/5 text-black font-bold'
                    : 'border-black/20 bg-white text-black/70 hover:border-black/50'
                }`}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
        </div>

        {/* Date of birth */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-[15px] font-medium text-black/50">Date of birth</p>
          <div className="grid grid-cols-3 gap-3">
            <TextField placeholder="DD" {...register('dobDay')} error={errors.dobDay?.message} />
            <TextField
              placeholder="MM"
              {...register('dobMonth')}
              error={errors.dobMonth?.message}
            />
            <TextField
              placeholder="YYYY"
              {...register('dobYear')}
              error={errors.dobYear?.message}
            />
          </div>
        </div>

        {/* Location */}
        <TextField
          label="County / State"
          placeholder="e.g. Nairobi"
          {...register('location')}
          error={errors.location?.message}
        />
      </div>
    </QuoteStepWrapper>
  )
}
