import Image from 'next/image'

const AVATAR_1 = '/assets/icons/Testimonial 1.svg'
const AVATAR_2 = '/assets/icons/Testimonial 2.svg'

const TESTIMONIALS = [
  {
    name: 'Emily Foster',
    role: 'Business owner',
    avatar: AVATAR_1,
    quote:
      "\"Wrapa has made managing my insurance needs a breeze. Their claims feature, in particular, stands out. Filing a claim used to be a tedious process, but with Wrapa, it's become incredibly easy. The user-friendly interface guides you through the steps, and you can track the progress of your claim in real-time. What's even more impressive is the speed at which they handle claims. It's clear that Wrapa values their customers' time and convenience. I highly recommend Wrapa to anyone looking for a hassle-free insurance experience.\"",
  },
  {
    name: 'Daniel Robinson',
    role: 'Insurance Analyst',
    avatar: AVATAR_2,
    quote:
      "\"Wrapa's insurance score measurement and ratings platform have become an indispensable tool for our team. The accuracy and reliability of the data it provides are unmatched. It's made our underwriting process much smoother and more precise. With Wrapa, we can assess risk with confidence and make informed decisions. It's not an exaggeration to say that this platform has revolutionized how we analyze insurance scores. We couldn't be happier with the results.\"",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section Heading */}
        <div className="mb-10 lg:mb-16">
          <h2 className="font-serif text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-4">
            Why businesses and
            <br className="hidden sm:block" /> individuals are choosing Wrapa
          </h2>
          <p className="text-[18px] lg:text-[22px] leading-[30px] text-black/80 max-w-[706px]">
            Here are what some of them say about Wrapa.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-[#fafbfd] rounded-[17px] shadow-[0px_3px_134px_0px_rgba(0,0,0,0.15)] p-8 lg:p-12 flex flex-col gap-6"
            >
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative size-[72px] lg:size-[98px] rounded-full overflow-hidden shrink-0 bg-gray-200">
                  <Image src={t.avatar} alt={t.name} fill sizes="98px" className="object-cover" />
                </div>
                <div>
                  <p className="font-serif text-[20px] lg:text-[27px] font-bold text-black/90 leading-tight">
                    {t.name}
                  </p>
                  <p className="text-[16px] lg:text-[21px] text-black/80 mt-1">{t.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-[16px] lg:text-[28px] leading-[1.6] text-black/80 italic">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
