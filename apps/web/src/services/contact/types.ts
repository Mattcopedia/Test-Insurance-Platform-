import type { z } from '@wrapa/forms'
import type {
  contactAcceptedSchema,
  contactFormSchema,
  contactRequestSchema,
  contactTopicOptionSchema,
} from './schema'

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type ContactRequest = z.infer<typeof contactRequestSchema>
export type ContactTopicOption = z.infer<typeof contactTopicOptionSchema>
export type ContactAccepted = z.infer<typeof contactAcceptedSchema>
