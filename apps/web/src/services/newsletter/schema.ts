import { z } from '@wrapa/forms'
import { apiEnvelopeSchema } from '@/services/api/schema'

export const newsletterSubscribeFormSchema = z
  .object({
    email: z.string().trim().email('Enter a valid email address'),
    consent: z.boolean().refine((value) => value, {
      message: 'Please agree to hear from WRAPA.',
    }),
    website: z.string(),
  })
  .refine((value) => value.website.trim() === '', {
    message: 'Unable to subscribe this address.',
    path: ['website'],
  })

export const newsletterSubscribeRequestSchema = z.object({
  email: z.string().email(),
  consent: z.boolean(),
  countryCode: z.string().nullable(),
  source: z.string().nullable(),
  website: z.string().nullable(),
})

export const newsletterTokenRequestSchema = z.object({
  token: z.string().min(1, 'This link is missing a token.'),
})

export const newsletterSignupSchema = z.object({
  message: z.string(),
})

export const newsletterSubscriberStatusSchema = z.enum(['Pending', 'Confirmed', 'Unsubscribed'])

export const newsletterStatusSchema = z.object({
  status: newsletterSubscriberStatusSchema,
  message: z.string(),
})

export const newsletterSignupResponseSchema = apiEnvelopeSchema(newsletterSignupSchema)
export const newsletterStatusResponseSchema = apiEnvelopeSchema(newsletterStatusSchema)
