import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import CheckoutForm from '../../layout/checout/CheckoutForm'
import { useCart } from '../../context/CartContext'

const CheckOut = () => {
  const { items } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (items.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-light mb-8">Checkout</h1>
      <CheckoutForm onOrderPlaced={() => setOrderPlaced(true)} />
    </div>
  )
}

export default CheckOut
