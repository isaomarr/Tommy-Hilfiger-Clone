import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AccountShell from './AccountShell'

const emptyAddress = { fullName: '', address: '', city: '', postalCode: '', country: '', phone: '' }
const inputClass = 'border border-gray-300 rounded-lg px-4 py-3.5 text-base'

const Addresses = () => {
  const { user, updateProfile } = useAuth()
  const addresses = user.addresses || []
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyAddress)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = [...addresses, { ...form, id: Date.now().toString() }]
    updateProfile({ addresses: next })
    setForm(emptyAddress)
    setShowForm(false)
  }

  const handleRemove = (id) => {
    updateProfile({ addresses: addresses.filter((a) => a.id !== id) })
  }

  return (
    <AccountShell title="Addresses">
      <p className="text-base text-gray-600 mb-6">Add a shipping address for quicker checkout.</p>

      {addresses.length > 0 && (
        <div className="flex flex-col gap-4 mb-6 max-w-md">
          {addresses.map((a) => (
            <div key={a.id} className="border rounded-lg p-5 text-base flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{a.fullName}</p>
                <p className="text-gray-600">{a.address}</p>
                <p className="text-gray-600">
                  {a.city}, {a.postalCode} · {a.country}
                </p>
                <p className="text-gray-600">{a.phone}</p>
              </div>
              <button onClick={() => handleRemove(a.id)} className="text-sm underline text-gray-500 shrink-0">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <div className="flex gap-4">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className={`${inputClass} flex-1`}
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              required
              className={`${inputClass} flex-1`}
            />
          </div>
          <div className="flex gap-4">
            <input
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              required
              className={`${inputClass} flex-1`}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className={`${inputClass} flex-1`}
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-black text-white font-medium tracking-wide py-4 text-base">
              Save Address
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 border border-black py-4 text-base font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full max-w-md bg-black text-white font-medium tracking-wide py-4 text-base"
        >
          Add a New Address
        </button>
      )}
    </AccountShell>
  )
}

export default Addresses
