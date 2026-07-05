'use client'

import { cn } from '@wrapa/ui'
import { useInView } from '@/hooks/use-in-view'
import * as React from 'react'

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

function InfoItem({ icon, label, value, href }: InfoItemProps) {
  const content = (
    <div className="flex items-start gap-4">
      <span
        className={cn(
          'shrink-0 mt-0.5 flex size-[44px] items-center justify-center',
          'rounded-[10px] bg-black/5 text-black/60'
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[13px] lg:text-[14px] font-semibold tracking-widest uppercase text-[#990505]">
          {label}
        </span>
        <span className="text-[16px] lg:text-[18px] leading-[1.6] text-black/70 font-medium">
          {value}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className="hover:opacity-80 transition-opacity duration-150"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return <div>{content}</div>
}

function AnimatedInfoItem({ index, ...props }: InfoItemProps & { index: number }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-1000 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: isInView ? `${Math.min(index * 80, 300)}ms` : '0ms' }}
    >
      <InfoItem {...props} />
    </div>
  )
}

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/wrapa-insurtech/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  // {
  //   label: 'Twitter / X',
  //   href: 'https://twitter.com/wrapainsurance',
  //   icon: (
  //     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: 'Instagram',
  //   href: 'https://instagram.com/wrapainsurance',
  //   icon: (
  //     <svg
  //       width="20"
  //       height="20"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       aria-hidden
  //     >
  //       <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
  //       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
  //       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: 'Facebook',
  //   href: 'https://facebook.com/wrapainsurance',
  //   icon: (
  //     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
  //       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  //     </svg>
  //   ),
  // },
]

const CONTACT_DETAILS: InfoItemProps[] = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Office',
    value: 'Lagos, Nigeria, Pan-African HQ',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.3a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+234 704 7000 808',
    href: 'tel:+2347047000808',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'Email',
    value: 'info@wrapa.africa',
    href: 'mailto:info@wrapa.africa',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: 'Support Hours',
    value: 'Mon – Fri, 8:00 AM – 6:00 PM WAT',
  },
]

export function ContactInfo() {
  const { ref: headingRef, isInView: headingInView } = useInView()
  const { ref: socialRef, isInView: socialInView } = useInView()

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      {/* Heading */}
      <div
        ref={headingRef}
        className={cn(
          'transition-[opacity,transform] duration-1000 ease-out',
          headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <span className="inline-block text-[#990505] text-[13px] lg:text-[14px] font-semibold tracking-widest uppercase mb-4">
          Get in touch
        </span>
        <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black/80 leading-[1.2] mb-4">
          We&apos;d love to hear from you
        </h2>
        <p className="text-[16px] lg:text-[18px] leading-[1.7] text-black/60 max-w-[480px]">
          Whether you have a question about insurance products, need support, or want to partner
          with WRAPA, our team is ready to help.
        </p>
      </div>

      {/* Contact details */}
      <div className="flex flex-col gap-6 lg:gap-7">
        {CONTACT_DETAILS.map((item, i) => (
          <AnimatedInfoItem key={item.label} {...item} index={i} />
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-black/10" />

      {/* Social links */}
      <div
        ref={socialRef}
        className={cn(
          'transition-[opacity,transform] duration-1000 ease-out',
          socialInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <p className="text-[13px] lg:text-[14px] font-semibold tracking-widest uppercase text-black/40 mb-5">
          Follow WRAPA
        </p>
        <div className="flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={cn(
                'flex size-[44px] items-center justify-center rounded-[10px]',
                'bg-black/5 text-black/60',
                'hover:bg-black hover:text-white transition-all duration-150'
              )}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
