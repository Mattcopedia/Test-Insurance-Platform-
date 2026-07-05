'use client'

import { TextField, OptionSelector, QuoteContextCard } from '@wrapa/ui'
import { useForm, z, zodResolver } from '@wrapa/forms'
import { QuoteStepWrapper } from './quote-step-wrapper'

const schema = z.object({
  // Motor
  vehicleMake: z.string().optional(),
  vehicleYear: z.string().optional(),
  vehicleValue: z.string().optional(),
  // Home
  propertyValue: z.string().optional(),
  propertyType: z.string().optional(),
  // Travel
  destination: z.string().optional(),
  travelFrom: z.string().optional(),
  travelTo: z.string().optional(),
  travellers: z.string().optional(),
  // Life
  sumAssured: z.string().optional(),
  coverageDuration: z.string().optional(),
  // Business
  businessType: z.string().optional(),
  numEmployees: z.string().optional(),
})

type StepData = z.infer<typeof schema>

interface Props {
  insuranceClasses: string[]
  defaultValues?: Partial<StepData>
  onSubmit: (data: StepData) => void
  onBack: () => void
}

const DURATION_OPTIONS = ['5', '10', '15', '20', '25', '30']
const PROPERTY_TYPES = [
  { id: 'owned', title: 'Owned', subtitle: 'I own this property' },
  { id: 'rented', title: 'Rented', subtitle: 'I rent this property' },
]

export function StepInsuranceDetails({ insuranceClasses, defaultValues, onSubmit, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StepData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValues ?? {},
  })

  const propertyType = watch('propertyType')
  const coverageDuration = watch('coverageDuration')

  const hasMotor = insuranceClasses.includes('motor')
  const hasHome = insuranceClasses.includes('home')
  const hasTravel = insuranceClasses.includes('travel')
  const hasLife = insuranceClasses.includes('life')
  const hasBusiness = insuranceClasses.includes('business')

  return (
    <QuoteStepWrapper
      heading="About your coverage"
      subheading="Tell us more so we can calculate your estimate."
      onBack={onBack}
      onContinue={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8">
        {/* Motor */}
        {hasMotor && (
          <section>
            <h3 className="font-sans text-[14px] font-bold text-black/40 uppercase tracking-wider mb-4">
              Motor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Vehicle make & model"
                placeholder="e.g. Toyota Corolla"
                {...register('vehicleMake')}
              />
              <TextField
                label="Year of manufacture"
                placeholder="e.g. 2020"
                {...register('vehicleYear')}
              />
              <div className="sm:col-span-2 flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <TextField
                    label="Estimated vehicle value (KES)"
                    placeholder="e.g. 1,500,000"
                    {...register('vehicleValue')}
                  />
                </div>
                <QuoteContextCard
                  heading="Why do we need the vehicle value?"
                  body="The market value of your vehicle determines your premium. You can use the current resale value or check a motor valuations guide."
                  className="w-full lg:w-[240px]"
                />
              </div>
            </div>
          </section>
        )}

        {/* Home */}
        {hasHome && (
          <section>
            <h3 className="font-sans text-[14px] font-bold text-black/40 uppercase tracking-wider mb-4">
              Home / Property
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <TextField
                    label="Property value (KES)"
                    placeholder="e.g. 8,000,000"
                    {...register('propertyValue')}
                  />
                </div>
                <QuoteContextCard
                  heading="Property value"
                  body="Enter the estimated rebuild or replacement cost of your property, not the market price. Your insurer will confirm this during onboarding."
                  className="w-full lg:w-[240px]"
                />
              </div>
              <div>
                <p className="font-sans text-[15px] font-medium text-black/50 mb-3">
                  Property type
                </p>
                <OptionSelector
                  options={PROPERTY_TYPES}
                  value={propertyType ?? ''}
                  onChange={(v) => setValue('propertyType', v as string)}
                  columns={2}
                />
              </div>
            </div>
          </section>
        )}

        {/* Travel */}
        {hasTravel && (
          <section>
            <h3 className="font-sans text-[14px] font-bold text-black/40 uppercase tracking-wider mb-4">
              Travel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <TextField
                  label="Destination"
                  placeholder="e.g. United Kingdom"
                  {...register('destination')}
                />
              </div>
              <TextField
                label="Travel from (date)"
                placeholder="DD/MM/YYYY"
                {...register('travelFrom')}
              />
              <TextField
                label="Travel to (date)"
                placeholder="DD/MM/YYYY"
                {...register('travelTo')}
              />
              <TextField
                label="Number of travellers"
                placeholder="e.g. 2"
                type="number"
                {...register('travellers')}
              />
            </div>
          </section>
        )}

        {/* Life */}
        {hasLife && (
          <section>
            <h3 className="font-sans text-[14px] font-bold text-black/40 uppercase tracking-wider mb-4">
              Life
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <TextField
                    label="Sum assured (KES)"
                    placeholder="e.g. 5,000,000"
                    {...register('sumAssured')}
                  />
                </div>
                <QuoteContextCard
                  heading="Sum assured"
                  body="This is the lump-sum paid to your beneficiaries upon your death. A common rule of thumb is 10× your annual income."
                  className="w-full lg:w-[240px]"
                />
              </div>
              <div>
                <p className="font-sans text-[15px] font-medium text-black/50 mb-3">
                  Coverage duration (years)
                </p>
                <div className="flex flex-wrap gap-2">
                  {DURATION_OPTIONS.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setValue('coverageDuration', yr)}
                      className={`h-10 w-16 rounded-[8px] border-2 font-sans text-sm font-semibold transition-all ${
                        coverageDuration === yr
                          ? 'border-black bg-black/5 text-black'
                          : 'border-black/20 bg-white text-black/70 hover:border-black/50'
                      }`}
                    >
                      {yr}yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Business */}
        {hasBusiness && (
          <section>
            <h3 className="font-sans text-[14px] font-bold text-black/40 uppercase tracking-wider mb-4">
              Business
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Type of business"
                placeholder="e.g. Retail, Manufacturing"
                {...register('businessType')}
              />
              <TextField
                label="Number of employees"
                placeholder="e.g. 25"
                type="number"
                {...register('numEmployees')}
              />
            </div>
          </section>
        )}
      </div>
    </QuoteStepWrapper>
  )
}
