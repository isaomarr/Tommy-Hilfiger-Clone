import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/account/Login'
import Register from '../pages/account/Register'
import Overview from '../pages/account/Profile'
import Orders from '../pages/account/Orders'
import PersonalInfo from '../pages/account/PersonalInfo'
import Addresses from '../pages/account/Addresses'
import Payment from '../pages/account/Payment'
import SavedItems from '../pages/account/SavedItems'
import TrackOrder from '../pages/account/TrackOrder'
import ForgotPassword from '../pages/account/ForgotPassword'
import Category from '../pages/category/Category'
import ProductDetail from '../pages/productDetail/ProductDetail'
import Cart from '../pages/cart/Cart'
import CheckOut from '../pages/checkout/CheckOut'
import NotFound from '../pages/notfound/NotFound'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Category />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/personal"
        element={
          <ProtectedRoute>
            <PersonalInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/addresses"
        element={
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/saved-items"
        element={
          <ProtectedRoute>
            <SavedItems />
          </ProtectedRoute>
        }
      />
      <Route path="/:category" element={<Category />} />
      <Route path="/:category/:subcategory" element={<Category />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
