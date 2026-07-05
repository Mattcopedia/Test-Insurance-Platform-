'use client'

import { Button, cn } from '@wrapa/ui'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'About Us ', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
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
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-[0px_4px_160px_0px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-16 h-[72px] lg:h-[113px] flex items-center justify-between">
          <WrapLogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[20px]">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors duration-150 lg:underline-offset-12',
                    isActive ? 'text-[#990505] underline' : 'text-black/60 hover:text-[#990505]'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Hamburger three lines that morph into an X */}
          <button
            className="lg:hidden p-2 -mr-2 text-black flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            {/* Top line: rotates +45° and shifts down to center */}
            <span
              className={cn(
                'block h-0.5 w-6 bg-current rounded-full origin-center',
                'transition-all duration-300 ease-in-out',
                open && 'translate-y-2 rotate-45'
              )}
            />
            {/* Middle line: fades and shrinks out */}
            <span
              className={cn(
                'block h-0.5 w-6 bg-current rounded-full',
                'transition-all duration-300 ease-in-out',
                open && 'opacity-0 scale-x-0'
              )}
            />
            {/* Bottom line: rotates -45° and shifts up to center */}
            <span
              className={cn(
                'block h-0.5 w-6 bg-current rounded-full origin-center',
                'transition-all duration-300 ease-in-out',
                open && '-translate-y-2 -rotate-45'
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer slides in from the right */}
      <div
        className={cn(
          'fixed  inset-0 z-50 bg-white flex flex-col lg:hidden',
          'transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        inert={!open}
      >
        {/* Drawer Header */}
        <div className="flex flex-col items-end justify-end px-6 h-[72px] border-b border-black/10">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 -mr-2 text-black cursor-pointer"
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

        {/* Drawer Links stagger fade-in as drawer opens */}
        <nav className="flex flex-col pt-6 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link, i) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block w-full text-[22px] py-5 px-6 border-b border-black/10 underline-offset-12',
                  'opacity-0 translate-y-3',
                  open && 'opacity-100 translate-y-0',
                  isActive ? 'text-[#990505] bg-[#990505]/10' : 'text-black/80 hover:text-[#990505]'
                )}
                style={{
                  transitionProperty: 'opacity, transform, color',
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDuration: '400ms',
                  transitionDelay: open ? `${100 + i * 50}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Drawer CTAs fade in after all links */}
        <div
          className={cn(
            'flex flex-col gap-3 px-6 py-8',
            'opacity-0 translate-y-3',
            open && 'opacity-100 translate-y-0'
          )}
          style={{
            transitionProperty: 'opacity, transform',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transitionDuration: '400ms',
            transitionDelay: open ? `${100 + NAV_LINKS.length * 50}ms` : '0ms',
          }}
        >
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
    </>
  )
}
