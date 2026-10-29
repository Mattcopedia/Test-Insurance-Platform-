import type { z } from '@wrapa/forms'
import type { newsArticleSchema, newsPageSchema, newsQuerySchema } from './schema'

export type NewsQuery = z.infer<typeof newsQuerySchema>
export type NewsArticle = z.infer<typeof newsArticleSchema>
export type NewsPage = z.infer<typeof newsPageSchema>
