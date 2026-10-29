import { z } from '@wrapa/forms'
import { apiEnvelopeSchema } from '@/services/api/schema'

export const testimonialQuerySchema = z.object({
  country: z.string().min(2).optional(),
  featured: z.boolean().optional(),
  limit: z.number().int().positive().max(50).optional(),
})

export const testimonialSchema = z.object({
  id: z.string().min(1),
  authorName: z.string(),
  authorTitle: z.string().nullable(),
  organizationName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  quote: z.string(),
  rating: z.number().int().nullable(),
  countryCode: z.string().nullable(),
  isFeatured: z.boolean(),
})

export const testimonialListResponseSchema = apiEnvelopeSchema(z.array(testimonialSchema))
