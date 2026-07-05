'use client'

import { TextField, YesNoToggle, OptionSelector } from '@wrapa/ui'
import { useForm, z, zodResolver } from '@wrapa/forms'
import { QuoteStepWrapper } from './quote-step-wrapper'

const schema = z.object({
  hasSpouseDependent: z.boolean({ required_error: 'Please answer this question' }),
  numChildren: z.string().min(1, 'Required'),
  preExistingConditions: z.array(z.string()).default([]),
  preferredCounty: z.string().min(1, 'Please enter your preferred county'),
})

type StepData = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<StepData>
  onSubmit: (data: StepData) => void
  onBack: () => void
}

const CONDITION_OPTIONS = [
  { id: 'diabetes', title: 'Diabetes' },
  { id: 'hypertension', title: 'Hypertension / Blood pressure' },
  { id: 'asthma', title: 'Asthma' },
  { id: 'heart', title: 'Heart condition' },
  { id: 'cancer', title: 'Cancer' },
  { id: 'hiv', title: 'HIV/AIDS' },
  { id: 'none', title: 'None of the above' },
]

export function StepHmoDetails({ defaultValues, onSubmit, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<StepData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { preExistingConditions: [], ...defaultValues },
  })

  const hasSpouseDependent = watch('hasSpouseDependent')
  const preExistingConditions = watch('preExistingConditions')

  return (
    <QuoteStepWrapper
      heading="Tell us about your health needs"
      subheading="This helps us match you to the right HMO plan."
      onBack={onBack}
      onContinue={handleSubmit(onSubmit)}
      continueDisabled={!isValid}
    >
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p className="font-sans text-[15px] font-semibold text-black/80">
            Is your spouse a dependant on this plan?
          </p>
          <YesNoToggle
            value={hasSpouseDependent ?? null}
            onChange={(v) => setValue('hasSpouseDependent', v, { shouldValidate: true })}
          />
          {errors.hasSpouseDependent && (
            <p className="text-sm text-red-500">{errors.hasSpouseDependent.message}</p>
          )}
        </div>

        <TextField
          label="Number of children to cover"
          placeholder="0"
          type="number"
          {...register('numChildren')}
          error={errors.numChildren?.message}
        />

        <div className="flex flex-col gap-3">
          <p className="font-sans text-[15px] font-semibold text-black/80">
            Pre-existing medical conditions
          </p>
          <p className="text-[13px] text-black/50">
            Select all that apply. This will not disqualify you.
          </p>
          <OptionSelector
            options={CONDITION_OPTIONS}
            value={preExistingConditions ?? []}
            onChange={(v) =>
              setValue('preExistingConditions', Array.isArray(v) ? v : [v], {
                shouldValidate: true,
              })
            }
            multiple
            columns={2}
          />
        </div>

        <TextField
          label="Preferred county for hospital network"
          placeholder="e.g. Nairobi"
          {...register('preferredCounty')}
          error={errors.preferredCounty?.message}
        />
      </div>
    </QuoteStepWrapper>
  )
}
