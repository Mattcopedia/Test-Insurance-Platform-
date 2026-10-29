import NextLink from 'next/link'
import { FooterSubscribe } from './footer-subscribe'

const COMPANY_LINKS = ['About us', 'Team', 'Blog', 'Career', 'Contact']
const PRODUCT_LINKS = [
  'Return of premium',
  'Zero cost term plan',
  'Family health insurance',
  'Individual HMO plan',
  'Group health scheme',
  'Child saving plan',
  'Marine insurance',
  'Workmen compensation',
  'Cyber insurance',
  'Guarantee return plan',
]
const LEGAL_LINKS = ['End-user policy', 'Privacy policy', 'Terms of use', 'Cookies', 'Security']
const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/wrapa-insurtech/' },
]

function FooterLogo() {
  return (
    <NextLink href="/" className="flex items-center gap-1">
      <span className="font-bold text-xl text-white tracking-tight leading-none">
        WRAPA<sup className="text-[8px] font-medium align-super ml-px">™</sup>
      </span>
    </NextLink>
  )
}

function FooterLinkGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-white font-bold text-[20px] mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item}>
            <NextLink
              href="#"
              className="text-white/60 text-[18px] leading-[20px] hover:text-white transition-colors duration-150"
            >
              {item}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterSocialGroup({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-white font-bold text-[20px] mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.label}>
            <NextLink
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 text-[18px] leading-[20px] hover:text-white transition-colors duration-150"
            >
              {item.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#050306] text-white">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16 pt-16 lg:pt-24 pb-10">
        {/* Subscribe Section */}
        <div className="mb-16 lg:mb-24 max-w-[750px]">
          <h2 className="font-serif text-[40px] sm:text-[54px] lg:text-[70px] font-bold leading-[1.15] mb-6">
            Subscribe to Wrapa blog post.
          </h2>
          <p className="text-white/80 text-[18px] lg:text-[22px] leading-[30px] mb-10">
            Get notifications about blog posts, company events, news and announcements, products and
            founder materials.
          </p>

          {/* Subscribe Form */}
          <FooterSubscribe />
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-12" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <FooterLinkGroup title="Company" links={COMPANY_LINKS} />
          <FooterLinkGroup title="Product" links={PRODUCT_LINKS} />
          <FooterLinkGroup title="Legal" links={LEGAL_LINKS} />
          <FooterSocialGroup title="Follow us" links={SOCIAL_LINKS} />
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <FooterLogo />
          <p className="text-white/60 text-[18px]">© 2026 WRAPA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
