import type { z } from '@wrapa/forms'
import type {
  sponsoredPlacementSchema,
  sponsoredPostSchema,
  sponsoredQuerySchema,
  sponsoredSummarySchema,
} from './schema'

export type SponsoredPlacement = z.infer<typeof sponsoredPlacementSchema>
export type SponsoredQuery = z.infer<typeof sponsoredQuerySchema>
export type SponsoredSummary = z.infer<typeof sponsoredSummarySchema>
export type SponsoredPost = z.infer<typeof sponsoredPostSchema>
