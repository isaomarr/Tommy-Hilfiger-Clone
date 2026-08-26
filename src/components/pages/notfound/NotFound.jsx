import React from 'react'
import Button from '../../layout/common/Button'

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <h1 className="text-8xl font-light mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Button to="/">Back to Home</Button>
    </div>
  )
}

export default NotFound
