import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'

const CategorySlider = ({ title, products = [], viewAllHref }) => {
  if (products.length === 0) return null

  return (
    <section className="px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-light">{title}</h2>
        {viewAllHref && (
          <Link to={viewAllHref} className="text-sm underline">
            View All
          </Link>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {products.map((product) => (
          <div key={product.id} className="w-48 md:w-56 shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategorySlider
