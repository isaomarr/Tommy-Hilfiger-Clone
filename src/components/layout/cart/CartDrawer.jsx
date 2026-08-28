import React from 'react'
import { FiX } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import Button from '../common/Button'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'

const CartDrawer = () => {
  const { items, isDrawerOpen, closeDrawer, updateQty, removeItem, subtotal, itemCount } = useCart()
  useLockBodyScroll(isDrawerOpen)

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-99 transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeDrawer}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-100 shadow-lg flex flex-col transition-transform duration-500 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0">
          <span className="font-medium">Shopping Bag</span>
          <button onClick={closeDrawer} aria-label="Close cart">
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <p className="py-12 text-center text-gray-500 text-sm">You have no items in your bag.</p>
          ) : (
            items.map((item) => <CartItem key={item.key} item={item} onUpdateQty={updateQty} onRemove={removeItem} />)
          )}
        </div>

        <div className="border-t px-6 py-6 shrink-0 flex flex-col gap-3">
          <CartSummary subtotal={subtotal} itemCount={itemCount} onCtaClick={closeDrawer} />
          <Button variant="secondary" fullWidth onClick={closeDrawer}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </>
  )
}

export default CartDrawer
