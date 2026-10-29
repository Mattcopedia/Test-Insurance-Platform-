import api from '@/services/api'
import { parseEnvelope } from '@/services/api/schema'
import {
  contactAcceptedResponseSchema,
  contactFormSchema,
  contactRequestSchema,
  contactTopicsResponseSchema,
} from '@/services/contact/schema'
import type {
  ContactAccepted,
  ContactFormValues,
  ContactTopicOption,
} from '@/services/contact/types'

const ContactApi = {
  getTopics: async (): Promise<ContactTopicOption[]> => {
    const response = await api.get('/api/v1/website/contact/topics')
    return parseEnvelope(contactTopicsResponseSchema, response.data)
  },

  submit: async (input: ContactFormValues): Promise<ContactAccepted> => {
    const form = contactFormSchema.parse(input)
    const body = contactRequestSchema.parse({
      name: form.name,
      email: form.email,
      message: form.message,
      topic: form.topic,
      subject: form.subject,
      phone: form.phone || null,
      organizationName: form.organizationName || null,
      countryCode: null,
      sourcePage: '/contact',
      consentToContact: form.consentToContact,
      website: null,
    })
    const response = await api.post('/api/v1/website/contact', body)
    return parseEnvelope(contactAcceptedResponseSchema, response.data)
  },
}

export default ContactApi
