import { Button } from '@wrapa/ui'
import Link from 'next/link'

export function AboutJoin() {
  return (
    <section className="bg-white py-15 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div className="bg-[#050306] rounded-[24px] px-8 sm:px-12 lg:px-20 py-14 lg:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20">
          {/* Left copy */}
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[54px] font-bold text-white leading-[1.2] mb-5 lg:mb-6">
              Ready to get insured
              <br className="hidden sm:block" />
              the smart way?
            </h2>
            <p className="text-[17px] lg:text-[20px] leading-[1.7] text-white/60 max-w-[520px]">
              Join thousands of individuals and businesses across Africa who manage their insurance
              on WRAPA. It takes less than five minutes to get started.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0">
            <Button size="md" fullWidth={false} asChild>
              <Link href="/sign-up">Get started — it&apos;s free</Link>
            </Button>
            <Button variant="outline" size="md" fullWidth={false} asChild>
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
