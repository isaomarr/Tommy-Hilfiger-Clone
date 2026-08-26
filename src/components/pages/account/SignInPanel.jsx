import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import Button from '../../layout/common/Button'

const SignInPanel = ({ heading = 'Sign In', subtext }) => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/account'

  const [form, setForm] = useState({ email: '', password: '' })
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      login({ ...form, remember })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-1">{heading}</h2>
      {subtext && <p className="text-sm text-gray-500 mb-6">{subtext}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3.5 text-sm"
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-3.5 text-sm w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <Link to="/forgot-password" className="underline">
            Forgot Password?
          </Link>
        </div>

        {error && <p className="text-sm text-[#c8102e]">{error}</p>}

        <Button type="submit" fullWidth>
          Sign In
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6 text-xs text-gray-400">
        <span className="flex-1 border-t" />
        or
        <span className="flex-1 border-t" />
      </div>

      <Button
        variant="secondary"
        fullWidth
        onClick={() =>
          setNotice('Email verification codes aren’t available in this demo — please sign in with your email and password.')
        }
      >
        Email me a verification code
      </Button>
      {notice && <p className="text-xs text-gray-500 mt-3">{notice}</p>}

      <p className="text-xs text-gray-500 mt-6">
        By submitting my information I agree to the <span className="underline cursor-pointer">Terms and Conditions</span> and{' '}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  )
}

export default SignInPanel
