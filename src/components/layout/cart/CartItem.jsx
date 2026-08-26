import React from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'
import { formatPrice } from '../../data/shopData'

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  return (
    <div className="flex gap-4 py-4 border-b">
      <Link to={`/product/${item.slug}`} className="w-20 h-24 bg-gray-100 shrink-0 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 flex flex-col gap-1">
        <Link to={`/product/${item.slug}`} className="text-sm font-medium hover:underline">
          {item.name}
        </Link>
        <p className="text-xs text-gray-500">
          Color: {item.color} · Size: {item.size}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border">
            <button onClick={() => onUpdateQty(item.key, item.qty - 1)} className="px-2 py-1 text-sm">
              -
            </button>
            <span className="px-3 text-sm">{item.qty}</span>
            <button onClick={() => onUpdateQty(item.key, item.qty + 1)} className="px-2 py-1 text-sm">
              +
            </button>
          </div>
          <span className="text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
        </div>
      </div>
      <button onClick={() => onRemove(item.key)} aria-label="Remove item" className="text-gray-400 hover:text-black">
        <FiTrash2 />
      </button>
    </div>
  )
}

export default CartItem
