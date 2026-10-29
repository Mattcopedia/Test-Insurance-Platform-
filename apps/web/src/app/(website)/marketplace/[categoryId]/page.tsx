'use client'

import { use } from 'react'
import { CategoryListings } from '../components/category-listings'

interface Props {
  params: Promise<{ categoryId: string }>
}

export default function CategoryPage({ params }: Props) {
  const { categoryId } = use(params)
  return <CategoryListings categoryKey={categoryId} />
}
