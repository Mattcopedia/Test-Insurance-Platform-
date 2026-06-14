import { z } from '@wrapa/forms'
import { contactSchema } from './schema'

export type ContactFormData = z.infer<typeof contactSchema>

export type ContactSubmitResponse = {
  success: boolean
  message: string
}
