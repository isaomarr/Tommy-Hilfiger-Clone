import React, { useState } from 'react'
import Button from '../../layout/common/Button'
import SignInPanel from './SignInPanel'
import { formatPrice } from '../../data/shopData'

const findOrder = ({ orderNumber, email, zip }) => {
  let orders = []
  try {
    orders = JSON.parse(localStorage.getItem('th_orders')) || []
  } catch {
    orders = []
  }

  const normalizedId = orderNumber.trim().toLowerCase()
  const normalizedEmail = email.trim().toLowerCase()
  const normalizedZip = zip.trim().toLowerCase()

  return orders.find(
    (o) =>
      o.id.toLowerCase() === normalizedId &&
      (o.shipping?.email || '').toLowerCase() === normalizedEmail &&
      (o.shipping?.postalCode || '').toLowerCase() === normalizedZip
  )
}

const TrackOrderForm = () => {
  const [form, setForm] = useState({ orderNumber: '', email: '', zip: '' })
  const [result, setResult] = useState(undefined)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setResult(findOrder(form) || null)
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-6">Track Your Order</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="orderNumber"
          placeholder="Order Number (from order confirmation email)"
          value={form.orderNumber}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm"
        />
        <input
          name="zip"
          placeholder="Shipping Zip Code"
          value={form.zip}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm"
        />
        <Button type="submit" fullWidth>
          Check order status
        </Button>
      </form>

      {result === null && (
        <p className="text-sm text-[#c8102e] mt-4">
          We couldn't find an order matching those details. Double-check your order number, email and zip code.
        </p>
      )}

      {result && (
        <div className="mt-6 border-t pt-6 text-sm">
          <p className="font-medium mb-1">Order {result.id}</p>
          <p className="text-gray-500 mb-4">Placed on {new Date(result.date).toLocaleDateString()} · Processing</p>
          <div className="flex flex-col gap-3 mb-4">
            {result.items.map((item) => (
              <div key={item.key} className="flex items-center gap-3">
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
          <div className="flex items-center justify-between font-medium border-t pt-3">
            <span>Total</span>
            <span>{formatPrice(result.subtotal)}</span>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-6 underline cursor-pointer">Privacy Policy</p>
    </div>
  )
}

const TrackOrder = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
      <TrackOrderForm />
      <div className="md:border-l md:pl-16">
        <SignInPanel heading="Have An Account?" subtext="Sign in below to view your order history" />
      </div>
    </div>
  )
}

export default TrackOrder
