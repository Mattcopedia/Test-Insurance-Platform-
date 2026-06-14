'use client'

import { Button, cn } from '@wrapa/ui'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'News', href: '/news' },
]

function WrapLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-2.5',
        className
      )}
    >
      <Image
        src="/assets/icons/Logo.png"
        alt="WRAPA Logo"
        width={150}
        height={150}
        className="shrink-0"
      />
      <span className="text-[10px] lg:text-[11px] text-black/50 font-medium tracking-wide whitespace-nowrap">
        LOCAL BRAND · INTERNATIONAL COVER
      </span>
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-[0px_4px_160px_0px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-16 h-[72px] lg:h-[113px] flex items-center justify-between">
          <WrapLogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[20px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black/60 hover:text-black transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          {/* <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="md" fullWidth={false} asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button variant="outline" size="md" fullWidth={false} asChild>
              <Link href="/register">Sign up</Link>
            </Button>
          </div> */}

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 -mr-2 text-black"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-black/10">
            <WrapLogo />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 -mr-2 text-black"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" />
              </svg>
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col px-6 pt-6 flex-1 overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[22px] text-black/80 py-5 border-b border-black/10 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer CTAs */}
          <div className="flex flex-col gap-3 px-6 py-8">
            <Button variant="outline" size="md" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                Log in
              </Link>
            </Button>
            <Button size="md" asChild>
              <Link href="/register" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
