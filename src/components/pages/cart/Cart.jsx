import React from 'react'
import { useCart } from '../../context/CartContext'
import CartItem from '../../layout/cart/CartItem'
import CartSummary from '../../layout/cart/CartSummary'
import Button from '../../layout/common/Button'

const Cart = () => {
  const { items, updateQty, removeItem, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-light mb-4">Your Bag Is Empty</h1>
        <p className="text-gray-500 mb-8">Keep shopping to add items to your bag.</p>
        <Button to="/">Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-light mb-6">Shopping Bag ({items.length})</h1>
        {items.map((item) => (
          <CartItem key={item.key} item={item} onUpdateQty={updateQty} onRemove={removeItem} />
        ))}
      </div>
      <div>
        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  )
}

export default Cart
