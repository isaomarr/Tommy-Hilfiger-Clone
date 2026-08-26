import React from 'react'
import Button from '../common/Button'
import { formatPrice } from '../../data/shopData'

const CartSummary = ({ subtotal, itemCount, ctaLabel = 'Review + Checkout', ctaTo = '/checkout', onCtaClick, showCta = true }) => {
  const isEmpty = itemCount === 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center text-sm">
        <span className="text-gray-500">Subtotal</span>
        {itemCount !== undefined && (
          <span className="text-gray-500 ml-2">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
        )}
        <span className="font-medium ml-auto">{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs text-gray-400">Shipping & Taxes Calculated at Checkout</p>
      {showCta && (
        <Button to={ctaTo} onClick={onCtaClick} fullWidth disabled={isEmpty}>
          {ctaLabel}
        </Button>
      )}
    </div>
  )
}

export default CartSummary
