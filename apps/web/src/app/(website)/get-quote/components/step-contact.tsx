'use client'

import { TextField } from '@wrapa/ui'
import { useForm, z, zodResolver } from '@wrapa/forms'
import { QuoteStepWrapper } from './quote-step-wrapper'

const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
})

type StepData = z.infer<typeof schema>

interface Props {
  defaultValues?: Partial<StepData>
  onSubmit: (data: StepData) => void
  onBack: () => void
}

export function StepContact({ defaultValues, onSubmit, onBack }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StepData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValues ?? {},
  })

  return (
    <QuoteStepWrapper
      heading="Almost done. Where should we send your quote?"
      subheading="We'll email you a detailed breakdown. No spam, ever."
      onBack={onBack}
      onContinue={handleSubmit(onSubmit)}
      continueDisabled={!isValid}
      continueLabel="Get My Quote"
    >
      <div className="flex flex-col gap-5">
        <TextField
          label="Full name"
          placeholder="e.g. Amara Osei"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <TextField
          label="Email address"
          type="email"
          placeholder="e.g. amara@email.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <TextField
          label="Phone number"
          type="tel"
          placeholder="e.g. 0712 345 678"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>
    </QuoteStepWrapper>
  )
}
