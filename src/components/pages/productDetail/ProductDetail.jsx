import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import ProductGallery from '../../layout/product/ProductGallery'
import ProductInfo from '../../layout/product/ProductInfo'
import NotFound from '../notfound/NotFound'
import { getBySlug, getByCategory, subcategoryLabel } from '../../data/shopData'
import { useCart } from '../../context/CartContext'

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

const StyleWith = ({ products }) => {
  const scrollerRef = useRef(null)
  const scrollNext = () => scrollerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })

  if (products.length === 0) return null

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-light mb-6">Style With</h2>
      <div className="relative">
        <div ref={scrollerRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.slug}`}
              className="relative shrink-0 w-56 aspect-4/5 overflow-hidden bg-gray-100"
            >
              <img src={p.colors?.[0]?.image || p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-3 py-2">
                {p.name}
              </span>
            </Link>
          ))}
        </div>
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="absolute top-1/2 -translate-y-1/2 right-0 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}

const ProductDetail = () => {
  const { slug } = useParams()
  const product = getBySlug(slug)
  const { addItem, openDrawer } = useCart()

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0])
  const [selectedSize, setSelectedSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    if (!isAdding) return
    const timer = setTimeout(() => {
      addItem({ product, size: selectedSize, color: selectedColor.name, qty })
      openDrawer()
      setIsAdding(false)
    }, 650)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdding])

  if (!product) return <NotFound />

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError('Please select a size.')
      return
    }
    setSizeError('')
    setIsAdding(true)
  }

  const related = getByCategory(product.category, product.subcategory)
    .filter((p) => p.id !== product.id)
    .slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to={`/${product.category}`} className="hover:text-black hover:underline">
          {capitalize(product.category)}
        </Link>
        <span>/</span>
        <span className="text-black">{subcategoryLabel(product.subcategory)}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery images={product.images} />
        <div className="md:sticky md:top-24 md:self-start">
          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            selectedSize={selectedSize}
            onSizeChange={(size) => {
              setSelectedSize(size)
              setSizeError('')
            }}
            sizeError={sizeError}
            qty={qty}
            onQtyChange={setQty}
            onAddToCart={handleAddToCart}
            isAdding={isAdding}
          />
        </div>
      </div>

      <StyleWith products={related} />
    </div>
  )
}

export default ProductDetail
