import Link from 'next/link'

const COMPANY_LINKS = ['About us', 'Team', 'Blog', 'Career', 'Contact']
const PRODUCT_LINKS = [
  'Return of premium',
  'Zero cost term plan',
  'Term insurance for diabetic',
  'Family health insurance',
  'Child saving plan',
  'Guarantee return plan',
  'Tax saving investment',
  'Marine insurance',
  'Work men compensation',
  'Cyber insurance',
]
const LEGAL_LINKS = ['End-user policy', 'Privacy policy', 'Terms of use', 'Cookies', 'Security']
// const SOCIAL_LINKS = ['LinkedIn', 'Twitter', 'Facebook', 'Instagram']
const SOCIAL_LINKS = ['LinkedIn']

function FooterLogo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <span className="font-bold text-xl text-white tracking-tight leading-none">
        WRAPA<sup className="text-[8px] font-medium align-super ml-px">™</sup>
      </span>
    </Link>
  )
}

function FooterLinkGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-white font-bold text-[20px] mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-white/60 text-[18px] leading-[20px] hover:text-white transition-colors duration-150"
            >
              {item}
            </Link>
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
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[900px]">
            <div className="w-full sm:flex-1 bg-white/90 backdrop-blur-sm rounded-[10px] h-[60px] flex items-center px-5">
              <input
                type="email"
                name="subscribe-email"
                autoComplete="email"
                placeholder="Enter email"
                className="bg-transparent w-full text-black/50 text-[18px] lg:text-[22px] outline-none placeholder:text-black/40"
              />
            </div>
            <button className="h-[60px] px-7 bg-[#990505] rounded-[10px] text-white text-[20px] lg:text-[22px] font-sans flex items-center justify-center gap-2 whitespace-nowrap hover:bg-[#7a0404] transition-colors duration-150 shrink-0">
              Subscribe
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="white" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="white" />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-12" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <FooterLinkGroup title="Company" links={COMPANY_LINKS} />
          <FooterLinkGroup title="Product" links={PRODUCT_LINKS} />
          <FooterLinkGroup title="Legal" links={LEGAL_LINKS} />
          <FooterLinkGroup title="Follow us" links={SOCIAL_LINKS} />
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
