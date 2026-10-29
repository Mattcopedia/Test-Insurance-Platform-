import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'WRAPA',
  description: 'WRAPA Insurance Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          richColors
          offset={24}
          toastOptions={{
            duration: 5000,
            classNames: {
              toast:
                'w-[min(480px,calc(100vw-32px))]! items-center! gap-3.5! rounded-2xl! p-5! text-[18px]! leading-snug!',
              title: 'text-[18px]! font-semibold! leading-snug!',
              description: 'text-[16px]! leading-snug!',
              icon: 'size-6! [&_svg]:size-6!',
            },
          }}
        />
      </body>
    </html>
  )
}
