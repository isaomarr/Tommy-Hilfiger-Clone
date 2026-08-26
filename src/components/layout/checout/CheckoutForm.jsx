import React, { useState } from 'react'
import ShippingForm from './ShippingForm'
import PaymentForm from './PaymentForm'
import CartSummary from '../cart/CartSummary'
import Button from '../common/Button'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/shopData'

const CheckoutForm = ({ onOrderPlaced }) => {
  const { items, subtotal, clear } = useCart()
  const [step, setStep] = useState('shipping')
  const [shippingData, setShippingData] = useState(null)
  const [order, setOrder] = useState(null)

  const handleShippingNext = (data) => {
    setShippingData(data)
    setStep('payment')
  }

  const handlePaymentSubmit = () => {
    const newOrder = {
      id: `TH-${Date.now()}`,
      items,
      subtotal,
      shipping: shippingData,
      date: new Date().toISOString(),
    }
    setOrder(newOrder)

    try {
      const orders = JSON.parse(localStorage.getItem('th_orders')) || []
      localStorage.setItem('th_orders', JSON.stringify([...orders, newOrder]))
    } catch {
      // ignore storage errors
    }

    onOrderPlaced?.()
    clear()
    setStep('confirmation')
  }

  if (step === 'confirmation' && order) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-3xl font-light mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-2">Your order has been placed.</p>
        <p className="text-sm text-gray-500 mb-8">Order Number: {order.id}</p>
        <div className="border-y py-4 mb-8 text-sm flex items-center justify-between">
          <span>Total</span>
          <span className="font-medium">{formatPrice(order.subtotal)}</span>
        </div>
        <Button to="/">Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        {step === 'shipping' && <ShippingForm initialData={shippingData || {}} onNext={handleShippingNext} />}
        {step === 'payment' && <PaymentForm onBack={() => setStep('shipping')} onSubmit={handlePaymentSubmit} />}
      </div>
      <div>
        <h2 className="text-sm font-medium mb-4">Order Summary</h2>
        <div className="flex flex-col gap-3 mb-6 max-h-80 overflow-y-auto">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-3 text-sm">
              <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-gray-100" />
              <div className="flex-1">
                <p className="line-clamp-1">{item.name}</p>
                <p className="text-gray-500 text-xs">
                  {item.size} · {item.color} · x{item.qty}
                </p>
              </div>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <CartSummary subtotal={subtotal} showCta={false} />
      </div>
    </div>
  )
}

export default CheckoutForm
