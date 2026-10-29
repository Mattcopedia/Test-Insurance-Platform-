import api from '@/services/api'
import { parseEnvelope } from '@/services/api/schema'
import {
  applicationFormResponseSchema,
  categoriesResponseSchema,
  compareOfferingsBodySchema,
  compareProductsBodySchema,
  groupsResponseSchema,
  hideReviewBodySchema,
  hideReviewResponseSchema,
  offeringCompareResponseSchema,
  offeringDetailResponseSchema,
  offeringsListResponseSchema,
  offeringsPageResponseSchema,
  productCompareResponseSchema,
  productResponseSchema,
  productReviewsResponseSchema,
  productsListResponseSchema,
  productsPageResponseSchema,
  quoteAcceptResponseSchema,
  quoteResponseSchema,
  quotesListResponseSchema,
  requestQuoteBodySchema,
  reviewSubmittedResponseSchema,
  reviewsPageResponseSchema,
  submitReviewBodySchema,
} from './schema'
import type {
  CompareOfferingsBody,
  CompareProductsBody,
  HideReviewBody,
  MarketplaceApplicationForm,
  MarketplaceCategory,
  MarketplaceGroup,
  MarketplaceOffering,
  MarketplaceOfferingDetail,
  MarketplaceProduct,
  MarketplaceProductReviews,
  MarketplaceQuote,
  MarketplaceQuoteAccept,
  MarketplaceReviewSubmitted,
  OfferingListQuery,
  Paged,
  ProductListQuery,
  ReviewListQuery,
  SubmitReviewBody,
} from './types'

function compact(params: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== '' && value !== null
    )
  )
}

function arrayParams(params: Record<string, unknown>) {
  return {
    params: compact(params),
    paramsSerializer: {
      serialize(query: Record<string, unknown>) {
        const search = new URLSearchParams()
        for (const [key, value] of Object.entries(query)) {
          if (Array.isArray(value)) {
            for (const item of value) search.append(key, String(item))
          } else if (value !== undefined && value !== null && value !== '') {
            search.append(key, String(value))
          }
        }
        return search.toString()
      },
    },
  }
}

function parseList<T>(schema: Parameters<typeof parseEnvelope<T[]>>[0], payload: unknown): T[] {
  try {
    return parseEnvelope(schema, payload)
  } catch {
    return []
  }
}

function parsePage<T>(
  schema: Parameters<typeof parseEnvelope<Paged<T>>>[0],
  payload: unknown
): Paged<T> {
  try {
    const page = parseEnvelope(schema, payload)
    return { ...page, items: page.items ?? [] }
  } catch {
    return { items: [], pageNumber: 1, totalCount: 0, totalPages: 0 }
  }
}

