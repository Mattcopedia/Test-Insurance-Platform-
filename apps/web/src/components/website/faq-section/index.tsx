'use client'

import { useInView } from '@/hooks/use-in-view'
import * as Accordion from '@radix-ui/react-accordion'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'

const FAQS = [
  {
    q: 'What is WRAPA?',
    a: 'WRAPA is a technology-driven marketplace that connects individuals, families, and businesses with the right insurance policies and HMO health plans. We partner with leading insurers and HMO providers across Africa to make finding, comparing, purchasing, and managing coverage simple, transparent, and fast all on one platform.',
  },
  {
    q: 'Who can enrol with WRAPA?',
    a: 'WRAPA is open to a wide range of customers. Individuals looking for personal insurance (life, health, motor, property) or an HMO health plan can browse and enrol directly. Businesses can set up group insurance schemes or employee HMO cover for their teams. We also serve brokers, corporate entities, and enterprise clients who need multi-policy management and reporting tools.',
  },
  {
    q: "What's the difference between an insurance plan and an HMO plan on WRAPA?",
    a: 'An insurance plan typically pays you or a provider after a covered event occurs such as a motor accident or a hospitalisation claim. An HMO (Health Maintenance Organisation) plan works differently: you are enrolled with a network of healthcare providers and access care within that network, often with little or no out-of-pocket cost at the point of service. WRAPA carries both, so you can choose the model that suits your lifestyle and budget, or combine both types of cover.',
  },
  {
    q: 'How are claims and pre-authorisations handled?',
    a: 'For insurance claims, you file digitally through your WRAPA dashboard in minutes. Our platform routes the claim to the relevant insurer and gives you real-time status tracking until resolution. For HMO plans, medical procedures that require pre-authorisation can be requested through the same dashboard your HMO provider reviews the request and responds with an approval or alternative pathway, all tracked transparently.',
  },
  {
    q: 'Can businesses get group coverage for their employees?',
    a: "Yes. WRAPA supports corporate and SME clients who want to provide group insurance or HMO cover for their workforce. You can manage multiple employee profiles, enrol new joiners, process mid-year changes, and generate compliance reports all from a single dashboard. Speak to our team through the Contact page to discuss a group scheme tailored to your company's size and industry.",
  },
  {
    q: 'How can I contact WRAPA for support?',
    a: 'You can reach us through the Contact page on this website, where you will find our Lagos office address, phone number, and email. Our support team is available Monday to Friday, 9 AM - 5 PM (WAT). For urgent matters outside business hours, you can leave a message and we will respond on the next business day. You can also follow us on LinkedIn for announcements and updates.',
  },
  {
    q: 'Is WRAPA regulated? Are my policies secure?',
    a: 'WRAPA operates in compliance with the insurance and health regulatory frameworks in the markets where we operate, including the National Insurance Commission (NAICOM) in Nigeria and relevant authorities in East Africa. All policies sold through WRAPA are issued by licensed insurers and regulated HMOs. Your personal and financial data is protected with bank-grade encryption and strict access controls.',
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-4 h-4 shrink-0 transition-transform duration-300', className)}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function FaqSection() {
  const { ref, isInView } = useInView()

  return (
    <section className="bg-white py-14 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Two-column layout: sticky heading left, accordion right */}
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
          {/* Left column - heading */}
          <div
            ref={ref}
            className={cn(
              'lg:w-[380px] xl:w-[420px] shrink-0 mb-12 lg:mb-0 lg:pt-2',
              scrollRevealClasses(isInView)
            )}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] rounded-full bg-[#990505]" />
              <span className="text-[#990505] text-[12px] font-bold tracking-[0.18em] uppercase">
                FAQ
              </span>
            </div>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] font-bold text-black leading-[1.15] mb-5">
              Frequently asked questions
            </h2>

            <p className="text-[16px] lg:text-[18px] leading-[1.75] text-black/55 mb-10">
              Everything you need to know about insurance plans, HMO cover, claims, and how WRAPA
              works.
            </p>

            {/* Decorative stat block */}
            <div className="hidden lg:flex flex-col gap-6 border-l-2 border-[#990505]/20 pl-6">
              <div>
                <p className="font-serif text-[40px] font-bold text-black leading-none mb-1">7+</p>
                <p className="text-[14px] text-black/50">Questions answered</p>
              </div>
              <div>
                <p className="font-serif text-[40px] font-bold text-black leading-none mb-1">24h</p>
                <p className="text-[14px] text-black/50">Support response time</p>
              </div>
            </div>
          </div>

          {/* Right column - accordion */}
          <div className="flex-1 min-w-0">
            <Accordion.Root
              type="single"
              collapsible
              className="w-full flex flex-col gap-3 lg:gap-4"
            >
              {FAQS.map((faq, i) => (
                <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={scrollRevealClasses(isInView, 'card')}
      style={scrollRevealStagger(isInView, index)}
    >
      <Accordion.Item
        value={`item-${index}`}
        className={cn(
          'group/item rounded-2xl border bg-white overflow-hidden',
          'border-black/10',
          'shadow-[0_1px_4px_rgba(0,0,0,0.05)]',
          'transition-all duration-250',
          'data-[state=open]:border-[#990505]/30',
          'data-[state=open]:shadow-[0_0_0_1px_rgba(153,5,5,0.12),0_6px_28px_rgba(153,5,5,0.08)]',
          'data-[state=open]:bg-linear-to-b data-[state=open]:from-white data-[state=open]:to-[#fdf8f8]'
        )}
      >
        <Accordion.Header className="flex">
          <Accordion.Trigger
            className={cn(
              'group/trigger flex w-full cursor-pointer items-center gap-4 px-5 py-5 lg:px-6 lg:py-6 text-left',
              'hover:bg-black/1.5 transition-colors duration-150',
              'data-[state=open]:hover:bg-transparent'
            )}
          >
            {/* Number badge */}
            <span
              className={cn(
                'shrink-0 w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center',
                'text-[11px] lg:text-[12px] font-bold font-mono tabular-nums',
                'border border-black/12 text-black/35 bg-black/2',
                'group-data-[state=open]/trigger:border-[#990505]/35',
                'group-data-[state=open]/trigger:text-[#990505]',
                'group-data-[state=open]/trigger:bg-[#990505]/[0.07]',
                'transition-all duration-200'
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Question text */}
            <span
              className={cn(
                'flex-1 font-semibold text-[15px] lg:text-[18px] leading-[1.45] text-black/75',
                'group-data-[state=open]/trigger:text-black',
                'group-hover/trigger:text-black',
                'transition-colors duration-150'
              )}
            >
              {question}
            </span>

            {/* Chevron circle */}
            <span
              className={cn(
                'shrink-0 w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center',
                'border border-black/10 text-black/35',
                'group-data-[state=open]/trigger:border-[#990505]/30',
                'group-data-[state=open]/trigger:text-[#990505]',
                'group-data-[state=open]/trigger:bg-[#990505]/[0.07]',
                'group-hover/trigger:border-black/20 group-hover/trigger:text-black/60',
                'transition-all duration-200'
              )}
            >
              <ChevronDownIcon className="group-data-[state=open]/trigger:rotate-180" />
            </span>
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content
          className={cn(
            'overflow-hidden text-black/65',
            'data-[state=open]:animate-accordion-down',
            'data-[state=closed]:animate-accordion-up'
          )}
        >
          <div className="px-5 lg:px-6 pb-6 lg:pb-7">
            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 lg:w-9 lg:h-9 shrink-0" aria-hidden />
              <div className="flex-1 h-px bg-[#990505]/12" />
            </div>

            {/* Answer indented to align with question */}
            <div className="flex gap-4">
              <span className="w-8 h-8 lg:w-9 lg:h-9 shrink-0" aria-hidden />
              <p className="text-[14px] lg:text-[16px] leading-[1.9] text-black/60 flex-1">
                {answer}
              </p>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </div>
  )
}
