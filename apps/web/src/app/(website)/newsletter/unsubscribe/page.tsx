import type { Metadata } from 'next'
import { NewsletterTokenPage } from '../newsletter-token-page'

export const metadata: Metadata = {
  title: 'Unsubscribe | WRAPA',
}

export default function NewsletterUnsubscribePage() {
  return <NewsletterTokenPage action="unsubscribe" />
}
