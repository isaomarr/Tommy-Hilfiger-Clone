import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getOrdersForEmail } from '../../utils/orders'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/shopData'
import AccountShell from './AccountShell'

const RANGE_OPTIONS = [
  { label: 'Last 6 Months', months: 6 },
  { label: 'Last 12 Months', months: 12 },
  { label: 'All Time', months: null },
]

const Orders = () => {
  const { user } = useAuth()
  const allOrders = getOrdersForEmail(user.email)
  const [range, setRange] = useState(RANGE_OPTIONS[0].label)

  const activeRange = RANGE_OPTIONS.find((r) => r.label === range)
  const orders = activeRange.months
    ? allOrders.filter((o) => {
        const cutoff = new Date()
        cutoff.setMonth(cutoff.getMonth() - activeRange.months)
        return new Date(o.date) >= cutoff
      })
    : allOrders

  return (
    <AccountShell title="Orders">
      <div className="flex justify-end mb-6">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          {RANGE_OPTIONS.map((r) => (
            <option key={r.label} value={r.label}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {orders.length === 0 ? (
        <div>
          <p className="text-sm text-gray-600 mb-2">No orders were found on your account for the selected time period.</p>
          <p className="text-sm text-gray-600 mb-6">Place an order to view the status.</p>
          <Link to="/" className="block w-full text-center bg-black text-white font-medium tracking-wide py-3.5 text-sm">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-5 text-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">Order {order.id}</p>
                  <p className="text-gray-500">{new Date(order.date).toLocaleDateString()} · Processing</p>
                </div>
                <p className="font-medium">{formatPrice(order.subtotal)}</p>
              </div>
              <div className="flex flex-col gap-3">
                {order.items.map((item) => (
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
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  )
}

export default Orders
