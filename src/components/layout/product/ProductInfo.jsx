import React, { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import Badge from '../common/Badgeş'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'
import { formatPrice } from '../../data/shopData'

const badgeTone = { sale: 'sale', new: 'new', bestseller: 'bestseller' }

const AccordionRow = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b">
    <button onClick={onToggle} className="w-full flex items-center justify-between py-4 text-left font-medium">
      {title}
      <FiChevronRight className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
    </button>
    {isOpen && <div className="pb-4 text-sm text-gray-600">{children}</div>}
  </div>
)

const ProductInfo = ({
  product,
  selectedColor,
  onColorChange,
  selectedSize,
  onSizeChange,
  sizeError,
  qty,
  onQtyChange,
  onAddToCart,
  isAdding,
}) => {
  const [openSection, setOpenSection] = useState(null)
  const toggleSection = (key) => setOpenSection((prev) => (prev === key ? null : key))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex gap-2 mb-2">
          {product.badges.map((b) => (
            <Badge key={b} label={b} tone={badgeTone[b] || 'default'} />
          ))}
        </div>
        <h1 className="text-3xl font-light">{product.name}</h1>
      </div>

      <div className="flex items-center gap-3">
        {product.oldPrice && (
          <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
        )}
        <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
        {product.discountPercent > 0 && (
          <span className="text-sm text-[#c8102e] font-medium">{product.discountPercent}% off</span>
        )}
      </div>

      <ColorSelector colors={product.colors} selected={selectedColor} onChange={onColorChange} />
      <SizeSelector sizes={product.sizes} selected={selectedSize} onChange={onSizeChange} error={sizeError} />

      <p className="text-sm">
        {product.inStock ? (
          <span className="text-green-700 font-medium">In Stock</span>
        ) : (
          <span className="text-gray-400 font-medium">Out of Stock</span>
        )}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="qty" className="text-sm text-gray-500">
            Qty
          </label>
          <select
            id="qty"
            value={qty}
            onChange={(e) => onQtyChange(Number(e.target.value))}
            className="border border-gray-300 px-3 py-2.5 text-sm"
          >
            {Array.from({ length: Math.min(product.stock, 10) || 1 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onAddToCart}
          disabled={!product.inStock || isAdding}
          className="group relative flex-1 overflow-hidden bg-black text-white font-medium tracking-wide text-sm py-3.5 disabled:cursor-not-allowed"
        >
          {isAdding && (
            <span
              className="absolute inset-y-0 right-0 bg-white"
              style={{ animation: 'add-to-bag-fill 650ms ease-in-out forwards' }}
            />
          )}
          <span className="relative group-hover:underline">
            {product.inStock ? `Add To Bag - ${formatPrice(product.price)}` : 'Out of Stock'}
          </span>
        </button>
      </div>

      <p className="text-sm text-gray-600">Free Standard Shipping on Orders $100+</p>

      <div>
        <h3 className="font-medium mb-2">Why We Love It</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>

      <div className="border-t">
        <AccordionRow title="Product Details" isOpen={openSection === 'details'} onToggle={() => toggleSection('details')}>
          <ul className="flex flex-col gap-1">
            <li>
              <span className="font-medium text-black">Fit:</span> {product.fit}
            </li>
            <li>
              <span className="font-medium text-black">Material:</span> {product.material}
            </li>
            <li>
              <span className="font-medium text-black">Care:</span> {product.care}
            </li>
          </ul>
        </AccordionRow>
        <AccordionRow
          title="Shipping & Returns"
          isOpen={openSection === 'shipping'}
          onToggle={() => toggleSection('shipping')}
        >
          <p>Free standard shipping on orders $100+. Free returns within 30 days of purchase.</p>
        </AccordionRow>
        <AccordionRow title="Write a Review" isOpen={openSection === 'review'} onToggle={() => toggleSection('review')}>
          <p>
            {product.rating} out of 5, based on {product.reviewCount} reviews.
          </p>
        </AccordionRow>
        <AccordionRow
          title="Ask a Question"
          isOpen={openSection === 'question'}
          onToggle={() => toggleSection('question')}
        >
          <p>Have a question about this product? Reach out to our support team.</p>
        </AccordionRow>
      </div>
    </div>
  )
}

export default ProductInfo
