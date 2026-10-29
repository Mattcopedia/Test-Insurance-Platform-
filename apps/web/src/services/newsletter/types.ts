import type { z } from '@wrapa/forms'
import type {
  newsletterSignupSchema,
  newsletterStatusSchema,
  newsletterSubscribeFormSchema,
} from './schema'

export type NewsletterSubscribeFormValues = z.infer<typeof newsletterSubscribeFormSchema>
export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>
export type NewsletterStatus = z.infer<typeof newsletterStatusSchema>
