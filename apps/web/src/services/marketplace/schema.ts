import { z } from '@wrapa/forms'
import { apiEnvelopeSchema } from '@/services/api/schema'

const num = z.coerce.number()
const optionalNum = num.nullish()
const optionalText = z.string().nullish()

export const productGroupRefSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    audience: z.string().optional(),
    sortOrder: optionalNum,
  })
  .passthrough()

export const categorySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    coverageType: z.string().optional(),
    group: z.string().optional(),
    groupId: optionalText,
    groupInfo: productGroupRefSchema.nullish(),
    iconUrl: optionalText,
    description: optionalText,
    sortOrder: optionalNum,
    isActive: z.boolean().optional(),
  })
  .passthrough()

export const groupSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    audience: z.string().optional(),
    description: optionalText,
    iconUrl: optionalText,
    sortOrder: optionalNum,
    isActive: z.boolean().optional(),
  })
  .passthrough()

export const pricingTierSchema = z
  .object({
    id: optionalText,
    name: optionalText,
    premium: optionalNum,
    currency: optionalText,
    billingPeriod: optionalText,
    coverageAmount: optionalNum,
  })
  .passthrough()

export const offeringSchema = z
  .object({
    offeringType: z.string(),
    id: z.string(),
    providerOrganizationId: optionalText,
    providerName: z.string().optional(),
    providerLogoUrl: optionalText,
    categoryId: optionalText,
    name: z.string(),
    description: optionalText,
    countryCode: optionalText,
    coverageType: optionalText,
    currency: optionalText,
    headlinePrice: optionalNum,
    headlineBillingPeriod: optionalText,
    audience: z.array(z.string()).optional(),
    purchaseFlow: optionalText,
    primaryActionPath: optionalText,
    averageRating: optionalNum,
    reviewCount: optionalNum,
  })
  .passthrough()

export const offeringDetailSchema = z
  .object({
    offering: offeringSchema,
    pricingTiers: z.array(pricingTierSchema).nullish(),
    minEntryAge: optionalNum,
    maxEntryAge: optionalNum,
    minCoverageAmount: optionalNum,
    maxCoverageAmount: optionalNum,
    brochureUrl: optionalText,
    waitingPeriodDays: optionalNum,
    maxDependents: optionalNum,
    requiresPreAuthorization: z.boolean().optional(),
    allowsDependents: z.boolean().optional(),
    benefits: z.array(z.unknown()).nullish(),
    hospitalCoverage: z.unknown().nullish(),
  })
  .passthrough()

export const productSchema = z
  .object({
    id: z.string(),
    insurerOrganizationId: optionalText,
    insurerName: z.string().optional(),
    insurerLogoUrl: optionalText,
    templateId: optionalText,
    categoryId: optionalText,
    name: z.string(),
    description: optionalText,
    brochureUrl: optionalText,
    location: optionalText,
    currencyCode: optionalText,
    countryCode: optionalText,
    status: optionalText,
    coverageType: optionalText,
    minEntryAge: optionalNum,
    maxEntryAge: optionalNum,
    minCoverageAmount: optionalNum,
    maxCoverageAmount: optionalNum,
    publishedAt: optionalText,
    pricingTiers: z.array(pricingTierSchema).optional(),
    headline: pricingTierSchema.nullish(),
    availableCountries: z.array(z.string()).optional(),
    allowedCustomerTypes: z.array(z.string()).optional(),
    audience: z.array(z.string()).optional(),
    allowedClaimTypes: z.array(z.string()).optional(),
    fulfilmentMode: optionalText,
    averageRating: optionalNum,
    reviewCount: optionalNum,
  })
  .passthrough()

export const reviewSchema = z
  .object({
    id: z.string().optional(),
    rating: optionalNum,
    comment: optionalText,
    body: optionalText,
    title: optionalText,
    createdAt: optionalText,
    reviewerName: optionalText,
    authorName: optionalText,
  })
  .passthrough()

export const pagedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z
    .object({
      items: z.array(item).default([]),
      pageNumber: optionalNum,
      pageSize: optionalNum,
      totalCount: optionalNum,
      totalPages: optionalNum,
      hasPreviousPage: z.boolean().optional(),
      hasNextPage: z.boolean().optional(),
    })
    .passthrough()

export const productReviewsSchema = z
  .object({
    averageRating: optionalNum,
    reviewCount: optionalNum,
    items: z.array(reviewSchema).optional(),
    reviews: z.array(reviewSchema).optional(),
  })
  .passthrough()

export const applicationFormSchema = z.object({}).passthrough()

export const quoteSchema = z
  .object({
    id: z.string().optional(),
    status: optionalText,
    premium: optionalNum,
    currency: optionalText,
  })
  .passthrough()

export const quoteAcceptSchema = z
  .object({
    quoteId: optionalText,
    status: optionalText,
    policyRequestId: optionalText,
    premium: optionalNum,
    currency: optionalText,
  })
  .passthrough()

export const reviewSubmittedSchema = z
  .object({
    reviewId: optionalText,
    rating: optionalNum,
    newAverageRating: optionalNum,
  })
  .passthrough()

export const compareOfferingsBodySchema = z.object({
  offerings: z.array(
    z.union([z.string(), z.object({ type: z.string(), id: z.string() }).passthrough()])
  ),
  countryCode: z.string().optional(),
})

export const compareProductsBodySchema = z.object({
  productIds: z.array(z.string()),
  countryCode: z.string().optional(),
})

export const submitReviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  title: z.string().optional(),
})

export const hideReviewBodySchema = z.object({
  reason: z.string().optional(),
})

export const requestQuoteBodySchema = z.record(z.string(), z.unknown())

export const categoriesResponseSchema = apiEnvelopeSchema(z.array(categorySchema))
export const groupsResponseSchema = apiEnvelopeSchema(z.array(groupSchema))
export const offeringsPageResponseSchema = apiEnvelopeSchema(pagedSchema(offeringSchema))
export const offeringsListResponseSchema = apiEnvelopeSchema(z.array(offeringSchema))
export const offeringDetailResponseSchema = apiEnvelopeSchema(offeringDetailSchema)
export const productsPageResponseSchema = apiEnvelopeSchema(pagedSchema(productSchema))
export const productsListResponseSchema = apiEnvelopeSchema(z.array(productSchema))
export const productResponseSchema = apiEnvelopeSchema(productSchema)
export const reviewsPageResponseSchema = apiEnvelopeSchema(pagedSchema(reviewSchema))
export const productReviewsResponseSchema = apiEnvelopeSchema(productReviewsSchema)
export const applicationFormResponseSchema = apiEnvelopeSchema(applicationFormSchema)
export const offeringCompareResponseSchema = apiEnvelopeSchema(z.array(offeringDetailSchema))
export const productCompareResponseSchema = apiEnvelopeSchema(z.array(productSchema))
export const quotesListResponseSchema = apiEnvelopeSchema(z.array(quoteSchema))
export const quoteResponseSchema = apiEnvelopeSchema(quoteSchema)
export const quoteAcceptResponseSchema = apiEnvelopeSchema(quoteAcceptSchema)
export const reviewSubmittedResponseSchema = apiEnvelopeSchema(reviewSubmittedSchema)
export const hideReviewResponseSchema = apiEnvelopeSchema(z.unknown())
