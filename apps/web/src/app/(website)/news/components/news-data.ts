export type NewsCategory = 'All' | 'Industry' | 'Company' | 'Products' | 'Regulations'

export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  date: string
  category: NewsCategory
  image: string
  readTime: string
  author: string
  content: string[]
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'growing-pensions-liquidity',
    title:
      "With growing pensions, there is potential for increased liquidity, investment in Nigeria's financial market",
    excerpt:
      'Analysts say the steady rise in pension fund assets is opening new corridors for capital allocation and long-term insurance product development across Sub-Saharan Africa.',
    date: 'September 27, 2023',
    category: 'Industry',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '4 min read',
    author: 'WRAPA Editorial',
    content: [
      'The surge in pension fund assets across Nigeria has prompted financial analysts to call for deeper integration between pension managers and the broader insurance ecosystem. With assets under management crossing ₦19 trillion in 2023, the pension sector is no longer a passive player in the financial markets.',
      'WRAPA, Africa\'s leading insurance marketplace, believes this convergence presents a once-in-a-decade opportunity for product innovation. "When you combine annuity products with long-term health and life cover, you create a holistic financial safety net," noted a senior analyst at the firm.',
      'Regulatory clarity from the National Pension Commission (PenCom) and the National Insurance Commission (NAICOM) is expected to provide a joint framework by Q1 2026, which would allow pension fund administrators to co-distribute certain insurance products on platforms like WRAPA.',
    ],
  },
  {
    slug: 'stanbic-ibtc-pension',
    title: 'Stanbic IBTC Pension, Access, three others hold 64% of new registered contributors Q2',
    excerpt:
      'Five major fund administrators dominate fresh pension enrolments in the second quarter, with digital onboarding cited as a key differentiator in the competitive landscape.',
    date: 'September 27, 2023',
    category: 'Industry',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '3 min read',
    author: 'WRAPA Editorial',
    content: [
      'New data from PenCom reveals that just five pension fund administrators accounted for nearly two-thirds of all new contributor registrations in Q2 2023. Stanbic IBTC Pension leads with an 18% share, followed closely by Access Pensions and ARM Pension Managers.',
      'Industry insiders point to robust digital onboarding experiences as the primary driver of market share concentration. Platforms that allow contributors to enrol, pick fund strategies, and designate beneficiaries entirely on mobile have seen the strongest growth.',
      'For WRAPA, which integrates pension-linked insurance riders into its marketplace, the trend underscores the urgency of seamless digital journeys. The platform is piloting a one-click pension-plus-life bundle that can be completed in under three minutes on any smartphone.',
    ],
  },
  {
    slug: 'heirs-life-essay-champion',
    title: '14-year-old Ndanyongmong emerges 2023 Heirs Life Essay Champion',
    excerpt:
      'A teenager from Taraba State clinches the top prize in the national insurance literacy essay competition, inspiring a new generation to think about financial protection.',
    date: 'September 27, 2023',
    category: 'Company',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '2 min read',
    author: 'WRAPA Editorial',
    content: [
      'Fourteen-year-old Miriam Ndanyongmong from Government Secondary School, Jalingo, Taraba State, has been crowned the 2023 Heirs Life Essay Champion, defeating over 4,000 entries from across Nigeria.',
      'Her winning essay, titled "Insurance as the Invisible Hand That Rebuilds Homes," drew from personal experience of her family recovering from a fire incident  a recovery made possible by a community micro-insurance scheme.',
      'WRAPA, a co-sponsor of the competition, is offering Ndanyongmong a paid internship on the platform team and a full scholarship to a technology and finance bootcamp. "Stories like hers remind us why we exist," said WRAPA\'s Head of Community, Chidi Okonkwo.',
    ],
  },
  {
    slug: 'sanlam-nigeria-claim',
    title: 'Sanlam Nigeria says it settled motor insurance claim in one hour',
    excerpt:
      'The insurer demonstrates the power of AI-assisted claims processing by resolving a collision claim from first notice to payout in record time on the WRAPA platform.',
    date: 'September 27, 2023',
    category: 'Products',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '3 min read',
    author: 'WRAPA Editorial',
    content: [
      'Sanlam Nigeria has publicised a landmark claims milestone  a motor insurance claim filed through the WRAPA platform and settled within 60 minutes. The claim, lodged at 9:14 AM on a Tuesday, received an approved payout notification by 10:11 AM the same morning.',
      "The rapid resolution was enabled by WRAPA's AI-powered claims intake engine, which cross-references submitted photos against vehicle registration data, police report numbers, and policy coverage in real time. Adjusters are only looped in for edge cases.",
      '"This is what we mean when we say insurance should be invisible when things are normal and instant when things go wrong," said Toluwani Bello, Head of Digital at Sanlam Nigeria. The insurer plans to roll out the same workflow for its travel and home products by year-end.',
    ],
  },
  {
    slug: 'ira-kenya-new-regulations',
    title: 'IRA Kenya releases new guidelines for digital insurance distribution',
    excerpt:
      'The Insurance Regulatory Authority has published a comprehensive framework governing how insurtech platforms can distribute, price, and settle policies online.',
    date: 'October 12, 2023',
    category: 'Regulations',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '5 min read',
    author: 'WRAPA Editorial',
    content: [
      'The Insurance Regulatory Authority (IRA) of Kenya has released the long-anticipated Digital Insurance Distribution Framework, providing clarity for platforms like WRAPA on licensing, product approval timelines, and consumer data protection requirements.',
      'Key among the guidelines is a mandatory 48-hour claims acknowledgement window for all digital channels, and a requirement that all pricing algorithms be auditable by the regulator on demand.',
      'WRAPA\'s Chief Compliance Officer, Amina Waweru, welcomed the development. "Regulatory certainty is the foundation of scale. We\'ve been collaborating with IRA on these guidelines for 18 months and we believe they strike the right balance between innovation and consumer protection."',
    ],
  },
  {
    slug: 'wrapa-series-a',
    title: 'WRAPA closes $4M seed round to expand Pan-African insurance marketplace',
    excerpt:
      'The Nairobi-headquartered insurtech secures fresh capital to accelerate product development, deepen its insurer network, and launch in three new African markets.',
    date: 'October 20, 2023',
    category: 'Company',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '4 min read',
    author: 'WRAPA Editorial',
    content: [
      'WRAPA has announced the close of a $4 million seed funding round led by Kepple Africa Ventures, with participation from Future Africa, Enza Capital, and a number of strategic angel investors from the insurance and fintech sectors.',
      "The funds will accelerate the expansion of WRAPA's marketplace into Ghana, Rwanda, and Zambia by Q2 2026, while also deepening the product suite available to users  including parametric agriculture insurance, micro health products, and a mobile-first group life offering for SMEs.",
      'CEO Kelechi Okoro described the round as validation of the team\'s belief that Africa\'s insurance gap  where fewer than 5% of the population holds any formal coverage  is solvable through technology. "Every dollar of this round goes toward making coverage faster, cheaper, and more trusted," Okoro said.',
    ],
  },
  {
    slug: 'sha-nhif-replacement-impact',
    title: 'What SHA replacing NHIF means for health insurance in Kenya',
    excerpt:
      'The Social Health Authority officially takes over from NHIF, reshaping how Kenyans access and pay for health cover  and how platforms like WRAPA integrate with public schemes.',
    date: 'November 3, 2023',
    category: 'Regulations',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '6 min read',
    author: 'WRAPA Editorial',
    content: [
      "Following the Social Health Insurance Act of 2023, the Social Health Authority (SHA) formally replaced the National Hospital Insurance Fund (NHIF) as Kenya's primary public health insurer. The transition carries significant implications for the broader health insurance ecosystem.",
      'For WRAPA, the change means updating its HMO integration layer to support SHA membership validation, contribution tracking, and co-payment structures. The engineering team shipped the first version of SHA compatibility in its October release.',
      "Healthcare providers on the KMHFL (Kenya Master Health Facility List) that are already verified on the WRAPA platform will automatically be mapped to SHA's benefit schedules. Members can check their SHA enrolment status and top up with private cover directly on WRAPA.",
    ],
  },
  {
    slug: 'micro-insurance-rural-kenya',
    title: 'Micro-insurance adoption in rural Kenya rises 34% year-on-year',
    excerpt:
      'New data from the Association of Kenya Insurers shows mobile-first micro-products are reaching previously unserved communities, with agriculture and funeral cover leading growth.',
    date: 'November 15, 2023',
    category: 'Industry',
    image: 'https://picsum.photos/seed/ad-cornerstone/1200/600',
    readTime: '4 min read',
    author: 'WRAPA Editorial',
    content: [
      'The Association of Kenya Insurers (AKI) has released its 2023 penetration report showing that micro-insurance adoption in rural counties grew 34% year-on-year, outpacing urban growth for the second consecutive year.',
      'Agriculture index insurance, which pays out based on rainfall or satellite-verified crop loss rather than individual farm assessment, accounted for the largest share of new policies. Funeral cover, distributed through mobile money platforms, was a close second.',
      "WRAPA's micro-products team, which built a KES 200-per-month hospital cash cover accessible via USSD for feature phone users, reported a 41% uptake increase in counties including Turkana, Marsabit, and West Pokot during the same period.",
    ],
  },
]

export const FEATURED_ARTICLE = NEWS_ARTICLES[0]
export const GRID_ARTICLES = NEWS_ARTICLES.slice(1)

export const CATEGORIES: NewsCategory[] = ['All', 'Industry', 'Company', 'Products', 'Regulations']
