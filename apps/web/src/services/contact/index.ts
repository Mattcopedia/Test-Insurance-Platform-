import apiClient from '../api'
import type { ContactFormData, ContactSubmitResponse } from './type'

export async function submitContactForm(data: ContactFormData): Promise<ContactSubmitResponse> {
  try {
    // TODO: replace mock with real API call once backend endpoint exists
    await apiClient.post('/contact', data)
    return { success: true, message: 'Message sent successfully.' }
  } catch {
    return { success: false, message: 'Failed to send your message. Please try again.' }
  }
}
