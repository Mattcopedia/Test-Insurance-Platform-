import api from '@/services/api'
import { parseEnvelope } from '@/services/api/schema'
import {
  testimonialListResponseSchema,
  testimonialQuerySchema,
} from '@/services/testimonials/schema'
import type { Testimonial, TestimonialQuery } from '@/services/testimonials/types'

const TestimonialsApi = {
  list: async (query: TestimonialQuery = {}): Promise<Testimonial[]> => {
    const parsed = testimonialQuerySchema.parse(query)
    const response = await api.get('/api/v1/website/testimonials', { params: parsed })
    return parseEnvelope(testimonialListResponseSchema, response.data)
  },
}

export default TestimonialsApi
