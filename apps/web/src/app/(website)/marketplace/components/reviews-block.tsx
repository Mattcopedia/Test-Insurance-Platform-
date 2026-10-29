import type { MarketplaceReview } from '@/services/marketplace/types'
import { MarketplaceEmpty } from './marketplace-empty'

export function ReviewsBlock({
  reviews,
  writeHref,
}: {
  reviews: MarketplaceReview[]
  writeHref: string
}) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="font-serif text-[22px] font-bold text-black/80">Reviews</h2>
        <a href={writeHref} className="text-[14px] text-black/60 underline">
          Write a review
        </a>
      </div>
      {reviews.length === 0 ? (
        <MarketplaceEmpty message="No Best offering based on reviews" />
      ) : (
        <ul className="space-y-3">
          {reviews.map((review, index) => (
            <li
              key={review.id || String(index)}
              className="rounded-[12px] border border-black/8 bg-white p-4"
            >
              <p className="text-[14px] font-semibold text-black/80">
                {review.reviewerName || review.authorName || 'Customer'}
                {review.rating != null ? ` · ${review.rating}/5` : ''}
              </p>
              <p className="text-[14px] text-black/60 mt-1">
                {review.comment || review.body || review.title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
