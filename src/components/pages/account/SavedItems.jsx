import React from 'react'
import { useWishlist } from '../../context/WishlistContext'
import { products } from '../../data/shopData'
import ProductGrid from '../../layout/product/ProductGrid'
import AccountShell from './AccountShell'

const SavedItems = () => {
  const { ids } = useWishlist()
  const savedProducts = products.filter((p) => ids.includes(p.id))

  return (
    <AccountShell title="Saved Items">
      {savedProducts.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven't saved any items yet. Tap the heart icon on a product to save it here.
        </p>
      ) : (
        <ProductGrid products={savedProducts} />
      )}
    </AccountShell>
  )
}

export default SavedItems
