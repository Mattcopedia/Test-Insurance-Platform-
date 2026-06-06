'use client'

import { useForm, z } from '@wrapa/forms'
import {
  Button,
  Checkbox,
  MarketingText,
  PortalCard,
  PortalCardGroup,
  SocialAuthGroup,
  TextField,
  cn,
} from '@wrapa/ui'
import Image from 'next/image'
import * as React from 'react'
import ClientIcon from '../../../../public/assets/icons/client.svg'
import InsuranceIcon from '../../../../public/assets/icons/insurance.svg'
import MarketingImage from '../../../../public/assets/images/Marketing.png'
// ─── Zod schema ──────────────────────────────────────────────────────────────

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((v) => v === true, 'You must accept the terms to continue'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type SignUpFormData = z.infer<typeof signUpSchema>

function zodResolver<T extends z.ZodTypeAny>(schema: T) {
  return async (values: unknown) => {
    const result = schema.safeParse(values)
    if (result.success) {
      return { values: result.data as z.infer<T>, errors: {} }
    }
    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const key = issue.path.join('.')
      if (!errors[key]) {
        errors[key] = { type: issue.code, message: issue.message }
      }
    }
    return { values: {}, errors }
  }
}

const PORTAL_HAS_ACCOUNT_TYPE_STEP = new Set(['client'])

export interface SignUpProps {
  onSubmit: (data: SignUpFormData) => void
  onSignIn: () => void
  onTermsClick?: () => void
  onPrivacyClick?: () => void
  isLoading?: boolean
  serverError?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SignUp({
  onSubmit,
  onSignIn,
  onTermsClick,
  onPrivacyClick,
  isLoading = false,
  serverError,
}: SignUpProps) {
  const [accountType, setAccountType] = React.useState<'client' | 'Insurance' | 'HMO' | null>(
    PORTAL_HAS_ACCOUNT_TYPE_STEP.has('client') ? null : 'client'
  )
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const acceptTerms = watch('acceptTerms')

  return (
    <div className="flex min-h-screen w-full items-center justify-center  py-10 sm:px-8">
      <div className="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:gap-35">
        <aside className="hidden shrink-0 mt-12 lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-12">
          <MarketingText
            imageSrc={MarketingImage.src}
            ImageComponent={Image}
            heading="Car insurance"
            className="max-w-[500px]"
          />
        </aside>

        <main className="flex w-full max-w-[480px] shrink-0 flex-col items-center justify-center lg:items-start">
          <div className="w-full max-w-[480px]">
            {PORTAL_HAS_ACCOUNT_TYPE_STEP.has('client') && (
              <div
                className={cn(
                  'transition-all duration-300 overflow-visible',
                  accountType !== null && 'mb-8'
                )}
              >
                {accountType === null ? (
                  <div className="flex flex-col">
                    <PortalCardGroup>
                      <PortalCard
                        variant="client"
                        title="Client"
                        description="(Sign up to buy policies)"
                        icon={<Image src={ClientIcon} alt="Client image" width={35} height={35} />}
                        selected={false}
                        onClick={() => setAccountType('client')}
                      />
                      <PortalCard
                        variant="insurance"
                        title="Insurance"
                        description="(Sign up as an insurance company)"
                        icon={
                          <Image src={InsuranceIcon} alt="Insurance image" width={35} height={35} />
                        }
                        selected={false}
                        onClick={() => setAccountType('Insurance')}
                      />
                      <PortalCard
                        variant="hmo"
                        title="HMO"
                        description="(Sign up as a HMO)"
                        icon={<Image src={InsuranceIcon} alt="HMO image" width={35} height={35} />}
                        selected={false}
                        onClick={() => setAccountType('HMO')}
                      />
                    </PortalCardGroup>

                    <p className="text-left mt-15 font-sans text-[18px] font-normal leading-[19.833px] sm:text-[20px]">
                      <span className="text-black/80">Already have an account?</span>{' '}
                      <button
                        type="button"
                        onClick={onSignIn}
                        className={cn(
                          'font-medium text-blue-600 underline',
                          'decoration-solid [text-decoration-skip-ink:none]',
                          'hover:text-blue-700 transition-colors',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded',
                          'cursor-pointer font-bold'
                        )}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAccountType(null)}
                    className="flex items-center gap-2 text-sm text-black/50 hover:text-black/80 transition-colors"
                  >
                    <span>←</span>
                    <span className="cursor-pointer">
                      Signing up as <span className="font-semibold text-black">{accountType}</span>
                    </span>
                  </button>
                )}
              </div>
            )}

            {accountType !== null && (
              <>
                <SocialAuthGroup disabled={isLoading} />
                <div className="my-[26px] flex items-center">
                  <span className="h-px flex-1 bg-black/15" />
                  <span className="px-4 font-sans text-[20px] font-medium leading-[19.833px] text-black">
                    Or
                  </span>
                  <span className="h-px flex-1 bg-black/15" />
                </div>

                <div className="flex flex-col gap-[16px] sm:flex-row sm:gap-[16px]">
                  <div className="flex-1">
                    <TextField
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      disabled={isLoading}
                      error={errors.firstName?.message}
                      {...register('firstName')}
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                      disabled={isLoading}
                      error={errors.lastName?.message}
                      {...register('lastName')}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-5 lg:gap-7">
                  <TextField
                    label="Email"
                    type="email"
                    placeholder="Enter your Email Address"
                    disabled={isLoading}
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                    disabled={isLoading}
                    error={errors.password?.message}
                    {...register('password')}
                  />

                  <TextField
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat your Password Here"
                    disabled={isLoading}
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                </div>

                <div className="mt-[20px]">
                  <Checkbox
                    label="I accept the Terms of Service and Privacy Policy"
                    checked={!!acceptTerms}
                    onCheckedChange={(checked) =>
                      setValue('acceptTerms', checked === true, {
                        shouldValidate: true,
                      })
                    }
                    disabled={isLoading}
                    error={errors.acceptTerms?.message}
                  />
                </div>

                {serverError && (
                  <p role="alert" className="mt-4 text-sm text-red-500">
                    {serverError}
                  </p>
                )}

                <div className="mt-[35px] flex flex-col gap-[35px] sm:mt-[35px]">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    aria-busy={isLoading}
                  >
                    {isLoading ? 'Creating account…' : 'Sign Up'}
                  </Button>

                  <p className="text-center font-sans text-[18px] font-normal leading-[19.833px] sm:text-[20px]">
                    <span className=" text-black/80">Already have an account?</span>{' '}
                    <button
                      type="button"
                      onClick={onSignIn}
                      className={cn(
                        'font-medium text-blue-600 underline',
                        'decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font]',
                        'hover:text-blue-700 transition-colors cursor-pointer',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded',
                        isLoading && 'pointer-events-none opacity-40'
                      )}
                    >
                      Sign In
                    </button>
                  </p>
                </div>

                <div className="mt-5 sm:mt-3 h-px w-full bg-black/10" />

                <p className="mt-5 sm:mt-3 font-sans text-[16px] font-normal leading-[28px] text-black/70 sm:text-[18px]">
                  {`By signing up you agree to Wrapa's `}
                  <button
                    type="button"
                    onClick={onTermsClick}
                    className="font-medium text-black hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded"
                  >
                    Terms of Service
                  </button>
                  {' and '}
                  <button
                    type="button"
                    onClick={onPrivacyClick}
                    className="font-medium text-black hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black rounded"
                  >
                    Privacy Policy
                  </button>
                  {`, and agree to receive marketing communications from Wrapa at the email address provided.`}
                </p>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
