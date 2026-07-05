import { axios } from '@wrapa/api-client'

// Placeholder will be wired to real session/token storage once @wrapa/auth is built out
function getAuthToken(): string | null {
  return null
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status: number = error.response?.status ?? 0
    const message: string =
      error.response?.data?.message ?? error.message ?? 'An unexpected error occurred'
    return Promise.reject({ message, status })
  }
)

export default apiClient
