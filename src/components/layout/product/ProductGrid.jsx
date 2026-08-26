import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return <div className="py-24 text-center text-gray-500">No items match these filters.</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
