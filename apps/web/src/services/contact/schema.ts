import { z } from '@wrapa/forms'
import { apiEnvelopeSchema } from '@/services/api/schema'

export const contactTopicSchema = z.enum([
  'General',
  'Sales',
  'Partnership',
  'Support',
  'Claims',
  'Media',
  'Complaint',
  'Other',
])

export const contactTopicOptionSchema = z.object({
  value: contactTopicSchema,
  label: z.string(),
})

export const contactFormSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email('Enter a valid email address'),
    topic: contactTopicSchema,
    subject: z.string().trim().min(1, 'Subject is required'),
    message: z.string().trim().min(10, 'Message must be at least 10 characters'),
    phone: z.string().trim(),
    organizationName: z.string().trim(),
    consentToContact: z.boolean().refine((value) => value, {
      message: 'Please agree so we can reply to you.',
    }),
    website: z.string(),
  })
  .refine((value) => value.website.trim() === '', {
    message: 'Unable to send this message.',
    path: ['website'],
  })

export const contactRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  topic: contactTopicSchema.nullable(),
  subject: z.string().nullable(),
  phone: z.string().nullable(),
  organizationName: z.string().nullable(),
  countryCode: z.string().nullable(),
  sourcePage: z.string().nullable(),
  consentToContact: z.boolean(),
  website: z.string().nullable(),
})

export const contactAcceptedSchema = z.object({
  reference: z.string(),
  message: z.string(),
})

export const contactTopicsResponseSchema = apiEnvelopeSchema(z.array(contactTopicOptionSchema))
export const contactAcceptedResponseSchema = apiEnvelopeSchema(contactAcceptedSchema)
