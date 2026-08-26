import React, { useState } from 'react'
import Button from '../common/Button'

const ShippingForm = ({ initialData = {}, onNext }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    ...initialData,
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(form)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-medium">Shipping Information</h2>
      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
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
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
        className="border px-4 py-3 text-sm"
      />
      <div className="flex gap-4">
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm flex-1"
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm flex-1"
        />
      </div>
      <div className="flex gap-4">
        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm flex-1"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="border px-4 py-3 text-sm flex-1"
        />
      </div>
      <Button type="submit" fullWidth>
        Continue to Payment
      </Button>
    </form>
  )
}

export default ShippingForm
