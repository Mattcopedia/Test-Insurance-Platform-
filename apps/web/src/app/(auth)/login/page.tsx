'use client'

import type { SignInFormData } from '@/components'
import { SignIn } from '@/components'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  function handleSubmit(data: SignInFormData) {
    // TODO: wire to @wrapa/api-client auth endpoint
    console.log('sign in', data)
  }

  return (
    <SignIn
      portalType="customer"
      onSubmit={handleSubmit}
      onForgotPassword={() => router.push('/forgot-password')}
      onSignUp={() => router.push('/register')}
    />
  )
}
