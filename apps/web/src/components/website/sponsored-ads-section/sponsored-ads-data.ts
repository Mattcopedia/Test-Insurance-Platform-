export interface SponsoredAd {
  id: string
  orgName: string
  orgInitials: string
  orgColor: string
  category: string
  title: string
  /** Short teaser shown on the listing card */
  description: string
  /** Full detail paragraphs shown on the detail page */
  body: string[]
  image: string
  /** External URL of the partner's product / campaign page */
  websiteUrl: string
}

export const SPONSORED_ADS: SponsoredAd[] = [
  {
    id: 'cornerstone-life-1',
    orgName: 'Cornerstone Insurance',
    orgInitials: 'CI',
    orgColor: '#1a4b8c',
    category: 'Life Insurance',
    title: 'Comprehensive Life Cover for Your Family',
    description:
      "Secure your loved ones' future with flexible life insurance plans starting from \u20a65,000/month. Get fully covered in under 24 hours.",
    body: [
      'At Cornerstone Insurance, we believe every Nigerian family deserves financial security regardless of income level. Our Comprehensive Life Cover is designed to protect your dependants in the event of death, permanent disability, or critical illness, giving them a lump-sum payout to maintain their quality of life.',
      'Plans start at just \u20a65,000 per month and can be tailored to cover between \u20a6500,000 and \u20a650,000,000. All applications are processed digitally no medicals required for sums assured up to \u20a65,000,000. Your policy is active within 24 hours of premium payment.',
      'Cornerstone Insurance is fully licensed by the National Insurance Commission (NAICOM) and has paid out over \u20a62 billion in life claims since 2018. Speak to one of our advisors today or get an instant quote on our website.',
    ],
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    websiteUrl: '#',
  },
  {
    id: 'afya-hmo-1',
    orgName: 'Afya HMO',
    orgInitials: 'AH',
    orgColor: '#0d7c59',
    category: 'Health / HMO',
    title: 'Premium Health Plans Now Open for Enrolment',
    description:
      'Access 500+ hospitals across Nigeria with our new family health plan. SHA-accredited. Enrolment closes 30 June.',
    body: [
      "Afya HMO is proud to announce the launch of our 2026 family health plans, now open for enrolment until 30 June. With access to over 500 accredited hospitals across all 36 states, your family's healthcare needs are covered wherever you are in Nigeria.",
      'Our plans are fully accredited by the Social Health Authority (SHA) and comply with the National Health Insurance Authority (NHIA) guidelines. Choose from three tiers Basic, Standard, and Premium each covering outpatient, inpatient, maternity, dental, and optical care.',
      "Enrolment is simple: fill out our online form, select your plan, and make payment via WRAPA or directly on our portal. Coverage begins on the first day of the following month. Don't miss the enrolment window plan administrators are available 24/7 to assist.",
    ],
    image: 'https://picsum.photos/seed/ad-afya/1200/600',
    websiteUrl: '#',
  },
  {
    id: 'savannah-motor-1',
    orgName: 'Savannah Assurance',
    orgInitials: 'SA',
    orgColor: '#b45309',
    category: 'Motor Insurance',
    title: 'Third-Party Motor Insurance Instant Certificate',
    description:
      'Get your IRA-compliant motor certificate in minutes. No paperwork, no queues. Cover starts immediately on payment.',
    body: [
      'Savannah Assurance makes mandatory motor insurance fast, simple, and fully digital. Our IRA-compliant third-party motor insurance certificate is issued instantly no physical visits, no waiting, no paperwork.',
      'Simply enter your vehicle registration number, pay online via card, bank transfer, or M-Pesa, and download your certificate immediately. The certificate is valid for 12 months and accepted at all police checkpoints and FRSC roadblocks.',
      'Need comprehensive cover? Upgrade to our Savannah Comprehensive plan, which adds own-damage, theft, fire, and windscreen cover from \u20a635,000 per year. All claims are processed within 5 working days via our dedicated claims app.',
    ],
    image: 'https://picsum.photos/seed/ad-savannah/1200/600',
    websiteUrl: '#',
  },
  {
    id: 'heritage-group-1',
    orgName: 'Heritage Group Life',
    orgInitials: 'HG',
    orgColor: '#6d28d9',
    category: 'Group Life',
    title: 'Group Life Schemes for SMEs Affordable & Fast',
    description:
      'Cover your entire team from as little as $1 per employee per month. Ideal for businesses with 5 to 500 staff.',
    body: [
      'Heritage Group Life specialises in providing SMEs across Africa with affordable, compliant group life insurance schemes. Whether you have 5 or 500 employees, we have a plan that fits your budget and satisfies the Pension Reform Act (PRA) group life requirement.',
      'Our group life schemes are priced as low as $1 per employee per month (billed annually), with a sum assured of 3x annual salary as required by law. We handle all documentation, staff enrolment, and annual renewals you focus on running your business.',
      'Setup takes less than 48 hours. Your HR team gets a dedicated account manager, a real-time portal to manage employee additions and exits, and immediate certificates of cover for each staff member. Contact our corporate team to get a bespoke quote today.',
    ],
    image: 'https://picsum.photos/seed/ad-heritage/1200/600',
    websiteUrl: '#',
  },
  {
    id: 'nile-health-1',
    orgName: 'Nile Health HMO',
    orgInitials: 'NH',
    orgColor: '#0369a1',
    category: 'Health / HMO',
    title: 'Family Wellness Plans Starting at \u20a612,000/year',
    description:
      'Affordable outpatient and inpatient cover for families of up to 6. Includes dental, optical, and maternity.',
    body: [
      'Nile Health HMO is making comprehensive healthcare accessible to every Nigerian family. Starting at just \u20a612,000 per year, our Family Wellness Plan covers a principal member and up to 5 dependants on a single policy.',
      'Benefits include unlimited outpatient consultations, up to \u20a6500,000 inpatient cover per year, routine dental check-ups, optical consultations, and full maternity care including antenatal and delivery. All services are available at our 300+ partner hospitals and clinics nationwide.',
      "We are an NHIA-licensed HMO and are accredited under the SHA framework. Our member app lets you find hospitals, book appointments, and track your benefit utilisation in real time. Sign up today and protect your family's health for less than \u20a61,000 a month.",
    ],
    image: 'https://picsum.photos/seed/ad-nile/1200/600',
    websiteUrl: '#',
  },
  {
    id: 'continental-re-1',
    orgName: 'Continental Re',
    orgInitials: 'CR',
    orgColor: '#be123c',
    category: 'Commercial Lines',
    title: 'Business Interruption Insurance Stay Protected',
    description:
      "Don't let unforeseen events halt your operations. Our BI cover keeps your revenue protected when it matters most.",
    body: [
      "Continental Re's Business Interruption (BI) Insurance is designed to keep your company financially stable when the unexpected happens fire, flood, power failure, or supplier disruption. Our BI cover replaces lost revenue and covers ongoing fixed costs while your business gets back on its feet.",
      'Policies are available for businesses with annual turnover between \u20a610 million and \u20a610 billion. We offer indemnity periods of 12, 18, or 24 months, with optional extensions for key-person absence and cyber incidents.',
      'Our specialist commercial underwriters assess your risk profile within 48 hours and provide a bespoke policy document. Claims are handled by a dedicated BI loss adjuster and settled within 30 days of a complete claim submission. Reach out to our commercial team for a no-obligation review of your current cover.',
    ],
    image: 'https://picsum.photos/seed/ad-continental/1200/600',
    websiteUrl: '#',
  },
]
