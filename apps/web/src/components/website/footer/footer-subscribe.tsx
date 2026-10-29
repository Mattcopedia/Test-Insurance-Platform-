'use client'

import { useForm, z } from '@wrapa/forms'
import { toast } from 'sonner'
import NewsletterApi from '@/services/newsletter'
import { newsletterSubscribeFormSchema } from '@/services/newsletter/schema'
import type { NewsletterSubscribeFormValues } from '@/services/newsletter/types'

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

export function FooterSubscribe() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterSubscribeFormValues>({
    resolver: zodResolver(newsletterSubscribeFormSchema),
    defaultValues: { email: '', consent: false, website: '' },
  })

  async function onSubmit(values: NewsletterSubscribeFormValues) {
    try {
      const result = await NewsletterApi.subscribe(values)
      toast.success(result.message || 'Check your inbox to confirm this subscription.')
      reset()
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : 'We could not subscribe this address.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-[900px] flex-col gap-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex w-full flex-col gap-2 sm:flex-1">
          <div className="flex h-[60px] w-full items-center rounded-[10px] bg-white/90 px-5 backdrop-blur-sm">
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter email"
              className="subscribe-email w-full bg-transparent text-[18px] text-black outline-none placeholder:text-black/40 lg:text-[22px]"
              {...register('email')}
            />
          </div>
          {errors.email ? <p className="text-[15px] text-red-300">{errors.email.message}</p> : null}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[60px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#990505] px-7 font-sans text-[20px] text-white transition-colors duration-150 hover:bg-[#7a0404] disabled:opacity-70 lg:text-[22px]"
        >
          {isSubmitting ? 'Sending...' : 'Subscribe'}
        </button>
      </div>
      <label className="flex items-start gap-3 text-[15px] text-white/80">
        <input type="checkbox" className="mt-1 size-4" {...register('consent')} />
        <span>I agree to receive news and announcements from WRAPA.</span>
      </label>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register('website')}
      />
      {errors.consent ? <p className="text-[15px] text-red-300">{errors.consent.message}</p> : null}
    </form>
  )
}
