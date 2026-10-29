export const MARKETPLACE_LOGIN_URL = 'https://wrapper-africa.onrender.com/login'

const COLORS = [
  '#2563eb',
  '#166534',
  '#1e3a8a',
  '#312e81',
  '#9a3412',
  '#0f766e',
  '#7c3aed',
  '#be185d',
]

export function marketplaceLoginHref(next?: string) {
  if (!next) return MARKETPLACE_LOGIN_URL
  const url = new URL(MARKETPLACE_LOGIN_URL)
  url.searchParams.set('next', next)
  return url.toString()
}

export function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2)
  const letters = parts.map((part) => part[0] ?? '').join('')
  return letters.toUpperCase() || 'PL'
}

export function colorFrom(seed: string) {
  let hash = 0
  for (const char of seed) hash = char.charCodeAt(0) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

export function offeringHref(categoryKey: string, type: string, id: string) {
  return `/marketplace/${encodeURIComponent(categoryKey)}/o/${encodeURIComponent(type)}/${encodeURIComponent(id)}`
}

export function productHref(categoryKey: string, id: string) {
  return `/marketplace/${encodeURIComponent(categoryKey)}/${encodeURIComponent(id)}`
}

export function reviewsFrom(
  payload: { items?: unknown[]; reviews?: unknown[] } | null | undefined
) {
  const items = payload?.items ?? payload?.reviews ?? []
  return Array.isArray(items) ? items : []
}
