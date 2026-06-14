import Image from 'next/image'

const INSURANCE_SCORE_BG =
  'https://www.figma.com/api/mcp/asset/c9fb8043-a3c8-4bc5-858e-de5033722d21'
const AGGREGATOR_IMAGE = '/assets/images/InsuranceAggregator.png'
const CLAIMS_IMAGE = '/assets/images/claimsProcessing.png'

export function FeaturesSection() {
  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16 space-y-12 lg:space-y-16">
        {/* Section heading */}
        <div>
          <h2 className="font-serif text-[40px] sm:text-[50px] lg:text-[60px] font-bold text-black/80 leading-[1.2] mb-6 max-w-[710px]">
            Easiest way to get insured
          </h2>
          <p className="text-[18px] lg:text-[22px] leading-[30px] text-black/80 max-w-[860px]">
            Our algorithms do all the hard work for you, read between the lines, decode the terms
            and conditions, and make the purchase of insurance policy a cake walk for you.
          </p>
        </div>

        {/* Insurance Score Banner */}
        <div className="relative rounded-[20px] overflow-hidden h-[280px] sm:h-[360px] lg:h-[624px]">
          <Image
            src={INSURANCE_SCORE_BG}
            alt="Insurance score platform"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Overlay gradient + text */}
          <div className="absolute inset-0 bg-[#002046]/60" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16">
            <h3 className="font-serif text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-white leading-[1.4] max-w-[700px] mb-4 lg:mb-6">
              Insurance score measurement and ratings platform.
            </h3>
            <p className="text-[16px] lg:text-[22px] leading-[30px] text-white/90 max-w-[710px]">
              Insurance scores are ratings used by insurance companies to determine an
              individual&apos;s likelihood of filing a claim and the expected cost of that claim.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Insurance Aggregator */}
          <div className="bg-[#d1d7ef] rounded-[18px] shadow-[0px_4px_149px_0px_rgba(0,0,0,0.05)] p-8 lg:p-10 flex flex-col gap-6">
            <div>
              <h3 className="font-serif text-[28px] lg:text-[40px] font-bold text-black/80 leading-[1.3] mb-4">
                Insurance Aggregator
              </h3>
              <p className="text-[16px] lg:text-[20px] leading-[30px] text-black/80">
                This is a one-stop shop for insurance seekers. It&apos;s a platform that gathers
                insurance-specific information from different sources and organizes them in one
                place. It fosters a network of insurance carriers, independent insurance agents,
                captive agents, and clients.
              </p>
            </div>
            <div className="relative h-[200px] sm:h-[280px] lg:h-[340px] rounded-[16px] overflow-hidden mt-auto">
              <Image
                src={AGGREGATOR_IMAGE}
                alt="Insurance aggregator"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Quick Claims */}
          <div className="bg-white rounded-[18px] shadow-[0px_4px_149px_0px_rgba(0,0,0,0.05)] p-8 lg:p-10 flex flex-col gap-6">
            <div>
              <h3 className="font-serif text-[28px] lg:text-[40px] font-bold text-black/80 leading-[1.3] mb-4">
                Quick and Simple Claims Processing
              </h3>
              <p className="text-[16px] lg:text-[20px] leading-[30px] text-black/80">
                We understand that dealing with insurance claims can be stressful and
                time-consuming. That&apos;s why we&apos;ve made it our mission to offer Quick and
                Simple Claims Processing as one of our key features. Our streamlined process ensures
                that you can file and manage your claims with ease.
              </p>
            </div>
            <div className="relative h-[200px] sm:h-[280px] lg:h-[340px] mt-auto">
              <Image
                src={CLAIMS_IMAGE}
                alt="Claims processing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
