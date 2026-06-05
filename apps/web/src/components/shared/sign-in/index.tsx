'use client'

import { useForm, z } from '@wrapa/forms'
import { Button, Checkbox, MarketingText, SocialAuthGroup, TextField, cn } from '@wrapa/ui'
import Image from 'next/image'
import MarketingImage from '../../../../public/assets/images/Marketing.png'

export const signInSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

export type SignInFormData = z.infer<typeof signInSchema>

// ─── Inline zod resolver (avoids @hookform/resolvers dependency) ──────────────

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

// ─── Portal label map ─────────────────────────────────────────────────────────

const PORTAL_LABEL: Record<SignInProps['portalType'], string> = {
  customer: 'Customer Portal',
  insurer: 'Insurer Portal',
  hmo: 'HMO Portal',
  broker: 'Broker Portal',
  corporate: 'Corporate Portal',
  admin: 'Admin Portal',
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SignInProps {
  portalType: 'customer' | 'insurer' | 'hmo' | 'broker' | 'corporate' | 'admin'
  onSubmit: (data: SignInFormData) => void
  onForgotPassword: () => void
  onSignUp: () => void
  isLoading?: boolean
  serverError?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SignIn({
  portalType,
  onSubmit,
  onForgotPassword,
  onSignUp,
  isLoading = false,
  serverError,
}: SignInProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const rememberMe = watch('rememberMe')

  return (
    <div className="flex min-h-screen w-full items-center justify-center  py-10 sm:px-8">
      <div className="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:gap-35">
        <aside className="hidden shrink-0 mt-12 lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-12">
          <MarketingText
            imageSrc={MarketingImage}
            ImageComponent={Image}
            heading="Car insurance"
            className="max-w-[500px]"
          />
        </aside>

        <main className="flex w-full max-w-[480px] shrink-0 flex-col items-center justify-center lg:items-start">
          <div className="w-full max-w-[480px]">
            <p className="mb-6 text-center font-sans text-sm font-medium uppercase tracking-widest text-black/40 lg:hidden">
              {PORTAL_LABEL[portalType]}
            </p>

            <SocialAuthGroup
              onGoogleClick={() => {
                /* handled by caller */
              }}
              onFacebookClick={() => {
                /* handled by caller */
              }}
              onAppleClick={() => {
                /* handled by caller */
              }}
              disabled={isLoading}
            />

            <div className="my-[26px] flex items-center gap-0">
              <span className="h-px flex-1 bg-black/15" />
              <span className="px-4 font-sans text-[20px] font-medium leading-[19.833px] text-black">
                Or
              </span>
              <span className="h-px flex-1 bg-black/15" />
            </div>

            <div className="mt-6 flex flex-col gap-5 lg:gap-5">
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
            </div>

            <div className="mt-[10px]">
              <button
                type="button"
                onClick={onForgotPassword}
                className={cn(
                  'font-sans text-[18px] font-normal leading-[19.833px] text-blue-600 underline',
                  'decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font]',
                  'hover:text-blue-700 transition-colors font-bold',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded',
                  isLoading && 'pointer-events-none opacity-40'
                )}
              >
                Forgot Password?
              </button>
            </div>

            <div className="mt-[20px]">
              <Checkbox
                label="Keep me signed in until I sign out"
                checked={!!rememberMe}
                onCheckedChange={(checked) => setValue('rememberMe', checked === true)}
                disabled={isLoading}
              />
            </div>

            {/* ── Server-level error ───────────────────────────────────────── */}
            {serverError && (
              <p role="alert" className="mt-4 text-sm text-red-500">
                {serverError}
              </p>
            )}

            {/* ── Sign In button ───────────────────────────────────────────── */}

            <div className="mt-[32px]">
              <Button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                aria-busy={isLoading}
              >
                {isLoading ? 'Signing in…' : 'Sign In'}
              </Button>
            </div>

            <p className="mt-[32px] text-center font-sans text-[18px] font-normal leading-[19.833px] sm:text-[20px]">
              <span className="text-black/80">Do not have account?</span>{' '}
              <button
                type="button"
                onClick={onSignUp}
                className={cn(
                  'font-medium text-blue-600 underline',
                  'decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font]',
                  'hover:text-blue-700 transition-colors cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded',
                  isLoading && 'pointer-events-none opacity-40'
                )}
              >
                Sign Up
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
