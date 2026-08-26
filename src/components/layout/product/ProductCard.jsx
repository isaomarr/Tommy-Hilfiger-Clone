import React from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiHeart } from 'react-icons/fi'
import Badge from '../common/Badgeş'
import { formatPrice } from '../../data/shopData'
import { useWishlist } from '../../context/WishlistContext'

const badgeTone = { sale: 'sale', new: 'new', bestseller: 'bestseller' }

const ProductCard = ({ product }) => {
  const mainImage = product.colors?.[0]?.image || product.images[0]
  const { isSaved, toggle } = useWishlist()
  const saved = isSaved(product.id)

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badges.map((b) => (
            <Badge key={b} label={b} tone={badgeTone[b] || 'default'} />
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            toggle(product.id)
          }}
          aria-label={saved ? 'Remove from saved items' : 'Save item'}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
        >
          <FiHeart className={saved ? 'fill-black text-black' : 'text-gray-600'} />
        </button>
      </div>
      <div className="pt-3">
        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
          {product.discountPercent > 0 && (
            <span className="text-xs text-[#c8102e] font-medium">-{product.discountPercent}%</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
          <FiStar className="text-yellow-500" />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        {product.colors.length > 1 && (
          <div className="flex gap-1 mt-2">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ProductCard
