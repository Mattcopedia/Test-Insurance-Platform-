'use client'

import { useForm, z } from '@wrapa/forms'
import { Button, TextField, cn } from '@wrapa/ui'
import * as React from 'react'
import { submitContactForm } from '@/services/contact'
import { contactSchema } from '@/services/contact/schema'
import type { ContactFormData } from '@/services/contact/type'
import { useInView } from '@/hooks/use-in-view'

// ── Inline zod resolver (same pattern used across the codebase) ───────────────

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

// ── Component ─────────────────────────────────────────────────────────────────

export function ContactForm() {
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const { ref, isInView } = useInView()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  async function onSubmit(data: ContactFormData) {
    setSubmitError(null)
    const result = await submitContactForm(data)
    if (result.success) {
      reset()
    } else {
      setSubmitError(result.message)
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-[20px] shadow-[0px_4px_160px_0px_rgba(0,0,0,0.08)] p-8 lg:p-12',
        'transition-[opacity,transform] duration-1000 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black/80 leading-[1.2] mb-2">
        Send us a message
      </h2>
      <p className="text-[16px] lg:text-[18px] text-black/50 mb-8 lg:mb-10">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5 lg:gap-6">
        {/* Name + Email side by side on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          <TextField
            label="Full Name"
            type="text"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register('name')}
          />
          <TextField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        {/* Subject */}
        <TextField
          label="Subject"
          type="text"
          placeholder="What is this about?"
          error={errors.subject?.message}
          {...register('subject')}
        />

        {/* Message textarea, styled to match TextField */}
        <div className="flex w-full flex-col gap-[12px]">
          <label
            htmlFor="contact-message"
            className="font-sans text-[20px] font-medium leading-[19.833px] text-black/50"
          >
            Message
          </label>
          <div
            className={cn(
              'relative w-full',
              'rounded-[10px] bg-white',
              'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.10)]',
              'ring-1 ring-transparent transition-shadow duration-150',
              'focus-within:ring-black/20',
              errors.message && 'ring-red-400 focus-within:ring-red-500'
            )}
          >
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell us how we can help you..."
              className={cn(
                'w-full bg-transparent resize-none',
                'rounded-[10px]',
                'px-[17px] py-[14px]',
                'font-sans text-[16px] font-normal leading-[1.6] text-black',
                'placeholder:text-black/40 placeholder:font-normal',
                'outline-none border-none'
              )}
              {...register('message')}
            />
          </div>
          {errors.message && (
            <p role="alert" className="text-sm leading-tight text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Success feedback */}
        {isSubmitSuccessful && (
          <p className="text-[16px] text-green-600 font-medium">
            Message sent! We&apos;ll be in touch soon.
          </p>
        )}

        {/* Submission error */}
        {submitError && (
          <p role="alert" className="text-[16px] text-red-500 font-medium">
            {submitError}
          </p>
        )}

        <Button type="submit" size="lg" fullWidth disabled={isSubmitting} className="mt-2">
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
