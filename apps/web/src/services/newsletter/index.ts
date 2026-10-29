import api from '@/services/api'
import { parseEnvelope } from '@/services/api/schema'
import {
  newsletterSignupResponseSchema,
  newsletterStatusResponseSchema,
  newsletterSubscribeFormSchema,
  newsletterSubscribeRequestSchema,
  newsletterTokenRequestSchema,
} from '@/services/newsletter/schema'
import type {
  NewsletterSignup,
  NewsletterStatus,
  NewsletterSubscribeFormValues,
} from '@/services/newsletter/types'

const NewsletterApi = {
  subscribe: async (input: NewsletterSubscribeFormValues): Promise<NewsletterSignup> => {
    const form = newsletterSubscribeFormSchema.parse(input)
    const body = newsletterSubscribeRequestSchema.parse({
      email: form.email,
      consent: form.consent,
      countryCode: null,
      source: 'website-footer',
      website: null,
    })
    const response = await api.post('/api/v1/website/newsletter/subscriptions', body)
    return parseEnvelope(newsletterSignupResponseSchema, response.data)
  },

  confirm: async (token: string): Promise<NewsletterStatus> => {
    const body = newsletterTokenRequestSchema.parse({ token })
    const response = await api.post('/api/v1/website/newsletter/confirm', body)
    return parseEnvelope(newsletterStatusResponseSchema, response.data)
  },

  unsubscribe: async (token: string): Promise<NewsletterStatus> => {
    const body = newsletterTokenRequestSchema.parse({ token })
    const response = await api.post('/api/v1/website/newsletter/unsubscribe', body)
    return parseEnvelope(newsletterStatusResponseSchema, response.data)
  },
}

export default NewsletterApi
