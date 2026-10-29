import type { z } from '@wrapa/forms'
import type {
  applicationFormSchema,
  categorySchema,
  compareOfferingsBodySchema,
  compareProductsBodySchema,
  groupSchema,
  hideReviewBodySchema,
  offeringDetailSchema,
  offeringSchema,
  productReviewsSchema,
  productSchema,
  quoteAcceptSchema,
  quoteSchema,
  reviewSchema,
  reviewSubmittedSchema,
  submitReviewBodySchema,
} from './schema'

export type MarketplaceCategory = z.infer<typeof categorySchema>
export type MarketplaceGroup = z.infer<typeof groupSchema>
export type MarketplaceOffering = z.infer<typeof offeringSchema>
export type MarketplaceOfferingDetail = z.infer<typeof offeringDetailSchema>
export type MarketplaceProduct = z.infer<typeof productSchema>
export type MarketplaceReview = z.infer<typeof reviewSchema>
export type MarketplaceProductReviews = z.infer<typeof productReviewsSchema>
export type MarketplaceQuote = z.infer<typeof quoteSchema>
export type MarketplaceQuoteAccept = z.infer<typeof quoteAcceptSchema>
export type MarketplaceReviewSubmitted = z.infer<typeof reviewSubmittedSchema>
export type MarketplaceApplicationForm = z.infer<typeof applicationFormSchema>
export type CompareOfferingsBody = z.infer<typeof compareOfferingsBodySchema>
export type CompareProductsBody = z.infer<typeof compareProductsBodySchema>
export type SubmitReviewBody = z.infer<typeof submitReviewBodySchema>
export type HideReviewBody = z.infer<typeof hideReviewBodySchema>

export type Paged<T> = {
  items: T[]
  pageNumber?: number | null
  pageSize?: number | null
  totalCount?: number | null
  totalPages?: number | null
  hasPreviousPage?: boolean
  hasNextPage?: boolean
}

export type OfferingListQuery = {
  countryCode?: string
  coverageType?: string
  categoryId?: string
  customerType?: string
  maxPremium?: number
  minPremium?: number
  audience?: string
  providerOrganizationId?: string
  billingPeriod?: string
  region?: string
  ageYears?: number
  minRating?: number
  benefit?: string
  page?: number
  pageSize?: number
}

export type ProductListQuery = {
  countryCode?: string
  coverageType?: string
  categoryId?: string
  customerType?: string
  maxPremium?: number
  audience?: string
  page?: number
  pageSize?: number
}

export type ReviewListQuery = {
  productId?: string
  insurerOrganizationId?: string
  offeringType?: string
  page?: number
  pageSize?: number
}
