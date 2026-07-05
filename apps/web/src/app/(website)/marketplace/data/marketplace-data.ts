// TODO: replace with real API call from @wrapa/api-client

export type MarketplaceCategory = {
  id: string
  initials: string
  color: string
  name: string
  group: string
  type: 'insurance' | 'hmo'
  useCase: 'personal' | 'business'
  description: string
}

export type MarketplaceProduct = {
  id: string
  categoryId: string
  initials: string
  color: string
  name: string
  provider: string
  description: string
  startingPrice: number
  currency: string
  billingCycle: string
  duration: string
  region: string
  planType: string
  ageMin: number
  ageMax: number
  rating: number
  coverage: string[]
}

// ── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: MarketplaceCategory[] = [
  // Life Insurance
  {
    id: 'term-life',
    initials: 'TL',
    color: '#2563eb',
    name: 'Term Life',
    group: 'Life Insurance',
    type: 'insurance',
    useCase: 'personal',
    description: 'Term life, cover for a fixed period',
  },
  {
    id: 'whole-life',
    initials: 'WL',
    color: '#1e3a8a',
    name: 'Whole Life',
    group: 'Life Insurance',
    type: 'insurance',
    useCase: 'personal',
    description: 'Whole life, lifelong cover with cash value',
  },
  {
    id: 'credit-life',
    initials: 'CL',
    color: '#312e81',
    name: 'Credit Life',
    group: 'Life Insurance',
    type: 'insurance',
    useCase: 'personal',
    description: 'Life cover linked to a loan or credit product',
  },
  // Health Insurance
  {
    id: 'health-insurance',
    initials: 'HI',
    color: '#166534',
    name: 'Health Insurance',
    group: 'Health Insurance',
    type: 'insurance',
    useCase: 'personal',
    description: 'Health and medical insurance products',
  },
  // General Insurance
  {
    id: 'property-insurance',
    initials: 'PI',
    color: '#78350f',
    name: 'Property Insurance',
    group: 'General Insurance',
    type: 'insurance',
    useCase: 'business',
    description: 'Home and property insurance products',
  },
  {
    id: 'travel-insurance',
    initials: 'TI',
    color: '#0f766e',
    name: 'Travel Insurance',
    group: 'General Insurance',
    type: 'insurance',
    useCase: 'personal',
    description: 'Travel and international insurance products',
  },
  {
    id: 'agriculture-insurance',
    initials: 'AI',
    color: '#4d7c0f',
    name: 'Agriculture Insurance',
    group: 'General Insurance',
    type: 'insurance',
    useCase: 'business',
    description: 'Crop and livestock insurance products',
  },
  {
    id: 'micro-insurance',
    initials: 'MI',
    color: '#7c3aed',
    name: 'Micro Insurance',
    group: 'General Insurance',
    type: 'insurance',
    useCase: 'personal',
    description: 'Affordable micro insurance products',
  },
  // Investment
  {
    id: 'education-plan',
    initials: 'EP',
    color: '#9333ea',
    name: 'Education Plan',
    group: 'Investment',
    type: 'insurance',
    useCase: 'personal',
    description: 'Goal-based education savings with life cover',
  },
  {
    id: 'pension-plan',
    initials: 'PP',
    color: '#1d4ed8',
    name: 'Pension Plan',
    group: 'Investment',
    type: 'insurance',
    useCase: 'personal',
    description: 'Retirement savings with life cover',
  },
  // HMO
  {
    id: 'hmo-plans',
    initials: 'HM',
    color: '#374151',
    name: 'HMO Plans',
    group: 'HMO Health Plans',
    type: 'hmo',
    useCase: 'personal',
    description: 'Managed-care health plans from accredited HMOs',
  },
]

export const ALL_GROUPS = [...new Set(CATEGORIES.map((c) => c.group))]

// ── Provider config ───────────────────────────────────────────────────────────

