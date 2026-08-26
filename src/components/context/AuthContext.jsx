import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'th_users'
const SESSION_KEY = 'th_current_user'

const ADMIN_ACCOUNT = { id: 'admin', firstName: 'Admin', lastName: '', email: 'admin' }

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authDrawer, setAuthDrawer] = useState({ open: false, tab: 'signin' })

  const openAuthDrawer = (tab = 'signin') => setAuthDrawer({ open: true, tab })
  const closeAuthDrawer = () => setAuthDrawer((d) => ({ ...d, open: false }))
  const setAuthDrawerTab = (tab) => setAuthDrawer((d) => ({ ...d, tab }))

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const register = ({ firstName, lastName, email, password }) => {
    const users = readUsers()
    const normalizedEmail = email.trim().toLowerCase()

    if (users.some((u) => u.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.')
    }

    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email: normalizedEmail,
      password,
    }

    writeUsers([...users, newUser])

    const { password: _password, ...safeUser } = newUser
    setUser(safeUser)
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return safeUser
  }

  const login = ({ email, password, remember = true }) => {
    const normalizedEmail = email.trim().toLowerCase()

    let safeUser
    if (normalizedEmail === ADMIN_ACCOUNT.email && password === 'admin') {
      safeUser = { id: ADMIN_ACCOUNT.id, firstName: ADMIN_ACCOUNT.firstName, lastName: ADMIN_ACCOUNT.lastName, email: ADMIN_ACCOUNT.email }
    } else {
      const users = readUsers()
      const found = users.find((u) => u.email === normalizedEmail && u.password === password)
      if (!found) {
        throw new Error('Incorrect email or password.')
      }
      const { password: _password, ...rest } = found
      safeUser = rest
    }

    setUser(safeUser)
    ;(remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(safeUser))
    return safeUser
  }

  const resetPassword = ({ email, newPassword }) => {
    const users = readUsers()
    const normalizedEmail = email.trim().toLowerCase()
    const index = users.findIndex((u) => u.email === normalizedEmail)

    if (index === -1) {
      throw new Error('No account found with this email.')
    }

    users[index] = { ...users[index], password: newPassword }
    writeUsers(users)
  }

  const updateProfile = (updates) => {
    const normalizedEmail = updates.email ? updates.email.trim().toLowerCase() : user.email
    const updatedUser = { ...user, ...updates, email: normalizedEmail }

    setUser(updatedUser)
    const store = localStorage.getItem(SESSION_KEY) ? localStorage : sessionStorage
    store.setItem(SESSION_KEY, JSON.stringify(updatedUser))

    if (user.id !== ADMIN_ACCOUNT.id) {
      const users = readUsers()
      const index = users.findIndex((u) => u.id === user.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...updates, email: normalizedEmail }
        writeUsers(users)
      }
    }

    return updatedUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
        authDrawerOpen: authDrawer.open,
        authDrawerTab: authDrawer.tab,
        openAuthDrawer,
        closeAuthDrawer,
        setAuthDrawerTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
