import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import Dropdown from '../common/Dropdoün'
import { useAuth } from '../../context/AuthContext'

const LOGGED_IN_LINKS = [
  { label: 'Overview', to: '/account' },
  { label: 'Orders', to: '/account/orders' },
  { label: 'Personal Information', to: '/account/personal' },
  { label: 'Addresses', to: '/account/addresses' },
  { label: 'Payment', to: '/account/payment' },
  { label: 'Saved Items', to: '/account/saved-items' },
]

const AccountMenu = () => {
  const { user, isAuthenticated, logout, openAuthDrawer } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Dropdown align="right" trigger={<button aria-label="Account"><FiUser /></button>}>
      <div className="w-64 bg-black text-white p-6 flex flex-col gap-4 text-sm">
        {isAuthenticated ? (
          <>
            <p className="font-medium text-base">Hi, {user.firstName}</p>
            <div className="flex flex-col gap-4 border-t border-white/20 pt-4">
              {LOGGED_IN_LINKS.map((item) => (
                <Link key={item.to} to={item.to} className="hover:underline">
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="text-left text-gray-400 hover:text-white border-t border-white/20 pt-4 mt-1"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button onClick={() => openAuthDrawer('signin')} className="text-left hover:underline">
              Sign In
            </button>
            <button onClick={() => openAuthDrawer('signup')} className="text-left hover:underline">
              Create Account
            </button>
            <Link to="/track-order" className="hover:underline">
              Track Order
            </Link>
          </>
        )}
      </div>
    </Dropdown>
  )
}

export default AccountMenu
