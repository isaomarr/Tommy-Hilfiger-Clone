import React from 'react'
import { Link } from 'react-router-dom'

const SignInInfoBlock = ({ user }) => (
  <div className="mb-8">
    <h3 className="font-medium mb-3">Sign In Information</h3>
    <div className="grid grid-cols-[160px_1fr] gap-y-2 text-sm">
      <span className="text-gray-500">Email</span>
      <span>{user.email}</span>
      <span className="text-gray-500">Password</span>
      <span>
        ****** <Link to="/forgot-password" className="underline">Change</Link>
      </span>
    </div>
  </div>
)

export default SignInInfoBlock
