import React from 'react'
import { Link } from 'react-router-dom'
import SignInPanel from './SignInPanel'

const Login = () => {
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <SignInPanel heading="Sign In" />
      <p className="mt-6 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="underline font-medium text-black">
          Create Account
        </Link>
      </p>
    </div>
  )
}

export default Login
