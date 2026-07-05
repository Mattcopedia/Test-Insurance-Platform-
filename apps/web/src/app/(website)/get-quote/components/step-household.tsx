'use client'

import { TextField, YesNoToggle, QuoteContextCard } from '@wrapa/ui'
import { useForm, z, zodResolver } from '@wrapa/forms'
import { QuoteStepWrapper } from './quote-step-wrapper'

const schema = z.object({
  hasSpouse: z.boolean({
    error: (issue) =>
      issue.input === undefined ? 'Please answer this question' : 'Please answer this question',
  }),
  hasChildren: z.boolean({
    error: (issue) =>
      issue.input === undefined ? 'Please answer this question' : 'Please answer this question',
  }),
  isEmployed: z.boolean({
    error: (issue) =>
      issue.input === undefined ? 'Please answer this question' : 'Please answer this question',
  }),
  annualIncome: z.string().min(1, 'Annual income is required'),
})

type StepData = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<StepData>
  onSubmit: (data: StepData) => void
  onBack: () => void
}

export function StepHousehold({ defaultValues, onSubmit, onBack }: Props) {
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

  const hasSpouse = watch('hasSpouse')
  const hasChildren = watch('hasChildren')
  const isEmployed = watch('isEmployed')

  const QUESTIONS = [
    { label: 'Do you have a spouse or partner?', field: 'hasSpouse' as const, value: hasSpouse },
    {
      label: 'Do you have children (or plan to)?',
      field: 'hasChildren' as const,
      value: hasChildren,
    },
    {
      label: 'Are you employed or self-employed?',
      field: 'isEmployed' as const,
      value: isEmployed,
    },
  ]

  return (
    <QuoteStepWrapper
      heading="Next, household and income"
      onBack={onBack}
      onContinue={handleSubmit(onSubmit)}
      continueDisabled={!isValid}
    >
      <div className="flex flex-col gap-7">
        {QUESTIONS.map(({ label, field, value }) => (
          <div key={field} className="flex flex-col gap-3">
            <p className="font-sans text-[15px] font-semibold text-black/80">{label}</p>
            <YesNoToggle
              value={value ?? null}
              onChange={(v) => setValue(field, v, { shouldValidate: true })}
            />
            {errors[field] && (
              <p className="text-sm text-red-500">
                {(errors[field] as { message?: string })?.message}
              </p>
            )}
          </div>
        ))}

        {/* Income with context card */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-1 w-full">
            <TextField
              label="Annual individual income"
              placeholder="e.g. 1,200,000"
              type="text"
              {...register('annualIncome')}
              error={errors.annualIncome?.message}
            />
          </div>
          <QuoteContextCard
            heading="What is your annual individual income?"
            body="This is your total earnings, including salary, wages, commissions, bonuses, investments, and more. You can estimate this value based on your last tax return."
            className="w-full lg:w-[260px] shrink-0 block"
          />
        </div>
      </div>
    </QuoteStepWrapper>
  )
}