const PROVIDERS = {
  aiico: { initials: 'AI', color: '#ea580c', name: 'AIICO Insurance' },
  allianz: { initials: 'AL', color: '#166534', name: 'Allianz Nigeria' },
  axa: { initials: 'AX', color: '#dc2626', name: 'AXA Mansard Insurance' },
  consolidated: { initials: 'CH', color: '#374151', name: 'Consolidated Hallmark Insurance' },
  cornerstone: { initials: 'CO', color: '#0f766e', name: 'Cornerstone Insurance' },
  custodian: { initials: 'CU', color: '#44403c', name: 'Custodian Insurance' },
}

const HMO_PROVIDERS = {
  avon: { initials: 'AV', color: '#374151', name: 'Avon HMO' },
  axaHmo: { initials: 'AX', color: '#1d4ed8', name: 'AXA Mansard Health' },
  clearline: { initials: 'CL', color: '#7c3aed', name: 'Clearline HMO' },
}

// Helper
function product(
  id: string,
  categoryId: string,
  providerKey: keyof typeof PROVIDERS | keyof typeof HMO_PROVIDERS,
  nameSuffix: string,
  price: number,
  opts: Partial<
    Omit<
      MarketplaceProduct,
      | 'id'
      | 'categoryId'
      | 'initials'
      | 'color'
      | 'name'
      | 'provider'
      | 'description'
      | 'startingPrice'
      | 'currency'
      | 'billingCycle'
    >
  > = {}
): MarketplaceProduct {
  const prov =
    (PROVIDERS as Record<string, { initials: string; color: string; name: string }>)[providerKey] ??
    (HMO_PROVIDERS as Record<string, { initials: string; color: string; name: string }>)[
      providerKey
    ]
  const fullName = `${prov.name} ${nameSuffix}`
  return {
    id,
    categoryId,
    initials: prov.initials,
    color: prov.color,
    name: fullName,
    provider: prov.name,
    description: `${fullName}, cover from ${prov.name} for customers in Nigeria.`,
    startingPrice: price,
    currency: 'NGN',
    billingCycle: 'Monthly',
    duration: opts.duration ?? '1 year',
    region: opts.region ?? 'All regions',
    planType: opts.planType ?? 'Individual',
    ageMin: opts.ageMin ?? 18,
    ageMax: opts.ageMax ?? 65,
    rating: opts.rating ?? 4,
    coverage: opts.coverage ?? ['Life cover'],
  }
}

// ── Products ──────────────────────────────────────────────────────────────────

