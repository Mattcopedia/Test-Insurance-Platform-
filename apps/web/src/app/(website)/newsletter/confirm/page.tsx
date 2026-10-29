import type { Metadata } from 'next'
import { NewsletterTokenPage } from '../newsletter-token-page'

export const metadata: Metadata = {
  title: 'Confirm subscription | WRAPA',
}

export default function NewsletterConfirmPage() {
  return <NewsletterTokenPage action="confirm" />
}
