import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { label: 'Overview', to: '/account' },
  { label: 'Orders', to: '/account/orders' },
  { label: 'Personal Information', to: '/account/personal' },
  { label: 'Addresses', to: '/account/addresses' },
  { label: 'Payment', to: '/account/payment' },
  { label: 'Saved Items', to: '/account/saved-items' },
]

const AccountShell = ({ title, children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div>
        <p className="text-2xl mb-6">Hi, {user.firstName}</p>
        <nav className="flex flex-col gap-1 text-base">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2.5 rounded ${
                location.pathname === item.to ? 'bg-gray-100 font-medium text-black underline' : 'text-gray-600 hover:text-black'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="mt-6 px-3 py-2.5 text-base text-gray-400 hover:text-black">
          Sign Out
        </button>
      </div>
      <div className="md:col-span-3">
        <h1 className="text-4xl font-light mb-8">{title}</h1>
        {children}

        <p className="text-base text-gray-600 mt-12">
          Please contact <span className="underline cursor-pointer">Customer Service</span> if you have questions
          about your account, or if you are not seeing transactions that should have been posted.
        </p>

        <div className="mt-8">
          <h3 className="text-xl font-medium mb-3">Need Help?</h3>
          <ul className="flex flex-col gap-3 text-base">
            <li className="underline cursor-pointer">Shipping and Delivery</li>
            <li className="underline cursor-pointer">Return Policy</li>
            <li className="underline cursor-pointer">Contact Us</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AccountShell
