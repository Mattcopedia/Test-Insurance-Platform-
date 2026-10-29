import { z } from '@wrapa/forms'
import { apiEnvelopeSchema } from '@/services/api/schema'

export const sponsoredPlacementSchema = z.enum(['Any', 'Homepage', 'News', 'Marketplace'])

export const sponsoredQuerySchema = z.object({
  placement: sponsoredPlacementSchema.optional(),
  country: z.string().min(2).optional(),
  limit: z.number().int().positive().max(50).optional(),
})

export const sponsoredSummarySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string(),
  excerpt: z.string(),
  imageUrl: z.string().nullable(),
  partnerName: z.string(),
  partnerLogoUrl: z.string().nullable(),
  callToActionLabel: z.string().nullable(),
  callToActionUrl: z.string().nullable(),
  placement: sponsoredPlacementSchema,
  countryCode: z.string().nullable(),
  publishedAt: z.string().nullable(),
  isSponsored: z.boolean(),
  disclosure: z.string(),
})

export const sponsoredPostSchema = sponsoredSummarySchema.extend({
  body: z.string(),
})

export const sponsoredListResponseSchema = apiEnvelopeSchema(z.array(sponsoredSummarySchema))
export const sponsoredPostResponseSchema = apiEnvelopeSchema(sponsoredPostSchema)
