import React from 'react'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import AppRoutes from './components/routes/AppRoutes'
import CartDrawer from './components/layout/cart/CartDrawer'
import AuthDrawer from './components/layout/header/AuthDrawer'
import { AuthProvider } from './components/context/AuthContext'
import { CartProvider } from './components/context/CartContext'
import { WishlistProvider } from './components/context/WishlistContext'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Header />
          <div className="pt-27.5">
            <AppRoutes />
          </div>
          <Footer />
          <CartDrawer />
          <AuthDrawer />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
export default App
