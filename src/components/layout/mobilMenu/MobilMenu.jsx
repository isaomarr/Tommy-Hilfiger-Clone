import React from 'react'
import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { mainNavItems } from '../../data/shopData'
import { useAuth } from '../../context/AuthContext'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'

const MobilMenu = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth()
  useLockBodyScroll(isOpen)

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-99 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-100 shadow-lg overflow-y-auto flex flex-col transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b shrink-0">
          <span className="font-medium">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col">
          {mainNavItems.map((item) => (
            <div key={item.slug} className="border-b">
              <Link to={`/${item.slug}`} onClick={onClose} className="block px-6 py-4 font-medium">
                {item.name}
              </Link>
              {item.subcategories.length > 0 && (
                <div className="flex flex-col pb-2">
                  {item.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/${item.slug}/${sub.slug}`}
                      onClick={onClose}
                      className="px-10 py-2 text-sm text-gray-600"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-auto p-6 border-t">
          {isAuthenticated ? (
            <div className="flex flex-col gap-3 text-sm">
              <span>Hi, {user.firstName}</span>
              <Link to="/account" onClick={onClose} className="underline">
                My Account
              </Link>
              <button
                onClick={() => {
                  logout()
                  onClose()
                }}
                className="text-left underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/login" onClick={onClose} className="bg-[#0a1a3c] text-white text-center py-2">
                Sign In
              </Link>
              <Link to="/register" onClick={onClose} className="text-center underline">
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MobilMenu
