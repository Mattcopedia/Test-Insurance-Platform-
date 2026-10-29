import { axios } from '@wrapa/api-client'
import { ApiRequestError } from '@/services/api/schema'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  // The public website is anonymous. Do not send an access token.
  if (config.headers) {
    delete config.headers.Authorization
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    const payload = error.response?.data
    let message = 'Something went wrong. Please try again.'

    if (
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string' &&
      payload.message.length > 0
    ) {
      message = payload.message
    } else if (!error.response) {
      message = 'We could not reach WRAPA. Check your connection and try again.'
    }

    return Promise.reject(new ApiRequestError(message, error.response?.status ?? 0))
  }
)

export default apiClient
