'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, z } from '@wrapa/forms'
import { Button, TextField, cn } from '@wrapa/ui'
import { toast } from 'sonner'
import ContactApi from '@/services/contact'
import { contactFormSchema } from '@/services/contact/schema'
import type { ContactFormValues, ContactTopicOption } from '@/services/contact/types'

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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        'shrink-0 text-[#161616] transition-transform duration-150',
        open && 'rotate-180'
      )}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function TopicField({
  topics,
  value,
  error,
  onChange,
}: {
  topics: ContactTopicOption[]
  value: ContactFormValues['topic']
  error?: string
  onChange: (value: ContactFormValues['topic']) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = topics.find((topic) => topic.value === value)

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="flex w-full flex-col gap-[12px] sm:col-span-2">
      <label
        id="contact-topic-label"
        htmlFor="contact-topic"
        className="font-sans text-[18px] font-semibold leading-tight text-[#161616] lg:text-[20px]"
      >
        Topic
      </label>
      <div ref={rootRef} data-topic className="relative">
        <button
          id="contact-topic"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className={cn(
            'flex h-[60px] w-full items-center justify-between gap-4 rounded-[10px] border border-black/15 bg-white px-5 text-left',
            'font-sans text-[16px] font-medium text-[#161616] shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none',
            'focus-visible:ring-2 focus-visible:ring-black/25',
            error && 'border-red-400'
          )}
        >
          <span>{selected?.label ?? 'Select a topic'}</span>
          <ChevronIcon open={open} />
        </button>
        {open ? (
          <ul
            role="listbox"
            aria-labelledby="contact-topic-label"
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-[320px] overflow-auto rounded-[14px] border border-black/10 bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
          >
            {topics.map((topic) => {
              const active = topic.value === value
              return (
                <li key={topic.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(topic.value)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center px-5 py-3.5 text-left font-sans text-[16px] leading-6 text-[#161616] hover:bg-[#f3f3f3]',
                      active && 'bg-[#f3f3f3] font-semibold'
                    )}
                  >
                    {topic.label}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
      {error ? (
        <p role="alert" className="text-sm leading-tight text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  )
}

const FALLBACK_TOPICS: ContactTopicOption[] = [
  { value: 'General', label: 'General enquiry' },
  { value: 'Sales', label: 'Buying cover' },
  { value: 'Partnership', label: 'Partnering with WRAPA' },
  { value: 'Support', label: 'Help with my account' },
  { value: 'Claims', label: 'A claim' },
  { value: 'Media', label: 'Press and media' },
  { value: 'Complaint', label: 'A complaint' },
  { value: 'Other', label: 'Something else' },
]

export function ContactForm() {
  const [topics, setTopics] = useState<ContactTopicOption[]>(FALLBACK_TOPICS)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      topic: 'General',
      subject: '',
      message: '',
      phone: '',
      organizationName: '',
      consentToContact: false,
      website: '',
    },
  })

  useEffect(() => {
    let cancelled = false
    ContactApi.getTopics()
      .then((options) => {
        if (!cancelled && options.length > 0) setTopics(options)
      })
      .catch(() => {
        if (!cancelled) setTopics(FALLBACK_TOPICS)
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function onSubmit(data: ContactFormValues) {
    try {
      const result = await ContactApi.submit(data)
      toast.success(result.message || `Message received. Reference ${result.reference}.`)
      reset()
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : 'We could not send your message.')
    }
  }

  const topic = watch('topic')

  return (
    <div className="subpixel-antialiased bg-white rounded-[20px] border border-black/8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 lg:p-12">
      <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black/80 leading-[1.2] mb-2">
        Send us a message
      </h2>
      <p className="text-[16px] lg:text-[18px] text-black/50 mb-8 lg:mb-10">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={cn(
          'flex flex-col gap-5 lg:gap-6',
          '[&_label]:text-[#161616] [&_label]:font-semibold [&_label]:leading-snug',
          '[&_input]:text-[#161616] [&_input]:placeholder:text-[#4a4a4a]',
          '[&_textarea]:text-[#161616] [&_textarea]:placeholder:text-[#4a4a4a]',
          '[&_div.relative:not([data-topic])]:border [&_div.relative:not([data-topic])]:border-black/15 [&_div.relative:not([data-topic])]:shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
        )}
      >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          <TopicField
            topics={topics}
            value={topic}
            error={errors.topic?.message}
            onChange={(next) => setValue('topic', next, { shouldValidate: true })}
          />
          <div className="sm:col-span-2">
            <TextField
              label="Subject"
              type="text"
              placeholder="What is this about?"
              error={errors.subject?.message}
              {...register('subject')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          <TextField
            label="Phone"
            type="tel"
            placeholder="Optional"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <TextField
            label="Organisation"
            type="text"
            placeholder="Optional"
            error={errors.organizationName?.message}
            {...register('organizationName')}
          />
        </div>

        <div className="flex w-full flex-col gap-[12px]">
          <label
            htmlFor="contact-message"
            className="font-sans text-[18px] font-semibold leading-tight text-[#161616] lg:text-[20px]"
          >
            Message
          </label>
          <div
            className={cn(
              'relative w-full rounded-[10px] bg-white',
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
              className="w-full bg-transparent resize-none rounded-[10px] px-[17px] py-[14px] font-sans text-[16px] font-medium leading-[1.6] text-[#161616] placeholder:text-[#4a4a4a] placeholder:font-normal outline-none border-none"
              {...register('message')}
            />
          </div>
          {errors.message ? (
            <p role="alert" className="text-sm leading-tight text-red-500">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        <label className="flex items-start gap-3 text-[15px] font-normal! text-[#333] lg:text-[16px]">
          <input type="checkbox" className="mt-1 size-4" {...register('consentToContact')} />
          <span>WRAPA can reply to me about this message.</span>
        </label>
        {errors.consentToContact ? (
          <p role="alert" className="text-sm leading-tight text-red-500">
            {errors.consentToContact.message}
          </p>
        ) : null}

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
          {...register('website')}
        />

        <Button type="submit" size="lg" fullWidth disabled={isSubmitting} className="mt-2">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
