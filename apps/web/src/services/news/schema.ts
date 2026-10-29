import { z } from '@wrapa/forms'
import { apiEnvelopeSchema } from '@/services/api/schema'

export const newsScopeSchema = z.enum(['Local', 'Africa', 'Global'])
export const newsTopicSchema = z.enum(['Insurance', 'Health'])

export const newsQuerySchema = z.object({
  scope: newsScopeSchema.optional(),
  topic: newsTopicSchema.optional(),
  country: z.string().min(2).optional(),
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(50).optional(),
})

export const newsArticleSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  summary: z.string().nullable(),
  url: z.string().min(1),
  imageUrl: z.string().nullable(),
  sourceName: z.string(),
  publishedAt: z.string(),
  scope: newsScopeSchema,
  countryCode: z.string().nullable(),
  topic: newsTopicSchema,
  isPinned: z.boolean(),
})

export const newsPageSchema = z.object({
  items: z.array(newsArticleSchema),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
})

export const newsListResponseSchema = apiEnvelopeSchema(newsPageSchema)
