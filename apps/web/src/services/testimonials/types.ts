import type { z } from '@wrapa/forms'
import type { testimonialQuerySchema, testimonialSchema } from './schema'

export type TestimonialQuery = z.infer<typeof testimonialQuerySchema>
export type Testimonial = z.infer<typeof testimonialSchema>
