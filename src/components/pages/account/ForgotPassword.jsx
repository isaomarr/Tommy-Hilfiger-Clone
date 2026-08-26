import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../../layout/common/Button'

const ForgotPassword = () => {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', newPassword: '', confirmPassword: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      resetPassword({ email: form.email, newPassword: form.newPassword })
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-light mb-1">Reset Password</h1>
      <p className="text-sm text-gray-500 mb-6">
        This demo has no email server, so set a new password for your account directly below.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
          minLength={6}
          className="border px-4 py-3 text-sm"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
          className="border px-4 py-3 text-sm"
        />
        {error && <p className="text-sm text-[#c8102e]">{error}</p>}
        <Button type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
      <p className="mt-6 text-sm text-gray-600">
        Remembered it?{' '}
        <Link to="/login" className="underline font-medium text-black">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default ForgotPassword
