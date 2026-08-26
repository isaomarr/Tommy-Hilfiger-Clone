import React, { useState } from 'react'
import Button from '../common/Button'

const PaymentForm = ({ onBack, onSubmit }) => {
  const [form, setForm] = useState({ cardName: '', cardNumber: '', expiry: '', cvc: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) {
      setError('Card number must be 16 digits.')
      return
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      setError('Expiry date must be in MM/YY format.')
      return
    }
    if (!/^\d{3,4}$/.test(form.cvc)) {
      setError('Invalid CVC.')
      return
    }

    setError('')
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-medium">Payment Information</h2>
      <input
        name="cardName"
        placeholder="Name on Card"
        value={form.cardName}
        onChange={handleChange}
        required
        className="border px-4 py-3 text-sm"
      />
      <input
        name="cardNumber"
        placeholder="1234 5678 9012 3456"
        value={form.cardNumber}
        onChange={handleChange}
        required
        className="border px-4 py-3 text-sm"
      />
      <div className="flex gap-4">
        <input
          name="expiry"
          placeholder="MM/YY"
          value={form.expiry}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm flex-1"
        />
        <input
          name="cvc"
          placeholder="CVC"
          value={form.cvc}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm flex-1"
        />
      </div>
      {error && <p className="text-sm text-[#c8102e]">{error}</p>}
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} fullWidth>
          Back
        </Button>
        <Button type="submit" fullWidth>
          Place Order
        </Button>
      </div>
    </form>
  )
}

export default PaymentForm
