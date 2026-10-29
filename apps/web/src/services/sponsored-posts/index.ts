import api from '@/services/api'
import { parseEnvelope } from '@/services/api/schema'
import {
  sponsoredListResponseSchema,
  sponsoredPostResponseSchema,
  sponsoredQuerySchema,
} from '@/services/sponsored-posts/schema'
import type {
  SponsoredPost,
  SponsoredQuery,
  SponsoredSummary,
} from '@/services/sponsored-posts/types'

const SponsoredPostsApi = {
  list: async (query: SponsoredQuery = {}): Promise<SponsoredSummary[]> => {
    const parsed = sponsoredQuerySchema.parse(query)
    const response = await api.get('/api/v1/website/sponsored-posts', { params: parsed })
    return parseEnvelope(sponsoredListResponseSchema, response.data)
  },

  getBySlug: async (slug: string, country?: string): Promise<SponsoredPost> => {
    const response = await api.get(`/api/v1/website/sponsored-posts/${encodeURIComponent(slug)}`, {
      params: country ? { country } : undefined,
    })
    return parseEnvelope(sponsoredPostResponseSchema, response.data)
  },
}

export default SponsoredPostsApi
