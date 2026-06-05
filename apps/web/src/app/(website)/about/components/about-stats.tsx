const STATS = [
  { value: '40+', label: 'Insurance partners' },
  { value: '100K+', label: 'Policies issued' },
  { value: '7', label: 'African markets' },
  { value: '99.9%', label: 'Platform uptime' },
]

export function AboutStats() {
  return (
    <section className="bg-[#050306] py-14 lg:py-20">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="font-serif text-[44px] sm:text-[56px] lg:text-[72px] font-bold text-white leading-none">
                {stat.value}
              </span>
              <span className="text-[16px] lg:text-[20px] text-white/60 leading-[1.4]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
