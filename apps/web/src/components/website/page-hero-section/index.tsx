import { cn } from '@wrapa/ui'

interface PageHeroSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}

export function PageHeroSection({ eyebrow, title, subtitle, className }: PageHeroSectionProps) {
  return (
    <section className={cn('bg-[#050306] text-white py-16 lg:py-28', className)}>
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {eyebrow && (
          <p className="text-[#990505] text-[16px] lg:text-[20px] font-semibold tracking-widest uppercase mb-4 lg:mb-6">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-[36px] sm:text-[52px] lg:text-[72px] font-bold leading-[1.15] text-white max-w-[860px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 lg:mt-8 text-[18px] lg:text-[22px] leading-[1.7] text-white/70 max-w-[660px]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
