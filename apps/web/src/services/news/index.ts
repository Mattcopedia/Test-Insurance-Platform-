import api from '@/services/api'
import { parseEnvelope } from '@/services/api/schema'
import { newsListResponseSchema, newsQuerySchema } from '@/services/news/schema'
import type { NewsPage, NewsQuery } from '@/services/news/types'

const NewsApi = {
  getNews: async (query: NewsQuery = {}): Promise<NewsPage> => {
    const parsed = newsQuerySchema.parse(query)
    const response = await api.get('/api/v1/website/news', { params: parsed })
    return parseEnvelope(newsListResponseSchema, response.data)
  },
}

export default NewsApi
