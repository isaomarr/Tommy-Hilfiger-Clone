import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { memberIdFor } from '../../utils/memberId'
import AccountShell from './AccountShell'
import SignInInfoBlock from './SignInInfoBlock'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const COMM_OPTIONS = ['Tommy.com', 'Men', 'Kids', 'Home', 'Company Stores', 'Women', 'Tommy Adaptive']

const inputClass = 'border border-gray-300 rounded-lg px-4 py-3 text-sm'

const PersonalInfo = () => {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone || '',
    gender: user.gender || 'Prefer not to say',
    birthMonth: user.birthMonth || '',
    birthDay: user.birthDay || '',
    favoriteStore: user.favoriteStore || 'usa.tommy.com',
    pvhEmployee: user.pvhEmployee || false,
    communicationPrefs: user.communicationPrefs || [],
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setSaved(false)
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const toggleCommPref = (label) => {
    setSaved(false)
    setForm((f) => ({
      ...f,
      communicationPrefs: f.communicationPrefs.includes(label)
        ? f.communicationPrefs.filter((x) => x !== label)
        : [...f.communicationPrefs, label],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(form)
    setSaved(true)
  }

  return (
    <AccountShell title="Personal Information">
      <SignInInfoBlock user={user} />

      <h3 className="font-medium mb-1">About Me</h3>
      <p className="text-sm text-gray-500 mb-4">Your information will be used for easy account lookup in-store.</p>

      <div className="grid grid-cols-[200px_1fr] gap-y-2 text-sm mb-6">
        <span className="text-gray-500">Hilfiger Club Member ID</span>
        <span>{memberIdFor(user.id)}</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <div className="flex gap-4">
          <input
            name="firstName"
            placeholder="First Name*"
            value={form.firstName}
            onChange={handleChange}
            required
            className={`${inputClass} flex-1`}
          />
          <input
            name="lastName"
            placeholder="Last Name*"
            value={form.lastName}
            onChange={handleChange}
            className={`${inputClass} flex-1`}
          />
        </div>

        <input
          name="phone"
          placeholder="Phone Number (Optional)"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
        />

        <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
          <option>Prefer not to say</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <div>
          <p className="text-sm text-gray-500 mb-2">Birthday (Optional)</p>
          <div className="flex gap-4">
            <select name="birthMonth" value={form.birthMonth} onChange={handleChange} className={`${inputClass} flex-1`}>
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              name="birthDay"
              value={form.birthDay}
              onChange={handleChange}
              disabled={!form.birthMonth}
              className={`${inputClass} flex-1 disabled:bg-gray-100`}
            >
              <option value="">Day</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Select your preferred store location</p>
          <div className="flex flex-col gap-3">
            <select disabled value="Tommy Hilfiger e-Commerce" className={`${inputClass} bg-gray-100`}>
              <option>Tommy Hilfiger e-Commerce</option>
            </select>
            <select name="favoriteStore" value={form.favoriteStore} onChange={handleChange} className={inputClass}>
              <option value="usa.tommy.com">usa.tommy.com</option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="pvhEmployee" checked={form.pvhEmployee} onChange={handleChange} />
          PVH Employee
        </label>

        <div className="border-t pt-6">
          <h3 className="font-medium mb-1">Communication Preferences</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get the most out of your shopping experience, let us know what you would like to hear about
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COMM_OPTIONS.map((label) => (
              <label key={label} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.communicationPrefs.includes(label)}
                  onChange={() => toggleCommPref(label)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {saved && <p className="text-sm text-green-700">Saved.</p>}

        <button type="submit" className="bg-black text-white font-medium tracking-wide py-3.5 text-sm px-8 self-start">
          Update
        </button>

        <p className="text-xs text-gray-500">
          By submitting my information I agree to the <span className="underline cursor-pointer">Terms and Conditions</span> and{' '}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </form>
    </AccountShell>
  )
}

export default PersonalInfo
