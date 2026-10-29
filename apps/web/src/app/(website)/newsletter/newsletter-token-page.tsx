'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import NewsletterApi from '@/services/newsletter'

function NewsletterTokenAction({ action }: { action: 'confirm' | 'unsubscribe' }) {
  const params = useSearchParams()
  const token = params.get('token') ?? ''
  const [result, setResult] = useState<{ message: string; failed: boolean } | null>(null)

  useEffect(() => {
    if (!token) return

    let cancelled = false
    const request =
      action === 'confirm' ? NewsletterApi.confirm(token) : NewsletterApi.unsubscribe(token)

    request
      .then((payload) => {
        if (!cancelled) setResult({ message: payload.message, failed: false })
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        setResult({
          message: cause instanceof Error ? cause.message : 'This link could not be completed.',
          failed: true,
        })
      })

    return () => {
      cancelled = true
    }
  }, [action, token])

  const failed = !token || Boolean(result?.failed)
  const message = !token
    ? 'This link is missing a token.'
    : (result?.message ?? 'Working on that now.')

  return (
    <p className={failed ? 'text-[18px] text-red-700' : 'text-[18px] lg:text-[22px] text-black/70'}>
      {message}
    </p>
  )
}

export function NewsletterTokenPage({ action }: { action: 'confirm' | 'unsubscribe' }) {
  const title = action === 'confirm' ? 'Confirm your subscription' : 'Unsubscribe'

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[760px] px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[52px] font-bold text-black/85 mb-6">
          {title}
        </h1>
        <Suspense fallback={<p className="text-[18px] text-black/60">Working on that now.</p>}>
          <NewsletterTokenAction action={action} />
        </Suspense>
      </div>
    </div>
  )
}
