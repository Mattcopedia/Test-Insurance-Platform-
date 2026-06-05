// (auth)/register/page.tsx
'use client'
import type { SignUpFormData } from '@/components'
import { SignUp } from '@/components'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  return (
    <div className="bg-[#FDFDFD]">
      <SignUp
        onSubmit={(data: SignUpFormData) => {
          console.log('register', data)
        }}
        onSignIn={() => router.push('/login')}
        onTermsClick={() => router.push('/terms')}
        onPrivacyClick={() => router.push('/privacy')}
      />
    </div>
  )
}

// For portals that don't need client/corporate selection:
{
  /* <SignUp portalType="insurer" onSubmit={...} onSignIn={...} /> */
}