const MarketplaceApi = {
  getCategories: async (
    query: { activeOnly?: boolean; audience?: string } = {}
  ): Promise<MarketplaceCategory[]> => {
    const response = await api.get('/api/v1/marketplace/categories', { params: compact(query) })
    return parseList(categoriesResponseSchema, response.data)
  },

  getGroups: async (
    query: { activeOnly?: boolean; audience?: string } = {}
  ): Promise<MarketplaceGroup[]> => {
    const response = await api.get('/api/v1/marketplace/groups', { params: compact(query) })
    return parseList(groupsResponseSchema, response.data)
  },

  getOfferings: async (query: OfferingListQuery = {}): Promise<Paged<MarketplaceOffering>> => {
    const response = await api.get('/api/v1/marketplace/offerings', { params: compact(query) })
    return parsePage(offeringsPageResponseSchema, response.data)
  },

  getOffering: async (
    type: string,
    id: string,
    countryCode?: string
  ): Promise<MarketplaceOfferingDetail> => {
    const response = await api.get(
      `/api/v1/marketplace/offerings/${encodeURIComponent(type)}/${encodeURIComponent(id)}`,
      {
        params: compact({ countryCode }),
      }
    )
    return parseEnvelope(offeringDetailResponseSchema, response.data)
  },

  getOfferingReviews: async (type: string, id: string): Promise<MarketplaceProductReviews> => {
    const response = await api.get(
      `/api/v1/marketplace/offerings/${encodeURIComponent(type)}/${encodeURIComponent(id)}/reviews`
    )
    try {
      return parseEnvelope(productReviewsResponseSchema, response.data)
    } catch {
      return { items: [], reviews: [] }
    }
  },

  compareOfferings: async (
    offerings: string[],
    countryCode?: string
  ): Promise<MarketplaceOfferingDetail[]> => {
    const response = await api.get(
      '/api/v1/marketplace/offerings/compare',
      arrayParams({ offerings, countryCode })
    )
    return parseList(offeringCompareResponseSchema, response.data)
  },

  postCompareOfferings: async (
    body: CompareOfferingsBody
  ): Promise<MarketplaceOfferingDetail[]> => {
    const payload = compareOfferingsBodySchema.parse(body)
    const response = await api.post('/api/v1/marketplace/offerings/compare', payload)
    return parseList(offeringCompareResponseSchema, response.data)
  },

  getBestSellers: async (
    query: OfferingListQuery & { windowDays?: number; limit?: number } = {}
  ): Promise<MarketplaceOffering[]> => {
    const response = await api.get('/api/v1/marketplace/best-sellers', { params: compact(query) })
    return parseList(offeringsListResponseSchema, response.data)
  },

  getRecommendations: async (
    query: OfferingListQuery & { limit?: number } = {}
  ): Promise<MarketplaceOffering[]> => {
    const response = await api.get('/api/v1/marketplace/recommendations', {
      params: compact(query),
    })
    return parseList(offeringsListResponseSchema, response.data)
  },

  getRecommendationsBasic: async (
    query: ProductListQuery & { limit?: number } = {}
  ): Promise<MarketplaceProduct[]> => {
    const response = await api.get('/api/v1/marketplace/recommendations/basic', {
      params: compact(query),
    })
    return parseList(productsListResponseSchema, response.data)
  },

  getProducts: async (query: ProductListQuery = {}): Promise<Paged<MarketplaceProduct>> => {
    const response = await api.get('/api/v1/marketplace/products', { params: compact(query) })
    return parsePage(productsPageResponseSchema, response.data)
  },

  getProduct: async (id: string): Promise<MarketplaceProduct> => {
    const response = await api.get(`/api/v1/marketplace/products/${encodeURIComponent(id)}`)
    return parseEnvelope(productResponseSchema, response.data)
  },

  getProductApplicationForm: async (productId: string): Promise<MarketplaceApplicationForm> => {
    const response = await api.get(
      `/api/v1/marketplace/products/${encodeURIComponent(productId)}/application-form`
    )
    return parseEnvelope(applicationFormResponseSchema, response.data)
  },

  getProductReviews: async (id: string): Promise<MarketplaceProductReviews> => {
    const response = await api.get(`/api/v1/marketplace/products/${encodeURIComponent(id)}/reviews`)
    try {
      return parseEnvelope(productReviewsResponseSchema, response.data)
    } catch {
      return { items: [], reviews: [] }
    }
  },

  compareProducts: async (
    productIds: string[],
    countryCode?: string
  ): Promise<MarketplaceProduct[]> => {
    const response = await api.get(
      '/api/v1/marketplace/products/compare',
      arrayParams({ productIds, countryCode })
    )
    return parseList(productCompareResponseSchema, response.data)
  },

  postCompareProducts: async (body: CompareProductsBody): Promise<MarketplaceProduct[]> => {
    const payload = compareProductsBodySchema.parse(body)
    const response = await api.post('/api/v1/marketplace/products/compare', payload)
    return parseList(productCompareResponseSchema, response.data)
  },

  getReviews: async (
    query: ReviewListQuery = {}
  ): Promise<Paged<import('./types').MarketplaceReview>> => {
    const response = await api.get('/api/v1/marketplace/reviews', { params: compact(query) })
    return parsePage(reviewsPageResponseSchema, response.data)
  },

  getInsurerReviews: async (
    insurerId: string,
    query: { page?: number; pageSize?: number } = {}
  ): Promise<Paged<import('./types').MarketplaceReview>> => {
    const response = await api.get(
      `/api/v1/marketplace/insurers/${encodeURIComponent(insurerId)}/reviews`,
      {
        params: compact(query),
      }
    )
    return parsePage(reviewsPageResponseSchema, response.data)
  },

  submitProductReview: async (
    id: string,
    body: SubmitReviewBody
  ): Promise<MarketplaceReviewSubmitted> => {
    const payload = submitReviewBodySchema.parse(body)
    const response = await api.post(
      `/api/v1/marketplace/products/${encodeURIComponent(id)}/reviews`,
      payload
    )
    return parseEnvelope(reviewSubmittedResponseSchema, response.data)
  },

  submitOfferingReview: async (
    type: string,
    id: string,
    body: SubmitReviewBody
  ): Promise<MarketplaceReviewSubmitted> => {
    const payload = submitReviewBodySchema.parse(body)
    const response = await api.post(
      `/api/v1/marketplace/offerings/${encodeURIComponent(type)}/${encodeURIComponent(id)}/reviews`,
      payload
    )
    return parseEnvelope(reviewSubmittedResponseSchema, response.data)
  },

  hideReview: async (reviewId: string, body: HideReviewBody = {}): Promise<unknown> => {
    const payload = hideReviewBodySchema.parse(body)
    const response = await api.post(
      `/api/v1/marketplace/reviews/${encodeURIComponent(reviewId)}/hide`,
      payload
    )
    return parseEnvelope(hideReviewResponseSchema, response.data)
  },

  createQuote: async (body: Record<string, unknown>): Promise<MarketplaceQuote> => {
    const payload = requestQuoteBodySchema.parse(body)
    const response = await api.post('/api/v1/marketplace/quotes', payload)
    return parseEnvelope(quoteResponseSchema, response.data)
  },

  getQuotes: async (): Promise<MarketplaceQuote[]> => {
    const response = await api.get('/api/v1/marketplace/quotes')
    return parseList(quotesListResponseSchema, response.data)
  },

  getQuote: async (id: string): Promise<MarketplaceQuote> => {
    const response = await api.get(`/api/v1/marketplace/quotes/${encodeURIComponent(id)}`)
    return parseEnvelope(quoteResponseSchema, response.data)
  },

  acceptQuote: async (id: string): Promise<MarketplaceQuoteAccept> => {
    const response = await api.post(`/api/v1/marketplace/quotes/${encodeURIComponent(id)}/accept`)
    return parseEnvelope(quoteAcceptResponseSchema, response.data)
  },
}

export default MarketplaceApi
