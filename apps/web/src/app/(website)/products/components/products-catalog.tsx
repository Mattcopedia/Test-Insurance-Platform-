import { Button } from '@wrapa/ui'
import Link from 'next/link'

const PRODUCTS = [
  {
    id: 'return-of-premium',
    name: 'Return of Premium',
    category: 'Life',
    description:
      'A term life plan that returns all your premiums in full if no claim is made by the end of the policy term. Protection that pays back.',
    href: '/products/return-of-premium',
  },
  {
    id: 'zero-cost-term',
    name: 'Zero Cost Term Plan',
    category: 'Life',
    description:
      'Pure, affordable life cover with no maturity benefit. The most cost-effective way to secure a large cover amount for your family.',
    href: '/products/zero-cost-term',
  },
  {
    id: 'term-diabetic',
    name: 'Term Insurance for Diabetic',
    category: 'Health',
    description:
      'Dedicated life cover designed for individuals living with Type 1 or Type 2 diabetes, with competitive premiums and no exclusions.',
    href: '/products/term-diabetic',
  },
  {
    id: 'family-health',
    name: 'Family Health Insurance',
    category: 'Health',
    description:
      'A single floater plan that covers your entire family  spouse, children, and parents  under one comprehensive health policy.',
    href: '/products/family-health',
  },
  {
    id: 'child-saving',
    name: 'Child Saving Plan',
    category: 'Life',
    description:
      "A savings-linked insurance plan that secures your child's education and future milestones, with a life cover component.",
    href: '/products/child-saving',
  },
  {
    id: 'guarantee-return',
    name: 'Guarantee Return Plan',
    category: 'Savings',
    description:
      'A guaranteed-return endowment plan that combines disciplined savings with a life cover. Know exactly what you will receive at maturity.',
    href: '/products/guarantee-return',
  },
  {
    id: 'tax-saving',
    name: 'Tax Saving Investment',
    category: 'Savings',
    description:
      'An investment-linked insurance plan that qualifies for applicable tax deductions  grow your money while reducing your tax liability.',
    href: '/products/tax-saving',
  },
  {
    id: 'marine',
    name: 'Marine Insurance',
    category: 'Commercial',
    description:
      'Covers loss or damage to ships, cargo, freight, and related liabilities during transit by sea, air, or inland waterways.',
    href: '/products/marine',
  },
  {
    id: 'workmen-compensation',
    name: 'Workmen Compensation',
    category: 'Commercial',
    description:
      'Protects your business from legal liability for employee injuries, occupational diseases, and work-related accidents.',
    href: '/products/workmen-compensation',
  },
  {
    id: 'cyber',
    name: 'Cyber Insurance',
    category: 'Commercial',
    description:
      'Covers your business against financial losses from data breaches, ransomware, cyberattacks, and digital fraud.',
    href: '/products/cyber',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Health: 'bg-[#e8f0fe] text-[#1a56db]',
  Life: 'bg-[#fef2f2] text-[#990505]',
  Commercial: 'bg-[#f0faf4] text-[#166534]',
  Savings: 'bg-[#fffbeb] text-[#92400e]',
}

export function ProductCatalogSection() {
  return (
    <section className="bg-[#fafbfd] py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section heading */}
        <div className="mb-10 lg:mb-16">
          <h2 className="font-serif text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-4">
            All products
          </h2>
          <p className="text-[18px] lg:text-[22px] leading-[1.7] text-black/60 max-w-[600px]">
            Browse every insurance and savings product available on WRAPA. Get a quote in minutes.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[18px] shadow-[0px_4px_149px_0px_rgba(0,0,0,0.05)] p-7 lg:p-9 flex flex-col gap-5"
            >
              {/* Category badge */}
              <span
                className={`self-start px-3 py-1 rounded-full text-[13px] lg:text-[15px] font-semibold ${CATEGORY_COLORS[product.category]}`}
              >
                {product.category}
              </span>

              {/* Name */}
              <h3 className="font-serif text-[22px] lg:text-[27px] font-bold text-black/80 leading-[1.3]">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-[15px] lg:text-[18px] leading-[1.7] text-black/60 flex-1">
                {product.description}
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                <Button size="sm" fullWidth={false} asChild>
                  <Link href="/sign-up">Get a quote</Link>
                </Button>
                <Button variant="ghost" size="sm" fullWidth={false} asChild>
                  <Link href={product.href}>Learn more</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