export const PRODUCTS: MarketplaceProduct[] = [
  // Term Life
  product('tl-aiico-1', 'term-life', 'aiico', 'Term Life', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover', 'Disability'],
  }),
  product('tl-aiico-2', 'term-life', 'aiico', 'Term Life Plan', 2100, {
    duration: '2 years',
    planType: 'Family',
    coverage: ['Life cover'],
  }),
  product('tl-allianz-1', 'term-life', 'allianz', 'Term Life', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('tl-allianz-2', 'term-life', 'allianz', 'Term Life Plan', 3200, {
    duration: '5 years',
    planType: 'Group',
    coverage: ['Life cover', 'Disability'],
  }),
  product('tl-axa-1', 'term-life', 'axa', 'Term Life', 1890, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('tl-axa-2', 'term-life', 'axa', 'Term Life Plan', 3600, {
    duration: '5 years',
    planType: 'Family',
    coverage: ['Life cover', 'Disability'],
  }),
  product('tl-ch-1', 'term-life', 'consolidated', 'Term Life', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('tl-ch-2', 'term-life', 'consolidated', 'Term Life Plan', 2800, {
    duration: '2 years',
    planType: 'Individual',
    coverage: ['Life cover', 'Disability'],
  }),
  product('tl-co-1', 'term-life', 'cornerstone', 'Term Life', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('tl-co-2', 'term-life', 'cornerstone', 'Term Life Plan', 3100, {
    duration: '5 years',
    planType: 'Family',
    coverage: ['Life cover'],
  }),
  product('tl-cu-1', 'term-life', 'custodian', 'Term Life', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('tl-cu-2', 'term-life', 'custodian', 'Term Life Plan', 4200, {
    duration: '5 years',
    planType: 'Group',
    coverage: ['Life cover', 'Disability'],
  }),

  // Whole Life
  product('wl-aiico-1', 'whole-life', 'aiico', 'Whole Life', 1542, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('wl-aiico-2', 'whole-life', 'aiico', 'Whole Life Plan', 3200, {
    duration: 'Lifetime',
    planType: 'Family',
    coverage: ['Life cover', 'Disability'],
  }),
  product('wl-allianz-1', 'whole-life', 'allianz', 'Whole Life', 1542, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('wl-allianz-2', 'whole-life', 'allianz', 'Whole Life Plan', 4100, {
    duration: 'Lifetime',
    planType: 'Family',
    coverage: ['Life cover', 'Disability'],
  }),
  product('wl-axa-1', 'whole-life', 'axa', 'Insurance Whole Life', 1542, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('wl-axa-2', 'whole-life', 'axa', 'Insurance Whole Life Plan', 3800, {
    duration: 'Lifetime',
    planType: 'Family',
    coverage: ['Life cover'],
  }),
  product('wl-ch-1', 'whole-life', 'consolidated', 'Whole Life', 1542, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('wl-ch-2', 'whole-life', 'consolidated', 'Whole Life Plan', 3600, {
    duration: 'Lifetime',
    planType: 'Family',
    coverage: ['Life cover', 'Disability'],
  }),
  product('wl-co-1', 'whole-life', 'cornerstone', 'Whole Life', 1542, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('wl-cu-1', 'whole-life', 'custodian', 'Whole Life', 1542, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),

  // Credit Life
  product('cl-aiico-1', 'credit-life', 'aiico', 'Credit Life', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('cl-allianz-1', 'credit-life', 'allianz', 'Nigeria Credit Life', 2100, {
    duration: '2 years',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('cl-axa-1', 'credit-life', 'axa', 'Credit Life', 1800, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('cl-co-1', 'credit-life', 'cornerstone', 'Credit Life', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('cl-cu-1', 'credit-life', 'custodian', 'Credit Life', 2400, {
    duration: '2 years',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),

  // Health Insurance
  product('hi-aiico-1', 'health-insurance', 'aiico', 'Health Insurance', 2100, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Inpatient', 'Outpatient'],
  }),
  product('hi-aiico-2', 'health-insurance', 'aiico', 'Health Insurance Plan', 3800, {
    duration: '1 year',
    planType: 'Family',
    coverage: ['Inpatient', 'Outpatient', 'Maternity'],
  }),
  product('hi-allianz-1', 'health-insurance', 'allianz', 'Nigeria Health Insurance', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Inpatient', 'Outpatient'],
  }),
  product('hi-allianz-2', 'health-insurance', 'allianz', 'Nigeria Health Insurance Plan', 4200, {
    duration: '1 year',
    planType: 'Family',
    coverage: ['Inpatient', 'Outpatient', 'Dental', 'Optical'],
  }),
  product('hi-axa-1', 'health-insurance', 'axa', 'Health Insurance', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Inpatient', 'Outpatient'],
  }),
  product('hi-axa-2', 'health-insurance', 'axa', 'Health Insurance Plan', 3600, {
    duration: '1 year',
    planType: 'Family',
    coverage: ['Inpatient', 'Outpatient', 'Maternity'],
  }),
  product('hi-apex-1', 'health-insurance', 'consolidated', 'Essentials Health', 5800, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Inpatient', 'Outpatient', 'Dental', 'Optical', 'Maternity'],
  }),
  product('hi-co-1', 'health-insurance', 'cornerstone', 'Health Insurance', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Inpatient', 'Outpatient'],
  }),
  product('hi-cu-1', 'health-insurance', 'custodian', 'Health Insurance', 2100, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Inpatient', 'Outpatient'],
  }),

  // Property Insurance
  product('pi-aiico-1', 'property-insurance', 'aiico', 'Property Insurance', 1542, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),
  product('pi-allianz-1', 'property-insurance', 'allianz', 'Nigeria Property Insurance', 2100, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),
  product('pi-axa-1', 'property-insurance', 'axa', 'Property Insurance', 1800, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),
  product('pi-ch-1', 'property-insurance', 'consolidated', 'Property Insurance', 1542, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),
  product('pi-co-1', 'property-insurance', 'cornerstone', 'Property Insurance', 2400, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),

  // Travel Insurance
  product('ti-aiico-1', 'travel-insurance', 'aiico', 'Travel Insurance', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('ti-allianz-1', 'travel-insurance', 'allianz', 'Nigeria Travel Insurance', 1800, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('ti-axa-1', 'travel-insurance', 'axa', 'Travel Insurance', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('ti-co-1', 'travel-insurance', 'cornerstone', 'Travel Insurance', 2100, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('ti-cu-1', 'travel-insurance', 'custodian', 'Travel Insurance', 1542, {
    duration: '1 year',
    planType: 'Family',
    coverage: ['Life cover'],
  }),

  // Agriculture Insurance
  product('ag-aiico-1', 'agriculture-insurance', 'aiico', 'Agriculture Insurance', 1542, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),
  product('ag-allianz-1', 'agriculture-insurance', 'allianz', 'Agri Insurance', 2100, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),
  product('ag-axa-1', 'agriculture-insurance', 'axa', 'Agriculture Insurance', 1800, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),
  product('ag-co-1', 'agriculture-insurance', 'cornerstone', 'Crop & Livestock Cover', 1542, {
    duration: '1 year',
    coverage: ['Life cover'],
  }),

  // Micro Insurance
  product('mi-aiico-1', 'micro-insurance', 'aiico', 'Micro Insurance', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('mi-allianz-1', 'micro-insurance', 'allianz', 'Nigeria Micro Insurance', 1800, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('mi-cu-1', 'micro-insurance', 'custodian', 'Micro Insurance', 1542, {
    duration: '1 year',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),

  // Education Plan
  product('ep-aiico-1', 'education-plan', 'aiico', 'Education Plan', 2800, {
    duration: '5 years',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('ep-allianz-1', 'education-plan', 'allianz', 'Nigeria Education Plan', 3200, {
    duration: '5 years',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('ep-axa-1', 'education-plan', 'axa', 'Education Plan', 4100, {
    duration: '5 years',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('ep-cu-1', 'education-plan', 'custodian', 'Education Savings Plan', 3800, {
    duration: '5 years',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),

  // Pension Plan
  product('pp-aiico-1', 'pension-plan', 'aiico', 'Pension Plan', 4200, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('pp-allianz-1', 'pension-plan', 'allianz', 'Nigeria Pension Plan', 5100, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('pp-axa-1', 'pension-plan', 'axa', 'Pension Plan', 4800, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),
  product('pp-cu-1', 'pension-plan', 'custodian', 'Retirement Plan', 6200, {
    duration: 'Lifetime',
    planType: 'Individual',
    coverage: ['Life cover'],
  }),

  // HMO Plans, exact match to screenshot
  {
    id: 'hmo-avon-bronze-ind',
    categoryId: 'hmo-plans',
    initials: 'AV',
    color: '#374151',
    name: 'Avon HMO Bronze Individual',
    provider: 'Avon HMO',
    description:
      'Avon HMO Bronze Individual, basic outpatient cover for individuals from Avon HMO.',
    startingPrice: 1542,
    currency: 'NGN',
    billingCycle: 'Monthly',
    duration: '1 year',
    region: 'Lagos',
    planType: 'Individual',
    ageMin: 18,
    ageMax: 65,
    rating: 4,
    coverage: ['Outpatient'],
  },
  {
    id: 'hmo-avon-silver-fam',
    categoryId: 'hmo-plans',
    initials: 'AV',
    color: '#374151',
    name: 'Avon HMO Silver Family',
    provider: 'Avon HMO',
    description: 'Avon HMO Silver Family, inpatient + outpatient family cover from Avon HMO.',
    startingPrice: 3855,
    currency: 'NGN',
    billingCycle: 'Monthly',
    duration: '1 year',
    region: 'Lagos',
    planType: 'Family',
    ageMin: 0,
    ageMax: 65,
    rating: 4,
    coverage: ['Inpatient', 'Outpatient'],
  },
  {
    id: 'hmo-axa-bronze-ind',
    categoryId: 'hmo-plans',
    initials: 'AX',
    color: '#1d4ed8',
    name: 'AXA Mansard Health Bronze Individual',
    provider: 'AXA Mansard Health',
    description: 'AXA Mansard Health Bronze Individual, essential health cover for individuals.',
    startingPrice: 1542,
    currency: 'NGN',
    billingCycle: 'Monthly',
    duration: '1 year',
    region: 'Abuja',
    planType: 'Individual',
    ageMin: 18,
    ageMax: 65,
    rating: 5,
    coverage: ['Outpatient'],
  },
  {
    id: 'hmo-axa-silver-fam',
    categoryId: 'hmo-plans',
    initials: 'AX',
    color: '#1d4ed8',
    name: 'AXA Mansard Health Silver Family',
    provider: 'AXA Mansard Health',
    description:
      'AXA Mansard Health Silver Family, comprehensive family health plan with hospital cover.',
    startingPrice: 4200,
    currency: 'NGN',
    billingCycle: 'Monthly',
    duration: '1 year',
    region: 'Abuja',
    planType: 'Family',
    ageMin: 0,
    ageMax: 65,
    rating: 5,
    coverage: ['Inpatient', 'Outpatient', 'Maternity'],
  },
  {
    id: 'hmo-clearline-bronze-ind',
    categoryId: 'hmo-plans',
    initials: 'CL',
    color: '#7c3aed',
    name: 'Clearline HMO Bronze Individual',
    provider: 'Clearline HMO',
    description:
      'Clearline HMO Bronze Individual, affordable outpatient cover across network hospitals.',
    startingPrice: 1542,
    currency: 'NGN',
    billingCycle: 'Monthly',
    duration: '1 year',
    region: 'Port Harcourt',
    planType: 'Individual',
    ageMin: 18,
    ageMax: 65,
    rating: 4,
    coverage: ['Outpatient'],
  },
  {
    id: 'hmo-clearline-silver-fam',
    categoryId: 'hmo-plans',
    initials: 'CL',
    color: '#7c3aed',
    name: 'Clearline HMO Silver Family',
    provider: 'Clearline HMO',
    description:
      'Clearline HMO Silver Family, inpatient and outpatient family plan from Clearline HMO.',
    startingPrice: 3200,
    currency: 'NGN',
    billingCycle: 'Monthly',
    duration: '1 year',
    region: 'Port Harcourt',
    planType: 'Family',
    ageMin: 0,
    ageMax: 65,
    rating: 4,
    coverage: ['Inpatient', 'Outpatient'],
  },
]

export function getProductsByCategory(categoryId: string): MarketplaceProduct[] {
  // TODO: replace with real API call from @wrapa/api-client
  return PRODUCTS.filter((p) => p.categoryId === categoryId)
}

export function getCategoryById(id: string): MarketplaceCategory | undefined {
  // TODO: replace with real API call from @wrapa/api-client
  return CATEGORIES.find((c) => c.id === id)
}

export function getProductById(id: string): MarketplaceProduct | undefined {
  // TODO: replace with real API call from @wrapa/api-client
  return PRODUCTS.find((p) => p.id === id)
}
