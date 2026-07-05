import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@wrapa/ui'
import { getCategoryById, getProductById } from '../../data/marketplace-data'

interface Props {
  params: Promise<{ categoryId: string; productId: string }>
}

export default async function PlanDetailPage({ params }: Props) {
  const { categoryId, productId } = await params
  const category = getCategoryById(categoryId)
  const product = getProductById(productId)

  if (!category || !product) notFound()

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-[680px] px-4 sm:px-6 py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-[13px] text-black/45 mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/marketplace" className="hover:text-black transition-colors">
            Marketplace
          </Link>
          <span className="text-black/25">›</span>
          <Link href={`/marketplace/${categoryId}`} className="hover:text-black transition-colors">
            {category.name}
          </Link>
          <span className="text-black/25">›</span>
          <span className="text-black/70 font-medium truncate max-w-[180px]">{product.name}</span>
        </nav>

        {/* Plan card */}
        <div className="bg-white rounded-[16px] border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-7 sm:p-9 mb-8">
          <div className="flex items-start gap-4 mb-5">
            <div
              className="flex items-center justify-center rounded-[14px] w-14 h-14 shrink-0"
              style={{ backgroundColor: product.color }}
            >
              <span className="font-bold text-white text-[17px]">{product.initials}</span>
            </div>
            <div>
              <h1 className="font-serif text-[22px] sm:text-[26px] font-bold text-black/85 leading-snug">
                {product.name}
              </h1>
              <p className="text-[14px] text-black/45 mt-0.5">{product.provider}</p>
            </div>
          </div>

          <p className="text-[14px] sm:text-[15px] text-black/60 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 py-5 border-y border-black/8">
            <div>
              <p className="text-[11px] text-black/40 font-semibold uppercase tracking-wide mb-1">
                Starting from
              </p>
              <p className="text-[15px] font-bold text-black/85">
                NGN {product.startingPrice.toLocaleString()} / {product.billingCycle}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-black/40 font-semibold uppercase tracking-wide mb-1">
                Duration
              </p>
              <p className="text-[15px] font-semibold text-black/70">{product.duration}</p>
            </div>
            <div>
              <p className="text-[11px] text-black/40 font-semibold uppercase tracking-wide mb-1">
                Plan type
              </p>
              <p className="text-[15px] font-semibold text-black/70">{product.planType}</p>
            </div>
          </div>

          {/* Sign-in gate message */}
          <div className="rounded-[10px] bg-black/4 px-4 py-3 mb-6">
            <p className="text-[13px] sm:text-[14px] text-black/60 text-center leading-relaxed">
              Sign in or create an account to purchase this plan
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="md" fullWidth asChild>
              <Link href="/sign-in">Buy this plan</Link>
            </Button>
            <Button variant="outline" size="md" fullWidth asChild>
              <Link href="/get-quote">Get a quote first</Link>
            </Button>
          </div>
        </div>

        {/* Back to category */}
        <div className="text-center">
          <Link
            href={`/marketplace/${categoryId}`}
            className="text-[13px] text-black/45 hover:text-black transition-colors"
          >
            ← Back to {category.name}
          </Link>
        </div>
      </div>
    </div>
  )
}
