import { MarketplaceProductCard } from '@wrapa/ui'
import { colorFrom, initialsFrom, offeringHref, productHref } from '../lib'
import type { MarketplaceOffering, MarketplaceProduct } from '@/services/marketplace/types'

function categoryKey(preferred: string, fallback?: string | null) {
  return preferred || fallback || 'all'
}

export function OfferingCard({
  offering,
  categorySlug,
}: {
  offering: MarketplaceOffering
  categorySlug: string
}) {
  const currency = offering.currency ?? ''
  const price = offering.headlinePrice
  const priced = currency.length === 3 && price != null

  return (
    <MarketplaceProductCard
      initials={initialsFrom(offering.providerName || offering.name)}
      color={colorFrom(offering.id)}
      name={offering.name}
      provider={offering.providerName || 'WRAPA partner'}
      description={offering.description || ''}
      startingPrice={priced ? price : undefined}
      currency={priced ? currency : undefined}
      billingCycle={offering.headlineBillingPeriod || undefined}
      href={offeringHref(
        categoryKey(categorySlug, offering.categoryId),
        offering.offeringType,
        offering.id
      )}
    />
  )
}

export function ProductCard({
  product,
  categorySlug,
}: {
  product: MarketplaceProduct
  categorySlug: string
}) {
  const currency = product.currencyCode ?? product.headline?.currency ?? ''
  const price = product.headline?.premium
  const priced = currency.length === 3 && price != null

  return (
    <MarketplaceProductCard
      initials={initialsFrom(product.insurerName || product.name)}
      color={colorFrom(product.id)}
      name={product.name}
      provider={product.insurerName || 'WRAPA partner'}
      description={product.description || ''}
      startingPrice={priced ? price : undefined}
      currency={priced ? currency : undefined}
      billingCycle={product.headline?.billingPeriod || undefined}
      href={productHref(categoryKey(categorySlug, product.categoryId), product.id)}
    />
  )
}
