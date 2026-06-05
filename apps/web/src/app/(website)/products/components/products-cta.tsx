import Link from 'next/link'
import { Button } from '@wrapa/ui'

export function ProductsCta() {
  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div className="bg-[#050306] rounded-[24px] px-8 sm:px-12 lg:px-20 py-14 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20">
          {/* Left copy */}
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[54px] font-bold text-white leading-[1.2] mb-5 lg:mb-6">
              Not sure where
              <br className="hidden sm:block" />
              to start?
            </h2>
            <p className="text-[17px] lg:text-[20px] leading-[1.7] text-white/60 max-w-[520px]">
              Our smart recommendation engine asks a few questions and matches you to the right
              products in under two minutes. No jargon. No pressure.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0">
            <Button size="md" fullWidth={false} asChild>
              <Link href="/sign-up">Find my plan</Link>
            </Button>
            <Button variant="outline" size="md" fullWidth={false} asChild>
              <Link href="/contact">Talk to an adviser</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
