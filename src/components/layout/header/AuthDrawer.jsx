import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const PERKS = ['Early access to sales & exclusive offers', 'Extended returns']

const SignInFields = ({ onDone }) => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      login({ ...form, remember })
      onDone()
      navigate('/account')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
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
        <Link to="/forgot-password" onClick={onDone} className="underline">
          Forgot Password?
        </Link>
      </div>

      {error && <p className="text-sm text-[#c8102e]">{error}</p>}

      <button type="submit" className="bg-black text-white font-medium tracking-wide py-3.5 text-sm">
        Sign In
      </button>
    </form>
  )
}

const SignUpFields = ({ onDone }) => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [optIn, setOptIn] = useState(true)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      register({ ...form, confirmPassword: form.password })
      onDone()
      navigate('/account')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3.5 text-sm flex-1"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-3.5 text-sm flex-1"
        />
      </div>
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
          placeholder="Create a Password"
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

      <label className="flex items-start gap-2 text-xs text-gray-500">
        <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-0.5 shrink-0" />
        <span>
          I would like to receive updates on the latest products and promotions via email or other channels. See{' '}
          <span className="underline cursor-pointer">Privacy Policy</span>, which includes our{' '}
          <span className="underline cursor-pointer">Notice of Financial Incentive</span> and the{' '}
          <span className="underline cursor-pointer">Terms and Conditions</span>, for more information.
        </span>
      </label>

      {error && <p className="text-sm text-[#c8102e]">{error}</p>}

      <button type="submit" className="bg-black text-white font-medium tracking-wide py-3.5 text-sm">
        Create Account
      </button>

      <p className="text-xs text-gray-500">
        By clicking the Create Account button, I agree to the{' '}
        <span className="underline cursor-pointer">Terms and Conditions</span> and{' '}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </form>
  )
}

const AuthDrawer = () => {
  const { authDrawerOpen, authDrawerTab, closeAuthDrawer, setAuthDrawerTab } = useAuth()

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-99 transition-opacity duration-500 ${authDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeAuthDrawer}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-100 shadow-lg flex flex-col overflow-y-auto transition-transform duration-500 ease-in-out ${authDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="relative bg-[#0a1a3c] text-white px-8 py-10 pb-12 shrink-0">
          <button onClick={closeAuthDrawer} aria-label="Close" className="absolute top-4 right-4">
            <FiX className="text-xl" />
          </button>
          <div className="flex items-start justify-between gap-6 pr-8">
            <div className="font-serif italic font-bold leading-[0.95]">
              <h2 className="text-5xl">
                <span className="text-xs font-sans not-italic font-normal tracking-widest uppercase align-middle mr-1.5 whitespace-nowrap">
                  Welcome to
                </span>
                the
              </h2>
              <h2 className="text-5xl mt-1">hilfiger</h2>
              <h2 className="text-5xl mt-1">club</h2>
            </div>
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Join today for VIP access & perks like:</p>
              <ul className="text-sm list-disc list-inside flex flex-col gap-1">
                {PERKS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className={`absolute -bottom-2.5 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#0a1a3c] transition-all duration-300 ${authDrawerTab === 'signin' ? 'left-1/4' : 'left-3/4'}`}
          />
        </div>

        <div className="flex border-b shrink-0">
          <button
            onClick={() => setAuthDrawerTab('signin')}
            className={`flex-1 py-4 text-sm font-medium ${authDrawerTab === 'signin' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthDrawerTab('signup')}
            className={`flex-1 py-4 text-sm font-medium ${authDrawerTab === 'signup' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-8">
          {authDrawerTab === 'signin' ? <SignInFields onDone={closeAuthDrawer} /> : <SignUpFields onDone={closeAuthDrawer} />}
        </div>
      </div>
    </>
  )
}

export default AuthDrawer
